import {
  //renderPosts,
  fetchPostsAndUpdateUI,
  attachFormSubmitListener,
  discardButtonListener,
  filterPosts,
} from "./ui.js";
import { setCurrentDate } from "./SetDateUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  setCurrentDate("post-date");
  fetchPostsAndUpdateUI();  
  //renderPosts();
  attachFormSubmitListener();
  discardButtonListener();

  document
    .getElementById("search-button")
    .addEventListener("click", filterPosts);
});
