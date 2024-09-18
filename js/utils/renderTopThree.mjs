import { fetchBlogPosts } from "./fetchAdminBlogs.mjs";

const contentDiv = document.querySelector(".carousel-container .content");
const prevButton = document.querySelector(".carousel-navigator .prev");
const nextButton = document.querySelector(".carousel-navigator .next");

let currentIndex = 0;

async function displayBlogs(blogs) {
  contentDiv.innerHTML = "";

  blogs.forEach((blog) => {
    const { id, title, media } = blog;

    const blogContainer = document.createElement("div");
    blogContainer.classList.add("blog-item");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("image-cont");
    imgContainer.alt = media && media.alt ? media.alt : "../../assets";


    if (media && media.url) {
      imgContainer.style.backgroundImage = `url(${media.url})`;
    } else {
      imgContainer.style.backgroundColor = "#eaeaea";
    }

    blogContainer.appendChild(imgContainer);

    const goToPost = document.createElement("a");
    goToPost.href = `/post/index.html?id=${id}`;

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    goToPost.appendChild(titleElement);
    blogContainer.appendChild(goToPost);

    contentDiv.appendChild(blogContainer);
  });

  updateCarousel();
}

async function fetchLatestBlogs() {
  try {
    const blogs = await fetchBlogPosts();

    if (!blogs || !Array.isArray(blogs)) {
      throw new Error("Invalid blog data");
    }

    const threeLatestBlogs = blogs.slice(0, 3);

    console.log("Three latest blogs:", threeLatestBlogs);

    displayBlogs(threeLatestBlogs);
  } catch (error) {
    console.error("Failed to fetch latest blogs:", error);
  }
}

fetchLatestBlogs();

function updateCarousel() {
  const items = document.querySelectorAll(".blog-item");
  contentDiv.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showNext() {
  const items = document.querySelectorAll(".blog-item");
  if (currentIndex < items.length - 1) {
    currentIndex += 1;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}

function showPrev() {
  const items = document.querySelectorAll(".blog-item");
  if (currentIndex > 0) {
    currentIndex -= 1;
  } else {
    currentIndex = items.length - 1;
  }
  updateCarousel();
}

prevButton.addEventListener("click", showPrev);
nextButton.addEventListener("click", showNext);
