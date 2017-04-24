import React, { Component } from 'react'
import PropTypes from 'prop-types'
import paperjs from 'paper'
import Box from 'react-boxen'
import Button from 'components/Button'

const WIDTH = 400
const HEIGHT = 200

class Surface extends Component {

  constructor() {
    super()
    this.paper = null
    this.state = {
      pathType: 'brush',
      eraser: {
        strokeColor: 'transparent',
        opacity: 1,
        blendMode: 'destination-out',
        strokeWidth: 5,
      },
      brush: {
        fillColor: 'black',
        opacity: .5,
      }
    }
  }

  componentWillMount() {
    if (!this.paper) return
    this.paper.clear()
    this.paper.projects.forEach(p => {
      p.clear()
      p.view.remove()
      p.remove()
    })
    this.paper = null
  }

  componentDidMount() {
    const { drawing, interactive } = this.props
    const canvas = drawing.canvas
    if (!this.paper) this.setupCanvas()
    if ( !this.tool && interactive ) this.makeInteractive()
    console.log('didmOunt');
    // console.log(canvas);
    if (canvas && this.paper) {
      this.mainLayer.clear()
      this.mainLayer.importJSON(canvas)
    }
    if (drawing.anchorPoints) { this.drawGuides() }
  }

  componentWillUnmount() {
    this.paper.projects.forEach(p => {
      p.clear()
      p.view.remove()
      p.remove()
    })
    this.paper = null
  }

  render() {
    const { saving, drawing, interactive} = this.props
    const height = drawing && drawing.size ? drawing.size.height : HEIGHT
    const width = drawing && drawing.size ? drawing.size.width : WIDTH
    const {pathType} = this.state
    const style = {
      width: width || '100%',
      height: height || '100%',
      backgroundColor: 'white',
      margin: '0 auto',
      display: 'block',
    }
    console.log('render');
    console.log(this.paper && this.mainLayer.bounds);
    return <div style={{ width: 'auto' }}>
      <canvas ref="canvas" style={style} data-paper-resize={true} />
      { interactive ?
        <Box
          padding='10px'
          childDirection='row'
          childSpacing='10px'>
          <Button
            type="button"
            children="Undo"
            onClick={() => this.undo()}
          />
          <Button
            type="button"
            children="Commit"
            onClick={() => this.commit()}
          />
          <Button
            type="button"
            disabled={ pathType === 'brush' }
            onClick={() => this.setState({ pathType: 'brush' })}
          >Draw</Button>
          <Button
            grow
            type="button"
            disabled={ pathType === 'eraser' }
            onClick={() => this.setState({ pathType: 'eraser' })}
          >Eraser</Button>
          <Button
            skin='tertiary'
            type="button"
            onClick={() => this.cancel()}
          >Cancel</Button>
          { saving && 'saving...'}
        </Box>
        : null
      }
    </div>
  }

  resize() {
    const { view } = this.paper
    if (this.props.height && this.props.width) { return }
    const { width, height } = view.viewSize
    this.paper.view.center = new paperjs.Point(WIDTH/2, HEIGHT/2)
    this.paper.view.zoom = width / WIDTH
  }

  setupCanvas() {
    this.paper = new paperjs.PaperScope()
    this.paper.setup(this.refs.canvas)
    this.paper.view.play()
    this.paper.project.clear()
    if (this.props.interactive) {
      this.resize()
      this.paper.view.onResize = e => this.resize(e)
    }
    this.mainLayer = new this.paper.Layer({ name: 'drawing' })
    this.guideLayer = new this.paper.Layer({ name: 'guides' })
    this.forceUpdate()
  }

  makeInteractive() {
    this.tool = new paperjs.Tool()
    this.tool.onMouseDown = this.onMouseDown.bind(this)
    this.tool.onMouseDrag = this.onMouseDrag.bind(this)
    this.tool.onMouseUp = this.onMouseUp.bind(this)
  }

  drawGuides() {
    function plotGuide(x, y) {
      return new paperjs.Path.Circle({
        center: [WIDTH * (x/100), y],
        radius: 5,
        fillColor: 'red',
        opacity: .5,
      })
    }
    const { anchorPoints } = this.props.drawing
    this.guideLayer.activate()
    const points = anchorPoints.top.map(x => plotGuide(x, 0))
      .concat(anchorPoints.bottom.map(x => plotGuide(x, HEIGHT)))
    this.guideLayer.addChildren(points)
    this.guideLayer.sendToBack()
    this.guideLayer.blendMode = 'destination-over'
    if(this.mainLayer)
      this.mainLayer.activate()
  }

  cancel() {
    this.props.onCancel()
  }

  commit() {
    this.props.onCommit()
  }

  undo() {
    this.removeLastPath()
    this.save()
  }

  save() {
    this.props.onSave(this.mainLayer.exportJSON())
  }

  getCurrentPath() {
    const paths = this.allPaths()
    return paths[paths.length - 1]
  }

  allPaths() {
    return this.paper && this.paper.project ? this.mainLayer.children || [] : []
  }

  removeLastPath() {
    const currentPath = this.getCurrentPath()
    if (currentPath) currentPath.remove()
  }

  onMouseDown(event) {
    const { pathType } = this.state
    this.mainLayer.activate()
    const path = this.mainLayer.addChild(new this.paper.Path(this.state[pathType]))
    path.add(event.point)
  }

  onMouseDrag(event) {
    this.mainLayer.activate()
    const path = this.getCurrentPath()
    if (this.state.pathType === 'eraser') {
      return path.add(event.point)
    }
    const step = event.delta.divide(6)
    step.angle += 90
    var top = event.middlePoint.add(step).subtract(1)
    var bottom = event.middlePoint.subtract(step)
    path.add(top)
    path.insert(0, bottom)
  }

  onMouseUp() {
    this.mainLayer.activate()
    this.getCurrentPath().simplify()
    this.save()
  }
}

Surface.propTypes = {
  drawing: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onCommit: PropTypes.func,
  interactive: PropTypes.bool,
  saving: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
}

export { Surface as default }
