import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import initialize from 'actions/initialize'
import RouteCorpses from 'components/RouteCorpses'
import RouteCorpse from 'components/RouteCorpse'
import RouteDrawing from 'components/RouteDrawing'
import RouteHome from 'components/RouteHome'
import RouteCreateCorpse from 'components/RouteCreateCorpse'
import RouteMessagesGlobal from 'components/RouteMessagesGlobal'
import LayoutMain from 'components/LayoutMain'
import Scroll from 'components/Scroll'
import { css } from 'glamor'

const styles = {
  sidebarWrapper: css({
    display: 'flex',
    flexGrow: 1
  })
}

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
    if (!currentUser) return null

    return (
      <LayoutMain
        back={location.pathname !== '/' && <a href='#' onClick={this.handleBack}>{`< Back`}</a>}
        title="Exquisite Corpse"
        content={
          <Scroll grow='1'>
            <div>
              <Route exact path="/welcome" component={RouteHome}/>
              <Route exact path="/" component={RouteCorpses}/>
              <Route path="/create" component={RouteCreateCorpse} />
              <Route path="/corpse/:corpseId" component={RouteCorpse}/>
              <Route path="/drawing/:drawingId" component={RouteDrawing}/>
            </div>
          </Scroll>
        }
        sidebar={
          <div {...styles.sidebarWrapper}>
            <Route exact path="/" component={RouteMessagesGlobal} />
          </div>
        }
      />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps)(RouteApp)
