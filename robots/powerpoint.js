const fs = require('fs');
const pptx = require('pptxgenjs');
const state = require('./state.js');

const pathForLogoTransparent = 'assets/logo_transparent.png';
const repUrl = 'https://github.com/LeoFC97/pptx-maker';

class Robot {
  async start() {
    const content = state.load();
    const { author, prefix, searchTerm, lang, font, maximumSentences, downloadedImages, sentences } = content;
    const presentation = new pptx();

    presentation.setLayout('LAYOUT_WIDE');

    this.defineSettings(presentation, author, prefix, searchTerm);
    this.createCoverSlide(presentation, author, prefix, searchTerm, lang, font);
    await this.callCreatorSliders(presentation, maximumSentences, sentences, font);
    this.createReferencesSlide(presentation, searchTerm, downloadedImages, lang, font);
    this.savePresentation(presentation, searchTerm);
    await this.clearContentImages(maximumSentences);
  }

  defineSettings(presentation, author, prefix, searchTerm) {
    presentation.setAuthor(author);
    presentation.setCompany('PPTX Maker');
    presentation.setSubject(searchTerm);
    presentation.setTitle(`${prefix} ${searchTerm}`);
  }

  createCoverSlide(presentation, author, prefix, searchTerm, lang, font) {
    const company = 'PPTX Maker';
    let coverSlide =  presentation.addNewSlide();

    this.insertBackgroundImage(coverSlide, 'content/0-original.png');
    this.insertOpacityBackground(coverSlide, presentation.shapes.RECTANGLE);
    this.insertLogo(coverSlide);
    this.insertCredits(coverSlide, lang, font);
    this.insertAuthor(coverSlide, author, lang, font);
  }

  async callCreatorSliders(presentation, maximumSentences, sentences, font) {
    let i = 0;

    for(i = 0; i < maximumSentences; i++) {
      const photoExists = await this.verifyIfImageExists(`content/${i}-original.png`);
      const imageUrl = photoExists ? `content/${i}-original.png` : `content/0-original.png`;
      this.createSlide(presentation, imageUrl, sentences[i].title, sentences[i].text, font);
    }
  }

  createSlide(presentation, backgroundUrl, title, text, font) {
    const slide = presentation.addNewSlide();

    this.insertBackgroundImage(slide, backgroundUrl);
    this.insertOpacityBackground(slide, presentation.shapes.RECTANGLE);
    this.insertLogo(slide);
    this.insertSlideTitle(slide, title, font);
    this.insertSlideText(slide, text, font);
  }

  createReferencesSlide(presentation, searchTerm, downloadedImages, lang, font) {
    const slide = presentation.addNewSlide();

    this.insertLogo(slide);
    this.insertCredits(slide, lang, font);
    this.insertReferencesTitle(slide, lang, font);
    this.insertWikipediaURL(slide, lang, searchTerm, font);
    this.insertImagesURL(slide, downloadedImages, font);
  }


  savePresentation(presentation, searchTerm) {
    presentation.save(searchTerm);
  }

  async clearContentImages(maximumSentences) {
    let i = 0;

    for(i = 0; i < maximumSentences; i++) {
      await this.removeImage(`content/${i}-original.png`);
    }
  }



  insertBackgroundImage(slide, path) {
    slide.addImage({
      path,
      x: 0,
      y: 0,
      w: '100%',
      h: '100%',
    });
  }
 
  insertOpacityBackground(slide, RECTANGLE) {
    slide.addShape(RECTANGLE,
      { x: 0,
        y: 0,
        w: '100%',
        h: '100%',
        fill: {
          type: 'solid',
          color: '000000',
          alpha: 25
        }
    });
  }

  insertLogo(slide) {
    slide.addImage({
      path: pathForLogoTransparent,
      hyperlink: {url: repUrl, tooltip: 'GitHub'},
      x: 11.2,
      y: 5.4, 
      w: 2.5,
      h:2.5,
    });
  }

  insertCredits(slide, lang, font) {
    const creditsText = this.selectTextByLanguage(lang, 'his slide show was made using AutoPPTX', 'Essa apresentação foi feita usando AutoPPTX');

    slide.addText([{
      text: creditsText,
      options: { hyperlink:{url:repUrl, tooltip:'GitHub'} }}],
      {
        x:'25%',
        y:'90%',
        fontSize:20,
        bold:true,
        color:'ffffff',
        fontFace: font
    });
  }

  insertAuthor(slide, author, lang, font) {
    const madeText = this.selectTextByLanguage(lang, 'Made by', 'Feito por'); 

    slide.addText(`${madeText} ${author}`, {
      x: 0,
      y: 0.3,
      w: '100%',
      font: 20,
      color: 'ffffff',
      bold: true,
      align: 'center',
      fontFace: font
    });    
  }

  insertPresentationTitle(slide, prefix, searchTerm, font) {
    slide.addText(`${prefix}\n${searchTerm}`,{
      x: 0,
      y: 0,
      w: '100%',
      h: '100%',
      margin: 35,
      align: 'center',
      fontSize: 48,
      bold: true,
      color: 'ffffff',
      fontFace: font
    });
  }

  insertSlideTitle(slide, title, font) {
    slide.addText([{ text: title }], {
      x: 0,
      y: 0.5,
      w: '100%',
      align: 'center',
      fontSize: 25,
      bold: true,
      color: 'ffffff',
      fontFace: font
    });   
  }

  insertReferencesTitle(slide, lang, font) {
    const referencesText = this.selectTextByLanguage(lang, 'References', 'Referências');

    slide.addText([{ text: referencesText }], {
      x: 0,
      y: 0.5,
      w: '100%',
      align: 'center',
      fontSize: 25,
      bold: true,
      color: '000000',
      fontFace: font
    });
  }

  insertSlideText(slide, text, font) {
    slide.addText([{ text }], {
      x: 0,
      y: 0,
      w: '100%',
      h: '100%',
      align: 'center',
      font: 15,
      color:'ffffff',
      bold: true,
      margin: 16,
      fontFace: font
    });    
  }

  insertWikipediaURL(slide, lang, searchTerm, font) {
    const wikipediaUrl = `https://${lang}.wikipedia.org/wiki/${searchTerm}`;
       
    slide.addText([{
      text: wikipediaUrl,
      options: {hyperlink:{url: wikipediaUrl, tooltip: 'Wikipedia'}},
    }], {
      x: 1.5,
      y: 1.3,
      fontSize: 18,
      bold: true,
      color: '696969',
      fontFace: font
    });
  }

  insertImagesURL(slide, downloadedImages, font) {
    let i = 0;

    for(i = 0; i < downloadedImages.length; i++) {
      let spaceBetweenLines = i/2;
    
      slide.addText([{
        text: downloadedImages[i],
        options: {hyperlink:{url: downloadedImages[i],tooltip: 'downloadedImage'}},
      }], {
        x: 1.5,
        y: 1.8 + spaceBetweenLines,
        fontSize: 10,
        fontFace: font,
        color: '696969'
      });
    }   
  }

  selectTextByLanguage(lang, textInEnglish, textInPortuguese) {
    switch(lang) {
      case "pt":
        return textInPortuguese;
      default:
        return textInEnglish;
    }
  }

  verifyIfImageExists(imageUrl) {
    return new Promise((next, reject) => {
      fs.readFile(imageUrl, err => {
        if(err)
          next(false);
        else
          next(true);
      });
    });
  }

  removeImage(imageUrl) {
    return new Promise((next, reject) => {
      fs.unlink(imageUrl, next);
    });
  }  
}



module.exports = new Robot();