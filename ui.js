import { staticPostsArray } from './api.js';

export function filterPosts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const searchType = document.getElementById('search-type').value;

    console.log("Search Input: ", searchInput); // Debug input
    console.log("Search Type: ", searchType); // Debug type

    const filteredPosts = staticPostsArray.filter(post => 
        post[searchType].toLowerCase().includes(searchInput)
    );
    
    console.log("Filtered Posts: ", filteredPosts); // Debug output

    renderPosts(filteredPosts);
}

export function renderPosts(posts = staticPostsArray) {
    const postsListElement = document.getElementById('posts-container');
    const html = posts.map(post =>
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
    toggleListeners();
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
        toggleListeners(); 
    });
}

export function toggleListeners() {
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

export function discardButtonListener() {
    const discardButton = document.getElementById('discard-button');
    const form = document.getElementById('new-post-form');

    console.log(discardButton); // Check if the button is selected correctly
    console.log(form); // Check if the form is selected correctly

    discardButton.addEventListener('click', function() {
        form.reset();  
    });
}



