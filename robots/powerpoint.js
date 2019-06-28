const pptx = require('pptxgenjs');
const state = require('./state.js')
const apresentation = new pptx();
apresentation.setLayout("LAYOUT_WIDE");


async function robot (){

    const content = state.load();
    const pathForLogoTransparent = 'assets/logo_transparent.png'
    const repUrl = "https://github.com/LeoFC97/pptx-maker";
    const autoPptxText = "This slide show was made using AutoPPTX";

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
                color:'363636',
            }
       );
       coverSlide.addText("Author:"+ content.author,{
        x:'50%',
        y:'45%',
        font:20,
        color:'363636',
       });
       coverSlide.addText(content.prefix +"\n"+content.searchTerm,{
           x:'20%',
           y:'30%',
           fontSize:32,
           bold:true,
           color:'363636'
       });
       coverSlide.addText(date.getUTCFullYear()+'/'+(date.getUTCMonth()+1)+'/'+date.getUTCDate(),{
        x:'55%',
        y:'50%',
        fontSize:12,
        //italic:true,
        bold:true,
        color:'363636'
    });
       coverSlide.addImage({
        x:9.95,
        y:4.35, 
        w:4,
        h:4, 
        path:pathForLogoTransparent,
        
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
            path:pathForLogoTransparent,
            x:9.95,
            y:4.35, 
            w:4,
            h:4, 
        });
        slide.addText([{
            text:content.sentences[i].googleSearchQuery,
        }],
            {
                x:1.6,
                y:0.5,
                fontSize:25,
                bold:true,
                color:'363636',
            }
       );
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
            }
       );
       slide.addText([{
            text:content.sentences[i].text,
            options:{
                align:'right'
           }
        }],
        {
            x:2.8,
            y:2.0,
            font:13,
            color:'363636',
        });
        slide.addImage({
            path:'content/'+[i]+'-original.png',
            x:1.50,
            y:3.20,
            w:3.0,
            h:3.0,
        });
    }
    function createbibliographySlide(content){
        const slide = apresentation.addNewSlide();
        slide.addImage({
            path:pathForLogoTransparent,
            x:9.95,
            y:4.35, 
            w:4,
            h:4, 
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
            }
       );
       let i=0;
       const wikipediaUrl='https://en.wikipedia.org/wiki/'+content.searchTerm;
           slide.addText([{
               text:wikipediaUrl,
               options:{
                   hyperlink:{url:wikipediaUrl, tooltip:'Wikipedia'}
                },
           }],
           {
                x:1,
                y:0,
                fontSize:18,
                bold:true,
                color:'363636',
            }
           );
           for(i=0;i<content.maximumSentences;i++){
               let spaceBetweenLines = i/2;
               slide.addText([{
                    text:content.downloadedImages[i],
                    options:{
                        hyperlink:{url:content.downloadedImages[i],tooltip:'downloadedImage'}
                    },
                }],
                {
                    x:1,
                    y:1+spaceBetweenLines,
                    fontSize:8,
                }
                );
           }
        }


   async function savePresentation(content){
        apresentation.save(content.searchTerm);
    }
}



module.exports = robot