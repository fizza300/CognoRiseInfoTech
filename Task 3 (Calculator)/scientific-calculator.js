const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.btn'));
const operators = ['/', '*', '-', '+', 'sqrt', 'pow', 'log', 'exp', 'pi'];
const historyList = document.getElementById('history-list');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.dataset.value;

        if (value === 'C') {
            // Clear button functionality
            currentInput = '';
            operator = '';
            previousInput = '';
            display.textContent = '';
        } else if (value === '=') {
            // Evaluate the expression
            if (previousInput && currentInput && operator) {
                try {
                    let result;
                    switch (operator) {
                        case 'sqrt':
                            result = Math.sqrt(parseFloat(currentInput));
                            break;
                        case 'pow':
                            result = Math.pow(parseFloat(previousInput), parseFloat(currentInput));
                            break;
                        case 'log':
                            result = Math.log10(parseFloat(currentInput));
                            break;
                        case 'exp':
                            result = Math.exp(parseFloat(currentInput));
                            break;
                        case 'pi':
                            result = Math.PI * parseFloat(currentInput);
                            break;
                        default:
                            result = eval(`${previousInput} ${operator} ${currentInput}`);
                            break;
                    }

                    // Update display and history
                    display.textContent = result;
                    addHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
                    previousInput = result.toString();
                    operator = '';
                    currentInput = '';

                } catch (e) {
                    display.textContent = 'Error';
                    currentInput = '';
                    previousInput = '';
                    operator = '';
                }
            }
        } else if (operators.includes(value)) {
            // Handle operator buttons
            if (value === 'sqrt' || value === 'log' || value === 'exp' || value === 'pi') {
                operator = value;
                previousInput = currentInput || '0';
                currentInput = '';
                display.textContent = `${previousInput} ${value} `;
            } else if (currentInput) {
                previousInput = currentInput;
                operator = value;
                currentInput = '';
                display.textContent = `${previousInput} ${operator} `;
            }
        } else {
            // Handle number buttons
            currentInput += value;
            display.textContent += value;
        }
    });
});

// Function to add history
function addHistory(expression) {
    const li = document.createElement('li');
    li.textContent = expression;

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => li.remove();

    li.appendChild(deleteBtn);
    historyList.appendChild(li);
}
