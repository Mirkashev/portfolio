export default function isFormValid() {
  const emailValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const phoneValid = /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))$/;

  const email = document.querySelector('.form-email');
  const name = document.querySelector('.form-name');
  const text = document.querySelector('.form-textarea');
  const button = document.querySelector('.form-button');

  this.classList.remove('validation-error');

  if (this.nodeName === 'TEXTAREA') {
    document.querySelector(
      '.form-textarea-counter'
    ).innerHTML = `${this.value.length}/140`;

    if (this.value.length > 140) {
      this.classList.add('validation-error');
    }
  }

  this.value.length > 0
    ? this.classList.add('active')
    : this.classList.remove('active');

  if (
    this.classList.contains('form-email') &&
    !this.value.match(emailValid) &&
    !this.value.match(phoneValid) &&
    this.value.length > 0
  ) {
    this.classList.add('validation-error');
  } else {
    this.classList.remove('validation-error');
  }

  if (
    name.value.length > 0 &&
    email.value.length > 0 &&
    text.value.length < 141 &&
    (email.value.match(emailValid) || email.value.match(phoneValid))
  ) {
    button.classList.add('form-button-active');
    button.onclick = async (e) => {
      e.preventDefault();
      let response = await fetch(
        'https://api.telegram.org/bot5596024624%3AAAEEZB6qMX-qJQC4QVTPLuVkwRi3Oai06Ws/sendMessage',
        {
          method: 'POST',
          body: `{"text":"Имя:${name.value}\nПочта или телефон:${email.value}\nТекст:${text.value}","disable_web_page_preview":false,"disable_notification":false,"reply_to_message_id":0,"chat_id":"-1001888725117"}`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      location.href = '../';
      if (!response.ok) {
        console.log('smtng went wrong');
      }
    };
  } else {
    button.classList.remove('form-button-active');
    button.onclick = (e) => {
      e.preventDefault();
    };
  }
}
