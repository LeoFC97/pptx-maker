const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const algorithmiaLang = require('../credentials/algorithmia.json').lang
const sentenceBoundaryDetection = require('sbd')

const watsonApiKey = require('../credentials/watson-nlu.json').apikey
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
 
const nlu = new NaturalLanguageUnderstandingV1({
  iam_apikey: watsonApiKey,
  version: '2018-04-05',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
})

const state = require('./state.js')

class Robot {

  async start() {
    console.log('> [text-robot] Starting...')
    const content = state.load()
  
    console.log('> [text-robot] Fetching content from Wikipedia')
    content.sourceContentOriginal = await this.fetchContentFromWikipedia(content.searchTerm, content.lang)
    console.log('> [text-robot] Fetching done!')

    content.sourceContentSanitized = this.sanitizeContent(content.sourceContentOriginal)
    content.sentences = this.breakContentIntoSentences(content.sourceContentSanitized)
    content.sentences = this.limitMaximumSentences(content.sentences, content.maximumSentences)

    console.log('> [text-robot] Starting to fetch keywords from Watson')
    content.sentences = await this.fetchKeywordsOfAllSentences(content.sentences)

    state.save(content)
  }

  async fetchContentFromWikipedia(articleName, lang) {
    const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
    const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')

    const wikipediaResponse = await wikipediaAlgorithm.pipe({
      lang,
      articleName
    })
    const wikipediaContent = wikipediaResponse.get()

    return wikipediaContent.content
  }

  sanitizeContent(sourceContentOriginal) {
    const withoutBlankLinesAndMarkdown = this.removeBlankLinesAndMarkdown(sourceContentOriginal)
    const withoutDatesInParentheses = this.removeDatesInParentheses(withoutBlankLinesAndMarkdown)
    return withoutDatesInParentheses
  }

  removeDatesInParentheses(text) {
    return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
  }

  removeBlankLinesAndMarkdown(text) {
    const allLines = text.split('\n')

    const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
      if (line.trim().length === 0 || line.trim().startsWith('='))
        return false

        return true
    })

      return withoutBlankLinesAndMarkdown.join(' ')
  }

  breakContentIntoSentences(sourceContentSanitized) {
    const contentSentences = []
    const sentences = sentenceBoundaryDetection.sentences(sourceContentSanitized)

    sentences.forEach((sentence) => {
      contentSentences.push({
        text: sentence,
        keywords: [],
        images: []
      })
    })

    return contentSentences
  }

  limitMaximumSentences(sentences, maximumSentences) {
    return sentences.slice(0, maximumSentences)
  }

  async fetchKeywordsOfAllSentences(sentences) {
    for (const sentence of sentences) {
      console.log(`> [text-robot] Sentence: "${sentence.text}"`)
      sentence.keywords = await this.fetchWatsonAndReturnKeywords(sentence.text)
      console.log(`> [text-robot] Keywords: ${sentence.keywords.join(', ')}\n`)
    }
    return sentences;
  }

  async fetchWatsonAndReturnKeywords(sentence) {
    return new Promise((resolve, reject) => {
      nlu.analyze({
        text: sentence,
        features: {
          keywords: {}
        }
      }, (error, response) => {
        if (error) {
          reject(error)
          return
        }

        const keywords = response.keywords.map((keyword) => {
          return keyword.text
        })

        resolve(keywords)
      })
    })
  }

}

module.exports = new Robot()
