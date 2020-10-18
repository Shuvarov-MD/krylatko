const showCallback = () => {
  const callback = document.querySelectorAll('.callback'),
    popupWrapper = document.querySelector('.popup__wrapper'),
    popupCallback = document.querySelector('.popup__content--callback');

  callback.forEach(item => item.addEventListener('click', event => {
    event.preventDefault();
    popupCallback.classList.add('popup--active');
    popupWrapper.classList.add('popup--active');
  }));
};

showCallback();
