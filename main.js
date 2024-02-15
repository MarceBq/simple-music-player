// Elementos de la interfaz
const firstMusic = document.querySelector('.first-music-container');
const secondMusic = document.querySelector('.second-music-container');
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const nextButton = document.querySelector('.next');
const reverseButton = document.querySelector('.reverse');
const audioSong = document.querySelector('.audio-song');
const currentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration');

// Array de canciones
const music = [
    { url: 'assets/lost-in-city-lights-145038.mp3' },
    { url: 'assets/forest-lullaby-110624.mp3' }
];

// Variable para indicar la canción actual
let currentSongTime = 0;

// Variable para indicar el tiempo actual de la canción cuando se pausa
let pausedTime = 0;

// Función para reproducir la música
function playMusic() {
    const actualSong = music[currentSongTime];
    audioSong.src = actualSong.url;

    // Si el botón de play tiene la clase delete, reproducir la música
    if (playButton.classList.contains('delete')) {
        // Comprobar si se pausó anteriormente y continuar desde ese punto
        if (pausedTime > 0) {
            audioSong.currentTime = pausedTime;
            pausedTime = 0;
        }
        audioSong.play();
    }

    
}

// Función para manejar los eventos de reproducción y pausa
function handlePlayPauseClick(e) {
    
    //Agregar y eliminar una clase
    e.preventDefault();
    playButton.classList.toggle('delete');
    pauseButton.classList.toggle('add');


    // Cuando el audio está pausado, reanudar la reproducción
    if (audioSong.paused) {
        audioSong.play();
    } else {
        // Cuando el audio está reproduciendo, pausar y almacenar el tiempo actual
        audioSong.pause();
        pausedTime = audioSong.currentTime;
    }
}

// Función para manejar los eventos de siguiente y anterior
function handleNextReverseClick(e) {
    e.preventDefault();
    firstMusic.classList.toggle('delete');
    secondMusic.classList.toggle('add');
}

// Eventos de reproducción y pausa
playButton.addEventListener('click', handlePlayPauseClick);
pauseButton.addEventListener('click', handlePlayPauseClick);

// Eventos de siguiente y anterior
nextButton.addEventListener('click', handleNextReverseClick);
reverseButton.addEventListener('click', handleNextReverseClick);



// Iniciar la reproducción de la música
playMusic();
