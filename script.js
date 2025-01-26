let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#new-game");
let msgCont = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");
let turn0 = true;
let count = 0;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    enableBox();
    msgCont.classList.add("hide");


}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let win = checkWinner();
        if (count == 9 && !win) {
            gamedraw();
        }
    });
});

const gamedraw = () => {
    msg.innerText = `Game Draw`;
    msgCont.classList.remove("hide");
    disableBox();
}

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        count = 0;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgCont.classList.remove("hide");
    disableBox();
}

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                showWinner(pos1);
                return true;
            }
        }

    }
}

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

