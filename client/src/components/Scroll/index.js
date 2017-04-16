import React from 'react'
import { css } from 'glamor'

const scroll = css({
  position: 'relative',
  display: 'flex',
  flexGrow: 1,
  height: '100%',
  width: '100%',
})

const scrollPane = css({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'auto',
  overflowX: 'hidden',
  scrollBehavior: 'smooth',
  transform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden'
})

const scrollPaneContent = props => css({
  position: 'relative',
  display: 'table',
  tableLayout: 'fixed',
  borderSpacing: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  verticalAlign: props.align ? props.align : 'top',
  transform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden'
})

const scrollPaneContentPosition = css({
  display: 'table-cell',
  width: '100%',
  verticalAlign: 'inherit',
})

const Scroll = props =>
  <div { ...scroll } >
    <div { ...scrollPane } >
      <div { ...scrollPaneContent(props) } >
        <div { ...scrollPaneContentPosition } >
          { props.children }
        </div>
      </div>
    </div>
  </div>

export default Scroll
