import React, { PropTypes, Component } from 'react'
import paperjs from 'paper'
import Button from 'react-bootstrap/lib/Button'

const WIDTH = 400
const HEIGHT = 200

class Surface extends Component {

  constructor() {
    super()
    this.paper = null
    this.state = {
      pathType: 'brush',
      pencil: {
        strokeWidth: 2,
        strokeColor: 'black',
        opacity: 1,
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
    const { saving, height, width, interactive} = this.props
    const {pathType} = this.state
    const style = {
      width: width || '100%',
      height: height || '100%',
      backgroundColor: 'white',
    }
    return <div style={{ paddingBottom: '50%', position: 'relative', maxWidth: '1200px' }}>
      <canvas ref="canvas" style={style} data-paper-resize={true} />
      { interactive ?
        <div>
          <Button
            type="button"
            children="Undo"
            onTouchTap={() => this.undo()}
          />
          <Button
            type="button"
            children="Commit"
            onTouchTap={() => this.commit()}
          />
          <Button
            type="button"
            onTouchTap={() => this.setState({ pathType: pathType === 'brush' ? 'pencil' : 'brush' })}
          >Draw With: { pathType }</Button>
          <Button
            type="button"
            onTouchTap={() => this.cancel()}
          >Cancel</Button>
          { saving && 'saving...'}
        </div>
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
    this.mainLayer = new this.paper.Group({ name: 'drawing' })
    this.guideLayer = new this.paper.Group({ name: 'guides' })
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
    const points = anchorPoints.top.map(x => plotGuide.bind(this)(x, 0))
      .concat(anchorPoints.bottom.map(x => plotGuide.bind(this)(x, HEIGHT)))
    this.guideLayer.addChildren(points)
    this.guideLayer.sendToBack()
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
    if ( this.state.pathType === 'brush' ) {
      const step = event.delta.divide(6)
      step.angle += 90
      var top = event.middlePoint.add(step).subtract(1)
      var bottom = event.middlePoint.subtract(step)
      path.add(top)
      path.insert(0, bottom)
    } else {
      path.add(event.middlePoint)
    }
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
