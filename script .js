document.addEventListener('DOMContentLoaded', function() {
    const videoGrid = document.getElementById('video-grid');
    const subcategoryButtons =   document.querySelectorAll('.subcategory-btn');
    
    function fetchVideos() {
        return fetch('http://localhost:3000/api/videos')
            .then(response => response.json())
            .catch(error => {
                console.error('Error:', error);
                return [];
            });
    }

    function displayVideos(category, subcategory = '') {
        fetchVideos().then(videos => {
            videoGrid.innerHTML = '';
            const filteredVideos = videos.filter(video => 
                video.category === category && 
                (subcategory === '' || video.subcategory === subcategory)
            );

            filteredVideos.forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.className = 'video-card';
                videoCard.innerHTML = `
                    <h3>${video.title}</h3>
                    <div class="video-thumbnail" data-video-url="${video.url}">
                        <img src="https://img.youtube.com/vi/${getYouTubeID(video.url)}/0.jpg" alt="${video.title}">
                        <div class="play-button"></div>
                    </div>
                    <p>${video.description}</p>
                `;
                videoGrid.appendChild(videoCard);

                const thumbnail = videoCard.querySelector('.video-thumbnail');
                thumbnail.addEventListener('click', function() {
                    playVideo(video.url);
                });
            });
        });
    }

    function getYouTubeID(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function playVideo(url) {
        const videoPlayer = document.createElement('div');
        videoPlayer.className = 'video-player';
        videoPlayer.innerHTML = `
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${getYouTubeID(url)}?autoplay=1" frameborder="0" allowfullscreen></iframe>
                <button class="close-button">&times;</button>
            </div>
        `;
        document.body.appendChild(videoPlayer);

        const closeButton = videoPlayer.querySelector('.close-button');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(videoPlayer);
        });
    }

    // عرض الفيديوهات الأولية بناءً على الصفحة الحالية
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    displayVideos(currentPage);

    // إضافة مستمعي الأحداث لأزرار التصنيفات الفرعية
    subcategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subcategory = this.dataset.category;
            displayVideos(currentPage, subcategory);
        });
    });
});