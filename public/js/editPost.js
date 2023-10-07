const { spliceStr } = require("sequelize/types/utils")

async function editFormHandler(event){
    event.preventDefault()

    const post_title = document.querySelector('input[name="title"]').value

    const post_content = document.querySelector('textarea[name="post_content"]').value.trim()

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title, 
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#editPost').addEventListener('submit', editFormHandler)