const pptx = require('pptxgenjs');
const state = require('./state.js')
const apresentacao = new pptx();
const content = state.load();


// TESTE DE ALTERAÇÃO
// TESTE DE ALTERAÇÃO
// TESTE DE ALTERAÇÃO
// TESTE DE ALTERAÇÃO



async function robot (){
    
    const content = state.load();

    apresentacao.setAuthor("Robozinho");
    apresentacao.setCompany("Associação de Robos Depressivos Anonimos - A.R.D.A");
    apresentacao.setSubject(content.searchTerm);
    apresentacao.setTitle(content.prefix + content.searchTerm);

    await criarSlideDeCapa(content);
    await salvarApresentacao(content);


    async function criarSlideDeCapa(content){
        console.log('eu')
        const slideCapa =  apresentacao.addNewSlide();
        slideCapa.addText("This PowerPoint was using by AutoPPTX",{
        x:'30%',
        y:'90%',
        //hyperlink:{url:"https://github.com"},
        fontSize:10,
        bold:true,
        color:'363636',
       });
       slideCapa.addText(content.prefix +"\n"+content.searchTerm,{
           x:'20%',
           y:'30%',
           fontSize:32,
           bold:true,
           color:'363636'
       });
    }

    async function salvarApresentacao(content){
        apresentacao.save(content.searchTerm);

    }
}



module.exports = robot