async function createPostHandler(event){
    event.preventDefault()

    document.location.replace('/dashboard/new')
}

document.querySelector('#createPost').addEventListener('click', createPostHandler)