const speechToken = document.querySelector('.speech')
const search = document.querySelector('.search')

speechToken.addEventListener('click',()=>{
    let recog = new webkitSpeechRecognition();
    recog.lang = "ar-SA";
    recog.onresult = (eve)=>{
        search.value = eve.results[0][0].transcript;
    }
    recog.start()
})