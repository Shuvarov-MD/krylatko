const sendForm = () => {
  const form = document.querySelectorAll('.form'),
    statusMessage = document.createElement('div');

  statusMessage.innerHTML = `
    <div class='sk-bounce-1 sk-child'></div>
    <div class='sk-bounce-2 sk-child'></div>
    <div class='sk-bounce-3 sk-child'></div>`;

  form.forEach(item => {
    const input = item.querySelector('input[type="tel"]'),
      button = item.querySelector('button[type="submit"]');

    item.addEventListener('submit', event => {
      event.preventDefault();

      if (input.value.length === 18) {
        const buttonText = button.textContent;
        input.style.border = '';

        button.textContent = '';
        button.appendChild(statusMessage);
        statusMessage.classList.add('sk-three-bounce');

        let formData = new FormData(item);
        formData = Object.fromEntries(formData);

        createRequest(formData).then(response => {
          if (!response.ok) {
            throw new Error(`Ответ сети был не ok.`);
          } else if (item.closest('.popup__content.popup--active')) {
            item.closest('.popup__content').classList.remove('popup--active');
            item.closest('.popup__wrapper').classList.remove('popup--active');
          }

          showThanks();
          statusMessage.classList.remove('sk-three-bounce');
          button.textContent = buttonText;
        }).catch(error => {
          console.error(error);
          button.textContent = 'Ошибка...';

          setTimeout(() => {
            button.textContent = buttonText;
          }, 2000);
        });

        input.value = '';
      } else {
        input.style.border = '1px solid red';
      }
    });
  });
};

sendForm();
