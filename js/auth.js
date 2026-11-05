function checkLogin(event) {
    event.preventDefault();
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    // Простая проверка (для конкурса)
    if (login === 'student' && password === 'kripo2026') {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        document.getElementById('error-msg').textContent = 'Неверный логин или пароль';
    }
}

// Проверка авторизации при загрузке защищённых страниц
function requireAuth() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}