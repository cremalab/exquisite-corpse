import timeUpdate from './timeUpdate'

const timeStart = () => dispatch => {
  setInterval(() => {
    dispatch(timeUpdate(Date.now()))
  }, 1000)
}

export default timeStart
