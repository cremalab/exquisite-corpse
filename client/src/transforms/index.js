import { over, propEq, reject, append, lensProp } from 'ramda'

const propList = lensProp('list')

export const listItemRemoveById = (x, y) =>
  over(propList, reject(propEq('id', y)), x)

export const listItemAppendWith = f => (x, y) =>
  over(propList, append(f(y)), x)
