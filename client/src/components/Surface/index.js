import paperjs from 'paper'
import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button';

const WIDTH = 400;
const HEIGHT = 200;

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

  componentDidMount() {
    const { drawing, interactive } = this.props;
    const canvas = drawing.canvas;

    if (!this.paper) {
      this.paper = new paperjs.PaperScope();
      this.paper.setup(this.refs.canvas);
      this.paper.view.play();
      this.resize();
      this.paper.view.onResize = e => {
        this.resize();
      }
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

    this.mainLayer.importJSON(canvas)
    if (drawing.anchorPoints) { this.drawGuides() }
  }

  render() {
    const {drawing, saving, width, height, interactive} = this.props;
    const {pathType} = this.state
    const style = {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      height: height,
    }
    return <div style={{ paddingBottom: '50%', position: 'relative' }}>
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
          { saving && 'saving...'}
        </div>
        : null
      }
    </div>
  }

  resize() {
    const { view } = this.paper;
    const { width, height } = view.viewSize;
    const x = width / 2;
    const y = height / 2;
    const center = new paperjs.Point(x, y)
    this.paper.view.center = new paperjs.Point(WIDTH/2, HEIGHT/2);
    this.paper.view.zoom = width / WIDTH;
  }

  drawGuides() {
    function plotGuide(x, y) {
      //const topLeft = WIDTH * (x/100)
      //return new paperjs.Path.Rectangle({
      //  point: [topLeft, y],
      //  size: [3, 6],
      //  fillColor: 'red',
      //  opacity: .5,
      //})
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

  commit() {
    this.props.onCommit();
  }

  undo() {
    this.removeLastPath()
    this.save()
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

  removeLastPath() {
    const currentPath = this.getCurrentPath()
    if (currentPath) currentPath.remove();
  }

  onMouseDown(event) {
    const { pathType } = this.state
    const options = this.state[pathType];
    const path = new this.paper.Path(this.state[pathType]);
    path.add(event.point);
  }

  onMouseDrag(event) {
    const path = this.getCurrentPath()
    if ( this.state.pathType === 'brush' ) {
      const step = event.delta.divide(6);
      step.angle += 90;
      var top = event.middlePoint.add(step);
  	  var bottom = event.middlePoint.subtract(step);
      path.add(top);
      path.insert(0, bottom);
    } else {
      path.add(event.middlePoint);
    }
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
