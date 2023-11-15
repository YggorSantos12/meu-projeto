function validateForm(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');

    // Simples validação de usuário e senha (apenas para exemplo)
    if (username === 'yggor' && password === '123') {
        // Redirecionar para a tela 'menu.html'
        window.location.href = 'menu.html';
    } else {
        errorMessage.textContent = 'Credenciais inválidas. Tente novamente.';
    }
}
