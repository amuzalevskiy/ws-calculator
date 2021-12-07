import React, { createContext, useEffect, useContext, useState, useRef, useCallback } from 'react'
import jsonpointer from 'jsonpointer'
import produce, { enablePatches } from 'immer'
import EventEmitter from '@lvchengbin/event-emitter'
import { defaultSettings } from '../defaultSettings'
import axios from 'axios'
import { backendURL } from '../appSettings'
import _ from 'lodash'

const emptySymbol = Symbol('empty')
const listenersSymbol = Symbol('listeners')

enablePatches()

function compilePointer(pointer) {
  if (typeof pointer === 'string') {
    pointer = pointer.split('/')
    if (pointer[0] === '') return pointer
    throw new Error('Invalid JSON pointer.')
  } else if (Array.isArray(pointer)) {
    return pointer
  }
  throw new Error('Invalid JSON pointer.')
}

function createInnerModifyCb(pointer, cb) {
  return (draft) => {
    const result = cb(jsonpointer.get(draft, pointer))
    if (typeof result !== 'undefined') {
      jsonpointer.set(draft, pointer, result)
    }
  }
}

class BaseContext extends EventEmitter {
  enableSave = false
  unsavedChanges = [];
  unsavedInverseChanges = [];
  syncTimeout = 0;
  getRootContext() {
    return this
  }
  get basepath() {
    return ''
  }
  get = (pointer) => {
    if (pointer[0] === '~') {
      pointer = pointer.substr(1)
    }
    return jsonpointer.get(this.value, pointer)
  }
  set = (pointer, value) => this.modify(main => {
    if (pointer[0] === '~') {
      pointer = pointer.substr(1)
    }
    jsonpointer.set(main, pointer, value)
  })
  modify = (option, cb) => {
    if (!cb) {
      cb = option
    }
    let shouldUpdate = this.enableSave
    if (option === 'dontSendUpdateToServer') {
      shouldUpdate = false
    }
    let timeout = 200
    if (option === 'instant') {
      timeout = 0
    }
    const nextValue = produce(this.value, cb,
      (patches, inversePatches) => {
        if (shouldUpdate) {
          this.unsavedChanges.push(...patches)
          this.unsavedInverseChanges.push(...inversePatches)
          if (!this.syncTimeout) {
            this.syncTimeout = setTimeout(this.sync, timeout)
          }
        } else {
          clearTimeout(this.syncTimeout)
          this.unsavedChanges = []
          this.unsavedInverseChanges = []
        }
      })
    if (nextValue !== this.value) {
      const prevValue = this.value
      this.value = nextValue
      this.onChange(prevValue, nextValue)
    }
  }
  sync = () => {
    if (this.unsavedChanges.length) {
      axios.post(backendURL + '/file/' + this.value.filename, this.unsavedChanges).catch(e => {
        // window.location.reload()
      })
      this.unsavedChanges = []
      this.unsavedInverseChanges = []
    }
    this.syncTimeout = 0
  }
  createChildContext = (pointer, previosContext) => {
    if (previosContext && previosContext.value === jsonpointer.get(this.value, pointer)) {
      return previosContext
    }
    return new ChildContext(this, pointer)
  }

  onChange(prevValue, nextValue) {
    // empty
  }

  addChangeListener(pointer, cb) {
    throw new Error('Abstract')
  }

  removeChangeListener(pointer, cb) {
    throw new Error('Abstract')
  }
  
  useState(pointer) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [value, setInternalValue] = useState(emptySymbol)
    if (value === emptySymbol) {
      value = this.get(pointer)
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const setValue = useCallback((nextValue) => {
      if (typeof nextValue === 'function') {
        const parentCb = createInnerModifyCb(pointer, nextValue)
        this.modify(parentCb)
      } else {
        this.set(pointer, nextValue)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [this, pointer])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      this.addChangeListener(pointer, setInternalValue)
      return () => {
        this.removeChangeListener(pointer, setInternalValue)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [this, pointer, setValue])
    return [value, setValue]
  }
}

class RootContext extends BaseContext {
  enableSave = true;
  // _value = null;
  // _history = [];
  // get value() {
  //   return this._value;
  // }
  // set value(nextValue) {
  //   this._history.push(this._value);
  //   if (this._history.length > 100) {
  //     this._history.splice(0, 1);
  //   }
  //   this._value = nextValue;
  // }
  // undo() {
  //   this.value = this._history[this._history.length - 1];
  // }
  constructor(initialValue) {
    super()
    this.value = initialValue
  }

  cloneDeep() {
    return new RootContext(_.cloneDeep(this.value))
  }

  listenersTree = {};

  addChangeListener(pointer, cb) {
    if (pointer[0] === '~') {
      pointer = pointer.substr(1)
    }
    const parts = compilePointer(pointer)
    let treeNode = this.listenersTree
    for (let i = 1; i < parts.length; i++) {
      const key = parts[i]
      if (!treeNode[key]) {
        treeNode[key] = {}
      }
      treeNode = treeNode[key]
    }
    if (!treeNode[listenersSymbol]) {
      treeNode[listenersSymbol] = []
    }
    treeNode[listenersSymbol].push(cb)
  }

  removeChangeListener(pointer, cb) {
    if (pointer[0] === '~') {
      pointer = pointer.substr(1)
    }
    const treeNode = jsonpointer.get(this.listenersTree, pointer)
    const listeners = treeNode[listenersSymbol]
    const index = listeners.indexOf(cb)
    if (index !== -1) {
      listeners.splice(index, 1)
    }
    if (listeners.length === 0) {
      delete treeNode[listenersSymbol]
      this.cascadeDeleteChangeListeners(compilePointer(pointer))
    }
  }

  cascadeDeleteChangeListeners(pointer) {
    const current = jsonpointer.get(this.listenersTree, pointer)
    if (!Object.keys(current).length && !current[listenersSymbol]) {
      const key = pointer.pop() // !!! pointer changed to parent
      delete jsonpointer.get(this.listenersTree, pointer)[key]
      if (pointer.length > 1) {
        this.cascadeDeleteChangeListeners(pointer)
      }
    }
  }

  onChange(prevValue, nextValue) {
    console.log('context value', nextValue)
    this.onChangeRec(prevValue, nextValue, this.listenersTree)
  }

  onChangeRec(prevValue, nextValue, treeNode) {
    if (treeNode[listenersSymbol]) {
      treeNode[listenersSymbol].forEach((cb) => {
        cb(nextValue)
      })
    }
    for (const key in treeNode) {
      const pv = (prevValue === undefined) ? undefined : prevValue[key]
        const nv = (nextValue === undefined) ? undefined : nextValue[key]
      if (pv !== nv) {
        this.onChangeRec(pv, nv, treeNode[key])
      }
    }
  }
}

class ChildContext extends BaseContext {
  constructor(previosContext, pointer) {
    super()
    this.previosContext = previosContext
    this.pointer = pointer
  }

  get basepath() {
    return this.previosContext.basepath + this.pointer
  }
  getRootContext() {
    return this.previosContext.getRootContext()
  }
  get value() {
    return this.previosContext.get(this.pointer)
  }
  set value(value) {
    this.previosContext.set(this.pointer, value)
  }

  get = (pointer) => {
    if (pointer[0] === '~') {
      return this.getRootContext().get(pointer)
    }
    return jsonpointer.get(this.value, pointer)
  }
  set = (pointer, value) => {
    if (pointer[0] === '~') {
      return this.getRootContext().set(pointer, value)
    }
    return this.modify(main => {
      jsonpointer.set(main, pointer, value)
    })
  }
  addChangeListener(pointer, cb) {
    if (pointer[0] === '~') {
      return this.getRootContext().addChangeListener(pointer, cb)
    }
    return this.previosContext.addChangeListener(this.pointer + pointer, cb)
  }
  removeChangeListener(pointer, cb) {
    if (pointer[0] === '~') {
      return this.getRootContext().removeChangeListener(pointer, cb)
    }
    return this.previosContext.removeChangeListener(this.pointer + pointer, cb)
  }
  modify = (option, cb) => {
    if (!cb) {
      cb = option
      option = undefined
    }
    const parentCb = createInnerModifyCb(this.pointer, cb)
    this.previosContext.modify(option || parentCb, option ? parentCb : undefined)
  }
}

export const Context = createContext()

export const WithNestedContext = ({ pointer, children }) => {
  const prevContext = useContext(Context)
  if (typeof prevContext.get(pointer) !== 'object') {
    prevContext.set(pointer, {})
  }
  const [nextContext, setNextContext] = useState(prevContext)
  const updatedContext = prevContext.createChildContext(pointer, nextContext)
  if (updatedContext !== nextContext) {
    setNextContext(updatedContext)
  }
  return <Context.Provider value={updatedContext}>
    {children}
  </Context.Provider>
}

const DirectEditorsContext = ({ children }) => {
  const contextRef = useRef(null)
  if (contextRef.current === null) {
    contextRef.current = new RootContext(defaultSettings)
  }
  return <Context.Provider value={contextRef.current}>
    {children}
  </Context.Provider>
}

export default DirectEditorsContext
