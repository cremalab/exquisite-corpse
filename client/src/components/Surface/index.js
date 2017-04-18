import React, { Component } from 'react'
import PropTypes from 'prop-types'
import paperjs, { Rectangle, Path, Point, Size, Group } from 'paper'
import { Resizable, ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'

const WIDTH = 400
const HEIGHT = 200

class Surface extends Component {

  constructor() {
    super()
    this.paper = null
    this.state = {
      resizable: true,
      pathType: 'brush',
      eraser: {
        fillColor: 'white',
        opacity: 1,
        blendMode: 'destination-out'
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
    if (canvas) this.mainLayer.importJSON(canvas)
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
    const { saving, height, width, interactive, drawing} = this.props
    const {pathType} = this.state
    const style = {
      width: width || '100%',
      height: height || '',
      backgroundColor: 'white',
      margin: '0 auto',
      display: 'block',
    }
    if (drawing.anchorPoints) { this.drawGuides() }
    return <div style={{ width: 'auto' }}>
      { interactive ?
        <ResizableBox width={500} height={250} onResize={this.resize.bind(this)} onResizeStop={this.save.bind(this)}>
          <canvas ref="canvas" style={style} />
        </ResizableBox>
        :
        <canvas ref="canvas" style={style} data-paper-resize={this.state.resizable} />
      }
      { interactive ?
        <div>
          <button
            type="button"
            children="Undo"
            onClick={() => this.undo()}
          />
          <button
            type="button"
            children="Commit"
            onClick={() => this.commit()}
          />
          <button
            type="button"
            disabled={ pathType === 'brush' }
            onTouchTap={() => this.setState({ pathType: 'brush' })}
          >Draw</button>
          <button
            type="button"
            disabled={ pathType === 'eraser' }
            onTouchTap={() => this.setState({ pathType: 'eraser' })}
          >Eraser</button>
          <button
            type="button"
            onClick={() => this.cancel()}
          >Cancel</button>
          { saving && 'saving...'}
        </div>
        : null
      }
    </div>
  }

  resize(e, data) {
    const { view } = this.paper
    const { width } = view.viewSize
    view.viewSize = new Size(data.size.width, data.size.height)
    view.center = new Point(data.size.width/2, data.size.height / 2)
    view.zoom = width / data.size.width
    this.drawGuides()
  }

  setupCanvas() {
    this.paper = new paperjs.PaperScope()
    this.paper.setup(this.refs.canvas)
    this.paper.view.play()
    this.paper.project.clear()
    if (this.props.interactive) {
      // this.resize(null, { size: { height: HEIGHT, width: WIDTH }})
      // this.paper.view.onResize = e => this.handleViewResize(e)
    }
    this.mainLayer = new this.paper.Layer({ name: 'drawing' })
    this.guideLayer = new this.paper.Layer({ name: 'guides' })
    this.mainLayer.matrix.ty = 0
    this.mainLayer.matrix.tx = 0
    this.guideLayer.matrix.ty = 0
    this.forceUpdate()
  }


  makeInteractive() {
    this.tool = new paperjs.Tool()
    this.tool.onMouseDown = this.onMouseDown.bind(this)
    this.tool.onMouseDrag = this.onMouseDrag.bind(this)
    this.tool.onMouseUp = this.onMouseUp.bind(this)
  }

  drawGuides() {
    if (!this.guideLayer) return
    this.guideLayer.clear()
    function plotGuide(x, y) {
      return new paperjs.Path.Circle({
        center: [WIDTH * (x/100), y],
        radius: 5,
        fillColor: 'red',
        opacity: .5,
      })
    }
    const { anchorPoints } = this.props.drawing
    const { height } = this.paper.view.viewSize
    const points = anchorPoints.top.map(x => plotGuide.bind(this)(x, 0))
      .concat(anchorPoints.bottom.map(x => plotGuide.bind(this)(x, height)))
    this.guideLayer.addChildren(points)
    this.guideLayer.sendToBack()
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
    return this.paper && this.paper.project ? this.paper.project.activeLayer.children || [] : []
  }

  removeLastPath() {
    const currentPath = this.getCurrentPath()
    if (currentPath) currentPath.remove()
  }

  onMouseDown(event) {
    const { pathType } = this.state
    const path = new this.paper.Path(this.state[pathType])
    path.add(event.point)
  }

  onMouseDrag(event) {
    const path = this.getCurrentPath()
    const step = event.delta.divide(6)
    step.angle += 90
    var top = event.middlePoint.add(step).subtract(1)
    var bottom = event.middlePoint.subtract(step)
    path.add(top)
    path.insert(0, bottom)
  }

  onMouseUp() {
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
