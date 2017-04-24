import { generate } from 'shortid'
import {
  REQUEST_INITIAL,
  REQUEST_SUCCESS,
  REQUEST_FAILURE
} from 'config/actionTypes'

const action = type => resource => data => ({
  type,
  payload: { id: generate(), resource, data }
})

export const requestInitial = action(REQUEST_INITIAL)
export const requestSuccess = action(REQUEST_SUCCESS)
export const requestFailure = action(REQUEST_FAILURE)
