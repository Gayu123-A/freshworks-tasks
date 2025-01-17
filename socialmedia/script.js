const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_API = 'https://jsonplaceholder.typicode.com/comments?postId=';
const USER_AVATAR_URL = 'https://picsum.photos/50';

let currentPage = 1;
const POSTS_PER_PAGE = 10;

// Fetch posts and display them
async function fetchPosts(page) {
    
    const response = await fetch(POSTS_API);
    const posts = await response.json();
    
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const paginatedPosts = posts.slice(start, end);

    displayPosts(paginatedPosts);
    document.getElementById('page-info').textContent = `Page ${page}`;
    document.getElementById('prev-page').disabled = page === 1;
    document.getElementById('next-page').disabled = end >= posts.length;
    
}

function displayPosts(posts) {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    posts.forEach(post => {
        const postImageUrl = `https://picsum.photos/seed/${post.id}/600`;
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${USER_AVATAR_URL}" alt="User Avatar">
                <strong>User ${post.userId}</strong>
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
            <div class="post-image">
                <img src="${postImageUrl}" alt="Post Image">
            </div>
            <button class="comment-btn" onclick="showComments(${post.id})">Comments</button>
        `;
        container.appendChild(postElement);
    });
}

// Show comments in a modal
async function showComments(postId) {
    const response = await fetch(`${COMMENTS_API}${postId}`);
    const comments = await response.json();

    const modal = document.getElementById('modal');
    const commentsContainer = document.getElementById('comments-container');

    commentsContainer.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-user-pic"><img src="${USER_AVATAR_URL}" alt="User Avatar" title=${comment.email}><strong>${comment.name}</strong></div>
            <p>${comment.body}</p>
        </div>
    `).join('');

    modal.classList.remove('hidden');
}

// Close modal functionality
const closeModal = document.getElementById('close-modal');
closeModal.addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});

// Pagination functionality
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');

prevPage.addEventListener('click', async () => {

    if (currentPage > 1) {

        currentPage--;

        await fetchPosts(currentPage);

    }

});

nextPage.addEventListener('click', async () => {

    currentPage++;

    await fetchPosts(currentPage);

});

// Initialize
fetchPosts(currentPage);