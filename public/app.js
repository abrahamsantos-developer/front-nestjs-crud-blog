import {
  fetchPostsAndUpdateUI,
  attachFormSubmitListener,
  discardButtonListener,
  filterPosts,
  attachEditPostListener
} from "./ui.js";
import { setCurrentDate } from "./SetDateUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  setCurrentDate("post-date");
  fetchPostsAndUpdateUI();
  attachFormSubmitListener();
  discardButtonListener();
  attachEditPostListener(); 

  document
    .getElementById("search-button")
    .addEventListener("click", filterPosts);
});
