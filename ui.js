// Import the array from api.js
import { staticPostsArray } from './api.js';

export function renderPosts() {
    const postsListElement = document.getElementById('card-post');
    const html = staticPostsArray.map(post => {
        return `
            <div class="card">
                <h5 class="card-header">${post.autor}</h5>
                <div class="card-body">
                    <h5 class="card-title">${post.titulo}</h5>
                    <p class="card-text">${post.contenido.substring(0, 70)}...</p>
                    <a href="#" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        `;
    }).join('');
    postsListElement.innerHTML = html;
}
