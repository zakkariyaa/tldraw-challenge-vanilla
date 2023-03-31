const body = document.querySelector('body');

// select sticker
const selectSticker = (sticker) => {
  const stickerHolder = document.createElement('p');
  stickerHolder.textContent = sticker;
  stickerHolder.style.fontSize = '2rem';
  stickerHolder.style.position = 'absolute';

  document.addEventListener('mousemove', (event) =>
    moveSticker(event, stickerHolder)
  );
};

document.querySelectorAll('li').forEach((sticker) => {
  sticker.addEventListener('click', () => {
    selectSticker(sticker.textContent);
  });
});

// move sticker with mouse
const moveSticker = (event, stickerHolder) => {
  stickerHolder.style.top = `${event.clientY}px`;
  stickerHolder.style.left = `${event.clientX}px`;

  body.append(stickerHolder);
};
