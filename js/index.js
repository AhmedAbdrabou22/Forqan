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
nav_item.forEach((nav) => {
    nav.addEventListener('click', () => {
        nav_item.forEach((nav) => {
            nav.style.borderBottom = "none"
        })
        nav.style.borderBottom = '1px solid';
    })
})



let content = document.querySelector('.content');
console.log(content);

fetch('http://api.alquran.cloud/v1/quran/quran-uthmani')
    .then(response => response.json())
    .then(data => {
        console.log(data.data.surahs.length);
        content.innerHTML = "";
        for (let i = 0; i <= data.data.surahs.length; i++) {
            content.innerHTML += `
            <div class="surah">
            <div class="d-flex">
                <div class="diamond">
                    <p>${i+1}</p>
                </div>
                <div class="text_surah">
                    <p>${data.data.surahs[i].name}</p>
                </div>
            </div>
        </div>`
        }
    })