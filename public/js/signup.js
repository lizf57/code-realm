const form = document.querySelector('form')
const usernameInput = document.getElementById('username-signup')
const emailInput = document.getElementById('email-signup')
const passwordInput = document.getElementById('password-signup')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const userData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
    }

    console.log(usernameInput.value, emailInput.value, passwordInput.value)

    fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (response.status === 200) {
            window.location.assign('/')
        }
    })
    .catch(err => console.log(err))
})