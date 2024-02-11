document.addEventListener("DOMContentLoaded", function () {
    const jsonDataUrl = "https://prog2700.onrender.com/threeinarow/random";
    // const jsonDataUrl = "https://prog2700.onrender.com/threeinarow/sample";
    const gameContainer = document.getElementById("theGame");
    let numberOfClicks = 0;
    const heading = document.createElement("h1");
    heading.textContent = "Welcome to Fihan's version of BrainBasher Puzzle"
    heading.style.background = "linear-gradient(to left,blue,green,yellow,red)"
    gameContainer.appendChild(heading);
    fetch(jsonDataUrl)
        .then(response => response.json())
        .then(data => createPuzzle(data))
        .catch(error => console.error('Error fetching data:', error));

    function handletableCellClick(tableCell) {
        const currentState = parseInt(tableCell.dataset.currentState, 10);
        const nextState = (currentState + 1) % 3;
        tableCell.dataset.currentState = nextState;
        // console.log(tableCell);
        numberOfClicks++;
        // console.log(numberOfClicks);
        //Sorce geeks for geeks
        if (tableCell.dataset.currentState == 0) {
            tableCell.style.backgroundColor = 'grey';

        }
        else if (tableCell.dataset.currentState == 1) {
            tableCell.style.backgroundColor = 'blue';

        }
        else if (tableCell.dataset.currentState == 2) {
            tableCell.style.backgroundColor = 'white';

        }
    }

    function check() {
        const tableCells = document.querySelectorAll("td");
        let allCorrect = true;
        let noIncorrect = true;
        tableCells.forEach(tableCell => {
            const currentState = parseInt(tableCell.dataset.currentState, 10);
            const correctState = parseInt(tableCell.dataset.correctState, 10);
            if (currentState !== correctState && currentState !== 0) {
                noIncorrect = false;
                console.log("1");
                if (document.getElementById("showErrors").checked) {
                    tableCell.style.backgroundColor = "red";
                }
            }
            if (currentState !== correctState) {
                allCorrect = false;

            }
        });

        if (allCorrect) {
            alert("You did it!!");
            const attempts = document.createElement("h1");
            attempts.textContent = "Number of clicks: " + numberOfClicks;
            gameContainer.appendChild(attempts);
        } else if (noIncorrect) {
            alert("So far so good");
        }
        else {
            alert("Something is wrong");

        }
    }

    function toggleErrors() {
        const tableCells = document.querySelectorAll("td");

        tableCells.forEach(tableCell => {
            const currentState = parseInt(tableCell.dataset.currentState, 10);
            const correctState = parseInt(tableCell.dataset.correctState, 10);

            if (currentState !== correctState) {

                if (tableCell.dataset.currentState == 0) {
                    tableCell.style.backgroundColor = 'grey';

                }
                else if (tableCell.dataset.currentState == 1) {
                    tableCell.style.backgroundColor = 'blue';

                }
                else if (tableCell.dataset.currentState == 2) {
                    tableCell.style.backgroundColor = 'white';

                }
                if (currentState !== correctState && currentState !== 0) {

                    console.log("1");
                    if (document.getElementById("showErrors").checked) {
                        tableCell.style.backgroundColor = "red";

                    }
                }
            }
        });
    }
    function createPuzzle(data) {

        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        gameContainer.style.margin = "auto";
        gameContainer.style.width = "50%";
        data.rows.forEach(rowData => {
            const row = document.createElement("tr");

            rowData.forEach(tableCellData => {
                const tableCell = document.createElement("td");
                tableCell.dataset.currentState = tableCellData.currentState;
                tableCell.dataset.correctState = tableCellData.correctState;
                tableCell.style.border = '1px solid black';
                tableCell.style.width = '60px';
                tableCell.style.height = '60px';
                if (tableCell.dataset.currentState == 0) {
                    tableCell.style.backgroundColor = 'grey';

                }
                else if (tableCell.dataset.currentState == 1) {
                    tableCell.style.backgroundColor = 'blue';

                }
                else if (tableCell.dataset.currentState == 2) {
                    tableCell.style.backgroundColor = 'white';

                }
                if (tableCellData.canToggle) {
                    tableCell.addEventListener("click", () => handletableCellClick(tableCell));
                }

                row.appendChild(tableCell);
            });

            table.appendChild(row);
        });

        gameContainer.appendChild(table);


        const checkButton = document.createElement("button");
        checkButton.textContent = "Check";
        checkButton.addEventListener("click", check);
        gameContainer.appendChild(checkButton);
//reffered to the stackoverflow
        const errorsCheckbox = document.createElement("input");
        errorsCheckbox.type = "checkbox";
        errorsCheckbox.id = "showErrors";
        errorsCheckbox.addEventListener("change", toggleErrors);
        gameContainer.appendChild(errorsCheckbox);
        const checkboxLabel = document.createElement("label");
        checkboxLabel.textContent = "Show incorrect squares";
        checkboxLabel.htmlFor = "showErrors";
        gameContainer.appendChild(checkboxLabel);
    }

});
