const body = document.querySelector('body');

// select sticker
document.querySelectorAll('li').forEach((sticker) => {
  sticker.addEventListener('click', () => {
    const rect = sticker.getBoundingClientRect();
    selectSticker(sticker.textContent, rect.top, rect.left);
  });
});

const selectSticker = (sticker, top, left) => {
  const stickerHolder = document.createElement('p');
  stickerHolder.classList.add('moving__sticker');
  stickerHolder.textContent = sticker;
  stickerHolder.style.fontSize = '1.5rem';
  stickerHolder.style.position = 'absolute';
  stickerHolder.style.top = `${top}px`;
  stickerHolder.style.left = `${left}px`;

  body.append(stickerHolder);

  document.addEventListener('mousemove', moveSticker);
};

// move sticker with mouse
const moveSticker = (event) => {
  const stickerHolder = document.querySelector('.moving__sticker');
  stickerHolder.style.top = `${event.clientY}px`;
  stickerHolder.style.left = `${event.clientX}px`;

  document.addEventListener('mousedown', putDownSticker);
};

// put sticker down on the board
const putDownSticker = (event) => {
  const stickerHolder = document.querySelector('.moving__sticker');
  stickerHolder.style.top = `${event.clientY}px`;
  stickerHolder.style.left = `${event.clientX}px`;

  stickerHolder.classList.remove('moving__sticker');
  document.removeEventListener('mousemove', moveSticker);
};
