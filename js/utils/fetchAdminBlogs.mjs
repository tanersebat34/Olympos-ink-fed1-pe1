// const adminUser = JSON.parse(sessionStorage.getItem("admin-user"))

import { SOCIAL_BLOG_ENDPOINT } from "./endpoints.mjs";

export async function fetchBlogPosts() {
  try {
    const response = await fetch(`${SOCIAL_BLOG_ENDPOINT}/tanersebat`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
}
