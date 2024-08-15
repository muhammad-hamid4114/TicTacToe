let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0; //To Check Draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4 ,6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true,
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO) {
            //playerO
            box.textContent = "O";
            box.style.color = "#090C02";
            turnO = false;
        } else {
            //playerX
            box.textContent = "X";
            box.style.color = "#A72608";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
        gameDraw();
       }
    });
});

const gameDraw = () => {
    msg.textContent = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.textContent = "";
    }
};
const showWinner = (winner) => {
    msg.textContent = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].textContent;
        let pos2Val = boxes[pattern[1]].textContent;
        let pos3Val = boxes[pattern[2]].textContent;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos1Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame)
