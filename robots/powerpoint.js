const pptx = require('pptxgenjs');
const state = require('./state.js')
const apresentation = new pptx();
apresentation.setLayout("LAYOUT_WIDE");


async function robot (){

    const content = state.load();
    const pathForLogoTransparent = 'assets/logo_transparent.png'
    const repUrl = "https://github.com/LeoFC97/pptx-maker";
    let autoPptxText;

    if(content.lang === 'en')
      autoPptxText = "This slide show was made using AutoPPTX";
    else
      autoPptxText = "Essa apresentação foi feita usando AutoPPTX";

    await defineSettings(content);
    await createCoverSlide(content);
    await callCreatorSliders(content);
    await createbibliographySlide(content);
    await savePresentation(content);
    

    function defineSettings(content){
        apresentation.setAuthor("Robozinho");
        apresentation.setCompany("Associação de Robos Depressivos Anonimos - A.R.D.A");
        apresentation.setSubject(content.searchTerm);
        
        apresentation.setTitle(content.prefix + content.searchTerm);
    }

    function createCoverSlide(content){

        const date = new Date();
        const company="Associação de Robos Depressivos Anonimos - A.R.D.A";
        const coverSlide =  apresentation.addNewSlide();

        coverSlide.addImage({
            path:'content/0-original.png',
            x: 0,
            y: 0,
            w: '100%',
            h: '100%',
        });

        coverSlide.addShape(apresentation.shapes.RECTANGLE,
        	{ x: 0,
        	  y: 0,
        	  w: '100%',
        	  h: '100%',
        	  fill: {
        	  	type: 'solid',
        	  	color: '000000',
        	  	alpha: 25
        	  } });

        coverSlide.addText([{
            text:autoPptxText,
            options:{
                hyperlink:{url:repUrl, tooltip:'GitHub'}},
        	}],
            {
                x:'25%',
                y:'90%',
                fontSize:20,
                bold:true,
                color:'ffffff',
                fontFace: content.font
            }
       );

       let madeText = 'Made by';

       if(content.lang === 'pt')
       	madeText = 'Feito por';

       coverSlide.addText(`${madeText} ${content.author}`,{
        x: 0,
        y: 0.3,
        w: '100%',
        font:20,
        color:'ffffff',
        bold:true,
        align: 'center',
        fontFace: content.font
       });

       coverSlide.addText(`${content.prefix}\n${content.searchTerm}`,{
           x: 0,
           y: 0,
           w: '100%',
           h: '100%',
           margin: 35,
           align: 'center',
           fontSize:48,
           bold:true,
           color:'ffffff',
           fontFace: content.font
       });

       coverSlide.addImage({
            path:pathForLogoTransparent,
            hyperlink:{url:repUrl, tooltip:'GitHub'},
            x:11.2,
            y:5.4, 
            w:2.5,
            h:2.5,
       });
    }
    function callCreatorSliders(content){
        let i=0;
        for(i=0;i<content.maximumSentences;i++)
        {
            createSliders(content,i);
        }
    }
    function createSliders(content,i){
        const slide=apresentation.addNewSlide();
        slide.addImage({
            path:'content/'+[i]+'-original.png',
            x: 0,
            y: 0,
            w: '100%',
            h: '100%',
        });

        slide.addShape(apresentation.shapes.RECTANGLE,
        	{ x: 0,
        	  y: 0,
        	  w: '100%',
        	  h: '100%',
        	  fill: {
        	  	type: 'solid',
        	  	color: '000000',
        	  	alpha: 25
        	  } });

        slide.addImage({
            path:pathForLogoTransparent,
            x:11.2,
            y:5.4, 
            w:2.5,
            h:2.5,
            hyperlink:{url:repUrl, tooltip:'GitHub'},
        });

        slide.addText([{
            text:content.sentences[i].title,
        }],
            {
                x:0,
                y:0.5,
                w: '100%',
                align: 'center',
                fontSize:25,
                bold:true,
                color:'ffffff',
                fontFace: content.font
            }
       );

       slide.addText([{
            text:content.sentences[i].text,
        }],
        {
            x:0,
            y:0,
            w: '100%',
            h: '100%',
            align: 'center',
            font:15,
            color:'ffffff',
            bold: true,
            margin: 16,
            fontFace: content.font
        });
    }

    function createbibliographySlide(content){
        const slide = apresentation.addNewSlide();
        let referencesText = 'References';

        if(content.lang === 'pt')
        	referencesText = 'Referências';

        slide.addText([{
            text: referencesText,
        }],
            {
                x:0,
                y:0.5,
                w: '100%',
                align: 'center',
                fontSize:25,
                bold:true,
                color:'000000',
                fontFace: content.font
            }
       );
        
        slide.addImage({
            path:pathForLogoTransparent,
            x:11.2,
            y:5.4, 
            w:2.5,
            h:2.5,
            hyperlink:{url:repUrl, tooltip:'GitHub'},
        });

        slide.addText([{
            text:autoPptxText,
            options:{
                hyperlink:{url:repUrl, tooltip:'GitHub'}},
        }],
            {
                x:'25%',
                y:'90%',
                fontSize:18,
                bold:true,
                color:'363636',
                fontFace: content.font
            }
       );

       let i=0;
       const wikipediaUrl=`https://${content.lang}.wikipedia.org/wiki/${content.searchTerm}`;
       
           slide.addText([{
               text:wikipediaUrl,
               options:{
                   hyperlink:{url:wikipediaUrl, tooltip:'Wikipedia'}
                },
           }],
           {
                x:1.5,
                y:1.3,
                fontSize:18,
                bold:true,
                color:'696969',
                fontFace: content.font
            }
           );

           for(i=0;i<content.downloadedImages.length;i++){
               let spaceBetweenLines = i/2;
               slide.addText([{
                    text:content.downloadedImages[i],
                    options:{
                        hyperlink:{url:content.downloadedImages[i],tooltip:'downloadedImage'}
                    },
                }],
                {
                    x:1.5,
                    y:1.8+spaceBetweenLines,
                    fontSize:10,
                    fontFace: content.font,
                    color: '696969'
                }
                );
           }
        }


   async function savePresentation(content){
        apresentation.save(content.searchTerm);
    }
}



module.exports = robot