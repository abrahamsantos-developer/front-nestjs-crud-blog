
//import { staticPostsArray } from './api.js';
import { renderPosts, attachFormSubmitListener  } from './ui.js';
import { setCurrentDate } from './SetDateUtils.js';


document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate("post-date")
    renderPosts();
    attachFormSubmitListener();
});


