const Robot = require('../robots/input');

describe('Input Robot', () => {
  it('text must be in english', () => {
    const lang = "en";
    const en = " Type your name: ";
    const pt = "Digite o seu nome: ";
    
    const text = Robot.selectTextByLanguage(lang, en, pt);
  
    expect(text).toBe(en);
  });
  it('text must be in pt', () => {
    const lang = "pt";
    const en = " Type your name: ";
    const pt = "Digite o seu nome: ";
    
    const text = Robot.selectTextByLanguage(lang, en, pt);
  
    expect(text).toBe(pt);
  });
});

