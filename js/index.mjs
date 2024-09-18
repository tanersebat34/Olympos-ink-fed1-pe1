import { fetchBlogPosts } from "/js/utils/fetchAdminBlogs.mjs";
import { renderBlogPosts } from "/js/utils/renderBlogPosts.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const blogContainer = document.getElementById("renderBlogsHere");

  async function fetchBlogs() {
    try {
      const blogs = await fetchBlogPosts(); // This function should already return the blog data
      if (!blogs) {
        throw new Error("Error fetching blog posts");
      }

      blogContainer.innerHTML = "";

      blogs.forEach((blogData) => {
        const blogElement = renderBlogPosts(blogData);
        blogContainer.appendChild(blogElement);
      });
    } catch (error) {
      console.error("Failed to fetch blog data:", error);
      return [];
    }
  }

  // Call fetchBlogs to fetch and display the blogs on page load
  await fetchBlogs();
});
