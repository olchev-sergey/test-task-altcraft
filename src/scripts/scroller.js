const toUpButton = document.querySelector('.to-up-button')
const HIDDEN_CLASS = 'to-up-button__outside'

toUpButton.addEventListener('click', () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  })
})

window.addEventListener('scroll', (e) => {
  if (window.scrollY > window.innerHeight) {
    if (toUpButton.classList.contains(HIDDEN_CLASS)) {
      toUpButton.classList.remove(HIDDEN_CLASS)
    }
  } else {
    if (!toUpButton.classList.contains(HIDDEN_CLASS)) {
      toUpButton.classList.add(HIDDEN_CLASS)
    }
  }
})
