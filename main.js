import {listMusic} from './data.js'

const title = document.getElementById('title')
const singer = document.getElementById('singer')
const btnplay = document.getElementById('play')
const playIcon = document.getElementById('play-icon')
const img = document.getElementById('img')
const imgContainer = document.querySelector('.app__img')
const audio = document.querySelector('#audio')
const back = document.getElementById('back')
const next = document.getElementById('next')
const currentTime = document.getElementById('current-time')
const durationTime = document.getElementById('duration-time')
const progress = document.getElementById('progress')

let index = 0
let playing = false
let intervalTime
let intervalCurrent

const finish=()=>{
    console.log('intervando')
    if (audio.currentTime == audio.duration && index != (listMusic.length - 1)) {
        index++
        showData(index)
        validationPlay()
    }else if(audio.currentTime == audio.duration && index == (listMusic.length - 1)){
        clearInterval(intervalCurrent)
        imgContainer.classList.remove('active')
        clearInterval(intervalTime)
    }
}

progress.onchange = function(){
    audio.currentTime = progress.value
}

setInterval(()=>{
    progress.value = audio.currentTime
    progress.max = audio.duration
}, 500)

btnplay.addEventListener('click', ()=>{
    intervalCurrent = setInterval(()=>{
        let segundos = Math.floor(audio.currentTime%60).toString().padStart(2,0)
        let minutos = Math.floor(audio.currentTime/60).toString().padStart(2,0)
        let tiempoCorrido = `${minutos}:${segundos}`
        currentTime.innerHTML = tiempoCorrido
    },500)
    intervalTime = setInterval(finish, 1000)
    
    imgContainer.classList.toggle('active')
    if (imgContainer.classList.contains('active')) {
        playIcon.setAttribute('name', 'pause')
        audio.play()
        playing = true
    }else{
        playIcon.setAttribute('name', 'play')
        audio.pause()
        playing = false
    }
})

const showData=(i)=>{
    title.textContent = listMusic[i].title
    singer.textContent = listMusic[i].singer
    img.setAttribute('src', listMusic[i].img)
    audio.setAttribute('src', listMusic[i].src)
    durationTime.textContent = listMusic[i].time
}
showData(index)

next.addEventListener('click', ()=>{
    if (index == (listMusic.length -1)) {
        return
    }else{
        index++
        showData(index)
        validationPlay()
    }
})

back.addEventListener('click', ()=>{
    if (index == 0) {
        return
    }else{
        index--
        showData(index)
        validationPlay()
    }
})

const validationPlay=()=>{
    playing ? audio.play() : audio.pause()
}