import React, { Component } from 'react'
import corpsesLoadAll from 'actions/corpsesLoadAll'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {
  Deck,
  Slide,
  Image,
} from 'spectacle'
import styled from 'styled-components'

const Background = styled.div`
  position: absolute;
  background: radial-gradient(ellipse at center, #ffffff 60%, #cccccc 100%);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

const AuthorName = styled.div`
  font-size: 16px;
  color: #999;
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
`

class RouteCorpseSlideshow extends Component {

  componentDidMount() {
    const { corpsesLoadAll } = this.props
    corpsesLoadAll()
    setInterval(() => corpsesLoadAll(), 10000)
  }

  render() {
    const { result } = this.props.corpses

    if ( !result ) return null
    
    return (
      <div>
        <Background />
        <Deck 
          transitionDuration={500} 
          autoplay 
          autoplayDuration={5000} 
          contentHeight={1000}
          contentWidth={1000}
          progress="bar"
        >
          {
            result.map(({ svgUrl }) => {
              return (
                <Slide 
                  transition={['fade']} 
                  bgColor="transparent"
                >
                  {/* <AuthorName>{ creator.name }</AuthorName> */}
                  <Image src={svgUrl} height="100vh" width="100vw" />
                </Slide>
              )
            })
          }
        </Deck>
      </div>
    )
  }
}

RouteCorpseSlideshow.propTypes = {
  corpses: PropTypes.array,
  corpsesLoadAll: PropTypes.func,
}

RouteCorpseSlideshow.defaultProps = {
  corpses: [],
}

function mapStateToProps(state) {
  return {
    corpses: state.corpses,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    corpsesLoadAll,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteCorpseSlideshow)