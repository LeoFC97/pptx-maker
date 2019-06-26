const pptx = require('pptxgenjs');
const state = require('./state.js')
const apresentation = new pptx();
apresentation.setLayout("LAYOUT_WIDE");


async function robot (){
    const content = state.load();
    await defineSettings(content);
    await createCoverSlide(content);
    await callCreatorSliders(content);
    await savePresentation(content);
    

    function defineSettings(content){
        apresentation.setAuthor("Robozinho");
        apresentation.setCompany("Associação de Robos Depressivos Anonimos - A.R.D.A");
        apresentation.setSubject(content.searchTerm);
        
        apresentation.setTitle(content.prefix + content.searchTerm);
    }

    function createCoverSlide(content){
        const date = new Date();
        const author ="Robozinho";
        const company="Associação de Robos Depressivos Anonimos - A.R.D.A";
        const coverSlide =  apresentation.addNewSlide();
        coverSlide.addText([{
            text:"This apresentation was made by AutoPPTX",
            options:{
                hyperlink:{url:'https://github.com/LeoFC97/pptx-maker', tooltip:'GitHub'}},
        }],
            {
                x:'25%',
                y:'90%',
                fontSize:20,
                bold:true,
                color:'363636',
            }
       );
       coverSlide.addText("Author:"+ author,{
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
        path:'assets/logo_transparent.png',
        
       });
    }
    function callCreatorSliders(content){
        let i;
        for(i=0;i<content.maximumSentences;i++)
        {
            createSliders(content,i);
        }
    }
    function createSliders(content,i){
        const slide=apresentation.addNewSlide();
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
            text:"This apresentation was made by AutoPPTX",
            options:{
                hyperlink:{url:'https://github.com/LeoFC97/pptx-maker', tooltip:'GitHub'}},
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
            x:9.95,
            y:4.35, 
            w:4,
            h:4, 
            path:'assets/logo_transparent.png',
           });
    }

   async function savePresentation(content){
       await console.log("saving presentation");
        apresentation.save(content.searchTerm);
    }
}



module.exports = robot