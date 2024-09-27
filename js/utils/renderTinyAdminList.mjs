import { SOCIAL_BLOG_ENDPOINT } from "./endpoints.mjs";

export function createBlogPostElement(post) {
  const { id, title, media } = post;
  const accessToken = sessionStorage.getItem("accessToken");
  // Create the main blog post container
  const blogPostDiv = document.createElement("div");
  blogPostDiv.classList.add("blogpost");

  // Create and append the image element
  const imgElement = document.createElement("img");
  if (!media || media.length === 0) {
    imgElement.src = "../assets/OlymposInk.png";
    imgElement.alt = "Olympos Ink lightgrey text written on black background";
  } else {
    imgElement.src = media.url;
    imgElement.alt = media.alt;
  }

  blogPostDiv.appendChild(imgElement);

  // Create and append the title element
  const titleElement = document.createElement("h3");
  titleElement.textContent = title;
  blogPostDiv.appendChild(titleElement);

  // Create the container for buttons
  const buttonContainer = document.createElement("div");

  // Create and append the DELETE button
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.id = "delete";
  deleteButton.setAttribute("data-id", id);
  deleteButton.textContent = "DELETE";
  deleteButton.addEventListener("click", async function () {
    const userConfirmed = window.confirm("Are you sure you want to delete this blog post?");

    if (!userConfirmed) {
      return;
    }

    try {
      const response = await fetch(`${SOCIAL_BLOG_ENDPOINT}/tanersebat/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog post details");
      }

      blogPostDiv.remove();
      alert("Blog post deleted successfully.");
    } catch (error) {
      console.error("Error fetching blog post details:", error);
      alert(
        "Error deleting blog post. Are you the owner of this post? Please try again or login with correct admin user."
      );
    }
  });
  buttonContainer.appendChild(deleteButton);

  // Create and append the EDIT button
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.id = "edit";
  editButton.value = id;
  editButton.textContent = "EDIT";
  editButton.addEventListener("click", async function () {
    try {
      const response = await fetch(`${SOCIAL_BLOG_ENDPOINT}/tanersebat/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog post details");
      }

      const blogDetail = await response.json();

      document.getElementById("blog-id").value = blogDetail.data.id;
      document.getElementById("title").value = blogDetail.data.title;
      document.getElementById("body").value = blogDetail.data.body;
      document.getElementById("media-url").value = blogDetail.data.media?.url || "";
      document.getElementById("media-alt").value = blogDetail.data.media?.alt || "";

      const tags = blogDetail.data.tags || [];
      document.querySelectorAll('input[name="tags"]').forEach((checkbox) => {
        checkbox.checked = tags.includes(checkbox.value);
      });

      window.location.href = "#blogEditor";
    } catch (error) {
      console.error("Error fetching blog post details:", error);
    }
  });

  buttonContainer.appendChild(editButton);

  // Append the button container to the main blog post div
  blogPostDiv.appendChild(buttonContainer);

  // Return the constructed blog post element
  return blogPostDiv;
}
