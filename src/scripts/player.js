var video = document.querySelector(".player__video");
var btn = document.querySelector(".player__start");
var progress = document.querySelector(".player__playback-button");
const volume = document.querySelector(".player__volume-bar");
const mute = document.querySelector(".player__volume-mute");
const seekslider = document.querySelector(".player__playback");

function togglePlayPause() {
  if (video.paused) {
    video.play();
    btn.removeClass('play');
    btn.addClass('pause');
  } else {
    video.pause();
    btn.removeClass('pause');
    btn.addClass('play');
  }
};

btn.addEventListener("click", togglePlayPause);

video.addEventListener("timeupdate", function() {
  var timePassage = video.currentTime / video.duration;
  progress.style.left = timePassage * 100 + "%";

  if(video.ended) {
    btn.className = 'play';
  }
});

volume.addEventListener('mousemove', (e) => {
  video.volume = e.target.value;
});

mute.addEventListener('click', () => {
  video.muted = !video.muted;
});

seekslider.addEventListener("change", function () {
  var time = video.duration * (seekslider.value / 100);
  video.currentTime = time;
})


