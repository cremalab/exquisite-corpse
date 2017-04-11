import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Box from 'react-boxen'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import initialize from 'actions/initialize'
import RouteCorpses from 'components/RouteCorpses'
import RouteCorpse from 'components/RouteCorpse'
import RouteDrawing from 'components/RouteDrawing'
import RouteHome from 'components/RouteHome'

class RouteApp extends Component {
  componentWillMount() {
    this.props.dispatch(initialize())
  }

  render() {
    const { currentUser} = this.props

    if (!currentUser) return null

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
        <div>
          <Route exact path="/welcome" component={RouteHome}/>
          <Route exact path="/" component={RouteCorpses}/>
          <Route path="/corpse/:corpseId" component={RouteCorpse}/>
          <Route path="/drawing/:drawingId" component={RouteDrawing}/>
        </div>
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps)(RouteApp)
