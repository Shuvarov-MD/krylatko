const showThanks = () => {
  const popupThanks = document.querySelector('.popup__content--thanks'),
    popupWrapper = document.querySelector('.popup__wrapper');

  popupWrapper.classList.add('popup--active');
  popupThanks.classList.add('popup--active');

  setTimeout(() => {
    popupWrapper.classList.remove('popup--active');
    popupThanks.classList.remove('popup--active');
  }, 2000);
};
