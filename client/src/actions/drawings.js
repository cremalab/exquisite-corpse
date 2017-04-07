import { CALL_API, getJSON } from 'redux-api-middleware'
import {push} from 'react-router-redux'
import * as actionTypes from 'config/actionTypes'

export function loadDrawing(id) {
  return {
    [CALL_API]: {
      endpoint: `/drawings/${id}`,
      method: 'GET',
      types: [
        actionTypes.REQUEST_DRAWING,
        actionTypes.SUCCESS_DRAWING,
        actionTypes.FAILURE
      ],
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
        actionTypes.REQUEST_CREATE_DRAWING,
        actionTypes.SUCCESS_CREATE_DRAWING,
        actionTypes.FAILURE_DRAWING,
      ],
      credentials: 'include',
    },
  }).then(response => {
    dispatch(push(`/drawing/${response.payload.result._id}`))
  })
}

export function saveDrawing(drawingId, canvas) {
  return (dispatch) => dispatch({
    [CALL_API]: {
      endpoint: `/drawings/${drawingId}`,
      method: 'PUT',
      body: JSON.stringify({ canvas }),
      types: [
        actionTypes.REQUEST_SAVE_DRAWING,
        actionTypes.SUCCESS_SAVE_DRAWING,
        actionTypes.FAILURE_DRAWING
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
        actionTypes.REQUEST_CANCEL_DRAWING,
        actionTypes.SUCCESS_CANCEL_DRAWING,
        actionTypes.FAILURE_DRAWING,
      ],
      credentials: 'include',
    },
  }).then(() => {
    dispatch(push(`/`))
  })
}

export function commitDrawing(drawingId) {
  return (dispatch) => dispatch({
    [CALL_API]: {
      endpoint: `/drawings/${drawingId}/commit`,
      method: 'POST',
      types: [
        actionTypes.REQUEST_COMMIT_DRAWING,
        actionTypes.SUCCESS_COMMIT_DRAWING,
        actionTypes.FAILURE_DRAWING,
      ],
      credentials: 'include',
    },
  }).then(response => {
    dispatch(push(`/corpse/${response.payload.result._id}`))
  })
}

export function clearDrawing() {
  return {
    type: actionTypes.CLEAR_DRAWING,
  }
}
