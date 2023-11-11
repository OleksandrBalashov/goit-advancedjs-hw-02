const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let intervalId;

refs.startBtn.addEventListener('click', handleStart);
refs.stopBtn.addEventListener('click', handleStop);

function handleStart() {
  refs.startBtn.disabled = true;
  intervalId = setInterval(
    () => (document.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
}

function handleStop() {
  refs.startBtn.disabled = false;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
