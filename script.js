let currentTurn = 'cross';

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    if (currentTurn === 'cross' && event.target.classList.contains('cross')) {
        event.dataTransfer.setData("text", event.target.id);
    } else if (currentTurn === 'circle' && event.target.classList.contains('circle')) {
        event.dataTransfer.setData("text", event.target.id);
    }
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const target = event.target;

    if (target.classList.contains('dropBox') && target.children.length === 0) {
        const draggedElement = document.getElementById(data);
        target.appendChild(draggedElement);
        setTimeout(() => {
            checkWinner();
            switchTurn();
        }, 100);
    }
}

function switchTurn() {
    currentTurn = currentTurn === 'cross' ? 'circle' : 'cross';
}

function checkWinner() {
    const dropBoxes = document.querySelectorAll('.dropBox');
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]             
    ];

    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        const boxA = dropBoxes[a].children[0]?.className;
        const boxB = dropBoxes[b].children[0]?.className;
        const boxC = dropBoxes[c].children[0]?.className;

        if (boxA && boxA === boxB && boxA === boxC) {
            alert(`${currentTurn.slice(0)} wins!`);
            disableBoard();
        }
    });
}

function disableBoard() {
    const dropBoxes = document.querySelectorAll('.dropBox');
    dropBoxes.forEach(box => {
        box.style.pointerEvents = 'none';
    });
}

// function resetGame() {
//     const dropBoxes = document.querySelectorAll('.dropBox');
//     dropBoxes.forEach(box => {
//         if (box.children.length > 0) {
//             const piece = box.children[0];
//             const originalBox = document.querySelector(`#${piece.id}`).parentNode;
//             originalBox.appendChild(piece);
//         }
//         box.innerHTML = '';
//         box.style.pointerEvents = 'auto';
//     });
//     currentTurn = 'cross';
// }

// const resetButton = document.querySelector('.reset');
// resetButton.addEventListener('click', resetGame);

function resetGame() {
    location.reload();
}