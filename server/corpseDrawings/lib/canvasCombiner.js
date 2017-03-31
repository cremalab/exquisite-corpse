const Paper = require('paper')

function getYpositions(arr) {
  return arr.reduce((mem, num, i) => {
    if (!mem.length) { return [].concat(0) }
    return mem.concat(arr[i - 1] + mem[i - 1])
  }, [])
}

function stitch(sections) {
  const project = new Paper.Project()
  sections.forEach((section, i) => {
    project.importJSON(section)
  })


  const positions = getYpositions(project.layers.map(l => l.bounds.height))

  project.layers.forEach((layer, i) => {
    const { center } = layer.bounds
    const point = new Paper.Point(center, positions[i])
    layer.position = point
  })

  // console.log(`${project.exportJSON()}`);
  console.log(project.layers.map(l => l.position));
  return project.exportJSON()
}

module.exports = {
  stitch, getYpositions,
}
