import { digest } from './util'

export function getHashFromFileId(value) {
  return value.split('#')[1]
}

export function getFileContent(context, fileId) {
  return context.get('~/files/' + getHashFromFileId(fileId) + '/content')
}

/**
 * @returns string - id of the file
 */
export async function addFile(context, content) {
  const hash = await digest(content)
  context.set('~/files/' + hash + '/content', content)
  const usages = context.get('~/files/' + hash + '/usages')
  context.set('~/files/' + hash + '/usages', (usages || 0) + 1)
  
  const [mimeType] = content.split(';', 2)
  return `${mimeType}#${hash}`
}

/**
 * @returns string[] - array of file ids
 */
export async function addFiles(context, filesArray) {
  return Promise.all(filesArray.map(x => addFile(context, x)))
}

export async function removeFile(context, fileId) {
  const hash = getHashFromFileId(fileId)
  const usages = context.get('~/files/' + hash + '/usages')
  if (usages <= 1) {
    // last use - remove
    context.set('~/files/' + hash, undefined)
  } else {
    context.set('~/files/' + hash + '/usages', (usages || 0) - 1)
  }
}

export async function removeFiles(context, fileIds) {
  return Promise.all(fileIds.map(x => removeFile(context, x)))
}
