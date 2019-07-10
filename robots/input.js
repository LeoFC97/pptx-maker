const readline = require('readline-sync')
const state = require('./state.js')

class Robot{
  async start(){
      const content = {
          maximumSentences: 7
      }
      content.lang = this.askAndReturnLanguage();
      content.author = this.askAndReturnAuthor(content.lang);
      content.searchTerm = this.askAndReturnSearchTerm(content.lag);
      content.font = this.askAndReturnFont() || 'Arial';
      content.prefix = this.askAndReturnPrefix();
      content.prefixLang = this.askAndReturnPrefixLang(content.prefix, content.lang);
      state.save(content)
  }
  selectTextByLanguage(lang, en, pt) {
    switch(lang) {
      case 'pt':
        return pt;
        break;
      default:
        return en;
    }
  }
  askAndReturnLanguage(){
    const language = ['pt','en']
    const selectedLangIndex = readline.keyInSelect(language,'Escolha o Idioma / Choose Language: ')
    const selectedLangText = language[selectedLangIndex]
    return selectedLangText
  }
  askAndReturnAuthor(lang) {
    let question = selectTextByLanguage(lang, 'Type your name: ', 'Digite o seu nome: ');
    return readline.question(question);
  }
   askAndReturnSearchTerm(lang) {
      let question = selectTextByLanguage(lang, 'Digite o termo a ser pesquisado na Wikipedia: ', 'Type a Wikipedia search term: ');
      return readline.question(question)
    }
   askAndReturnFont(){
    return readline.question('Type a font [Default: Arial]: ')
  }

   askAndReturnPrefix() {
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }

   askAndReturnPrefixLang(prefix, lang) {
    if(lang === 'en')
      return prefix

    if(lang === 'pt') {
      if(prefix === 'Who is')
        return 'Quem é'
      else if (prefix === 'What is')
        return 'O Que é'
      else
        return 'A História'
    }
  }
}



module.exports = new  Robot()
