const questions = 26; // 題目總數
let currentQuestion = 0;
let answers = Array(questions).fill(null); // 新增26格空的答案陣列，先放上 null

// 題目產生器
function initSurvey() {
  const questionDescriptions = [
    "整體來說，您如何評價您的生活品質？",
    "整體來說，您滿意自己的健康嗎?",
    "您覺得身體疼痛會妨礙您處理需要做的事情嗎？",
    "您需要靠醫療的幫助應付日常生活嗎?",
    "您享受生活嗎？",
    "您覺得自己的生命有意義嗎？",
    "您集中精神（含思考、學習、記憶）的能力有多好？",
    "在日常生活中，您感到安全嗎?",
    "您所處的環境健康嗎?  (如污染、噪音、氣候、景觀等)",
    "您每天的生活有足夠的精力嗎?",
    "您能接受自己的外表嗎?",
    "您有足夠的金錢應付所需嗎?",
    "您能方便得到每日生活所需的資訊嗎？",
    "您有機會從事休閒活動嗎?",
    "您四處行動的能力好嗎？",
    "您滿意自己的睡眠狀況嗎?",
    "您對自己從事日常活動的能力滿意嗎?",
    "您滿意自己的工作能力嗎？",
    "您對自己滿意嗎?",
    "您滿意自己的人際關係嗎?",
    "您滿意自己的性生活嗎?",
    "您滿意朋友給您的支持嗎?",
    "您滿意自己住所的狀況嗎?",
    "您對醫療保健服務的方便程度滿意嗎？",
    "您滿意所使用的交通運輸方式嗎？",
    "您常有負面的感受嗎？（如擔心、傷心、緊張、焦慮、憂鬱等）",
  ];

  for (let i = 1; i <= questions; i++) {
    let optionsHtml = '';
    if (i === 1 || i === 7 || i === 15) {
      optionsHtml = `
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="1"> 很差
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="2"> 	差
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="3"> 一般
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="4"> 好
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="5"> 很好
        </label>
      `;
    } else if (i === 2 || i === 9 || i >= 16 && i < 26) {
      optionsHtml = `
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="1"> 非常不滿意
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="2"> 不滿意
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="3"> 中等
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="4"> 滿意
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="5"> 非常滿意
        </label>
      `;
    } else {
      optionsHtml = `
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="1"> 完全不
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="2"> 有一點
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="3"> 中等
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="4"> 很有
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="question${i}" value="5"> 極度
        </label>
      `;
    }

    $('#surveyForm').append(`
      <div class="question-card" id="question-${i}">
        <h4>問題${i}: ${questionDescriptions[i - 1]}</h4>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          ${optionsHtml}
        </div>
      </div>
    `);
  }

  // 新增 change eventlistener 來記錄答案變化
  for (let i = 1; i <= questions; i++) {
    $(`input[name=question${i}]`).change(function() {
      // 把答案放進answers陣列
      answers[i - 1] = $(this).val();
      // 選完一題後，顯示下一題
      setTimeout(() => {
        changeQuestion(1);
      }, 200); // 200ms 動畫時間
    });
  }

  // 顯示第一題題目
  $(`#question-1`).addClass('active');
  updateProgress();
}

function changeQuestion(direction) {
  if (direction > 0 && !isQuestionAnswered(currentQuestion + 1)) {
    // 如果還沒答完問題就按下下一題，則警告
    alert('請先完成目前題目');
    return;
  }

  if (currentQuestion + direction >= 0 && currentQuestion + direction < questions) {
    $(`#question-${currentQuestion + 1}`).removeClass('active');
    currentQuestion += direction;
    $(`#question-${currentQuestion + 1}`).addClass('active');
    updateProgress();
  }

// 如果問題都答完了，再長出「送出」按鈕
$('#prevBtn').prop('disabled', currentQuestion === 0);
$('#nextBtn').toggle(currentQuestion !== questions - 1);
$('#submitBtn').toggle(currentQuestion === questions - 1);
}

// 進到下一題前確認當前題目是否已回答
function isQuestionAnswered(questionNumber) {
  return $(`input[name=question${questionNumber}]:checked`).length > 0;
}

// 進度條
function updateProgress() {
  const progress = ((currentQuestion + 1) / questions) * 100;
  $('.progress-bar').css('width', `${progress}%`).attr('aria-valuenow', progress);
  $('#progress-text').text(`${currentQuestion + 1} / ${questions} (${Math.round(progress)}%)`);
}

// 送出答案
function submitSurvey() {
  // 確保所有答案都已填寫
  if (answers.includes(null) || answers.includes(undefined) || answers.length < 26) {
    alert("請確認所有題目都已回答");
    return;
  }

  calculateScores();
}

function calculateScores() {
  let physiologicalScore = (
    (6 - parseInt(answers[2], 10)) +
    (6 - parseInt(answers[3], 10)) +
    parseInt(answers[9], 10) +
    parseInt(answers[14], 10) +
    parseInt(answers[15], 10) +
    parseInt(answers[16], 10) +
    parseInt(answers[17], 10)
  ) / 7 * 4 - 4;

  let psychologicalScore = (
    parseInt(answers[4], 10) +
    parseInt(answers[5], 10) +
    parseInt(answers[6], 10) +
    parseInt(answers[10], 10) +
    parseInt(answers[18], 10) +
    (6 - parseInt(answers[25], 10))
  ) / 6 * 4 - 4;

  let socialScore = (
    parseInt(answers[19], 10) +
    parseInt(answers[20], 10) +
    parseInt(answers[21], 10)
  ) / 3 * 4 - 4;

  let environmentalScore = (
    parseInt(answers[7], 10) +
    parseInt(answers[8], 10) +
    parseInt(answers[11], 10) +
    parseInt(answers[12], 10) +
    parseInt(answers[13], 10) +
    parseInt(answers[22], 10) +
    parseInt(answers[23], 10) +
    parseInt(answers[24], 10)
  ) / 8 * 4 - 4;

  // 將結果轉換為百分比
  physiologicalScore = physiologicalScore * (100 / 16);
  psychologicalScore = psychologicalScore * (100 / 16);
  socialScore = socialScore * (100 / 16);
  environmentalScore = environmentalScore * (100 / 16);

  // 結果輸出或顯示
  console.log(`Physiological Score: ${physiologicalScore.toFixed(2)}`);
  console.log(`Psychological Score: ${psychologicalScore.toFixed(2)}`);
  console.log(`Social Score: ${socialScore.toFixed(2)}`);
  console.log(`Environmental Score: ${environmentalScore.toFixed(2)}`);

  function displayScores(physiologicalScore, psychologicalScore, socialScore, environmentalScore) {
    const scores = [{name: '生理', score: physiologicalScore}, {name: '心理', score: psychologicalScore}, {name: '社會', score: socialScore}, {name: '環境', score: environmentalScore}];
    const scoresContainer = document.getElementById('scoresContainer');
    scoresContainer.innerHTML = ''; // 清空現有的分數圓圈

    scores.forEach(score => {
      const circle = document.createElement('div');
      circle.classList.add('score-circle');
      // 根據分數決定顏色
      if (score.score < 60) circle.classList.add('red');
      else if (score.score < 70) circle.classList.add('orange');
      else if (score.score < 80) circle.classList.add('yellow');
      else if (score.score < 90) circle.classList.add('blue');
      else circle.classList.add('green');

      circle.innerHTML = `<div>${score.name}<br>${score.score.toFixed(2)}</div>`;
      scoresContainer.appendChild(circle);
    });
  }

  displayScores(physiologicalScore, psychologicalScore, socialScore, environmentalScore)
}

$(document).ready(function() {
  initSurvey();
});
