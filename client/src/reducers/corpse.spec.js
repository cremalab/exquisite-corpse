import reducer, {initialState} from './corpse'
import * as types from 'config/actionTypes'

let storeData = initialState;
const payload = {
  result: { sections: ['1'] }
}

it('should start loading a corpse', () => {
  storeData = reducer(storeData, {type: types.REQUEST_CORPSE})
  expect(storeData.loading).toEqual(true)
})

it('should add a corpse payload', () => {
  storeData = reducer(storeData, {type: types.SUCCESS_CORPSE, payload})
  expect(storeData).toEqual({
    loading: false,
    sections: ['1']
  })
})
