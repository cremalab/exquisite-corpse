import React, { Component } from 'react'
import PropTypes from 'prop-types'
import paperjs from 'paper'
import { Point, Size, Layer } from 'paper'
import Box from 'react-boxen'
import Button from 'components/Button'
import { combineLayers } from '../../../../server/corpseDrawings/lib/canvasCombiner'

class Canvas extends Component {
  constructor() {
    super()
    this.paper = null
    this.state = {
      width: null,
      height: null,
    }
  }

  componentDidMount() {
    const { json } = this.props
    if (!this.paper) this.setupCanvas()
    if (json) {
      this.paper.project.importJSON(json)
      const { project, project: { layers } } = this.paper
      combineLayers(layers, project)
      layers.master.pivot = new Point(0, 0)
      layers.master.scale(0.95)
      this.setState({
        height: this.paper.view.bounds.height,
        width: this.paper.view.bounds.width,
      })
      const { view } = this.paper
      const rect = this.refs.canvas.getBoundingClientRect()
      const initialHeight = view.viewSize.height
      const initialWidth = view.viewSize.width
      this.paper.view.setViewSize(new Size(rect.width, rect.height))
      this.resize(null, initialWidth, initialHeight)
    }
  }

  resize(e, widthSetting, heightSetting) {
    const { view } = this.paper
    const { height } = view.viewSize
    if (heightSetting) {
      this.paper.view.zoom = height / heightSetting
      this.paper.view.center = new paperjs.Point(widthSetting/2, heightSetting/2)
    }

  }

  setupCanvas() {
    this.paper = new paperjs.PaperScope()
    this.paper.setup(this.refs.canvas)
    this.paper.view.play()
    this.paper.view.onResize = e => this.resize.bind(this)(e, this.state.width, this.state.height)
    this.forceUpdate()

  }

  render() {
    const { width } = this.props
    let widthAttr = '100%'
    if (width) { widthAttr = `${width}px` }
    return (
      <div>
        <canvas
          style={{width: widthAttr}}
          ref="canvas"
          data-paper-resize='true' />
      </div>
    )
  }
}

Canvas.propTypes = {
  json: PropTypes.string,
  width: PropTypes.number,
}

export { Canvas as default }
