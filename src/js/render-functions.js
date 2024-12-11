
export function renderImages(images) {
    return images.map(image => `
        <div class="photo-card">
            <a href="${image.largeImageURL}" class="gallery-link" title="${image.tags.replace(/,/g, ' ')}">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-image" />
            </a>
            <div class="info">
                <p>
                    <span class="info-item"><b>Likes:</b> ${image.likes}</span>
                    <span class="info-item"><b>Views:</b> ${image.views}</span>
                    <span class="info-item"><b>Comments:</b> ${image.comments}</span>
                    <span class="info-item"><b>Downloads:</b> ${image.downloads}</span>
                </p>
            </div>
        </div>
    `).join('');
}


