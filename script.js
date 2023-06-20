const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", function (e) {
  const element = e.target;
  const value = element.value;

  if (!element.matches("button")) return;

  switch (element.value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal();
      break;
    case "clear":
      clear();
      break;
    default:
      inputNumber(value);
  }
  updateDisplay();

  // if (element.classList.contains("operator")) {
  //   handleOperator(element.value);
  //   updateDisplay();
  //   return;
  // }

  // if (element.classList.contains("decimal")) {
  //   inputDecimal();
  //   updateDisplay();
  //   return;
  // }

  // if (element.classList.contains("clear")) {
  //   clear();
  //   updateDisplay();
  //   return;
  // }

  // inputNumber(element.value);
  // updateDisplay();
});

function handleOperator(nextoperator) {
  const value = parseFloat(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextoperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextoperator;
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }

  return second;
}

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function clear() {
  displayValue = "0";
}
