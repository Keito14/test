let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let totalQuestions = 3;
let radio, submitButton, question, optionsDiv;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#F2D0A4");

  // 在左上角顯示文字
  let infoText = createP("413730309謝昕娟");
  infoText.position(10, 10);
  infoText.style('font-size', '16px');
  infoText.style('color', '#000');

  generateQuestions();
  displayQuestion();
}

function draw() {
  background("#F2D0A4");
}

function generateQuestions() {
  for (let i = 0; i < totalQuestions; i++) {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let operator = Math.random() > 0.5 ? '+' : '-';
    let correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;
    let options = generateOptions(correctAnswer);
    questions.push({ num1, num2, operator, correctAnswer, options });
  }
}

function generateOptions(correctAnswer) {
  let options = new Set();
  options.add(correctAnswer);
  while (options.size < 4) {
    options.add(Math.floor(Math.random() * 19) - 9); // 隨機生成 -9 到 9 的數字
  }
  return Array.from(options).sort(() => Math.random() - 0.5); // 隨機排序選項
}

function displayQuestion() {
  if (currentQuestionIndex < totalQuestions) {
    let q = questions[currentQuestionIndex];
    let questionText = `${q.num1} ${q.operator} ${q.num2} = ?`;

    if (question) question.remove();
    question = createP(questionText);
    question.position((windowWidth - 600) / 2, windowHeight / 2 - 50);
    question.style('font-size', '24px');
    question.style('width', '600px');
    question.style('text-align', 'center');

    if (radio) radio.remove();
    radio = createRadio();
    radio.style('width', '600px');
    radio.style('display', 'flex');
    radio.style('justify-content', 'space-between');

    if (optionsDiv) optionsDiv.remove();
    optionsDiv = createDiv();
    optionsDiv.position((windowWidth - 600) / 2, windowHeight / 2);
    optionsDiv.style('width', '600px');
    optionsDiv.style('display', 'flex');
    optionsDiv.style('justify-content', 'space-between');

    q.options.forEach(option => {
      radio.option(option.toString());
    });

    radio.parent(optionsDiv);

    if (submitButton) submitButton.remove();
    submitButton = createButton('提交');
    submitButton.position((windowWidth + 600) / 2 + 10, windowHeight / 2);
    submitButton.style('font-size', '20px');
    submitButton.mousePressed(checkAnswer);
  } else {
    displayResults();
  }
}

function checkAnswer() {
  let selectedOption = parseInt(radio.value());
  if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
    correctAnswers++;
  }
  currentQuestionIndex++;
  displayQuestion();
}

function displayResults() {
  if (question) question.remove();
  if (radio) radio.remove();
  if (optionsDiv) optionsDiv.remove();
  if (submitButton) submitButton.remove();

  let resultText = `測驗結束！你答對了 ${correctAnswers} 題，答錯了 ${totalQuestions - correctAnswers} 題。`;
  let result = createP(resultText);
  result.position((windowWidth - 600) / 2, windowHeight / 2 - 50);
  result.style('font-size', '24px');
  result.style('width', '600px');
  result.style('text-align', 'center');
}