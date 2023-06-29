import { throttle } from 'throttle-debounce';

const refers = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('.feedback-form input'),
  textAreaEl: document.querySelector('.feedback-form textarea'),
};
const FORM_LS_VALUE = 'feedback-form-state';
const savedSettings = localStorage.getItem(FORM_LS_VALUE);
const parsedSettings = savedSettings ? JSON.parse(savedSettings) : {};
const currentFormState = {
  email: parsedSettings.email || '',
  message: parsedSettings.message || '',
};

if (parsedSettings) {
  refers.inputEmail.value = currentFormState.email;
  refers.textAreaEl.value = currentFormState.message;
}

refers.form.addEventListener('input', throttle(500, onInput));

function onInput(e) {
  if (e.target.name === 'email') {
    currentFormState.email = e.target.value;
  } else if (e.target.name === 'message') {
    currentFormState.message = e.target.value;
  }
  localStorage.setItem(FORM_LS_VALUE, JSON.stringify(currentFormState));
}

refers.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(FORM_LS_VALUE)));
  localStorage.removeItem(FORM_LS_VALUE);
  e.currentTarget.reset();
}
