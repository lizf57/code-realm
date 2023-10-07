async function signupFormHandler(event){
    event.preventDefault();

    
    const usernameInput = document.getElementById('username-signup')
    const passwordInput = document.getElementById('password-signup')
    
    
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
            document.location.replace('/')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)