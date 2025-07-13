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
const xpPerCorrect = 10; // XP per correct answer


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
  $('#result-box').removeClass('hidden');

  const xpEarned = score * xpPerCorrect;

  saveProgress(xpEarned);
  
   // Show score + XP
  $('#score').text(score);
  $('#result-box').removeClass('hidden');

  // Show XP earned
  if (!$('#xp-earned').length) {
    $('#result-box').append(`<p id="xp-earned" class="mt-4 text-lg font-semibold text-purple-700">XP Earned: ${xpEarned}</p>`);
  } else {
    $('#xp-earned').text(`XP Earned: ${xpEarned}`);
  }

  // Show badges
  displayBadges(score);

  // Update and show leaderboard
  updateLeaderboard(score);
  displayLeaderboard();
}

// Save XP and badges to localStorage
function saveProgress(xpEarned) {
  let totalXP = parseInt(localStorage.getItem('totalXP')) || 0;
  totalXP += xpEarned;
  localStorage.setItem('totalXP', totalXP);

  // Save badges earned
  let badges = JSON.parse(localStorage.getItem('badges')) || [];
  const newBadge = getBadge(score);
  if (newBadge && !badges.includes(newBadge)) {
    badges.push(newBadge);
    localStorage.setItem('badges', JSON.stringify(badges));
  }
}

// Determine badge by score
function getBadge(score) {
  if (score === maxScore) return 'Quiz Master 🏆';
  if (score >= 4) return 'Philosophy Pro 🌟';
  if (score >= 2) return 'Rising Thinker 💡';
  return null;
}

function displayBadges(score) {
  let badges = JSON.parse(localStorage.getItem('badges')) || [];
  const badgeContainerId = 'badge-container';
  let container = $(`#${badgeContainerId}`);
  if (container.length === 0) {
    $('#result-box').append(`<div id="${badgeContainerId}" class="mt-6 flex justify-center gap-4"></div>`);
    container = $(`#${badgeContainerId}`);
  }
  container.empty();

  if (badges.length === 0) {
    container.text("No badges earned yet.");
    return;
  }
  
  badges.forEach(badge => {
    container.append(`
      <div class="bg-yellow-100 text-yellow-800 px-4 py-2 rounded font-semibold shadow">
        ${badge}
      </div>
    `);
  });
}

// Update leaderboard stored in localStorage
function updateLeaderboard(score) {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

  // For simplicity, use timestamp as a "user id"
  const userId = Date.now();
  leaderboard.push({ id: userId, score: score });
  // Sort descending by score
  leaderboard.sort((a, b) => b.score - a.score);
  // Keep top 5 scores
  leaderboard = leaderboard.slice(0, 5);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Show leaderboard below results
function displayLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  const leaderboardId = 'leaderboard-container';
  let container = $(`#${leaderboardId}`);

  if (container.length === 0) {
    $('#result-box').append(`<div id="${leaderboardId}" class="mt-8 max-w-md mx-auto bg-gray-100 p-4 rounded shadow">
      <h4 class="text-xl font-bold mb-3 text-center text-gray-700">Leaderboard</h4>
      <ol id="leaderboard-list" class="list-decimal list-inside text-gray-800"></ol>
    </div>`);
    container = $(`#leaderboard-list`);
  } else {
    container.empty();
  }

  leaderboard.forEach((entry, idx) => {
    container.append(`<li>Score: ${entry.score}/5</li>`);
  });
}
