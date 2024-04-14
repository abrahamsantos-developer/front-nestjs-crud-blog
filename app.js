

import { renderPosts, attachFormSubmitListener, discardButtonListener, filterPosts  } from './ui.js';
import { setCurrentDate } from './SetDateUtils.js';


document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate("post-date")
    renderPosts();
    attachFormSubmitListener();
    discardButtonListener();

    document.getElementById('search-button').addEventListener('click', filterPosts);
});

