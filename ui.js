// Import the array from api.js
import { staticPostsArray } from './api.js';

export function renderPosts() {
    const postsListElement = document.getElementById('card-post');
    const html = staticPostsArray.map(post => {
        return `
            <div class="card my-2">
                <h5 class="card-header">${post.autor}</h5>
                <div class="card-body">
                    <h5 class="card-title">${post.titulo}</h5>
                    <h9 class="card-title">${post.fecha}</h9>
                    <p class="card-text">${post.contenido.substring(0, 70)}...</p>
                    <a href="#" class="btn btn-info">Ver más</a>
                </div>
            </div>
        `;
    }).join('');
    postsListElement.innerHTML = html;
}

document.getElementById('new-post-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const formData = new FormData(this);
    const newPost = {
        id: staticPostsArray.length + 1, // Creating a new ID
        titulo: formData.get('title'),
        autor: formData.get('author'),
        fecha: formData.get('date'),
        contenido: formData.get('content')
    };

    staticPostsArray.unshift(newPost); // Add the new post to the array
    renderPosts(); // Re-render the posts including the new one
});

