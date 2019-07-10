const Robot = require('../robots/input');

describe('Input Robot', () => {

  it ('selected lang must be pt', ()=>{
    const language= ['pt','en']
    const selectedLangIndex = 0
    const selectedLangText = language[selectedLangIndex]
    expect(selectedLangText).toBe('pt')
  });
  
  it ('selected lang must be en', ()=>{
    const language= ['pt','en']
    const selectedLangIndex = 1
    const selectedLangText = language[selectedLangIndex]
    expect(selectedLangText).toBe('en')
  });
  it('text must be in EN', () => {
    const lang = "en";
    const en = " Type your name: ";
    const pt = "Digite o seu nome: ";
    
    const text = Robot.selectTextByLanguage(lang, en, pt);
  
    expect(text).toBe(en);
  });
  it('text must be in PT', () => {
    const lang = "pt";
    const en = " Type your name: ";
    const pt = "Digite o seu nome: ";
    
    const text = Robot.selectTextByLanguage(lang, en, pt);
  
    expect(text).toBe(pt);
  });
  it('Question about search term must be in EN', () => {
    const lang = "pt";
    const en = 'Type a Wikipedia search term: ';
    const pt = 'Digite o termo a ser pesquisado na Wikipedia: ';
    
    const text = Robot.selectTextByLanguage(lang, en, pt);
  
    expect(text).toBe(pt);
  });
});

