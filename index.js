
const video = document.querySelector('.dvid');
const togglePause = document.querySelector('.toggle-pause');
const toggleSound = document.querySelector('.toggle-sound');

const pausePlay = () => {
  if(video.paused) {
    video.play();
    togglePause.innerHTML = '<img src="pause.png">';
  } else {
    video.pause();
    togglePause.innerHTML = '<img src="play.png">';
  }
}

/*
togglePause.addEventListener('click', (e) => {
  pausePlay();
}) */

/*
video.addEventListener('click', (e) => {
  pausePlay();
}) 

toggleSound.addEventListener('click', (e) => {
  video.muted = !video.muted;

  if (video.muted) {
    toggleSound.innerHTML = '<img  src="mute.png">';
  } else {
    toggleSound.innerHTML = '<img  src="sound.png">';
  }
})

*/
