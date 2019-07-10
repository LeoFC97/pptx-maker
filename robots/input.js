const readline = require('readline-sync')
const state = require('./state.js')

class Robot{
  async start(){
      const content = {
          maximumSentences: 7
      }
      content.lang = this.askAndReturnLanguage();
      content.author = this.askAndReturnAuthor(content.lang);
      content.searchTerm = this.askAndReturnSearchTerm(content.lang);
      content.font = this.askAndReturnFont(content.lang) || 'Arial';
      content.prefix = this.askAndReturnPrefix(content.lang);
      state.save(content)
  }
  selectTextByLanguage(lang, textInEnglish, textInPortuguease) {
    switch(lang) {
      case "pt":
        return textInPortuguease;
      default:
        return textInEnglish;
    }
  }
  askAndReturnLanguage(){
    const language = ['pt','en']
    const selectedLangIndex = readline.keyInSelect(language,'Choose Language/ Escolha o Idioma: ')
    const selectedLangText = language[selectedLangIndex]
    return selectedLangText
  }
  askAndReturnAuthor(lang) {
    const question = this.selectTextByLanguage(lang, 'Type your name: ', 'Digite o seu nome: ');
    return readline.question(question);
  }
  askAndReturnSearchTerm(lang) { 
      const question = this.selectTextByLanguage(lang, 'Type a Wikipedia search term: ','Digite o termo a ser pesquisado na Wikipedia: ');
      return readline.question(question)
    }
  askAndReturnFont(lang){
    const question= this.selectTextByLanguage(lang,'Type a font [Default: Arial]: ', 'Digite uma fonte[Padrao: Arial]: ')
    return readline.question(question)
  }

   askAndReturnPrefix(lang) {
    let prefixes=[]
    const question = this.selectTextByLanguage(lang,'Chose one option: ', 'Escolha uma opcao')
    if(lang==='pt'){
      prefixes = ['Quem e', 'O que e', 'A Historia de']
    }
    else if(lang==='en'){
      prefixes = ['Who is', 'What is', 'The history of']
    }
    const selectedPrefixIndex = readline.keyInSelect(prefixes, question)
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }
}



module.exports = new  Robot()
