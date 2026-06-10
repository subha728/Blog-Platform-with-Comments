const postContainer =
  document.getElementById("postContainer");

const commentsContainer =
  document.getElementById("commentsContainer");

const commentForm =
  document.getElementById("commentForm");

const user = JSON.parse(
  localStorage.getItem("user")
);

const params =
  new URLSearchParams(window.location.search);

const postId = params.get("id");

async function loadPost() {
  try {
    const response = await fetch(
      `https://blog-platform-with-comments-c1dm.onrender.com/api/posts/${postId}`
    );

    const data = await response.json();

    const post = data.post;

    postContainer.innerHTML = `
      <div class="post-card">

        <h1 style="margin-bottom: 15px;">
          ${post.title}
        </h1>

        <p style="line-height: 1.8; margin-bottom: 20px;">
          ${post.content}
        </p>

        <p>
          ✍️ <strong>${post.author.name}</strong>
        </p>

      </div>
    `;
  } catch (error) {
    console.log(error);
  }
}

async function loadComments() {
  try {
    const response = await fetch(
      `https://blog-platform-with-comments-c1dm.onrender.com/api/comments/${postId}`
    );

    const data = await response.json();

    commentsContainer.innerHTML = "";

    if (data.comments.length === 0) {
      commentsContainer.innerHTML = `
        <p>No comments yet. Be the first to comment!</p>
      `;
      return;
    }

    data.comments.forEach((comment) => {
      commentsContainer.innerHTML += `
        <div class="post-card">

          <p>
            <strong>
              👤 ${comment.user.name}
            </strong>
          </p>

          <p style="margin-top:10px;">
            ${comment.text}
          </p>

        </div>
      `;
    });
  } catch (error) {
    console.log(error);
  }
}

commentForm.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault();

    const text =
      document.getElementById(
        "commentText"
      ).value;

    try {
      const response = await fetch(
        "https://blog-platform-with-comments-c1dm.onrender.com/api/comments/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            text,
            user: user._id,
            post: postId,
          }),
        }
      );

      const data =
        await response.json();

      alert(data.message);

      document.getElementById(
        "commentText"
      ).value = "";

      loadComments();
    } catch (error) {
      console.log(error);
    }
  }
);

loadPost();
loadComments();