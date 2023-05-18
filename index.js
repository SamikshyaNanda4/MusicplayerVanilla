const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-title'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img')


const music = new Audio();

const songs = [
   {
    path:'assets/songs/here-with-me.mp3',
    displayName: 'Here With Me',
    cover: 'assets/images/here with me.jfif',
    artist:'d4vd',
   },
   {
    path:'assets/songs/paradise.mp3',
    displayName: 'Paradise',
    cover: 'assets/images/paradise.jfif',
    artist:'Coldplay',
   },
   {
    path:'assets/songs/love-the-way.mp3',
    displayName: 'Love The Way You Lie',
    cover: 'assets/images/love the way you lie.jfif',
    artist:'Eminem & Rihanna',
   },
   {
    path:'assets/songs/instant-crush.mp3',
    displayName: 'Instant Crush',
    cover: 'assets/images/instant crush.jfif',
    artist:'Daft Punk',
   },
   {
    path:'assets/songs/doja.mp3',
    displayName: 'Doja',
    cover: 'assets/images/doja.jfif',
    artist:'Central Cee',
   },
   {
    path:'assets/songs/been-on.mp3',
    displayName: 'Been On',
    cover: 'assets/images/been on.jfif',
    artist:'G-Eazy',
   },
];

let musicIndex = 0;
let isPlaying = false ;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    //change play button icon
    playBtn.classList.replace ('fa-play','fa-pause');
    //set button hover title
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    //change pause button icon
    playBtn.classList.replace ('fa-pause','fa-play');
    //set button hover title
    playBtn.setAttribute('title','Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName ;
    artist.textContent = song.artist ;
    image.src = song.cover ;
    background.src =song.cover ;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();

}

function updateProgressBar(){
const {duration , currentTime} = music ;
const progressPercent = (currentTime / duration) * 100 ;
progress.style.width = `${progressPercent}%`;

const formatTime = (time) => String(Math.floor(time)).padStart(2 ,'0');
durationEl.textContent =`${formatTime(duration/60)}:${formatTime(duration % 60)}`;
currentTimeEl.textContent =`${formatTime(currentTime/60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
const width = playerProgress.clientWidth;
const clickX = e.offsetX ;
music.currentTime = (clickX / width) * music.duration ;

}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(0));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click' , setProgressBar);

loadMusic(songs[musicIndex]);
