import throttle from 'lodash.throttle';

const feedbackform = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

feedbackform.addEventListener('input', throttle(evt => {
    const objectToSave = { email: email.value, message: message.value };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
  }, 500)
);

feedbackform.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log({ email: email.value, message: message.value });
  feedbackform.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
});


const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const safeTheData = load(LOCALSTORAGE_KEY);
if (safeTheData) {
  email.value = safeTheData.email;
  message.value = safeTheData.message;
}