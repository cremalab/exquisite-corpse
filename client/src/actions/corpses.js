import { CALL_API } from 'redux-api-middleware';

export function loadCorpses() {
  return {
    [CALL_API]: {
      endpoint: '/corpses',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS_CORPSES', 'FAILURE']
    }
  }
}

export function loadCorpse(id) {
  console.log(">>>", id)
  return {
    [CALL_API]: {
      endpoint: `/corpses/${id}`, //58cc32a4bbf3b742adf1bbb8'
      method: 'GET',
      types: ['REQUEST_CORPSE', 'SUCCESS_CORPSE', 'FAILURE']
    }
  }
}

export function createCorpse() {
  return {
    [CALL_API]: {
      endpoint: '/corpses',
      method: 'POST',
      types: ['REQUEST', 'SUCCESS', 'FAILURE'],
      body: JSON.stringify({
        "creator": "string",
        "sections": [
          {
            "description": "Head",
            "drawing": "string"
          },
          {
            "description": "Torso",
            "drawing": "string"
          }
        ]
      })
    }
  }
}
