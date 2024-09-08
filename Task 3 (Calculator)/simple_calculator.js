// simple_calculator.js
const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.btn'));
const historyList = document.getElementById('history-list');
const operators = ['/', '*', '-', '+'];

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.dataset.value;

        if (value === 'C') {
            // Clear all functionality (remove all inputs)
            currentInput = '';
            previousInput = '';
            operator = '';
            display.textContent = '';
        } else if (value === '=') {
            // Evaluate the expression
            if (previousInput && currentInput && operator) {
                try {
                    const result = eval(`${previousInput} ${operator} ${currentInput}`).toString();
                    display.textContent = result;
                    addToHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
                    previousInput = '';
                    operator = '';
                    currentInput = result; // To allow further calculations with the result
                } catch (e) {
                    display.textContent = 'Error';
                    currentInput = '';
                    previousInput = '';
                    operator = '';
                }
            }
        } else if (operators.includes(value)) {
            // Handle operator buttons
            if (currentInput) {
                previousInput = currentInput;
                operator = value;
                currentInput = '';
                display.textContent += ` ${value} `;
            }
        } else {
            // Handle number and decimal buttons
            currentInput += value;
            display.textContent += value;
        }
    });
});

// Function to add calculation to history
function addToHistory(entry) {
    const li = document.createElement('li');
    li.textContent = entry;

    // Delete button for each history entry
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(deleteBtn);
    historyList.appendChild(li);
}
