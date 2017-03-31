import paperjs from 'paper'
import React, { Component } from 'react'
import canvasStyle from './canvasStyle'
import Button from 'react-bootstrap/lib/Button';

class Draw extends Component {

  constructor() {
    super()
    this.state = { paths: [] }
    this.paper = null
  }

  componentDidMount() {
    const { drawing } = this.props;
    const canvas = drawing.canvas;

    if (!this.paper) {
      const { canvas } = this.refs;
      this.paper = new paperjs.PaperScope();
      this.paper.setup(canvas);
      this.paper.view.play();
      this.forceUpdate();
    }

    if ( !this.tool ) {
      this.tool = new paperjs.Tool();
      this.tool.onMouseDown = this.onMouseDown.bind(this)
      this.tool.onMouseDrag = this.onMouseDrag.bind(this)
      this.tool.onMouseUp = this.onMouseUp.bind(this)
    }

    this.paper.project.importJSON(canvas)
  }

  render() {
    const {drawing} = this.props;
    const {paths} = this.state;

    return <div>
      <canvas ref="canvas" style={canvasStyle}>
        {this.state.paper ? this.props.children : false}
      </canvas>
      <div>
        <Button
          children="Undo"
          onTouchTap={() => this.undo()}
          disabled={paths.length <= 0}
        />
        <Button
          children="Save"
          onTouchTap={() => this.save()}
          disabled={paths.length <= 0}
        />
      </div>
    </div>
  }

  undo() {
    this.removePath()
  }

  save() {
    this.props.onSave(this.paper.project.exportJSON());
  }

  getCurrentPath() {
    const { paths } = this.state
    return paths.length > 0 ? paths[paths.length - 1] : undefined
  }

  addPath() {
    const { paths } = this.state
    const path = new this.paper.Path();
    path.strokeColor = 'black';
    path.strokeWidth = 2;
    paths.push(path);
    this.setState({ paths })
  }

  removePath() {
    const { paths } = this.state;
    const currentPath = this.getCurrentPath();
    if ( currentPath )
      currentPath.remove();

    paths.pop()

    this.setState({ paths })
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
  }
}

Draw.propTypes = {
  drawing: React.PropTypes.object,
  onSave: React.PropTypes.func,
}

export { Draw as default }
