
const video = document.querySelector('.dvid');
const togglePause = document.querySelector('.toggle-pause');
const toggleSound = document.querySelector('.toggle-sound');


function togglePlay() {
  const isPlaying = video.paused ? 'play' : 'pause';
  video[isPlaying]();
}


function togglePlyBtn() {
  if (this.paused) {
    togglePause.innerHTML = '<img src="play.png">';
  } else {
    togglePause.innerHTML = '<img src="pause.png">';
  }
}

function toggleSnd () {

}


function toggleSndBtn() {
 if (this.muted === true) {
     toggleSound.innerHTML = '<img  src="mute.png">' ;
 } else {
     toggleSound.innerHTML = '<img src="sound.png">';
 }
}



video.addEventListener('click', toggleSnd);
video.addEventListener('click', togglePlay);
video.addEventListener('pause', togglePlyBtn);
video.addEventListener('play', togglePlyBtn);
video.addEventListener('muted', toggleSndBtn); 

toggleSound.addEventListener('click', toggleSndBtn);

togglePause.addEventListener('click', togglePlay);



