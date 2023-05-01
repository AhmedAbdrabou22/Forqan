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
// console.log(content);

fetch('http://api.alquran.cloud/v1/quran/quran-uthmani')
    .then(response => response.json())
    .then(data => {
        // console.log(data.data.surahs.length);
        content.innerHTML = "";
        for (let i = 0; i <= data.data.surahs.length; i++) {
            content.innerHTML += `
            <div class="surah" onclick="fun(${data.data.surahs[i].number})">
            <div class="d-flex">
                <div class="diamond">
                    <p>${i + 1}</p>
                </div>
                <div class="text_surah">
                    <p>${data.data.surahs[i].name}</p>
                </div>
            </div>
        </div>`
        }
    })

let ayat_pop = document.querySelector(".ayat-pop");
let ayats = document.querySelector(".ayats");
let audioAll = document.querySelector(".audio");
let play_audio = document.getElementById('play');
let pause_audio = document.getElementById('pause')
const audio = new Audio();
function fun(numOfsurah) {
    console.log(numOfsurah);
    ayat_pop.classList.add("active");
    fetch(`http://api.alquran.cloud/v1/surah/${numOfsurah}`)
        .then(response => response.json())
        .then(data => {
            ayats.innerHTML = "";
            let dataAyat = data.data.ayahs;
            dataAyat.forEach((aya) => { ayats.innerHTML += `<p>(${aya.numberInSurah})-${aya.text}</p>` })
            audio.addEventListener('canplay', function () {
                play_audio.addEventListener("click", () => {
                    play_audio.style.display = "none";
                    pause_audio.style.display = "block";
                    audio.play();
                    var elem = document.getElementById("myBar");
                    var width = 1;
                    var id = setInterval(frame, audio.duration * 10);
                    function frame() {
                        if (width >= 100) {
                            clearInterval(id);
                        } else {
                            width++;
                            elem.style.width = width + '%';
                        }
                    }
                })
            });
            audio.addEventListener('canplay', function () {
                pause_audio.addEventListener("click", () => {
                    play_audio.style.display = "block";
                    pause_audio.style.display = "none";
                    audio.pause()
                })
            });

            // تعيين src الخاص بعنصر الصوت باستخدام setAttribute
            audio.setAttribute('src', `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${numOfsurah}.mp3`);
            var duration = audio.duration
            audio.addEventListener("loadedmetadata", () => {
                console.log(audio.duration);
            })

            let close = document.querySelector(".close");
            close.addEventListener("click", () => {
                ayat_pop.classList.remove("active")
                ayat_pop.classList.remove("active2");
                audio.pause();
                play_audio.style.display = "block";
                pause_audio.style.display = "none";
            })
        })
}








function move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 510);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}






