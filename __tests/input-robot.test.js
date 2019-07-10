const Robot = require('../robots/input');

describe('Input Robot', () => {

  it('Should ask and return Language PT', () => {
    const language = ['pt','en']
    const selectedLangIndex = 0;
    const selectedLangText = language[selectedLangIndex]
    expect(selectedLangText).toBe('pt');
  });
  it('Should ask and return Language EN', () => {
    const language = ['pt','en']
    const selectedLangIndex = 1;
    const selectedLangText = language[selectedLangIndex]
    expect(selectedLangText).toBe('en');
  });
  it('Should question Author name in PTBR', () =>{
    Robot.setText('Digite o seu nome: ')
    expect(Robot.getText()).toBe('Digite o seu nome: ');
  });
  it('Should question Author name in EN', () =>{
    Robot.setText('Type your name: ')
    expect(Robot.getText()).toBe('Type your name: ');
  });
});
