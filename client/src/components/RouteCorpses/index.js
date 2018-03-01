import React from 'react'
import PropTypes from 'prop-types'
import corpsesLoad from 'actions/corpsesLoad'
import drawingsLoad from 'actions/drawingsLoad'
import statusChange from 'actions/statusChange'
import uiModalOpen from 'actions/uiModalOpen'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Spinner from 'react-md-spinner'
import Box from 'react-boxen'
import ItemCorpse from 'components/ItemCorpse'
import ItemDrawing from 'components/ItemDrawing'
import ModalHelp from 'components/ModalHelp'
import propTypesCorpse from 'propTypes/Corpse'
import {push} from 'react-router-redux'
import { isBefore } from 'date-fns'
import drawingCreate from 'actions/drawingCreate'
import Button from 'components/Button'
import Icon from 'components/Icon'
import spacing from 'config/spacing'
import colors from 'config/colors'

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
      uiModalOpen,
      activeModal,
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
      <ModalHelp isOpen={ activeModal === 'help' } />
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
        <Box grow>
          <h2>
            Lobby
            <span
              style={{ color: colors.primary }}
              onClick={() => uiModalOpen('help')}>
              <Icon glyph='help' size={'0.8em'} />
            </span>
          </h2>
        </Box>
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
        <Box>
          <Button
            prefix={<Icon glyph='logout' />}>
            <a href='/logout' style={{textDecoration: 'none', color: 'white'}} >Logout</a>
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
        { pagination.previous > 0 &&
          <Button
            grow
            onClick={() => this.props.corpsesLoad(pagination.previous)}
            skin='tertiary'
            prefix={<Icon glyph='back'/>}
          >Previous</Button>
        }
        { pagination.next > 0 &&
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
  uiModalOpen: PropTypes.func,
  activeModal: PropTypes.string,
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
    activeModal: state.ui.activeModal,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    corpsesLoad,
    drawingsLoad,
    drawingCreate,
    statusChange,
    push,
    uiModalOpen,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Corpses)
