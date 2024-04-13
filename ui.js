import { staticPostsArray } from './api.js';

export function renderPosts() {
    const postsListElement = document.getElementById('posts-container');
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
export function attachFormSubmitListener() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const newPost = {
            id: staticPostsArray.length + 1,
            titulo: formData.get('title'),
            autor: formData.get('author'),
            fecha: formData.get('date'),
            contenido: formData.get('content')
        };
        staticPostsArray.unshift(newPost); // Or push(), depending on desired order
        renderPosts();
    });
}


// document.getElementById('new-post-form').addEventListener('submit', function(event) {
//     event.preventDefault(); 

//     const formData = new FormData(this);
//     const newPost = {
//         id: staticPostsArray.length + 1, // Crea nuevo ID para post
//         titulo: formData.get('title'),
//         autor: formData.get('author'),
//         fecha: formData.get('date'),
//         contenido: formData.get('content')
//     };

//     staticPostsArray.unshift(newPost); // Agrega el post al array en el primer lugar
//     renderPosts(); //Re-rendderiza posts
// });

