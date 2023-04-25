const speechToken = document.querySelector('.speech')
const search = document.querySelector('.search')

speechToken.addEventListener('click', () => {
    let recog = new webkitSpeechRecognition();
    recog.lang = "ar-SA";
    recog.onresult = (eve) => {
        search.value = eve.results[0][0].transcript;
    }
    recog.start()
})


let nav_item = document.querySelectorAll('.nav-item');
nav_item.forEach((nav)=>{
    nav.addEventListener('click',()=>{
        nav_item.forEach((nav)=>{
        nav.style.borderBottom = "none"
    })
        nav.style.borderBottom = '1px solid';
    })
})



fetch('http://api.alquran.cloud/v1/quran/quran-uthmani')
    .then(response => response.json())
    .then(data => {
        // console.log(data.data.surahs[0].ayahs[0].text);
    })