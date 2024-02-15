// Elementos de la interfaz
const firstMusic = document.querySelector('.first-music-container')
const secondMusic = document.querySelector('.second-music-container')
const playButton = document.querySelector('.play')
const pauseButton = document.querySelector('.pause')
const nextButton = document.querySelector('.next')
const reverseButton = document.querySelector('.reverse')
const audioSong = document.querySelector('.audio-song')
const actualTime = document.querySelector('.current-time')
const durationTime = document.querySelector('.duration')
const progressBar = document.querySelector('.progress-bar')

// Array de canciones
const music = [
    { url: 'assets/lost-in-city-lights-145038.mp3' },
    { url: 'assets/forest-lullaby-110624.mp3' }
]

// Variable para indicar la canción actual
let currentSongIndex = 0

// Variable para indicar el tiempo actual de la canción cuando se pausa
let pausedTime = 0

// Función para reproducir la música
function playMusic() {
    const actualSong = music[currentSongIndex]
    audioSong.src = actualSong.url

    // Si el botón de play tiene la clase delete, reproducir la música
    if (playButton.classList.contains('delete')) {
        
        // Comprobar si se pausó anteriormente y continuar desde ese punto
        if (pausedTime > 0) {
            audioSong.currentTime = pausedTime;
             pausedTime = 0
        }

        // Reproducir música
        audioSong.play()
    }
}

// Función para pausar la música
function pauseMusic(){
    audioSong.pause();
    pausedTime = audioSong.currentTime
}

//Función para avanzar a la siguiente música
function nextMusic(){
    currentSongIndex = (currentSongIndex + 1) % music.length
    progressBar.value = 0
    playMusic()
}

// Funcion para retroceder a la música anterior
function lastMusic(){
    currentSongIndex = (currentSongIndex - 1) % music.length
    progressBar.value = 0
    playMusic()
}


// Función para manejar los eventos de reproducción y pausa
function handlePlayPauseClick(e) {
    
    //Agregar y eliminar una clase
    e.preventDefault();
    playButton.classList.toggle('delete')
    pauseButton.classList.toggle('add')


    // Cuando el audio está pausado, reanudar la reproducción
    if (audioSong.paused) {
        audioSong.play()
    
    } else {
        // Cuando el audio está reproduciendo, pausar y almacenar el tiempo actual
        audioSong.pause()

        //currentTime => Propiedad para saber el tiempo actual
        pausedTime = audioSong.currentTime
    }
}

// Función para manejar los eventos de siguiente y anterior
function handleNextReverseClick(e) {
    e.preventDefault();
    firstMusic.classList.toggle('delete')
    secondMusic.classList.toggle('add')

    if(firstMusic.classList.contains('delete')){
        nextMusic()
    }else{
        lastMusic()
    }
}

// Evento avanzar a la siguiente canción cuando la que se está reproduciendo termine
audioSong.addEventListener('ended', (e)=>{
    

    e.preventDefault();
    firstMusic.classList.toggle('delete')
    secondMusic.classList.toggle('add')
    
    nextMusic()
})

// Evento para tomar un punto específico de la barra de progreso
audioSong.addEventListener('timeupdate', ()=>{

    // Porcentaje de progreso
    // currentTime => Tiempo actual
    // duration => Duracion de la canción
    const progressPorcent = (audioSong.currentTime / audioSong.duration) * 100

    // Estilo de la barra de progreso
    progressBar.style.background = `linear-gradient(to right, #c93b76 0%, #c93b76 ${progressPorcent}%, #ffffff ${progressPorcent}%, #ffffff 100%)`

    // Calcular minutos y segundos actuales
    const currentMinute = Math.floor(audioSong.currentTime/60)
    const currentSecond = Math.floor(audioSong.currentTime - currentMinute * 60)


    // Tiempo de duracion
    if (!isNaN(audioSong.duration)) {
        const durationMinute = Math.floor(audioSong.duration/60)
        const durationSecond = Math.floor(audioSong.duration - 
        durationMinute * 60)

        durationTime.textContent = `${durationMinute}:${durationSecond < 10 ? '0' : ''}${durationSecond}` 
    }

    // Cambiar la barra de progreso
    actualTime.textContent = `${currentMinute}:${currentSecond < 10 ? '0' : ''}${currentSecond}`
    
    
})

// Modificar la barra de progreso en una posicion específica
progressBar.addEventListener('click', (e)=>{
    
    // clientX => Es una propiedad de ese objeto que representa la coordenada X del cursor del mouse en relación con la ventana del navegador

    // getBoundingClientRect() => Este método devuelve el tamaño de un elemento y su posición relativa al área de la vista (viewport) del navegador.

    // left => Representa la distancia desde el borde izquierdo del área de la vista hasta el borde izquierdo del elemento.
    const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left)

    
    // Calcular el porcentaje de posición dentro de la barra de progreso
    const newPositionPercentage = (clickPosition / progressBar.clientWidth) * 100

    // Calcular el tiempo correspondiente en el audio en función del porcentaje
    const newTime = (newPositionPercentage * audioSong.duration) / 100;

    // Actualizar la propiedad currentTime del elemento de audio
    audioSong.currentTime = newTime;
})


// Eventos de reproducción y pausa
playButton.addEventListener('click', handlePlayPauseClick)
pauseButton.addEventListener('click', handlePlayPauseClick)

// Eventos de siguiente y anterior
nextButton.addEventListener('click', handleNextReverseClick)
reverseButton.addEventListener('click', handleNextReverseClick)



// Iniciar la reproducción de la música
playMusic();
