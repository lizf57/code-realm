async function signupFormHandler(event){
    event.preventDefault();
    const usernameInput = document.getElementById('username-signup')
    const passwordInput = document.getElementById('password-signup')
    // const form = document.querySelector('form')
    // const emailInput = document.getElementById('email-signup')
    
    if (usernameInput && passwordInput) {
        const response = await  fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                usernameInput,
                passwordInput
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok){
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)