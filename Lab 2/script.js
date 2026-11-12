const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

let current = "0";
let previous = null;
let operator = null;
let startNewNumber = false;

const operators = ["+", "−", "×", "÷"];

function calculate() {
  const second = Number(current);
  let result;

  if (operator === "+") result = previous + second;
  if (operator === "−") result = previous - second;
  if (operator === "×") result = previous * second;
  if (operator === "÷") {
    if (second === 0) {
      display.textContent = "Error";
      current = "0";
      previous = null;
      operator = null;
      startNewNumber = false;
      return false;
    }
    result = previous / second;
  }

  if (Number.isInteger(result)) {
    current = String(result);
  } else {
    current = String(parseFloat(result.toPrecision(10)));
  }

  previous = null;
  operator = null;
  startNewNumber = true;
  display.textContent = current;
  return true;
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.textContent.trim();

    if (!isNaN(value)) {
      if (startNewNumber || current === "0") {
        current = value;
        startNewNumber = false;
      } else if (current.length < 9) {
        current = current + value;
      }
      display.textContent = current;
    } else if (value === "C") {
      current = "0";
      previous = null;
      operator = null;
      startNewNumber = false;
      display.textContent = current;
    } else if (operators.includes(value)) {
      if (operator !== null && !startNewNumber) {
        const worked = calculate();
        if (worked === false) {
          return;
        }
      }
      previous = Number(current);
      operator = value;
      startNewNumber = true;
    } else if (value === "=") {
      if (operator !== null) {
        calculate();
      }
    }
  });
});
