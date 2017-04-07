import React, { PropTypes, Component } from 'react'
import paperjs from 'paper'
import canvasStyle from './canvasStyle'
import Button from 'react-bootstrap/lib/Button'

class Surface extends Component {

  constructor() {
    super()
    this.paper = null
    this.state = {
      pathType: 'brush',
      pencil: {
        strokeWidth: 3,
        strokeColor: 'black',
        opacity: .5,
      },
      brush: {
        fillColor: 'black',
        opacity: 1,
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

    if (!this.paper) {
      this.paper = new paperjs.PaperScope()
      this.paper.setup(this.refs.canvas)
      this.paper.view.play()
      this.paper.project.clear()
      this.mainLayer = new this.paper.Layer({ name: 'drawing' })
      this.guideLayer = new this.paper.Layer({ name: 'guides' })
      this.forceUpdate()
    }
    if ( !this.tool && interactive ) {
      this.tool = new paperjs.Tool()
      this.tool.onMouseDown = this.onMouseDown.bind(this)
      this.tool.onMouseDrag = this.onMouseDrag.bind(this)
      this.tool.onMouseUp = this.onMouseUp.bind(this)
    }
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
    const { saving, height, interactive} = this.props
    const {pathType} = this.state
    const style = Object.assign(canvasStyle, { height })
    return <div>
      <canvas ref="canvas" style={style} />
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

  drawGuides() {
    function plotGuide(xCoord, dir) {
      return new paperjs.Path.Circle({
        center: [xCoord * 4, this.paper.view.bounds[dir]],
        radius: 5,
        fillColor: 'red',
      })
    }
    const { anchorPoints } = this.props.drawing
    const points = anchorPoints.top.map(x => plotGuide.bind(this)(x, 'top'))
      .concat(anchorPoints.bottom.map(x => plotGuide.bind(this)(x, 'bottom')))
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
      var top = event.middlePoint.add(step)
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
  width: PropTypes.string,
  height: PropTypes.string,
}

export { Surface as default }
