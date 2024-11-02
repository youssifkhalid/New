document.addEventListener('DOMContentLoaded', function() {
    const adminContent = document.getElementById('admin-content');

    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    adminContent.innerHTML = `
        <h2>لوحة التحكم</h2>
        <form id="upload-form">
            <label for="video-title">عنوان الفيديو:</label>
            <input type="text" id="video-title" required>

            <label for="video-url">رابط الفيديو:</label>
            <input type="url" id="video-url" required>

            <label for="video-description">وصف الفيديو:</label>
            <textarea id="video-description" required></textarea>

            <label for="video-category">الفئة:</label>
            <select id="video-category" required>
                <option value="">اختر الفئة</option>
                <option value="movies">أفلام</option>
                <option value="cartoons">كرتون</option>
                <option value="sports">كرة القدم</option>
            </select>

            <label for="video-subcategory">التصنيف الفرعي:</label>
            <select id="video-subcategory">
                <option value="">اختر التصنيف الفرعي</option>
            </select>

            <button type="submit">رفع الفيديو</button>
        </form>
    `;

    const form = document.getElementById('upload-form');
    const categorySelect = document.getElementById('video-category');
    const subcategorySelect = document.getElementById('video-subcategory');

    const subcategories = {
        movies: ['comedy', 'horror', 'new', 'old', 'foreign'],
        cartoons: [],
        sports: ['matches', 'live']
    };

    categorySelect.addEventListener('change', function() {
        const category = this.value;
        subcategorySelect.innerHTML = '<option value="">اختر التصنيف الفرعي</option>';
        
        if (subcategories[category]) {
            subcategories[category].forEach(sub => {
                const option = document.createElement('option');
                option.value = sub;
                option.textContent = sub;
                subcategorySelect.appendChild(option);
            });
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const videoData = {
            id: Date.now(),
            title: document.getElementById('video-title').value,
            url: document.getElementById('video-url').value,
            description: document.getElementById('video-description').value,
            category: categorySelect.value,
            subcategory: subcategorySelect.value
        };

        // إرسال البيانات إلى الخادم (محاكاة)
        fetch('http://localhost:3000/api/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(videoData),
        })
        .then(response => response.json())
        .then(data => {
            alert('تم رفع الفيديو بنجاح!');
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('حدث خطأ أثناء رفع الفيديو');
        });
    });
});