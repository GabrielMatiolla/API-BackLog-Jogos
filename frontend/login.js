document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.user));

            alert('Login realizado com sucesso!');
            
            window.location.href = 'dashboard.html';
        } else {
            alert('Erro: ' + data.error);
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor. Verifique se a API está rodando.');
    }
});