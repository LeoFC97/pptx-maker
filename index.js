const robots = {
  input: require('./robots/input.js'),
  text: require('./robots/text.js'),
  state: require('./robots/state.js'),
  image: require('./robots/image.js'),
  powerpoint: require('./robots/powerpoint.js')
}

async function start() {
 // robots.input()
 // await robots.text()
  //await robots.image()
  await robots.powerpoint()
}

start()
