// ===========================
// NEWS COMPONENT
// ===========================

const NewsComponent = {
    /**
     * Display news items
     * @param {Array} newsItems - Array of news objects
     */
    display(newsItems) {
        const container = document.querySelector('.news-grid');
        if (!container || newsItems.length === 0) return;

        const html = newsItems
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 6)
            .map(item => `
                <article class="news-card">
                    <div class="news-image">
                        <i class="fas fa-newspaper"></i>
                    </div>
                    <div class="news-content">
                        <span class="news-date">${formatDate(item.date)}</span>
                        <h3>${item.title}</h3>
                        <p>${item.content}</p>
                        <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                </article>
            `).join('');

        container.innerHTML = html;
    }
};
