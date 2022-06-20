let cardsQuantity;
let correctPairs = 0;
const cardsArray = [];
let firstCard;
let secondCard;
let playedTurns = 0;

function deckMaker() {
    cardsQuantity = prompt("Com quantas cartas você deseja jogar?");
    cardsQuantity = Number(cardsQuantity);
    if (cardsQuantity === null || cardsQuantity < 4 || cardsQuantity > 14 || cardsQuantity % 2 != 0) {
        alert("Número de cartas inválido! Insira números pares entre 4 e 14");
        cardsQuantity = 0;
        deckMaker();
    }
    const names = ["bobross", "fiesta", "explody", "metal", "revertit", "triplets", "unicorn"];

    for (let i = 0; i < cardsQuantity / 2; i++) {
        const cardsTemplate = `<div class="card" onclick="turnCard(this)">
        <div class="front-face face">
            <img src="./img/front.png" alt="" class="parrot-img">   
        </div>
        <div class="back-face face">
            <img src="./img/${names[i]}parrot.gif" alt="" class="back-img"/>   
        </div>
    </div>
    `;
        cardsArray.push(cardsTemplate);
    }
    let finalCardsArray = cardsArray.concat(cardsArray);
    finalCardsArray = finalCardsArray.sort(comparador);
    for (let i = 0; i < cardsQuantity; i++) {
        document.querySelector(".card-container").innerHTML += finalCardsArray[i];
    }
}

function comparador() {
    return Math.random() - 0.5;
}

function turnCard(element) {
    if(element.classList.contains('turn') || secondCard !== undefined){
        return;
    }
    playedTurns++;
    element.classList.add('turn');

    if(firstCard === undefined){
        firstCard = element;
    }

    else{
        secondCard = element;
    }

    compareCards();
}

function compareCards() {
    if(firstCard.innerHTML === secondCard.innerHTML){
        correctPairs++;
        firstCard.removeAttribute("onclick");
        secondCard.removeAttribute("onclick");
        cardsUndefined();
        if(correctPairs === (cardsQuantity/2)){
            setTimeout(() => {
                alert(`Você venceu em ${playedTurns} jogadas!`);
                let opcao = prompt("Deseja jogar novamente? Digite sim ou nao").toLowerCase();
                if(opcao==='sim'){
                    window.location.reload();
                }
                else{
                    alert("Ate mais!");
                }
            }, 1000)
        }
    }
    else{
        setTimeout(() => {
            firstCard.classList.remove('turn');
            secondCard.classList.remove('turn');
            cardsUndefined();
        }, 1000)
    }
}

function cardsUndefined(){
    firstCard = undefined;
    secondCard = undefined;
}

deckMaker();
