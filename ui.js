import { staticPostsArray } from './api.js';

// export function renderPosts() {
//     const postsListElement = document.getElementById('posts-container');
//     const html = staticPostsArray.map(post => {
//         return `
//             <div class="card my-2">
//                 <h5 class="card-header">${post.autor}</h5>
//                 <div class="card-body">
//                     <h5 class="card-title">${post.titulo}</h5>
//                     <h9 class="card-title">${post.fecha}</h9>
//                     <p class="card-text">${post.contenido.substring(0, 70)}...</p>
//                     <a href="#" class="btn btn-info">Ver más</a>
//                 </div>
//             </div>
//         `;
//     }).join('');
//     postsListElement.innerHTML = html;
// }

export function renderPosts() {
    const postsListElement = document.getElementById('posts-container');
    const html = staticPostsArray.map(post =>
        `
        <div class="card my-2">
            <h5 class="card-header">${post.autor}</h5>
            <div class="card-body">
                <h5 class="card-title">${post.titulo}</h5>
                <h6 class="card-title">${post.fecha}</h6>
                <p class="card-text short-text">${post.contenido.substring(0, 70)}...</p>
                <p class="card-text full-text" style="display: none;">${post.contenido}</p>
                <button class="btn btn-info toggle-content">Ver más</button>
            </div>
        </div>
    `).join('');
    postsListElement.innerHTML = html;
    attachToggleListeners();
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

export function attachToggleListeners() {
    const toggleButtons = document.querySelectorAll('.toggle-content');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardBody = this.closest('.card-body');
            const fullText = cardBody.querySelector('.full-text');
            const shortText = cardBody.querySelector('.short-text');
            if (fullText.style.display === 'none') {
                fullText.style.display = 'block';
                shortText.style.display = 'none';
                this.textContent = 'Ver menos';
            } else {
                fullText.style.display = 'none';
                shortText.style.display = 'block';
                this.textContent = 'Ver más';
            }
        });
    });
}


