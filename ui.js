
export function renderPosts(posts, elementId) {
    const postsListElement = document.getElementById(elementId);

    posts.forEach(post => {
        const postElement = document.createElement('a');
        postElement.className = 'list-group-item list-group-item-action';
        postElement.setAttribute('aria-current', 'true');
        postElement.href = '#';

        postElement.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${post.titulo}</h5>
                <small>${post.fecha}</small>
            </div>
            <p class="mb-1">${post.contenido.substring(0, 70)}</p>
            <small>${post.autor}</small>
            <a href="#" class="btn btn-info">Ver post completo</a>
        `;
        
        postsListElement.appendChild(postElement);
    });
}
