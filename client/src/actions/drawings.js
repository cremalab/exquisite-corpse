import { CALL_API, getJSON } from 'redux-api-middleware'
import {push} from 'react-router-redux'

export function loadDrawing(id) {
  return {
    [CALL_API]: {
      endpoint: `/drawings/${id}`,
      method: 'GET',
      types: ['REQUEST_DRAWING', 'SUCCESS_DRAWING', 'FAILURE'],
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
        'REQUEST_CREATE_DRAWING',
        {
          type: 'SUCCESS_CREATE_DRAWING',
          payload: (action, state, res) => {
            getJSON(res).then(json => {
              dispatch(push(`/drawing/${json.result._id}`))
            });
            return res;
          }
        },
        'FAILURE_DRAWING'
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
        'REQUEST_SAVE_DRAWING',
        'SUCCESS_SAVE_DRAWING',
        'FAILURE_DRAWING'
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
        'REQUEST_SAVE_DRAWING',
        'SUCCESS_SAVE_DRAWING',
        'FAILURE_DRAWING'
      ],
      credentials: 'include',
    },
  })
}
