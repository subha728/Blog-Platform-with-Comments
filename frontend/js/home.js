const postsContainer =
  document.getElementById("postsContainer");

const logoutBtn =
  document.getElementById("logoutBtn");

const searchInput =
  document.getElementById("searchInput");

const welcomeUser =
  document.getElementById("welcomeUser");

const user = JSON.parse(
  localStorage.getItem("user")
);

if (user && welcomeUser) {
  welcomeUser.textContent =
    `Welcome, ${user.name}! 👋`;
}

let allPosts = [];

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

async function fetchPosts() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/posts"
    );

    const data = await response.json();

    allPosts = data.posts;

    displayPosts(allPosts);
  } catch (error) {
    console.log(error);
  }
}

function displayPosts(posts) {
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    postsContainer.innerHTML = `
      <div class="post-card">
        <h3>No Posts Found</h3>
        <p>Try another search term.</p>
      </div>
    `;
    return;
  }

  posts.forEach((post) => {
    postsContainer.innerHTML += `
      <div class="post-card">

        <h3>${post.title}</h3>

        <p>
          ${post.content.substring(0, 120)}...
        </p>

        <p>
          ✍️ ${post.author.name}
        </p>

        <div style="margin-top:15px; display:flex; gap:10px; flex-wrap:wrap;">

          <button
            onclick="viewPost('${post._id}')"
          >
            Read Full Article →
          </button>

          <button
            onclick="editPost('${post._id}')"
            style="background:#f59e0b;"
          >
            Edit
          </button>

          <button
            onclick="deletePost('${post._id}')"
            style="background:#ef4444;"
          >
            Delete
          </button>

        </div>

      </div>
    `;
  });
}

searchInput.addEventListener(
  "keyup",
  () => {
    const value =
      searchInput.value.toLowerCase();

    const filteredPosts =
      allPosts.filter((post) =>
        post.title
          .toLowerCase()
          .includes(value)
      );

    displayPosts(filteredPosts);
  }
);

function viewPost(id) {
  window.location.href =
    `post.html?id=${id}`;
}

function editPost(id) {
  window.location.href =
    `create-post.html?edit=${id}`;
}

async function deletePost(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    alert(data.message);

    fetchPosts();
  } catch (error) {
    console.log(error);
  }
}

fetchPosts();