const { remote } = require("electron");

const robots = {
  input: require('./robots/input.js'),
  text: require('./robots/text.js'),
  state: require('./robots/state.js'),
  image: require('./robots/image.js'),
  powerpoint: require('./robots/powerpoint.js')
}

var inputs = {
  lang: "",
  name: "",
  term: "",
  font: "",
  option: ""
}

function makeInputsAndPpt(){
  inputs.lang = document.getElementById("selectLang").value
  inputs.name = document.getElementById("inputName").value
  inputs.term = document.getElementById("inputTerm").value
  inputs.font = document.getElementById("inputFont").value
  inputs.option = document.getElementById("inputOption").value
  start()
}

/*
Comentado até a implementação do front-end
document.getElementById("btnDoPpt").addEventListener("click", () => {
  makeInputsAndPpt();
});

document.getElementById("close").addEventListener("click", () => {
  remote.BrowserWindow.getFocusedWindow().close();
});

document.getElementById("minimize").addEventListener("click", () => {
  remote.BrowserWindow.getFocusedWindow().minimize();
});

document.getElementById("maximize").addEventListener("click", () => {
  remote.BrowserWindow.getFocusedWindow().maximize();
});
*/

async function start() {
  robots.input.start()
  await robots.text.start()
  await robots.image()
  await robots.powerpoint()
}

start()