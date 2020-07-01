const openModalButtons = document.querySelectorAll('[data-login-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(p =>{
    p.addEventListener('click', () => {
        const login = document.querySelector(p.dataset.loginTarget)
        openModal(login)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.form.active')
    modals.forEach(login => {
        closeModal(login)
    })
})

closeModalButtons.forEach(p =>{
    p.addEventListener('click', () => {
        const login = p.closest('.form')
        closeModal(login)
    })
})

function openModal(login) {
    if (login == null) return
    login.classList.add('active')
    overlay.classList.add('active')

}

function closeModal(login) {
    if (login == null) return
    login.classList.remove('active')
    overlay.classList.remove('active')
}

