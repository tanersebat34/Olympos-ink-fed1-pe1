import { SOCIAL_BLOG_ENDPOINT } from "/js/utils/endpoints.mjs";
import { createSingleBlogElement } from "/js/utils/renderSingleBlog.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const singleBlogContainer = document.getElementById("single-blog-container");

  function getQueryParameter(id) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(id);
  }

  const blogId = getQueryParameter("id");

  if (!blogId) {
    console.error("No blog ID found in the URL");
    return;
  }

  async function fetchBlogPost(blogId) {
    try {
      const response = await fetch(`${SOCIAL_BLOG_ENDPOINT}/tanersebat/${blogId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog post");
      }

      const blogData = await response.json();

      const singleBlog = createSingleBlogElement(blogData.data);

      singleBlogContainer.appendChild(singleBlog);
    } catch (error) {
      console.error("Error fetching the blog post:", error);
    }
  }

  fetchBlogPost(blogId);
});
