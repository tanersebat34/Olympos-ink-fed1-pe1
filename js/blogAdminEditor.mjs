import { SOCIAL_BLOG_ENDPOINT } from "./utils/endpoints.mjs";
import { fetchBlogPosts } from "./utils/fetchAdminBlogs.mjs";
import { createBlogPostElement } from "./utils/renderTinyAdminList.mjs";

async function populateBlogPosts() {
  try {
    const blogPosts = await fetchBlogPosts();

    if (!blogPosts) {
      console.error("No blog posts available");
      return;
    }

    const blogContainer = document.getElementById("short-blogList");
    blogContainer.innerHTML = "";

    blogPosts.forEach((post) => {
      const blogElement = createBlogPostElement(post);
      blogContainer.appendChild(blogElement);
    });
  } catch (error) {
    console.error("Error populating blog posts:", error);
  }
}
populateBlogPosts();

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("edit-post-form");
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  // Only run this if there is a valid postId in the URL
  if (postId) {
    async function fetchBlogData() {
      try {
        const response = await fetch(`${SOCIAL_BLOG_ENDPOINT}/tanersebat/${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const { data } = await response.json();
          populateForm(data);
        } else {
          const errorData = await response.json();
          alert(`Error: ${response.status} - ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        alert("An error occurred while fetching the blog data.");
      }
    }

    fetchBlogData();
  } else {
    console.log("No blog ID provided, skipping fetch.");
    // If there's no ID, you can redirect or just allow the page to load without the alert.
    // Example: window.location.href = '/manage-blogs'; // Optional redirect
  }

  function populateForm(blogData) {
    const { title, body, tags, media, created, author } = blogData;

    document.getElementById("title").value = title || "";
    document.getElementById("body").value = body || "";
    document.getElementById("tags").value = tags ? tags.join(", ") : "";
    document.getElementById("media-url").value = media ? media.url : "";
    document.getElementById("media-alt").value = media ? media.alt : "";
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const body = document.getElementById("body").value.trim();
    const tagsInput = document.getElementById("tags").value.trim();
    const tags = tagsInput
      ? tagsInput
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];
    const mediaUrl = document.getElementById("media-url").value.trim();
    const mediaAlt = document.getElementById("media-alt").value.trim();
    const accessToken = sessionStorage.getItem("accessToken");

    const postData = {
      title: title,
      body: body,
      tags: tags,
      media: mediaUrl ? { url: mediaUrl, alt: mediaAlt } : undefined,
    };

    try {
      const response = await fetch(`https://v2.api.noroff.dev/blog/posts/tanersebat/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Post updated successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${response.status} - ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("An error occurred while updating the post.");
    }
  });
});

window.addEventListener("load", function () {
  const hash = window.location.hash; // Check if there is a hash in the URL
  if (hash) {
    setTimeout(() => {
      const targetElement = document.querySelector(hash); // Find the element with that ID
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" }); // Scroll to the element
      }
    }, 1000); // Slight delay to ensure everything is rendered
  }
});
