import usuario from "../scripts/arquivo.js";

document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;

    function renderCards() {
        const cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = '';

        let usersToShow = usuario.slice(currentIndex, currentIndex + 2);

        // Se o número total de usuários for ímpar e a última parte do array não estiver preenchendo dois cards,
        // adiciona o card anterior se necessário
        if (usersToShow.length < 2 && currentIndex > 0) {
            usersToShow = usuario.slice(currentIndex - 1, currentIndex + 1);
        }

        //Cria a estrutura do card em html de acordo com os dados do 'arquivo.js'
        usersToShow.forEach(user => {
            let cardHTML = `
            <div class="card">
                <figure>
                    <img class="img-perfil" src="${user.foto}" alt="${user.id}, ${user.nome}">
                    <figcaption class="none">${user.nome}</figcaption>
                </figure>
                <div>
                    <p class="comentario">"${user.comentario}"</p>
                    <p class="referencia">${user.nome}, ${user.area_atuacao}</p>
                </div>
            </div>
            `;
            cardContainer.innerHTML += cardHTML;
        });

        updateButtons();
    }

    function updateButtons() {
        const prevButton = document.querySelector('.button.prev');
        const nextButton = document.querySelector('.button.next');

        // Desabilita o botão de voltar se estiver no início
        prevButton.classList.toggle('disable', currentIndex === 0);

        // Desabilita o botão de avançar se estiver no final
        nextButton.classList.toggle('disable', currentIndex >= usuario.length - 2);
    }

    document.querySelector('.next').addEventListener('click', () => {
        if (currentIndex < usuario.length - 2) {
            currentIndex += 1; // Avança um card para mostrar dois novos cards
        } else {
            currentIndex = 0; // Volta ao início se estiver no final do array
        }
        renderCards();
    });

    document.querySelector('.prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 1; // Retrocede um card para mostrar dois novos cards
        } else {
            currentIndex = usuario.length - (usuario.length % 2 === 0 ? 2 : 1); // Vai para o final se estiver no início do array
        }
        renderCards();
    });

    // Renderiza os primeiros cards ao carregar a página
    renderCards();
});
