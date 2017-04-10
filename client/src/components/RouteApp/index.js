import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Box from 'react-boxen'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

// Route Components
import RouteCorpses from 'components/RouteCorpses'
import RouteCorpse from 'components/RouteCorpse'
import RouteDrawing from 'components/RouteDrawing'
import RouteHome from 'components/RouteHome'

class RouteApp extends Component {
  render() {
    return (
      <Box height="100%">
        <Box
          padding="20px"
          style={{
            backgroundColor: '#0A93C4',
            color: 'white'
          }}
        >
          <header><Link to="/">Scribble Corpse</Link></header>
        </Box>
        <Box>
          <Route exact path="/welcome" component={RouteHome}/>
          <Route exact path="/" component={RouteCorpses}/>
          <Route path="/corpse/:corpseId" component={RouteCorpse}/>
          <Route path="/drawing/:drawingId" component={RouteDrawing}/>
        </Box>
      </Box>
    )
  }
}

export default connect()(RouteApp)
