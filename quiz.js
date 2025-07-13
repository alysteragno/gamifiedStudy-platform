const quizData = [
  {
    question: "What is the nature of reality?",
    options: [
      "It is purely physical and material",
      "It is a mental construct",
      "It is unknowable",
      "It is a combination of mind and matter"
    ],
    answer: 3
  },
  {
    question: "Does free will truly exist?",
    options: [
      "Yes, we have absolute freedom",
      "No, everything is predetermined",
      "Free will is an illusion",
      "It depends on context and perspective"
    ],
    answer: 3
  },
  {
    question: "What defines personal identity over time?",
    options: [
      "Memory and consciousness",
      "Physical continuity",
      "Soul or spirit",
      "Social relationships"
    ],
    answer: 0
  },
  {
    question: "Is morality objective or subjective?",
    options: [
      "Objective and universal",
      "Subjective and culturally relative",
      "Neither, it is socially constructed",
      "It depends on divine commands"
    ],
    answer: 1
  },
  {
    question: "What is the meaning of life?",
    options: [
      "To seek happiness and pleasure",
      "To fulfill a divine purpose",
      "To create your own meaning",
      "Life has no inherent meaning"
    ],
    answer: 2
  },
  {
    question: "Can knowledge be truly certain?",
    options: [
      "Yes, through reason and logic",
      "No, all knowledge is fallible",
      "Only mathematical truths are certain",
      "Certainty is irrelevant"
    ],
    answer: 1
  },
  {
    question: "What is consciousness?",
    options: [
      "A product of brain activity",
      "A separate immaterial entity",
      "An emergent property",
      "An illusion created by the mind"
    ],
    answer: 2
  },
  {
    question: "Does time have a beginning and end?",
    options: [
      "Yes, it started with the Big Bang",
      "No, it is infinite",
      "Time is an illusion",
      "We cannot know for sure"
    ],
    answer: 3
  },
  {
    question: "Is beauty objective or subjective?",
    options: [
      "It is an objective feature of the world",
      "It is in the eye of the beholder",
      "It is a social construct",
      "It varies across species"
    ],
    answer: 1
  },
  {
    question: "Can humans achieve true happiness?",
    options: [
      "Yes, through virtue and wisdom",
      "No, happiness is fleeting",
      "Only through spiritual enlightenment",
      "Happiness is a myth"
    ],
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
