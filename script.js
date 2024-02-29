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
}

$(document).ready(function() {
  initSurvey();
});

