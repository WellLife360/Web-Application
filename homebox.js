document.addEventListener('DOMContentLoaded', () => {
    // Select modal elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');

    // Add click events to images
    document.querySelectorAll('.interactive-img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            captionText.innerHTML = img.alt;
        });
    });

    // Close the modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
