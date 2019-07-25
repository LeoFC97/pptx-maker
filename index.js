const robots = {
  input: require('./robots/input.js'),
  text: require('./robots/text.js'),
  state: require('./robots/state.js'),
  image: require('./robots/image.js'),
  powerpoint: require('./robots/powerpoint.js')
}

async function start() {
  robots.input.start()
  await robots.text.start()
  await robots.image.start()
  await robots.powerpoint.start()
}

start()