const readline = require('readline-sync')
const state = require('./state.js')

function robot() {
  const content = {
    maximumSentences: 7
  }

  content.author = askAndReturnAuthor();
  content.searchTerm = askAndReturnSearchTerm();
  content.lang = askAndReturnLanguage();
  content.font = askAndReturnFont() || 'Arial';
  content.prefix = askAndReturnPrefix();
  content.prefixLang = askAndReturnPrefixLang(content.prefix, content.lang);
  state.save(content)

  function askAndReturnSearchTerm() {
     return readline.question('Type a Wikipedia search term: ');
  }

  function askAndReturnAuthor(){
    return readline.question('Type your Name: ')
  }

  function askAndReturnLanguage(){
    const language = ['pt','en']
    const selectedLangIndex = readline.keyInSelect(language,'Choose Language: ')
    const selectedLangText = language[selectedLangIndex]
    return selectedLangText
  }

  function askAndReturnFont(){
    return readline.question('Type a font [Default: Arial]: ')
  }

  function askAndReturnPrefix() {
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }

  function askAndReturnPrefixLang(prefix, lang) {
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

module.exports = robot
