import mapObjIndexed from 'ramda/src/mapObjIndexed'

function createApiConfig(config, prefix = '@@API/') {
  return mapObjIndexed((value, key) => {
    return {
      ...value,
      INITIAL : `${prefix}${key}_INITIAL`,
      SUCCESS : `${prefix}${key}_SUCCESS`,
      FAILURE : `${prefix}${key}_FAILURE`,
    }
  }, config)
}

export default createApiConfig
