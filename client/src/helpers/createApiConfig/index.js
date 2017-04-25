import mapObjIndexed from 'ramda/src/mapObjIndexed'

function createApiConfig(config) {
  return mapObjIndexed((value, key) => {
    return {
      ...value,
      INITIAL : `${key}_INITIAL`,
      SUCCESS : `${key}_SUCCESS`,
      FAIL    : `${key}_FAIL`,
    }
  }, config)
}

export default createApiConfig
