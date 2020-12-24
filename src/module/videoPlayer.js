import { addZero } from './supScript.js';

export const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player');
  const videoBtnPlay = document.querySelector('.video-button__play');
  const videoBtnStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoVolume = document.querySelector('.video-volume');
  const videoFullscreen = document.querySelector('.video-fullscreen');
  const videoMute = document.querySelector('.video-mute');


  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoBtnPlay.classList.remove('fa-pause');
      videoBtnPlay.classList.add('fa-play');
    } else {
      videoBtnPlay.classList.add('fa-pause');
      videoBtnPlay.classList.remove('fa-play');
    }
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  const chageVolume = () => {
    const valueVolume = videoVolume.value;
    videoPlayer.volume = valueVolume / 100;
  };

  const togglePlay = event => {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  videoPlayer.addEventListener('click', togglePlay);
  videoBtnPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoBtnStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;
    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoVolume.addEventListener('input', chageVolume);
  videoPlayer.addEventListener('volumechange', () => {
    videoVolume.value = Math.round(videoPlayer.volume * 100);
  });

  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
    videoPlayer.controls = true;
  });
  videoPlayer.addEventListener('fullscreenchange', () => {
    if (document.fullscreen) {
      videoPlayer.controls = true;
    } else {
      videoPlayer.controls = false;
    }
  })

  chageVolume();

  videoPlayerInit.stop = () => {
    videoPlayer.pause();
    toggleIcon();
  };
};