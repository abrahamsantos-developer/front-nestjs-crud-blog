

import { renderPosts, attachFormSubmitListener, discardButtonListener  } from './ui.js';
import { setCurrentDate } from './SetDateUtils.js';


document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate("post-date")
    renderPosts();
    attachFormSubmitListener();
    discardButtonListener();
});

