
export function filterPosts() {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const searchType = document.getElementById("search-type").value;
  let url = `http://localhost:3000/posts`;

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
      fetchPostDataAndFillForm(postId);  // para manejar la carga de datos
    });
  });

  deleteButtons.forEach(button => {
    button.addEventListener("click", function() {
      const postId = this.getAttribute('data-id');
      if (confirm("¿Estás seguro de que deseas eliminar este post?")) {
        deletePost(postId);  // Función para manejar la eliminación del post
      }
    });
  });
}

function deletePost(postId) {
  fetch(`http://localhost:3000/posts/${postId}`, {
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

// Función para cargar los datos del post en el formulario
function fetchPostDataAndFillForm(postId) {
  fetch(`http://localhost:3000/posts/${postId}`)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch post data');
      return response.json();
    })
    .then(post => {
      const form = document.getElementById("new-post-form");
      form.elements["title"].value = post.title;
      form.elements["username"].value = post.username;  
      form.elements["content"].value = post.content;
      form.elements["post-id"].value = post.id; 
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error loading post data');
    });
}

//refactorizar para ordenar desde backend(DB)
export function fetchPostsAndUpdateUI() {
  fetch('http://localhost:3000/posts')  // Ajusta la URL a tu endpoint del backend
    .then(response => {
      if (!response.ok) throw new Error('Error al recuperar los posts');
      return response.json();
    })
    .then(posts => {
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Ordena por fecha, de más reciente a más antiguo
      renderPosts(posts);  // Suponiendo que tienes una función renderPosts para actualizar la UI
    })
    .catch(error => {
      console.error('Error al recuperar posts:', error);
      alert('Error al recuperar posts');
    });
}

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

    fetch("http://localhost:3000/posts", fetchOptions)
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

