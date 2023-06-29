import Player from '@vimeo/player';
import { throttle } from 'throttle-debounce';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

if (localStorage.getItem('videoplayer-current-time')) {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}

player.on('timeupdate', throttle(1000, onUpTime));

function onUpTime(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}
