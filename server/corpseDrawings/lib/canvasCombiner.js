const Paper = require('paper')

const EXPORT_PADDING = 50

function getYpositions(arr) {
  return arr.reduce((mem, num, i) => {
    if (!mem.length) { return [].concat(0) }
    return mem.concat(arr[i - 1] + mem[i - 1])
  }, [])
}

function stitch(sections) {
  const project = new Paper.Project()
  sections.forEach((section) => {
    project.importJSON(section)
  })
  const positions = getYpositions(project.layers.map(l => l.bounds.height))

  project.layers.forEach((layer, i) => {
    layer.matrix.ty = 0
    layer.matrix.tx = 0
    layer.pivot = new Paper.Point(0, layer.bounds.top)
    const point = new Paper.Point(project.view.bounds.left, positions[i])
    layer.position = point
  })

  return {
    json: project.exportJSON(),
    project: combineLayers(project.layers, project, true).project,
  }
}

function combineLayers(layers, project, remove = true) {
  const master = new Paper.Layer({ name: 'master' })
  master.matrix.ty = 0
  master.matrix.tx = 0
  master.pivot = new Paper.Point(0, master.bounds.topLeft)
  master.position = new Paper.Point(0, 0)
  project.addLayer(master)

  layers.filter(l => l._name !== 'master')
    .forEach((l) => { l.copyTo(master); if (remove) { l.remove() } })

  const { width, height } = master.bounds
  project.view.viewSize = new Paper.Size(width + EXPORT_PADDING, height + EXPORT_PADDING)
  return master
}

function getDimensionsFromJSON(json) {
  const p = new Paper.Project()
  p.importJSON(json)
  const { height, width } = combineLayers(p.layers, p, false).bounds
  return { height, width }
}

function toSVG(canvas) {
  const project = new Paper.Project()
  project.importJSON(canvas)
  combineLayers(project.layers, project)
  return project.exportSVG({ asString: true })
}

module.exports = {
  stitch, getYpositions, toSVG, getDimensionsFromJSON, combineLayers,
}
