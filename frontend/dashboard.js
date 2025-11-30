const token = localStorage.getItem('token');
if (!token) {
    alert('Você precisa estar logado!');
    window.location.href = 'index.html';
}

const usuario = JSON.parse(localStorage.getItem('usuario'));
document.getElementById('welcomeMessage').innerText = `Olá, ${usuario.nome}`;

const DEFAULT_IMAGE = 'https://via.placeholder.com/300x160/1e293b/94a3b8?text=Sem+Imagem';

async function carregarJogos() {
    try {
        const response = await fetch('http://localhost:3000/jogos', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const jogos = await response.json();
        const listaElement = document.getElementById('gamesList');
        listaElement.innerHTML = ''; 

        if (jogos.length === 0) {
            listaElement.innerHTML = '<p style="color: #94a3b8; text-align: center; grid-column: 1/-1;">Nenhum jogo encontrado na sua biblioteca.</p>';
            return;
        }

        jogos.forEach(jogo => {
            const card = document.createElement('div');
            card.className = 'game-card'; 
            
            const imgUrl = jogo.imagem || DEFAULT_IMAGE;

            const imgTag = `<img src="${imgUrl}" class="game-img" onerror="this.src='${DEFAULT_IMAGE}'" alt="${jogo.titulo}">`;
            
            const notaDisplay = jogo.nota ? `⭐ ${jogo.nota}/10` : 'Sem nota';

            card.innerHTML = `
                ${imgTag}
                
                <div style="flex-grow: 1;"> <h4>${jogo.titulo}</h4>
                    <span>🎮 ${jogo.plataforma}</span>
                    <span class="status-badge status-${jogo.status}">${jogo.status}</span>
                    <span>Prioridade: ${jogo.prioridade || 'N/A'}</span>
                    <span style="font-weight:bold; color:#f59e0b; margin-top:5px; display:block">${notaDisplay}</span>
                </div>
                
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button onclick='abrirModal(${JSON.stringify(jogo)})' class="btn-edit" style="flex:1">Editar</button>
                    <button onclick="deletarJogo(${jogo.id})" class="btn-delete" style="flex:1">Excluir</button>
                </div>
            `;
            
            listaElement.appendChild(card);
        });

    } catch (error) {
        console.error('Erro ao buscar jogos:', error);
    }
}

document.getElementById('addGameForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const plataforma = document.getElementById('plataforma').value;
    const status = document.getElementById('status').value;
    const prioridade = document.getElementById('prioridade').value;
    const imagem = document.getElementById('imagem').value; 

    try {
        await fetch('http://localhost:3000/jogos', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ titulo, plataforma, status, prioridade, imagem })
        });
        
        document.getElementById('addGameForm').reset();
        carregarJogos();

    } catch (error) { console.error(error); }
});

async function deletarJogo(id) {
    if (confirm('Tem certeza que deseja excluir este jogo?')) {
        try {
            await fetch(`http://localhost:3000/jogos/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            carregarJogos();
        } catch (error) {
            alert('Erro ao deletar.');
        }
    }
}

function abrirModal(jogo) {
    const modal = document.getElementById('modalEdicao');
    modal.style.display = 'block';
    
    document.getElementById('editId').value = jogo.id;
    document.getElementById('editStatus').value = jogo.status;
    document.getElementById('editPrioridade').value = jogo.prioridade || 'Baixa';
    document.getElementById('editNota').value = jogo.nota || '';
    document.getElementById('editImagem').value = jogo.imagem || ''; 
}

function fecharModal() {
    document.getElementById('modalEdicao').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modalEdicao');
    if (event.target == modal) {
        fecharModal();
    }
}

document.getElementById('editGameForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editId').value;

    const status = document.getElementById('editStatus').value;
    const prioridade = document.getElementById('editPrioridade').value;
    const nota = document.getElementById('editNota').value;
    const imagem = document.getElementById('editImagem').value;

    try {
        const response = await fetch(`http://localhost:3000/jogos/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ status, prioridade, nota, imagem })
        });

        if (response.ok) {
            alert('Jogo atualizado com sucesso!');
            fecharModal();
            carregarJogos();
        } else {
            alert('Erro ao atualizar.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}

carregarJogos();