import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const data = {};

  const dataForm = new FormData(refs.form);

  dataForm.forEach((value, key) => {
    data[key] = Number(value);
  });

  for (let i = 1; i <= data.amount; i += 1) {
    createPromise(i, data.delay)
      .then(({ position, delay }) => {
        iziToast.show({
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          color: 'green',
          position: 'topRight',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.show({
          message: `❌ Rejected promise ${position} in ${delay}ms`,
          color: 'red',
          position: 'topRight',
        });
      })
      .finally(() => {
        refs.delay.disabled = false;
        refs.step.disabled = false;
        refs.amount.disabled = false;
      });
    data.delay = data.delay + data.step;
  }

  refs.delay.value = '';
  refs.step.value = '';
  refs.amount.value = '';
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}
