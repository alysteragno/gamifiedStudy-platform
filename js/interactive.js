    // Timer functionality
    let timerDuration = 25 * 60; // 25 minutes in seconds
    let timer;
    let remaining = timerDuration;
    const display = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    function formatTime(sec) {
      const m = Math.floor(sec / 60).toString().padStart(2, '0');
      const s = (sec % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    function updateTimer() {
      remaining--;
      display.textContent = formatTime(remaining);
      if(remaining <= 0){
        clearInterval(timer);
        alert('Time is up! Take a break or start again.');
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        remaining = timerDuration;
        display.textContent = formatTime(remaining);
      }
    }

    startBtn.addEventListener('click', () => {
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      timer = setInterval(updateTimer, 1000);
    });

    pauseBtn.addEventListener('click', () => {
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      clearInterval(timer);
    });

    resetBtn.addEventListener('click', () => {
      clearInterval(timer);
      remaining = timerDuration;
      display.textContent = formatTime(remaining);
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    });

    // Goal Tracker
    const goalForm = document.getElementById('goal-form');
    const goalInput = document.getElementById('goal-input');
    const goalList = document.getElementById('goal-list');

    function loadGoals() {
      const goals = JSON.parse(localStorage.getItem('studyGoals')) || [];
      goalList.innerHTML = '';
      goals.forEach((goal, idx) => {
        goalList.innerHTML += `
          <li class="list-group-item flex justify-between items-center">
            <span>${goal}</span>
            <button class="btn btn-sm btn-outline-danger" onclick="removeGoal(${idx})">Remove</button>
          </li>
        `;
      });
    }

    function saveGoal(goal) {
      const goals = JSON.parse(localStorage.getItem('studyGoals')) || [];
      goals.push(goal);
      localStorage.setItem('studyGoals', JSON.stringify(goals));
      loadGoals();
    }

    function removeGoal(idx) {
      const goals = JSON.parse(localStorage.getItem('studyGoals')) || [];
      goals.splice(idx, 1);
      localStorage.setItem('studyGoals', JSON.stringify(goals));
      loadGoals();
    }

goalForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const goal = goalInput.value.trim();
  if (goal) {
    saveGoal(goal);
    goalInput.value = '';

    // ✅ Show message
    const message = document.getElementById('goal-message');
    message.classList.remove('hidden', 'opacity-0');
    message.classList.add('opacity-100');

    // ✅ Hide after 3 seconds with fade-out
    setTimeout(() => {
      message.classList.remove('opacity-100');
      message.classList.add('opacity-0');

      setTimeout(() => {
        message.classList.add('hidden');
      }, 500); // Wait for fade-out transition
    }, 3000);
  }
});



document.addEventListener('DOMContentLoaded', loadGoals);

message.classList.remove('hidden');
message.classList.add('opacity-100');
message.classList.remove('opacity-0');

setTimeout(() => {
  message.classList.add('opacity-0');
  setTimeout(() => {
    message.classList.add('hidden');
  }, 500);
}, 3000);

