import corpseLoad from 'actions/corpseLoad'

const drawingLoad = (id, fetchCorpse) => (dispatch, getState, { api }) => dispatch(
  api.DRAWING_LOAD({
    params: { id },
    actions: {
      SUCCESS: payload => dispatch(corpseLoad(payload.result.corpse))
    }
  })
)

export default drawingLoad
