//Fondos de musica
const firstMusic = document.querySelector('.first-music-container')
const secondMusic = document.querySelector('.second-music-container')

//Botones play y pause 
const playButton = document.querySelector('.play')
const pauseButton = document.querySelector('.pause')

//Botones de next y reverse
const nextButton = document.querySelector('.next')
const reverseButton = document.querySelector('.reverse')
 

//Eventos boton play y pause
playButton.addEventListener('click', e =>{
    e.preventDefault()

    playButton.classList.toggle('delete')
    pauseButton.classList.toggle('add')
})

pauseButton.addEventListener('click', e =>{
    e.preventDefault()

    pauseButton.classList.toggle('add')
    playButton.classList.toggle('delete')
})    

//Eventos next y reverse
nextButton.addEventListener('click', e =>{
    e.preventDefault()

    firstMusic.classList.toggle('delete')
    secondMusic.classList.toggle('add')
})

reverseButton.addEventListener('click', e =>{
    e.preventDefault()

    secondMusic.classList.toggle('add')
    firstMusic.classList.toggle('delete')

})
