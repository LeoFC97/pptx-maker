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
    const lang = 'pt'
    const question = 'Digite o seu nome';
    const answ = 'Leonardo'
    const a = Robot.askAndReturnAuthor(lang);
    expect(a).toBe(question+answ);
  });
});
