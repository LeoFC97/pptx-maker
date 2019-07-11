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
      content.font = this.askAndReturnFont(content.lang);
      content.prefix = this.askAndReturnPrefix(content.lang);
      
      state.save(content)
  }

  selectTextByLanguage(lang, textInEnglish, textInPortuguese) {
    switch(lang) {
      case "pt":
        return textInPortuguese;
      default:
        return textInEnglish;
    }
  }

  askAndReturnLanguage(){
    const language = ['pt','en']
    const selectedLangIndex = readline.keyInSelect(language, 'Choose Language/ Escolha o Idioma: ', { cancel: false })
    const selectedLangText = language[selectedLangIndex]
    return selectedLangText
  }

  askAndReturnAuthor(lang) {
    const question = this.selectTextByLanguage(lang, 'Type your name: ', 'Digite o seu nome: ');
    let response;

    while(!response)
      response = readline.question(question);

    return response;
  }
  askAndReturnSearchTerm(lang) { 
    const question = this.selectTextByLanguage(lang, 'Type a Wikipedia search term: ','Digite o termo a ser pesquisado na Wikipedia: ');
    let response;

    while(!response)
      response = readline.question(question);

    return response;
  }

  askAndReturnFont(lang){
    const question = this.selectTextByLanguage(lang, 'Type a font [Default: Arial]: ', 'Digite uma fonte [Padrao: Arial]: ')
    return readline.question(question) || 'Arial';
  }

   askAndReturnPrefix(lang) {
    const question = this.selectTextByLanguage(lang,'Chose one option: ', 'Escolha uma opcao')
    const prefixes = this.selectTextByLanguage(lang, ['Who is', 'What is', 'The history of'], ['Quem e', 'O que e', 'A Historia de']);

    const selectedPrefixIndex = readline.keyInSelect(prefixes, question, { cancel: false })
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }
}



module.exports = new Robot()
