import React from 'react'
import PropTypes from 'prop-types'
import corpsesLoad from 'actions/corpsesLoad'
import drawingsLoad from 'actions/drawingsLoad'
import statusChange from 'actions/statusChange'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Spinner from 'react-md-spinner'
import Box from 'react-boxen'
import ItemCorpse from 'components/ItemCorpse'
import ItemDrawing from 'components/ItemDrawing'
import propTypesCorpse from 'propTypes/Corpse'
import {push} from 'react-router-redux'
import { isBefore } from 'date-fns'
import drawingCreate from 'actions/drawingCreate'
import Button from 'components/Button'
import Icon from 'components/Icon'
import spacing from 'config/spacing'

class Corpses extends React.Component {
  componentDidMount() {
    this.props.corpsesLoad()
    this.props.drawingsLoad('incomplete')
    this.props.statusChange('idle')
  }
  render() {
    const {
      drawingCreate,
      push,
      corpses: { result: corpses, loading: corpsesLoading, pagination },
      drawings: { result: drawings, loading: drawingsLoading }
    } = this.props

    if (corpsesLoading === true) return <Spinner />

    return (<Box
      css={`
        transform: translate3d(0,0,0);
      `}
      padding={spacing[6]}
      childSpacing={spacing[6]}
    >
      { drawings.length && <Box childSpacing={spacing[6]}>
        <h3>Your unfinished drawings</h3>
        <Box
          grow
          shrink
          childDirection="row"
          childWrap="wrap"
          childWrapLastGrow={false}
          childSpacing={spacing[4]}
          childBasis="400px"
          childGrow
          childShrink
        >
          { drawingsLoading ? <Spinner /> : drawings.map(d => (
            <ItemDrawing key={d._id} drawing={d} data-shrink data-grow />
          ) )}
        </Box>
      </Box> }
      <Box
        childAlign="center"
        childDirection="row"
        childSpacing={spacing[6]}
        childWrap='wrap'
      >
        <Box grow><h2>Lobby</h2></Box>
        <Box>
          <Button
            prefix={<Icon glyph='draw' />}
            onClick={() => drawingCreate()}>
            Draw
          </Button>
        </Box>
        <Box>
          <Button
            prefix={<Icon glyph='newCorpse' />}
            onClick={() => push('/create')}>
            Create Corpse
          </Button>
        </Box>
      </Box>
      <Box
        grow
        shrink
        childDirection="row"
        childWrap="wrap"
        childWrapLastGrow={false}
        childSpacing={spacing[6]}
        childBasis="300px"
        childGrow
        childShrink
      >
        { corpses.sort((a, b) => {
          if (isBefore(a.createdAt, b.createdAt)) return 1
          return -1
        }).map(corpse =>
          <ItemCorpse key={corpse._id} corpse={corpse} />
        )}
      </Box>
      <Box childDirection='row' childJustify='flex-end'>
        { pagination.previous &&
          <Button
            grow
            onClick={() => this.props.corpsesLoad(pagination.previous)}
            skin='tertiary'
            prefix={<Icon glyph='back'/>}
          >Previous</Button>
        }
        { pagination.next &&
          <div data-grow='true' style={{textAlign: 'right'}}>
            <Button
              onClick={() => this.props.corpsesLoad(pagination.next)}
              skin='tertiary'
              suffix={<Icon glyph='forward'/>}
            >More Corpses</Button>
          </div>
        }
      </Box>
    </Box>)
  }
}

Corpses.propTypes = {
  corpsesLoad: PropTypes.func,
  drawingsLoad: PropTypes.func,
  drawingCreate: PropTypes.func,
  statusChange: PropTypes.func,
  push: PropTypes.func,
  corpses: PropTypes.shape({
    result: PropTypes.arrayOf(PropTypes.shape(propTypesCorpse))
  }),
  drawings: PropTypes.shape({
    result: PropTypes.arrayOf(PropTypes.object)
  })
}

Corpses.defaultProps = {
  corpses: {
    result: [],
    loading: false
  },
  drawings: {
    result: [],
    loading: false
  }
}

function mapStateToProps(state) {
  return {
    corpses: state.corpses,
    drawings: state.drawings,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    corpsesLoad,
    drawingsLoad,
    drawingCreate,
    statusChange,
    push
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Corpses)
