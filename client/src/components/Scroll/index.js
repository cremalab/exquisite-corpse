import React from 'react'
import styled from 'styled-components'

const Scroll = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`

const ScrollPane = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  ${''/* transform: translate3d(0, 0, 0); */}
  ${''/* backface-visibility: hidden; */}
`

const ScrollPaneContent = styled.div`
  position: relative;
  display: table;
  tableLayout: fixed;
  borderSpacing: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  vertical-align: ${props => props.align ? props.align : 'top'};
  ${''/* transform: translate3d(0, 0, 0); */}
  ${''/* backfaceVisibility: hidden; */}
`

const ScrollPaneContentPosition = styled.div`
  display: table-cell;
  width: 100%;
`

const Component = props =>
  <Scroll>
    <ScrollPane>
      <ScrollPaneContent {...props}>
        <ScrollPaneContentPosition>
          { props.children }
        </ScrollPaneContentPosition>
      </ScrollPaneContent>
    </ScrollPane>
  </Scroll>

export default Component
