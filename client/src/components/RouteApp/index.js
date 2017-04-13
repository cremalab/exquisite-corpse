import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import initialize from 'actions/initialize'
import RouteCorpses from 'components/RouteCorpses'
import RouteCorpse from 'components/RouteCorpse'
import RouteDrawing from 'components/RouteDrawing'
import RouteHome from 'components/RouteHome'
import LayoutMain from 'components/LayoutMain'
import Box from 'react-boxen'

class RouteApp extends Component {
  componentWillMount() {
    this.props.dispatch(initialize())
    this.handleBack = this.handleBack.bind(this)
  }

  handleBack(e) {
    e.preventDefault()
    this.props.history.goBack()
  }

  render() {
    const { currentUser, location } = this.props

    console.log(this.props)

    if (!currentUser) return null

    return (
      <LayoutMain
        back={location.pathname !== '/' && <a href='#' onClick={this.handleBack}>{`< Back`}</a>}
        title="Exquisite Corpse"
        content={
          <div>
            <Route exact path="/welcome" component={RouteHome}/>
            <Route exact path="/" component={RouteCorpses}/>
            <Route path="/corpse/:corpseId" component={RouteCorpse}/>
            <Route path="/drawing/:drawingId" component={RouteDrawing}/>
          </div>
        }
        sidebar='Sidebar'
      />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps)(RouteApp)
