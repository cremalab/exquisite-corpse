import { CALL_API, getJSON } from 'redux-api-middleware'
import {push} from 'react-router-redux'
import {
  REQUEST_DRAWING,
  SUCCESS_DRAWING,
  FAILURE,
  REQUEST_CREATE_DRAWING,
  SUCCESS_CREATE_DRAWING,
  FAILURE_DRAWING,
  REQUEST_SAVE_DRAWING,
  SUCCESS_SAVE_DRAWING,
  REQUEST_CANCEL_DRAWING,
  SUCCESS_CANCEL_DRAWING,
  REQUEST_COMMIT_DRAWING,
  SUCCESS_COMMIT_DRAWING,
} from 'config/actionTypes'

export function loadDrawing(id) {
  return {
    [CALL_API]: {
      endpoint: `/drawings/${id}`,
      method: 'GET',
      types: [REQUEST_DRAWING, SUCCESS_DRAWING, FAILURE],
      credentials: 'include',
    },
  }
}

export function createDrawing(section) {
  return (dispatch) => dispatch({
    [CALL_API]: {
      endpoint: `/drawings`,
      method: 'POST',
      body: JSON.stringify({ section }),
      types: [
        REQUEST_CREATE_DRAWING,
        {
          type: SUCCESS_CREATE_DRAWING,
          payload: (action, state, res) => {
            getJSON(res).then(json => {
              dispatch(push(`/drawing/${json.result._id}`))
            })
            return res
          }
        },
        FAILURE_DRAWING
      ],
      credentials: 'include',
    },
  })
}

export function saveDrawing(drawingId, canvas) {
  return (dispatch) => dispatch({
    [CALL_API]: {
      endpoint: `/drawings/${drawingId}`,
      method: 'PUT',
      body: JSON.stringify({ canvas }),
      types: [
        REQUEST_SAVE_DRAWING,
        SUCCESS_SAVE_DRAWING,
        FAILURE_DRAWING
      ],
      credentials: 'include',
    },
  })
}

export function cancelDrawing(drawingId) {
  return (dispatch) => dispatch({
    [CALL_API]: {
      endpoint: `/drawings/${drawingId}`,
      method: 'DELETE',
      types: [
        REQUEST_CANCEL_DRAWING,
        {
          type: SUCCESS_CANCEL_DRAWING,
          payload: () => {
            return dispatch(push(`/`))
          }
        },
        FAILURE_DRAWING
      ],
      credentials: 'include',
    },
  })
}

export function commitDrawing(drawingId) {
  return (dispatch) => dispatch({
    [CALL_API]: {
      endpoint: `/drawings/${drawingId}/commit`,
      method: 'POST',
      types: [
        REQUEST_COMMIT_DRAWING,
        {
          type: SUCCESS_COMMIT_DRAWING,
          payload: (action, state, res) => {
            getJSON(res).then(json => {
              dispatch(push(`/corpse/${json.result._id}`))
              return res
            })
          }
        },
        FAILURE_DRAWING
      ],
      credentials: 'include',
    },
  })
}
