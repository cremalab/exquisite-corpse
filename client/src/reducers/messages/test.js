import { transforms } from '.'
import * as A from 'config/actionTypes'

describe('Transforms', () => {
  it(A.MESSAGE_DISMISS, () => {
    const state  = { list: [{ id: 2 }] }
    const actual = transforms[A.MESSAGE_DISMISS](state, { id: 2 })
    const wanted = { list: [] }
    expect(actual).toEqual(wanted)
  })

  it(A.FAILURE_DRAWING, () => {
    const state  = { list: [] }
    const actual = transforms[A.FAILURE_DRAWING](state).list[0].message
    const wanted = 'No corpses need drawings. Create a new corpse!'
    expect(actual).toEqual(wanted)
  })
  
  it(A.SUCCESS_CORPSE_CREATE, () => {
    const state  = { list: [] }
    const actual = transforms[A.SUCCESS_CORPSE_CREATE](state).list[0].message
    const wanted = 'Corpse successfully created!'
    expect(actual).toEqual(wanted)
  })
})
