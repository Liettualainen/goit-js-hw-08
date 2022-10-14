import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player('vimeo-player');

player.on('timeupdate', throttle( evt => {
    localStorage.setItem('videoplayer-current-time', evt.seconds);
}, 1000)
);


player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0)
.catch(function (error) {
    console.error(error);
});
