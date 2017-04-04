import paperjs from 'paper'
import React, { Component } from 'react'
import canvasStyle from './canvasStyle'
import Button from 'react-bootstrap/lib/Button';

class Surface extends Component {

  constructor() {
    super()
    this.paper = null
  }

  componentDidMount() {
    const { drawing, interactive } = this.props;
    const canvas = drawing.canvas;

    if (!this.paper) {
      const { canvas } = this.refs;
      this.paper = new paperjs.PaperScope();
      this.paper.setup(canvas);
      this.paper.view.play();
      this.mainLayer = new this.paper.Layer({ name: 'drawing' })
      this.guideLayer = new this.paper.Layer({ name: 'guides' })
      this.forceUpdate();
    }
    if ( !this.tool && interactive ) {
      this.tool = new paperjs.Tool();
      this.tool.onMouseDown = this.onMouseDown.bind(this)
      this.tool.onMouseDrag = this.onMouseDrag.bind(this)
      this.tool.onMouseUp = this.onMouseUp.bind(this)
    }

    this.paper.project.importJSON(canvas)
    if (drawing.anchorPoints) { this.drawGuides() }
  }

  render() {
    const {drawing, saving, width, height, interactive} = this.props;
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

  undo() {
    this.removePath()
  }

  commit() {
    this.props.onCommit();
  }

  save() {
    this.props.onSave(this.mainLayer.exportJSON());
  }

  getCurrentPath() {
    const paths = this.allPaths()
    return paths[paths.length - 1]
  }

  allPaths() {
    return this.paper && this.paper.project ? this.paper.project.activeLayer.children || [] : []
  }

  addPath() {
    const path = new this.paper.Path();
    path.strokeColor = 'black';
    path.strokeWidth = 2;
  }

  removePath() {
    const currentPath = this.getCurrentPath()
    if (currentPath) currentPath.remove();
  }

  onMouseDown(event) {
    this.addPath();
  }

  onMouseDrag(event) {
    const path = this.getCurrentPath()
    path.add(event.point);
  }

  onMouseUp(event) {
    this.getCurrentPath().simplify();
    this.save()
  }
}

Surface.propTypes = {
  drawing: React.PropTypes.object,
  onSave: React.PropTypes.func,
  onSave: React.PropTypes.func,
  onCommit: React.PropTypes.func,
  interactive: React.PropTypes.bool,
}

export { Surface as default }
