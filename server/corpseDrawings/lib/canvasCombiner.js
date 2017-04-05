const Paper = require('paper')

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
    const { center } = layer.bounds
    layer.pivot = new Paper.Point(0, layer.bounds.top)
    const point = new Paper.Point(0, positions[i])
    layer.position = point
  })

  return project.exportJSON()
}

function toSVG(canvas) {
  const project = new Paper.Project()
  project.importJSON(canvas)
  return project.exportSVG({ asString: true })
}

module.exports = {
  stitch, getYpositions, toSVG,
}
