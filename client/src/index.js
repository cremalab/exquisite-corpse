import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const rootElement = document.getElementById('root')
ReactDOM.render( <Root />, rootElement )
