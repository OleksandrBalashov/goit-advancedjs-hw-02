import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputPicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] < new Date()
      ? handleWrongDate()
      : handleCorrectDate(selectedDates[0]);
  },
};

let value;
let intervalId;

flatpickr(refs.inputPicker, options);

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', () => {
  updateTimer();

  intervalId = setInterval(() => {
    updateTimer();
  }, 1000);
});

function updateTimer() {
  const currentDate = new Date();
  const finalDate = new Date(value);

  if (currentDate >= finalDate) {
    clearInterval(intervalId);
    return;
  }

  updateContent(convertMs(finalDate - currentDate));
}

function updateContent({ days, hours, minutes, seconds } = {}) {
  refs.days.textContent = addLeadingZero(days || 0);
  refs.hours.textContent = addLeadingZero(hours || 0);
  refs.minutes.textContent = addLeadingZero(minutes || 0);
  refs.seconds.textContent = addLeadingZero(seconds || 0);
}

function handleCorrectDate(valueInput) {
  refs.startBtn.disabled = false;
  value = valueInput;
}

function handleWrongDate() {
  refs.startBtn.disabled = true;
  clearInterval(intervalId);
  updateContent();

  iziToast.show({
    message: 'Please choose a date in the future',
    color: 'red',
    position: 'topRight',
  });
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  value = String(value);
  return value.padStart(2, '0');
}
