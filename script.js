document.addEventListener('DOMContentLoaded', () => {
const digits = document.querySelectorAll(".digit");
const allOperators = document.querySelectorAll(".operator"); 
const memory = document.querySelector(".memory-storage");
const output = document.querySelector(".output"); // Assuming .output is the main display
const clearBtn = document.querySelector(".clearBtn"); // Assuming .clearBtn is the clear button
const calcBtn = document.querySelector(".calcBtn"); // Assuming .calcBtn is the equals button

// Select basic operator buttons with checks
const basicOperatorsContainer = document.querySelector(".operators");
let basicOperatorButtons = []; // Initialize as empty array

if (basicOperatorsContainer) {
    basicOperatorButtons = basicOperatorsContainer.querySelectorAll(".operator");
} else {
    console.error("Basic operators container '.operators' not found. Basic operator buttons may not function.");
}

// Assign basic operator buttons with null checks, assuming a fixed order.
// It's more robust to use unique IDs or data-attributes for each button, matching the HTML.
const decimalPoint = basicOperatorsContainer ? basicOperatorsContainer.querySelector(".operator[data-op='decimal']") : null; // Example: data-op="decimal"
const posNeg = basicOperatorsContainer ? basicOperatorsContainer.querySelector(".operator[data-op='posNeg']") : null;       // Example: data-op="posNeg"
const add = basicOperatorsContainer ? basicOperatorsContainer.querySelector(".operator[data-op='add']") : null;          // Example: data-op="add"
const subtract = basicOperatorsContainer ? basicOperatorsContainer.querySelector(".operator[data-op='subtract']") : null;    // Example: data-op="subtract"
const multiply = basicOperatorsContainer ? basicOperatorsContainer.querySelector(".operator[data-op='multiply']") : null;    // Example: data-op="multiply"
const divide = basicOperatorsContainer ? basicOperatorsContainer.querySelector(".operator[data-op='divide']") : null;      // Example: data-op="divide"
const power = document.querySelector(".scientific-operators .operator[data-op='power']"); // Select power from scientific operators container

// Scientific mode elements
const scientificButtons = document.querySelectorAll(".scientific-operators .operator[data-op]");
const degBtn = document.getElementById("degBtn");
const radBtn = document.getElementById("radBtn");

let operand1 = "";
let operand2 = "";
let operation1 = null;
let lastAnswer = null; // For 'Ans' button
let angleMode = 'RAD'; // Default angle mode, as RAD button is initially disabled
let clearOutputOnNextInput = false; // Flag to manage clearing output

if (memory) {
    memory.textContent = "";
} else {
    console.error("Memory display element '.memory-storage' not found.");
}
if (output) {
    output.textContent = "";
} else {
    console.error("Output display element '.output' not found.");
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ANIMATIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let calculatorShake = anime({
  targets: ".calculator-body",
  translateY: [
    { value: 1000, duration: 0 },
    { value: 0, duration: 1000 },
  ],
  rotate: [
    { value: 0, delay: 1000, duration: 250 },
    { value: 45, duration: 400, easing: "easeInOutSine" },
    { value: -45, duration: 400, easing: "easeInOutSine" },
    { value: 25, duration: 250, easing: "easeInOutSine" },
    { value: -25, duration: 150, easing: "easeInOutSine" },
    { value: 15, duration: 150, easing: "easeInOutSine" },
    { value: -15, duration: 100, easing: "easeInOutSine" },
    { value: 0, duration: 100, easing: "easeInOutElastic(7,1.1)" },
  ],
  loop: 1,
  easing: "easeOutElastic(4,1.2)",
});

let clearAll = anime({
  targets: [".operator", ".digit", ".screen"],
  backgroundColor: [
    {value: "rgb(65,165, 225)", duration:50},
    {value: "rgb(240,128,128)", delay:75, duration:100},
],
  scale: 1.08,
  loop: 1,
  duration: 80,
  autoplay: false,
  direction: "alternate",
  fontSize: "-=0.4em",
  easing: 'easeInOutSine',
  delay: anime.stagger(350 / 18),
});

let digitPress = anime({
  targets: [".digit"],
  translateX: [{ value: 4, duration: 1000 / 10 }],
  translateY: [{ value: 4, duration: 1000 / 10 }],
  filter: ["brightness(1)", "brightness(0.8)"],
  boxShadow: ["5px 5px skyblue", "2px 2px dodgerblue"],
  backgroundColor: ["rgb(105,206,235)", "rgb(65,165, 225)"],
  outline: ["1px solid rgb(65,105,225)", "1px solid rgb(135,206,235)"],
  scale: 0.98,
  loop: 1,
  direction: "alternate",
  easing: "easeInOutCubic",
  delay: anime.stagger(100),
  duration: 100,
});
let clearCalcPress = anime({
  targets: [".clearBtn", ".calcBtn"],
  translateX: [{ value: 4, duration: 1000 / 2 }],
  translateY: [{ value: 4, duration: 1000 / 2 }],
  filter: ["brightness(1)", "brightness(0.8)"],
  boxShadow: ["4px 4px gold", "1px 1px goldenrod"],
  backgroundColor: ["rgb(218,205,0)", "rgb(218,165,032)"],
  outline: ["1px solid rgb(218,165,032)", "1px solid rgb(255,240,000)"],
  scale: 0.98,
  loop: 1,
  direction: "alternate",
  easing: "easeInOutCubic",
  delay: anime.stagger(1000 / 2),
  duration: 500 / 2,
});

let operatorPress = anime({
  targets: [".operator"],
  translateX: [{ value: 4, duration: 1000 / 7 }],
  translateY: [{ value: 4, duration: 1000 / 7 }],
  filter: ["brightness(1)", "brightness(0.8)"],
  boxShadow: ["4px 4px 0px lightpink", "1px 1px 0px salmon"],
  scale: 0.98,
  loop: 1,
  direction: "alternate",
  easing: "easeInOutCubic",
  delay: anime.stagger(1000 / 7),
  duration: 500 / 7,
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("digit")) {
    anime({
      targets: e.target,
      translateX: [{ value: 4, duration: 1000 / 10 }],
      translateY: [{ value: 4, duration: 1000 / 10 }],
      filter: ["brightness(1)", "brightness(0.8)"],
      boxShadow: ["5px 5px skyblue", "2px 2px dodgerblue"],
      backgroundColor: ["rgb(105,206,235)", "rgb(65,165, 225)"],
      outline: ["1px solid rgb(65,105,225)", "1px solid rgb(135,206,235)"],
      scale: 0.98,
      loop: 1,
      direction: "alternate",
      easing: "easeInOutCubic",
      delay: anime.stagger(1000 / 10),
      duration: 1000 / 10,
    });
  }
  if (e.target.classList.contains("operator")) {
    anime({
      targets: e.target,
      translateX: [{ value: 4, duration: 100 }],
      translateY: [{ value: 4, duration: 100 }],
      filter: ["brightness(1)", "brightness(0.8)"],
      boxShadow: ["4px 4px 0px lightpink", "1px 1px 0px salmon"],
      scale: 0.98,
      loop: 1,
      direction: "alternate",
      easing: "easeInOutCubic",
      delay: anime.stagger(100),
      duration: 100,
    });
  }
  if (
    e.target.classList.contains("clearBtn") ||
    e.target.classList.contains("calcBtn")
  ) {
    anime({
      targets: e.target,
      translateX: [{ value: 4, duration: 100 }],
      translateY: [{ value: 4, duration: 100 }],
      filter: ["brightness(1)", "brightness(0.8)"],
      boxShadow: ["4px 4px gold", "1px 1px goldenrod"],
      backgroundColor: ["rgb(218,205,0)", "rgb(218,165,032)"],
      outline: ["1px solid rgb(218,165,032)", "1px solid rgb(255,240,000)"],
      scale: 0.98,
      loop: 1,
      direction: "alternate",
      easing: "easeInOutCubic",
      delay: anime.stagger(100),
      duration: 100,
    });
  }
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~BUTTON BEHAVIOR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Helper to reset calculator state
function resetCalculatorCoreState(clearLastAnswerVal = false) {
    operand1 = "";
    operand2 = ""; // Also reset operand2
    operation1 = null;
    if (clearLastAnswerVal) lastAnswer = null;
    clearOutputOnNextInput = false;
}

// Helper to get operator symbol for display
function getOperatorSymbol(opFunction) {
    if (opFunction === addition) return "+";
    if (opFunction === subtraction) return "-";
    if (opFunction === multiplication) return "x";
    if (opFunction === division) return "&divide;"; // HTML entity for division sign
    if (opFunction === powerOfNum) return "x<sup>y</sup>";
    return ""; // Should not happen for known ops
}

function handleOperation(newOpFunction, opSymbol) {
    const currentOutputValueString = output.textContent;
    const currentOutputValue = parseFloat(currentOutputValueString);

    if (currentOutputValueString === "Error") return;

    clearOutputOnNextInput = false; 

    if (operation1 && currentOutputValueString !== "" && !isNaN(currentOutputValue)) {
        // Chained operation: e.g., 5 + 3 - (currentOutputValue is 3, operation1 is +)
        operand2 = currentOutputValue;
        try {
            const result = operation1(parseFloat(operand1), operand2); // Ensure operand1 is number
            if (isNaN(result) || !isFinite(result)) throw new Error("Calculation Error");
            operand1 = result.toString(); // Store as string
            // lastAnswer is updated by '=' or specific functions
        } catch (e) {
            output.textContent = "Error"; memory.textContent = ""; resetCalculatorCoreState(); clearOutputOnNextInput = true;
            return;
        }
    } else if (currentOutputValueString !== "" && !isNaN(currentOutputValue)) {
        // First operand entered, or number entered after an '='
        operand1 = currentOutputValueString;
    } else if (currentOutputValueString === "" && operand1 !== "") {
        // Output is empty, but operand1 is set (e.g. "5 +" then user presses "-")
        // Just update the operation
    } else if (currentOutputValueString === "" && operand1 === "" && lastAnswer !== null) {
        // Start new operation with "Ans"
        operand1 = lastAnswer.toString();
    } else if (currentOutputValueString === "" && operand1 === "" && opSymbol === "-") {
        // Allow starting a negative number
        output.textContent = "-";
        return; // Don't set operation yet
    } else if (currentOutputValueString === "" && operand1 === "") {
        // Trying to start with an operator (not '-') and no prior input/ans
        operand1 = "0";
    }
    // If operand1 is still not a valid number string at this point, it's an issue.
    if (operand1 === "" || isNaN(parseFloat(operand1))) {
         // If it was just a "-", let it be for now if the next input is a digit.
        if (!(operand1 === "-" && newOpFunction === subtraction)) {
            // Let's be more lenient: if operand1 is empty, assume 0 for display purposes
            if (operand1 === "") operand1 = "0";
        }
    }

    operation1 = newOpFunction;
    memory.textContent = `${formatDisplayNumber(parseFloat(operand1))} ${opSymbol}`; // Display operand1 and new op
    output.textContent = ""; // Clear output for the next number
}

for (let digit of digits) {
  digit.addEventListener("click", () => {
    if (output.textContent === "Error") return;
    if (clearOutputOnNextInput) {
        output.textContent = "";
        clearOutputOnNextInput = false;
    }
    if (output.textContent === "0" && digit.innerText !== ".") { // Avoid "03"
        output.textContent = "";
    }
    if (output.textContent === "-0" && digit.innerText !== "."){ // Avoid "-03"
        output.textContent = "-";
    }
    output.textContent += digit.innerText; // Append the new digit
  });
}

if (decimalPoint) {
    decimalPoint.addEventListener("click", () => {
        if (output.textContent === "Error") return;
        if (clearOutputOnNextInput) {
            output.textContent = "0."; // Start with "0." if clearing after a result
            clearOutputOnNextInput = false;
            return;
        }
        if (output.textContent === "" || output.textContent === "-") {
            output.textContent += "0."; // If output is empty or just "-", start with "0." or "-0."
        } else if (!output.textContent.includes(".")) {
            output.textContent += ".";
        }
    });
} else {
    console.error("Decimal point button not found or not correctly configured.");
}

if (add) add.addEventListener("click", () => handleOperation(addition, "+")); else console.error("Add button not found.");
if (subtract) subtract.addEventListener("click", () => handleOperation(subtraction, "-")); else console.error("Subtract button not found.");
if (multiply) multiply.addEventListener("click", () => handleOperation(multiplication, "x")); else console.error("Multiply button not found.");
if (divide) divide.addEventListener("click", () => handleOperation(division, "&divide;")); else console.error("Divide button not found.");
if (power) power.addEventListener("click", () => handleOperation(powerOfNum, "x<sup>y</sup>")); else console.error("Power button not found.");

if (posNeg) {
    posNeg.addEventListener("click", () => {
      if (output.textContent === "Error" || output.textContent === "") return;
      output.textContent = negativeNum(output.textContent);
    });
} else {
    console.error("Positive/Negative button not found.");
}

// Add event listeners only if the elements exist
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    clearAll.play(); // Animation call
    resetCalculatorCoreState(true); // true to clear lastAnswer as well
    output.textContent = "";
    memory.textContent = "";
    console.log("reset");
  });
} else {
  console.error("Clear button element with class '.clearBtn' not found.");
}

if (calcBtn) {
  calcBtn.addEventListener("click", () => {
      if (operation1 && operand1 !== "" && output.textContent !== "") {
          const num1 = parseFloat(operand1);
          const num2 = parseFloat(output.textContent);

          if (isNaN(num1) || isNaN(num2)) {
              output.textContent = "Error"; memory.textContent = ""; resetCalculatorCoreState(); clearOutputOnNextInput = true;
              return;
          }

          try {
              let solution = operation1(num1, num2); // Declare solution locally
              if (isNaN(solution) || !isFinite(solution)) throw new Error("Calculation Error");

              memory.textContent = `${formatDisplayNumber(num1)} ${getOperatorSymbol(operation1)} ${formatDisplayNumber(num2)} =`;
              output.textContent = formatDisplayNumber(solution);
              
              operand1 = solution.toString(); // The result becomes the new operand1
              lastAnswer = solution;
              operation1 = null; // Equals completes the current operation
              clearOutputOnNextInput = true;
          } catch (e) {
              output.textContent = "Error"; memory.textContent = ""; resetCalculatorCoreState(); clearOutputOnNextInput = true;
          }
      } else if (!operation1 && output.textContent !== "" && lastAnswer === null) {
          // Case: User types a number and presses "=" e.g. "5 ="
          // Display the number itself as the "result"
          const currentVal = parseFloat(output.textContent);
          if (!isNaN(currentVal)) {
              memory.textContent = `${formatDisplayNumber(currentVal)} =`;
              // output.textContent is already currentVal
              operand1 = currentVal.toString();
              lastAnswer = currentVal;
              clearOutputOnNextInput = true;
          }
      }
      // Other cases (e.g., just pressing "=" repeatedly without a full operation) can be ignored or handled if specific behavior is desired.
  });
} else {
  console.error("Calculate button element with class '.calcBtn' not found.");
}

//~~~~~~~~~~~~~~~~~~~~~~~~MATH FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function addition(num1, num2) {
  return num1 + num2;
}
function subtraction(num1, num2) {
  return num1 - num2;
}
function multiplication(num1, num2) {
  return num1 * num2;
}
function division(num1, num2) {
  return num1 / num2;
}
function negativeNum(numStr) {
  const num = parseFloat(numStr);
  if (isNaN(num)) return "Error"; // Or handle appropriately, e.g. return numStr
  return (num * -1).toString();
}
function powerOfNum(num1, num2) {
  return Math.pow(num1, num2);
}

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // Max for IEEE 754 double
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

//~~~~~~~~~~~~~~~~~~~~~~~~SCIENTIFIC FUNCTIONS & HELPERS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function formatDisplayNumber(num) {
  if (isNaN(num) || !isFinite(num)) return "Error";
  const numStr = parseFloat(num.toPrecision(12)).toString();
  // Potentially limit total length if needed, e.g. numStr.slice(0,15)
  return numStr;
}

function applyUnaryOp(mathFunction, requiresAngleConversionInput = false, providesAngleConversionOutput = false) {
  if (clearOutputOnNextInput && output.textContent !== "" && !parseFloat(output.textContent)) clearOutputOnNextInput = false; // If output is not a result, don't clear
  if (output.textContent === "" || output.textContent === "Error") {
    output.textContent = "Error";
    return;
  }
  
  let value = parseFloat(output.textContent);
  if (isNaN(value)) {
    output.textContent = "Error";
    return;
  }

  if (requiresAngleConversionInput && angleMode === 'DEG') {
    value = value * (Math.PI / 180); // Convert DEG to RAD
  }

  let result = mathFunction(value);
  
  if (providesAngleConversionOutput && angleMode === 'DEG') {
    result = result * (180 / Math.PI); // Convert RAD to DEG
  }
  
  output.textContent = formatDisplayNumber(result);
  clearOutputOnNextInput = true; // Next digit input should clear this unary result.
  lastAnswer = result; // Make unary result available for 'Ans'
}

scientificButtons.forEach(button => {
    if (button && typeof button.addEventListener === 'function') {
    button.addEventListener('click', () => {
      const opType = button.dataset.op;
      
      // For constants, if a result was just displayed, clear it before inserting the constant.
      if (clearOutputOnNextInput && (opType === 'pi' || opType === 'e' || opType === 'rand' || opType === 'ans')) {
          output.textContent = ""; 
          clearOutputOnNextInput = false; 
      }

      switch (opType) {
        case 'sin': applyUnaryOp(Math.sin, true); break;
        case 'cos': applyUnaryOp(Math.cos, true); break;
        case 'tan': applyUnaryOp(Math.tan, true); break;
        case 'asin': applyUnaryOp(Math.asin, false, true); break;
        case 'acos': applyUnaryOp(Math.acos, false, true); break;
        case 'atan': applyUnaryOp(Math.atan, false, true); break;
        case 'ln': applyUnaryOp(Math.log); break;
        case 'log': applyUnaryOp(Math.log10); break;
        case 'sqrt': applyUnaryOp(Math.sqrt); break;
        case 'sqr': applyUnaryOp(x => x * x); break;
        case 'reciprocal': applyUnaryOp(x => 1 / x); break;
        case 'factorial': applyUnaryOp(factorial); break;
        case 'percent':
          if (output.textContent !== "" && output.textContent !== "Error") {
              let val = parseFloat(output.textContent);
              if (isNaN(val)) { output.textContent = "Error"; clearOutputOnNextInput = true; break;}

              if (operation1 && operand1 !== "") { // e.g. 100 + 10% (of 100)
                  const baseValue = parseFloat(operand1);
                  if (isNaN(baseValue)) { output.textContent = "Error"; clearOutputOnNextInput = true; break;}
                  output.textContent = formatDisplayNumber(baseValue * (val / 100));
              } else { // e.g. 10% (0.1)
                  output.textContent = formatDisplayNumber(val / 100);
              }
              clearOutputOnNextInput = true;
          } else {
              output.textContent = "Error";
              clearOutputOnNextInput = true;
          }
          break;
        case 'pi': 
          output.textContent = formatDisplayNumber(Math.PI); 
          clearOutputOnNextInput = true; 
          break;
        case 'e': 
          output.textContent = formatDisplayNumber(Math.E); 
          clearOutputOnNextInput = true; 
          break;
        case 'ans':
          if (lastAnswer !== null) {
              output.textContent = formatDisplayNumber(lastAnswer);
          } else if (output.textContent === "") {
              output.textContent = "0"; // Or "Error" if no Ans stored
          }
          clearOutputOnNextInput = true;
          break;
        case 'rand': output.textContent = formatDisplayNumber(Math.random()); clearOutputOnNextInput = true; break;
      } // <-- Added closing brace for the switch statement
    });
  } else {
    console.error('Skipping addEventListener for an invalid item in scientificButtons:', button);
  }
}); // Close scientificButtons.forEach

// Add event listeners only if the elements exist
if (degBtn) {
  degBtn.addEventListener('click', () => {
    angleMode = 'DEG';
    degBtn.disabled = true;
    if (radBtn) radBtn.disabled = false; // Also check radBtn before accessing disabled
    console.log("Angle mode: DEG");
});
} else {
  console.error("Element with ID 'degBtn' not found.");
}

if (radBtn) {
  radBtn.addEventListener('click', () => {
    angleMode = 'RAD';
    radBtn.disabled = true;
    if (degBtn) degBtn.disabled = false; // Also check degBtn before accessing disabled
    console.log("Angle mode: RAD");
});
} else {
  console.error("Element with ID 'radBtn' not found.");
}

// Initialize RAD mode as default active
  if (degBtn) {
    degBtn.disabled = false; // Ensure DEG is enabled if RAD is default.
  } else {
    console.error("degBtn element not found for initialization.");
  }
  if (radBtn) { // Add a check for radBtn as well
    radBtn.disabled = true;
  } else {
    console.error("radBtn element not found for initialization.");
  }
});