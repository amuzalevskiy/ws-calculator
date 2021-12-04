import debug from 'debug'
export default class StateManager {
  _state = 'Entry'
  constructor(bus) {
    this.bus = bus
    this.debugPrefix = 'StateMgr:' + this.constructor.name
    
    // trigger entry state
    this._enterState()
  }

  get state() {
    return this._state
  }

  async setState(nextState) {
    if (this.transitionInProgress) {
      // DO NOT DELETE!
      throw new Error('Transition in progress')
    }
    this.transitionInProgress = true
    await this._exitState()
    await this._performTransition(nextState)
    this._state = nextState
    this.transitionInProgress = false
    await this._enterState()
  }

  async _performTransition(nextState) {
    const transitionName = 'transitionFrom' + this._state + 'To' + nextState

    debug(this.debugPrefix)(transitionName + 'Started')
    this.bus && this.bus.trigger(transitionName + 'Started')
    if (typeof this[transitionName] === 'function') {
      await this[transitionName](debug(this.debugPrefix + ':' + transitionName))
    } else {
      // DO NOT DELETE!
      throw new Error(`Transition from ${this._state} to ${nextState} is undefined`)
    }
    debug(this.debugPrefix)(transitionName + 'Finished')
    this.bus && this.bus.trigger(transitionName + 'Finished')
  }

  async _exitState() {
    const exitFn = 'exit' + this._state
    debug(this.debugPrefix)(exitFn + 'Started')
    this.bus && this.bus.trigger(exitFn + 'Started')
    if (typeof this[exitFn] === 'function') {
      await this[exitFn](debug(this.debugPrefix + ':' + exitFn))
    }
    debug(this.debugPrefix)(exitFn + 'Finished')
    this.bus && this.bus.trigger(exitFn + 'Finished')
  }

  async _enterState() {
    this.enterInProgress = true
    const enterFn = 'enter' + this._state
    debug(this.debugPrefix)(enterFn + 'Started')
    this.bus && this.bus.trigger(enterFn + 'Started')
    if (typeof this[enterFn] === 'function') {
      await this[enterFn](debug(this.debugPrefix + ':' + enterFn))
    }
    debug(this.debugPrefix)(enterFn + 'Finished')
    this.bus && this.bus.trigger(enterFn + 'Finished')
    this.enterInProgress = false
  }
}

window.TestStateManager = class TestStateManager extends StateManager {
  async enterEntry(log) {
    setTimeout(() => {
      this.setState('SpinWaiting')
    }, 5000)
  }

  /**
   * 1. render InitialScreen under loading
   * 2. fadeOut loading
   * 3. then remove loading
   */
  async transitionFromEntryToSpinWaiting(log) {
    log('TRANSITION')
  }
}

// const handleClick = () => {
//   let pr = stateMgr.setState('ReersRotation')
//   let spin = await makeSpinBE()
//   await pr
//   game.setSpin(spin)
//   if (game.hasTwoScattersBeforeLastReer) {
//     await stateMgr.setState('ReersStoppedWithScatters')
//   } else {
//     await stateMgr.setState('ReersStopped')
//   }

//   if (game.hasBonusGame) {
//     await stateMgr.setState('AllLinesAtOnceAnimation')
//     await stateMgr.setState('ScatterCombinationAnimation')
//     await stateMgr.setState('BonusSelectionScreen')
//   } else {
//     await stateMgr.setState('WinAnimation')
//   }
// }
