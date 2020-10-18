const showPolicy = () => {
  const popupPolicy = document.querySelector('.popup__content--policy'),
    popupWrapper = document.querySelector('.popup__wrapper');

  popupWrapper.classList.add('popup--active');
  popupPolicy.classList.add('popup--active');
};

const privacyPolicy = document.querySelector('.privacy-policy');

privacyPolicy.addEventListener('click', event => {
  event.preventDefault();
  showPolicy();
});
