const postForm = document.getElementById("postForm");

const pageTitle =
  document.getElementById("pageTitle");

const user = JSON.parse(
  localStorage.getItem("user")
);

if (!user) {
  window.location.href = "login.html";
}

const params =
  new URLSearchParams(window.location.search);

const editId = params.get("edit");

if (editId) {
  pageTitle.textContent = "Edit Post";
  loadPost();
}

async function loadPost() {
  try {
    const response = await fetch(
      `https://blog-platform-with-comments-c1dm.onrender.com/api/posts/${editId}`
    );

    const data = await response.json();

    document.getElementById("title").value =
      data.post.title;

    document.getElementById("content").value =
      data.post.content;
  } catch (error) {
    console.log(error);
  }
}

postForm.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault();

    const title =
      document.getElementById("title").value;

    const content =
      document.getElementById("content").value;

    try {

      let response;

      if (editId) {

        response = await fetch(
          `https://blog-platform-with-comments-c1dm.onrender.com/api/posts/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              title,
              content,
            }),
          }
        );

      } else {

        response = await fetch(
          "https://blog-platform-with-comments-c1dm.onrender.com/api/posts/create",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              title,
              content,
              author: user._id,
            }),
          }
        );

      }

      const data =
        await response.json();

      alert(data.message);

      window.location.href =
        "index.html";

    } catch (error) {
      console.log(error);
    }
  }
);