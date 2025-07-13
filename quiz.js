const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Trainer Marking Language"],
    answer: 1
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-style", "background-color", "color", "text-style"],
    answer: 2
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Management", "Digital Ordinance Model", "Document Orientation Method"],
    answer: 0
  },
  {
    question: "Which is a JavaScript framework?",
    options: ["Bootstrap", "Laravel", "React", "Photoshop"],
    answer: 2
  },
  {
    question: "What symbol is used for jQuery?",
    options: ["$", "#", "@", "&"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;

$(document).ready(function () {
  loadQuestion();

  $('#next-btn').click(function () {
    const selected = $("input[name='option']:checked").val();
    if (selected == quizData[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
    $('#next-btn').prop('disabled', true);
  });

  $('#options').on('change', 'input[name="option"]', function () {
    $('#next-btn').prop('disabled', false);
  });
});

function loadQuestion() {
  const q = quizData[currentQuestion];
  $('#question').text(`Q${currentQuestion + 1}: ${q.question}`);
  $('#options').empty();
  q.options.forEach((opt, i) => {
    $('#options').append(`
      <label class="bg-white border border-gray-300 rounded p-2 cursor-pointer flex items-center space-x-2 hover:bg-blue-50 transition">
        <input type="radio" name="option" value="${i}" class="form-radio" />
        <span>${opt}</span>
      </label>
    `);
  });
}

function showResult() {
  $('#quiz-box').hide();
  $('#score').text(score);
  $('#result-box').removeClass('d-none');
}
