document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        if (phone === '01092812463' && password === 'Aa123456#') {
            // تسجيل الدخول ناجح
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'admin.html';
        } else {
            alert('رقم الهاتف أو كلمة المرور غير صحيحة');
        }
    });
});