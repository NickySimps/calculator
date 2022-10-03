const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const screen = document.querySelector(".output");
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
let operation;
let solution;
screen.textContent = "";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ANIMATIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
  delay: anime.stagger(250, { grid: [3, 3], from: "center" }),
  duration: 500 / 10,
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
    screen.textContent += digit.innerText;
  });
}
decimalPoint.addEventListener("click", () => {
  if (screen.textContent == "") {
    screen.textContent = 0 + decimalPoint.innerText;
  } else {
    screen.textContent += decimalPoint.innerText;
  }
});

add.addEventListener("click", () => {
  operation = (operand1, operand2) => {
    return operand1 + operand2;
  }
  if (operand1 == "") {
    operand1 = parseFloat(screen.textContent);
    screen.textContent = "";
  } else {
    operand2 = parseFloat(screen.textContent);
    solution = operation(operand1, operand2);
    operand1 = solution;
    operand2 = "";
    screen.textContent = "";
  }
});
subtract.addEventListener("click", () => {
  operation = (operand1, operand2) => {
    return operand1 - operand2;
  }
  if (operand1 == "") {
    operand1 = parseFloat(screen.textContent);
    screen.textContent = "";
  } else {
    operand2 = parseFloat(screen.textContent);
    solution = operation(operand1, operand2);
    operand1 = solution;
    operand2 = "";
    screen.textContent = "";
  }
});
multiply.addEventListener("click", () => {
  operation = (operand1, operand2) => {
    return operand1 * operand2;
  }
  if (operand1 == "") {
    operand1 = parseFloat(screen.textContent);
    screen.textContent = "";
  } else {
    operand2 = parseFloat(screen.textContent);
    solution = operation(operand1, operand2);
    operand1 = solution;
    operand2 = "";
    screen.textContent = "";
  }
});
divide.addEventListener("click", () => {
  operation = (operand1, operand2) => {
    return operand1 / operand2;
  }
  if (operand1 == "") {
    operand1 = parseFloat(screen.textContent);
    screen.textContent = "";
  } else {
    operand2 = parseFloat(screen.textContent);
    solution = operation(operand1, operand2);
    operand1 = solution;
    operand2 = "";
    screen.textContent = "";
  }
});
power.addEventListener("click", () => {
  operation = (operand1, operand2) => {
    return Math.pow(operand1, operand2);
  }
  if (operand1 == "") {
    operand1 = parseFloat(screen.textContent);
    screen.textContent = "";
  } else {
    operand2 = parseFloat(screen.textContent);
    solution = operation(operand1, operand2);
    operand1 = solution;
    operand2 = "";
    screen.textContent = "";
  }
});
posNeg.addEventListener("click", () => {
  screen.textContent = negativeNum(screen.textContent);
});
clearBtn.addEventListener("click", () => {
  operand1 = "";
  operand2 = "";
  solution = "";
  console.log("reset");
  screen.textContent = "";
});
calcBtn.addEventListener("click", () => {
  operand2 = parseFloat(screen.textContent);
  solution = operation(operand1, operand2);
  console.log(solution);
  screen.textContent = parseFloat(solution);
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
