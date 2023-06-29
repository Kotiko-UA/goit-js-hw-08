import { throttle } from 'throttle-debounce';

const refers = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('.feedback-form input'),
  textAreaEl: document.querySelector('.feedback-form textarea'),
};

const currentFormState = {
  email: '',
  message: '',
};

const savedSettings = localStorage.getItem('feedback-form-state');
const parsedSettings = JSON.parse(savedSettings);

if (parsedSettings) {
  refers.inputEmail.value = parsedSettings.email;
  refers.textAreaEl.value = parsedSettings.message;
}

refers.form.addEventListener('input', throttle(500, onInput));

function onInput(e) {
  if (e.target.name === 'email') {
    currentFormState.email = e.target.value;
  } else if (e.target.name === 'message') {
    currentFormState.message = e.target.value;
  }
  localStorage.setItem('feedback-form-state', JSON.stringify(currentFormState));
}

refers.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  console.log(currentFormState);
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
}
