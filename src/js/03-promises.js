import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', e => {
  e.preventDefault();

  const data = {};

  const dataForm = new FormData(formRef);

  dataForm.forEach((value, key) => {
    data[key] = Number(value);
  });

  for (let i = 1; i <= data.amount; i += 1) {
    setTimeout(() => {
      createPromise(i, data.delay)
        .then(({ position, delay }) => {
          iziToast.show({
            message: `✅ Fulfilled promise ${position} in ${delay}ms`,
            color: 'green',
            position: 'topRight',
            overlayClose: false,
          });
        })
        .catch(({ position, delay }) => {
          iziToast.show({
            message: `❌ Rejected promise ${position} in ${delay}ms`,
            color: 'red',
            position: 'topRight',
            overlayClose: false,
          });
        });
      data.delay = data.delay + data.step;
    }, i * data.delay);
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    if (shouldResolve) {
      res({ position, delay });
    } else {
      rej({ position, delay });
    }
  });
}
