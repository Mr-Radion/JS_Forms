let state = {
  email: document.querySelector('#email'),
  password: document.querySelector('#password'),
  openEye: false,
  formErrorStyle: {
    email: '',
    password: ''
  },
  emailValid: false,
  passwordValid: false,
  formValid: false,
};

state.email.addEventListener('input', function (e) {
  const value = e.target.value;
  let emailStyle = state.formErrorStyle.email;
  let emailRexp = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  emailStyle = emailRexp ? 'status_passed' : 'status_error';
  emailStyle == 'status_passed' ? (state.emailValid = true) : (state.emailValid = false);
  this.classList.add(emailStyle);
});

state.password.addEventListener('input', function (e) {
  const value = e.target.value;

  const isMax = value.length >= 8;
  const isCapital = value.match(/(?=.*?[A-Z])/);
  const oneDigit = value.match(/(?=.*?[0-9])/);

  if (isMax && isCapital && oneDigit) {
    state.formErrorStyle.password = 'status_passed';
    state.passwordValid = true;
  } else {
    state.formErrorStyle.password = 'status_error';
  }

  this.classList.add(state.formErrorStyle.password);
});

function toggleVisibility(e) {
  let svgContainer = e.firstElementChild;
  svgContainer.classList.toggle('eyes-open');
  svgContainer.classList.contains('eyes-open')
    ? (password.type = 'text')
    : (password.type = 'password');
}

function registerUser() {
  state.emailValid && state.passwordValid ? (state.formValid = true) : (state.formValid = false);
  state.formValid ? renderModal() : false;
}

function renderModal() {
  let registrationModal = document.createElement('div');
  registrationModal.innerHTML = `
  <div class='modalOverlay'>
    <div class='modalWindow'>
      <div class='modalHeader'>
        <button class='times' onclick="onCancel(this)" />
      </div>
      <div class='modalBody'>
        <div>
        <h1>Поздравляем!</h1>
        <p>
          Вы почти зарегистрированы в memory-lane!
        <br />
          На почту отправлено письмо для подтверждения e-mail
        </p>
      </div>
      <div class='modalFooter'></div>
    </div>
  </div>`;

  document.body.appendChild(registrationModal);
}

function onCancel(e) {
  document.body.removeChild(e.closest('.modalOverlay').parentElement);
}
