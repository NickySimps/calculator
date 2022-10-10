const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const memory = document.querySelector(".memory-storage");
const output = document.querySelector(".output");
const clearBtn = document.querySelector(".clearBtn");
const calcBtn = document.querySelector(".calcBtn");
const decimalPoint = operators[0];
const posNeg = operators[1];
const add = operators[2];
const subtract = operators[3];
const multiply = operators[4];
const divide = operators[5];
const power = operators[6];
let operand1 = "";
let operand2 = "";
let operation1 = null;
let operation2 = null;
let solution;
memory.textContent = "";
output.textContent = "";
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
  loop: 4,
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
  loop: 4,
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
  loop: 4,
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
for (let digit of digits) {
  digit.addEventListener("click", () => {
    output.textContent += digit.innerText;
  });
}
decimalPoint.addEventListener("click", () => {
  output.textContent == ""
    ? (output.textContent = 0 + decimalPoint.innerText)
    : output.textContent.includes(".")
    ? false
    : (output.textContent += decimalPoint.innerText);
});

add.addEventListener("click", (e) => {
  if (output.textContent == "" && memory.textContent == "") {
    output.textContent = "ERROR";
  } else if (output.textContent !== "") {
    if (operation1 == null) {
      operand1 = parseFloat(output.textContent);
      operation1 = addition;
      memory.textContent = operand1 + e.target.textContent;
      output.textContent = "";
    } else if (memory.textContent !== "") {
      operand1 = parseFloat(memory.textContent);
      operand2 = parseFloat(output.textContent);
      solution = operation1(operand1, operand2);
      memory.textContent = solution + e.target.textContent;
      operation1 = addition;
      output.textContent = "";
    } else {
      operand2 = parseFloat(output.textContent);
      operation2 = addition;
      memory.textContent =
        operation2(operand1, operand2) + e.target.textContent;
      output.textContent = "";
    }
  } else if (output.textContent == "" && memory.textContent !== "") {
    operand1 = parseFloat(memory.textContent);
    memory.textContent = operand1 + e.target.textContent;
    operation1 = addition;
  }
});
subtract.addEventListener("click", (e) => {
  if (output.textContent == "" && memory.textContent == "") {
    output.textContent = "ERROR";
  } else if (output.textContent !== "") {
    if (operation1 == null) {
      operand1 = parseFloat(output.textContent);
      operation1 = subtraction;
      memory.textContent = operand1 + e.target.textContent;
      output.textContent = "";
    } else if (memory.textContent !== "") {
      operand1 = parseFloat(memory.textContent);
      operand2 = parseFloat(output.textContent);
      solution = operation1(operand1, operand2);
      memory.textContent = solution + e.target.textContent;
      operation1 = subtraction;
      output.textContent = "";
    } else {
      operand2 = parseFloat(output.textContent);
      operation2 = subtraction;
      memory.textContent =
        operation2(operand1, operand2) + e.target.textContent;
      output.textContent = "";
    }
  } else if (output.textContent == "" && memory.textContent !== "") {
    operand1 = parseFloat(memory.textContent);
    memory.textContent = operand1 + e.target.textContent;
    operation1 = subtraction;
  }
});
multiply.addEventListener("click", (e) => {
  if (output.textContent == "" && memory.textContent == "") {
    output.textContent = "ERROR";
  } else if (output.textContent !== "") {
    if (operation1 == null) {
      operand1 = parseFloat(output.textContent);
      operation1 = multiplication;
      memory.textContent = operand1 + e.target.textContent;
      output.textContent = "";
    } else if (memory.textContent !== "") {
      operand1 = parseFloat(memory.textContent);
      operand2 = parseFloat(output.textContent);
      solution = operation1(operand1, operand2);
      memory.textContent = solution + e.target.textContent;
      operation1 = multiplication;
      output.textContent = "";
    } else {
      operand2 = parseFloat(output.textContent);
      operation2 = multiplication;
      memory.textContent =
        operation2(operand1, operand2) + e.target.textContent;
      output.textContent = "";
    }
  } else if (output.textContent == "" && memory.textContent !== "") {
    operand1 = parseFloat(memory.textContent);
    memory.textContent = operand1 + e.target.textContent;
    operation1 = multiplication;
  }
});
divide.addEventListener("click", (e) => {
  if (output.textContent == "" && memory.textContent == "") {
    output.textContent = "ERROR";
  } else if (output.textContent !== "") {
    if (operation1 == null) {
      operand1 = parseFloat(output.textContent);
      operation1 = division;
      memory.textContent = operand1 + e.target.textContent;
      output.textContent = "";
    } else if (memory.textContent !== "") {
      operand1 = parseFloat(memory.textContent);
      operand2 = parseFloat(output.textContent);
      solution = operation1(operand1, operand2);
      memory.textContent = solution + e.target.textContent;
      operation1 = division;
      output.textContent = "";
    } else {
      operand2 = parseFloat(output.textContent);
      operation2 = division;
      memory.textContent =
        operation2(operand1, operand2) + e.target.textContent;
      output.textContent = "";
    }
  } else if (output.textContent == "" && memory.textContent !== "") {
    operand1 = parseFloat(memory.textContent);
    memory.textContent = operand1 + e.target.textContent;
    operation1 = division;
  }
});
power.addEventListener("click", (e) => {
  if (output.textContent == "" && memory.textContent == "") {
    output.textContent = "ERROR";
  } else if (output.textContent !== "") {
    if (operation1 == null) {
      operand1 = parseFloat(output.textContent);
      operation1 = powerOfNum;
      memory.textContent = operand1 + e.target.textContent;
      output.textContent = "";
    } else if (memory.textContent !== "") {
      operand1 = parseFloat(memory.textContent);
      operand2 = parseFloat(output.textContent);
      solution = operation1(operand1, operand2);
      memory.textContent = solution + e.target.textContent;
      operation1 = powerOfNum;
      output.textContent = "";
    } else {
      operand2 = parseFloat(output.textContent);
      operation2 = powerOfNum;
      memory.textContent =
        operation2(operand1, operand2) + e.target.textContent;
      output.textContent = "";
    }
  } else if (output.textContent == "" && memory.textContent !== "") {
    operand1 = parseFloat(memory.textContent);
    memory.textContent = operand1 + e.target.textContent;
    operation1 = powerOfNum;
  }
});
posNeg.addEventListener("click", () => {
  output.textContent = negativeNum(output.textContent);
});
clearBtn.addEventListener("click", () => {
  clearAll.play();
  operand1 = "";
  operand2 = "";
  solution = "";
  operation1 = null;
  operation2 = null;
  output.textContent = "";
  memory.textContent = "";
  console.log("reset");
});
calcBtn.addEventListener("click", () => {
  operand1 = parseFloat(memory.textContent);
  operand2 = parseFloat(output.textContent);
  solution = operation1(operand1, operand2);
  console.log(solution);
  output.textContent = "";
  operand1 = solution;
  memory.textContent = parseFloat(solution).toFixed(4);
});

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
function negativeNum(num1) {
  return num1 * -1;
}
function powerOfNum(num1, num2) {
  return Math.pow(num1, num2);
}
