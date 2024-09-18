export function renderBlogPosts(blogData) {
  const { id, title, media, created, author, tags } = blogData;

  const blogElement = document.createElement("div");
  blogElement.classList.add("blog-element");

  blogElement.style.backgroundSize = "cover";
  blogElement.style.backgroundPosition = "center";
  if (media && media.url) {
    blogElement.style.backgroundImage = `url(${media.url})`;
    blogElement.style.backgroundSize = "cover";
    blogElement.style.backgroundPosition = "center";
  } else {
    blogElement.style.backgroundColor = "#ffffff";
  }

  const contentOverlay = document.createElement("div");
  contentOverlay.classList.add("content-overlay");

  const authorParagraph = document.createElement("p");
  authorParagraph.classList.add("author");
  authorParagraph.textContent = `Author: ${author.name}`;

  const creationDateParagraph = document.createElement("p");
  creationDateParagraph.classList.add("creationDate");
  creationDateParagraph.textContent = `Created on: ${created.slice(0, 10)}`;

  const tagsList = document.createElement("p");
  tagsList.classList.add("tags");
  tagsList.textContent = tags.join(", ");

  const titleLink = document.createElement("a");
  titleLink.classList.add("blogTitle");
  titleLink.href = `/post/index.html?id=${id}`;
  titleLink.textContent = title;

  blogElement.appendChild(titleLink);
  contentOverlay.appendChild(authorParagraph);
  contentOverlay.appendChild(creationDateParagraph);
  contentOverlay.appendChild(tagsList);

  const editButton = document.createElement("button");
  editButton.id = "admin-btn";
  editButton.type = "button";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    window.location.href = `/post/edit.html?id=${id}#blogEditor`;

    window.addEventListener("load", () => {
      const blogEditorElement = document.getElementById("blogEditor");
      if (blogEditorElement) {
        blogEditorElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  blogElement.appendChild(editButton);
  blogElement.appendChild(contentOverlay);

  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    editButton.style.display = "inline-block";
  } else {
    editButton.style.display = "none";
  }

  return blogElement;
}
