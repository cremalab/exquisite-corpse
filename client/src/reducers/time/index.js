import factory from 'redux-factory'
import { merge } from 'ramda'
import { TIME_UPDATE } from 'config/actionTypes'
import { distanceInWords } from 'date-fns'

const initialState = {
  tick: 0,
  date: 0,
}

const transforms = {
  [TIME_UPDATE]: (state, date) => merge(state, {
    tick: state.tick + 1,
    date
  })
}

export default factory(initialState, transforms, false).reducer

export const getTimeAgo = state => time =>
  distanceInWords(time, state.time.date, { includeSeconds: true })
