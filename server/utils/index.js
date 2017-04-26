module.exports = {
  randomBetween(min, max) {
    return Math.floor((Math.random() * ((max - min) + 1)) + min)
  },
  canvasWidth: 100,
  pngSize: 300,
}
