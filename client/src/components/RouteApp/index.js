import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import initialize from 'actions/initialize'
import RouteCorpses from 'components/RouteCorpses'
import RouteCorpse from 'components/RouteCorpse'
import RouteDrawing from 'components/RouteDrawing'
import RouteHome from 'components/RouteHome'
import RouteCreateCorpse from 'components/RouteCreateCorpse'
import RouteDrawingSidebar from 'components/RouteDrawingSidebar'
import RouteMessagesGlobal from 'components/RouteMessagesGlobal'
import LayoutMain from 'components/LayoutMain'
import Back from 'components/Back'
import styled from 'styled-components'
import { push } from 'react-router-redux'

const RoutesContainer = styled.div`
  flex-grow: 1;
  display: flex;
`

class RouteApp extends Component {
  componentWillMount() {
    this.props.initialize()
    this.handleBack = this.handleBack.bind(this)
  }

  handleBack(e) {
    e.preventDefault()

    const { location, push, drawing } = this.props
    const pathCorpse  = location.pathname.match('/corpse/')
    const pathDrawing = location.pathname.match('/drawing/')
    const isCorpse    = pathCorpse && pathCorpse.length > 0 ? true : false
    const isDrawing   = pathDrawing && pathDrawing.length > 0 ? true : false
    const corpseId    = drawing.result.corpse

    if(isCorpse) {
      push('/')
    } else if(isDrawing) {
      push(`/corpse/${corpseId}`)
    }
  }

  render() {
    const { currentUser, location } = this.props
    if (!currentUser) return null
    const notRoot = location.pathname !== '/'

    return (
      <LayoutMain
        back={ <Back visible={notRoot} onClick={this.handleBack} /> }
        title="Exquisite Corpse"
        content={
          <RoutesContainer data-scroll data-grow>
            <Route exact path="/welcome" component={RouteHome}/>
            <Route exact path="/" component={RouteCorpses}/>
            <Route path="/create" component={RouteCreateCorpse} />
            <Route path="/corpse/:corpseId" component={RouteCorpse}/>
            <Route path="/drawing/:drawingId" component={RouteDrawing}/>
          </RoutesContainer>
        }
        sidebar={
          <RoutesContainer data-grow>
            <Route exact path="/" component={RouteMessagesGlobal} />
            <Route exact path="/drawing/:drawingId" component={RouteDrawingSidebar} />
            <Route exact path="/corpse/:corpseId" component={RouteMessagesGlobal} />
          </RoutesContainer>
        }
      />
    )
  }
}

RouteApp.propTypes = {
  currentUser: PropTypes.object,
  drawing: PropTypes.object,
  initialize: PropTypes.func,
  location: PropTypes.object,
  push: PropTypes.func,
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  drawing: state.drawing
})

export default connect(mapStateToProps, { initialize, push, })(RouteApp)
