// public/app.js

const leadForm = document.getElementById('leadForm');
const formMsg = document.getElementById('formMsg');

// URL para onde os dados serão enviados (sua Rota de Captação)
const API_URL = 'http://localhost:3000/api/leads'; 

leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Coleta os dados dos campos do formulário
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const website = document.getElementById('website').value.trim();

    // 2. Monta o objeto de dados
    const formData = { name, email, website };

    // 3. Feedback inicial para o usuário
    formMsg.style.color = '#b7b7bd'; 
    formMsg.textContent = 'Enviando sua proposta...';
    
    // 4. Envio dos dados usando a API Fetch
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indica que estamos enviando JSON
            },
            body: JSON.stringify(formData) // Converte o objeto JavaScript em uma string JSON
        });

        const data = await response.json();

        if (response.ok) {
            // Se o status HTTP for 200-299 (sucesso)
            formMsg.style.color = '#b7ffea'; // Cor de sucesso (verde/ciano claro)
            formMsg.textContent = `Obrigado, ${name || 'interessado'}! Seu lead foi salvo e entraremos em contato.`;
            leadForm.reset(); // Limpa o formulário
        } else {
            // Se o status HTTP for 4xx ou 5xx (erro)
            formMsg.style.color = 'red';
            formMsg.textContent = data.message || 'Erro desconhecido ao salvar o lead.';
        }

    } catch (error) {
        // Erro de rede ou servidor offline
        formMsg.style.color = 'red';
        formMsg.textContent = 'Erro de conexão: O servidor do LeadSpark não pôde ser alcançado.';
        console.error('Erro de rede:', error);
    }
});


// (Manter o código de smooth scroll e outros helpers aqui)
