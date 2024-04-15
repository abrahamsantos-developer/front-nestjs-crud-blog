
export function filterPosts() {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const searchType = document.getElementById("search-type").value;
  let url = `http://localhost:5500/posts`;

  switch (searchType) {
    case "username":
      url += `/author/${searchInput}`;
      break;
    case "title":
      url += `/title/${searchInput}`;
      break;
    case "content":
      url += `/content/${searchInput}`;
      break;
    default:
      console.error("Tipo de búsqueda no soportado:", searchType);
      return;
  }

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Error al recuperar los posts: ${response.statusText}`);
      return response.json();
    })
    .then(posts => {
      if (posts.length > 0) {
        renderPosts(posts);
      } else {
        console.log("No se encontraron posts con los criterios de búsqueda.");
        alert("No se encontraron posts con los criterios de búsqueda.");
      }
    })
    .catch(error => {
      console.error("Error en la petición de filtrado:", error);
      alert("Error al recuperar posts filtrados");
    });
}

export function renderPosts(posts) {
  const postsListElement = document.getElementById("posts-container");
  const html = posts
    .map((post) => {
      return `
      <div class="card my-2">
          <h5 class="card-header">${post.title}</h5>
          <div class="card-body">
              <h5 class="card-title">${post.username}</h5>
              <h6 class="card-title">${new Date(
                post.createdAt
              ).toLocaleDateString()}</h6>
              <p class="card-text short-text">${post.content.substring(
                0,
                70
              )}...</p>
              <p class="card-text full-text" style="display: none;">${
                post.content
              }</p>
              <button class="btn btn-info toggle-content">Ver más</button>
              <button class="btn btn-primary edit-post" data-id="${
                post.id
              }">Editar</button>
              <button class="btn btn-danger delete-post" data-id="${
                post.id
              }">Eliminar</button>
          </div>
      </div>
    `;
    })
    .join("");
  postsListElement.innerHTML = html;
  toggleListeners();
  attachEditAndDeleteListeners();
}


function attachEditAndDeleteListeners() {
  const editButtons = document.querySelectorAll(".edit-post");
  const deleteButtons = document.querySelectorAll(".delete-post");

  editButtons.forEach(button => {
    button.addEventListener("click", function() {
      const postId = this.getAttribute('data-id');
      openEditModal(postId); 
      //fetchPostDataAndFillForm(postId);  // para manejar la carga de datos
    });
  });

  deleteButtons.forEach(button => {
    button.addEventListener("click", function() {
      const postId = this.getAttribute('data-id');
      if (confirm("¿Estás seguro de que deseas eliminar este post?")) {
        deletePost(postId);  // para manejar la eliminación del post
      }
    });
  });
}

function deletePost(postId) {
  fetch(`http://localhost:5500/posts/${postId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error('Error al eliminar el post');
    alert('Post eliminado con éxito');
    fetchPostsAndUpdateUI();  // Recargar la lista de posts para reflejar los cambios
  })
  .catch(error => {
    console.error('Error al eliminar el post:', error);
    alert('Error al eliminar el post');
  });
}


// carga los datos del post en el formulario
function fetchPostDataAndFillForm(postId) {
  fetch(`http://localhost:5500/posts/${postId}`)
    .then(response => {
      if (!response.ok) throw new Error('Error para obtener datos');
      return response.json();
    })
    .then(post => {
      const form = document.getElementById("edit-post-form");
      form.elements["title"].value = post.title;
      form.elements["username"].value = post.username;  
      form.elements["content"].value = post.content;
      form.elements["post-id"].value = post.id; 
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error cargando datos de posts');
    });
}

//refactorizar para ordenar desde backend(DB)
export function fetchPostsAndUpdateUI() {
  fetch('http://localhost:5500/posts')  // Ajusta la URL a tu endpoint del backend
    .then(response => {
      if (!response.ok) throw new Error('Error al recuperar los posts');
      return response.json();
    })
    .then(posts => {
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
      renderPosts(posts);  
    })
    .catch(error => {
      console.error('Error al recuperar posts:', error);
      alert('Error al recuperar posts');
    });
}

// ya no se usara
export function attachFormSubmitListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    const postDetails = {
      title: formData.get("title"),
      username: formData.get("username"),
      content: formData.get("content"),
    };

    console.log("Enviando post:", postDetails);  // Verificar los datos que se envían

    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postDetails),
    };

    fetch("http://localhost:5500/posts", fetchOptions)
      .then(response => {
        console.log("Respuesta recibida", response);
        if (!response.ok) {
          throw new Error('Error al crear el post');
        }
        return response.json();
      })
      .then(post => {
        console.log("Post creado con éxito:", post);
        alert('Post creado con éxito!');
        fetchPostsAndUpdateUI();  // Actualiza la lista de posts
      })
      .catch(error => {
        console.error('Error al crear el post:', error);
        alert('Error al crear el post');
      });
  });
}



export function toggleListeners() {
  const toggleButtons = document.querySelectorAll(".toggle-content");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const cardBody = this.closest(".card-body");
      const fullText = cardBody.querySelector(".full-text");
      const shortText = cardBody.querySelector(".short-text");
      if (fullText.style.display === "none") {
        fullText.style.display = "block";
        shortText.style.display = "none";
        this.textContent = "Ver menos";
      } else {
        fullText.style.display = "none";
        shortText.style.display = "block";
        this.textContent = "Ver más";
      }
    });
  });
}

export function discardButtonListener() {
  const discardButton = document.getElementById("discard-button");
  const form = document.getElementById("new-post-form");

  console.log(discardButton);
  console.log(form);

  discardButton.addEventListener("click", function () {
    form.reset();
  });
}


// Agrega esta función para abrir el modal de edición con los datos del post
export function openEditModal(postId) {
  fetchPostDataAndFillForm(postId);
  const editPostModal = new bootstrap.Modal(document.getElementById('editPostModal'));
  editPostModal.show();
}

export async function editPost(postId, updatedPostDetails) {
  const fetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPostDetails),
  };

  try {
    const response = await fetch(`http://localhost:5500/posts/${postId}`, fetchOptions);
    if (!response.ok) {
      throw new Error('Error al editar el post');
    }
    const updatedPost = await response.json();
    console.log('Post editado con éxito:', updatedPost);
    fetchPostsAndUpdateUI(); // Actualiza la lista de posts después de editar
    return updatedPost;
  } catch (error) {
    console.error('Error al editar el post:', error);
    alert('Error al editar el post');
  }
}




// Agrega esta función para adjuntar un evento de clic a los botones de edición
export function attachEditPostListener() {
  const editButtons = document.querySelectorAll(".edit-post");

  editButtons.forEach(button => {
    button.addEventListener("click", function() {
      const postId = this.getAttribute('data-id');
      openEditModal(postId);
    });
  });

  const editPostForm = document.getElementById("edit-post-form");
  editPostForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    const updatedPostDetails = {
      title: formData.get("title"),
      username: formData.get("username"),
      content: formData.get("content"),
    };

    const postId = formData.get("post-id");

    editPost(postId, updatedPostDetails)
      .then(() => {
        const editPostModal = new bootstrap.Modal(document.getElementById('editPostModal'));
        editPostModal.hide();
        fetchPostsAndUpdateUI(); // Actualiza la lista de posts
      })
      .catch(error => {
        console.error('Error al editar el post:', error);
        alert('Error al editar el post');
      });
  });
}


