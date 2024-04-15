// export function filterPosts() {
//   const searchInput = document
//     .getElementById("search-input")
//     .value.toLowerCase();
//   const searchType = document.getElementById("search-type").value;

//   console.log("Search Input: ", searchInput); // Debug input
//   console.log("Search Type: ", searchType); // Debug type

//   const filteredPosts = staticPostsArray.filter((post) =>
//     post[searchType].toLowerCase().includes(searchInput)
//   );

//   console.log("Posts filtrados: ", filteredPosts);

//   renderPosts(filteredPosts);
// }

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

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const postId = this.getAttribute("data-id");
      editPost(postId); // Función para manejar la edición del post
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const postId = this.getAttribute("data-id");
      deletePost(postId); // Función para manejar la eliminación del post
    });
  });
}

function editPost(postId) {
  // Aquí implementarías la lógica para cargar los datos del post en un formulario de edición
  console.log("Edit Post ID:", postId);
}

function deletePost(postId) {
  // Aquí implementarías la lógica para eliminar el post
  console.log("Delete Post ID:", postId);
  // Simular eliminación por ahora
  const index = staticPostsArray.findIndex((post) => post.id === postId);
  if (index > -1) {
    staticPostsArray.splice(index, 1);
    renderPosts(); // Actualizar la lista de posts
  }
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
    const newPost = {
      title: formData.get("title"),
      //ver aqui!
      username: formData.get("username"),
      content: formData.get("content"),
    };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((post) => {
        alert("Post creado con éxito!");
        form.reset();
        fetchPostsAndUpdateUI(); // Recargar la lista completa de posts para incluir el nuevo
      })
      .catch((error) => {
        console.error("Error al crear el post:", error);
        alert("Error al crear el post");
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
