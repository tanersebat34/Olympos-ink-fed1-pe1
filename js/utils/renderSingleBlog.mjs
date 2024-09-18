export function createSingleBlogElement(blogData) {
  const { title, body, media, created, tags, author } = blogData;

  const section = document.createElement("section");

  const titleElement = document.createElement("h1");
  titleElement.textContent = title;
  section.appendChild(titleElement);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("imageBox");
  section.appendChild(imageContainer);

  const imgElement = document.createElement("img");
  imgElement.src = media.url;
  imgElement.alt = media.alt;
  imageContainer.appendChild(imgElement);

  const shareContainer = document.createElement("div");
  shareContainer.classList.add("share-container");

  const popupMessage = document.createElement("span");
  popupMessage.classList.add("popup-message");
  popupMessage.textContent = "You've copied the URL!";
  popupMessage.style.display = "none";

  const shareBtn = document.createElement("button");
  shareBtn.classList.add("ClickToShare");
  shareBtn.textContent = "🔗";

  const tagContainer = document.createElement("p");
  tagContainer.classList.add("tag-container");
  tagContainer.textContent = `Tags: ${tags}`;

  const authorName = document.createElement("p");
  authorName.classList.add("authorName");
  authorName.textContent = "Author: " + author.name;
  shareContainer.appendChild(authorName);

  shareBtn.addEventListener("click", async function () {
    try {
      const url = window.location.href;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      popupMessage.style.display = "inline";

      setTimeout(() => {
        popupMessage.style.display = "none";
      }, 3500);
    } catch (error) {
      console.error("Could not copy text: ", error);
    }
  });

  shareContainer.appendChild(tagContainer);
  shareContainer.appendChild(shareBtn);
  shareContainer.appendChild(popupMessage);
  section.appendChild(shareContainer);

  const createdDate = document.createElement("p");
  createdDate.textContent = `Created on: ${created.slice(0, 10)}`;

  const contentDiv = document.createElement("div");

  const bodyElement = document.createElement("div");
  bodyElement.classList.add("bodyValue");
  bodyElement.innerHTML = body.replace(/\n/g, "<br>");
  contentDiv.appendChild(bodyElement);

  const authorBoxDiv = document.createElement("div");
  authorBoxDiv.id = "author-box";

  const authorImgElement = document.createElement("img");
  authorImgElement.src = author.avatar.url;
  authorImgElement.alt = author.avatar.name;
  authorBoxDiv.appendChild(authorImgElement);

  const authorNameElement = document.createElement("p");
  authorNameElement.classList.add("author");
  authorNameElement.textContent = author.name;
  authorBoxDiv.appendChild(authorNameElement);

  const authorBioElement = document.createElement("p");
  authorBioElement.classList.add("bio");
  authorBioElement.textContent = author.bio;
  authorBoxDiv.appendChild(authorBioElement);

  contentDiv.appendChild(authorBoxDiv);

  section.appendChild(contentDiv);

  return section;
}
