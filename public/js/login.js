const form = document.querySelector("form")
const emailInput = document.getElementById('email-login')
const passwordInput = document.getElementById('password-input')

console.log(emailInput, passwordInput)

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const userData = {
        email: emailInput.value,
        password: passwordInput.value,
    }
    fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if(response.status === 200){
            window.location.assign("/")
        }
    })
    .catch(err => console.log(err))
})