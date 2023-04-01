const body = document.querySelector('body');

// select sticker
document.querySelectorAll('li').forEach((stickerEl) => {
  stickerEl.addEventListener('click', () => {
    // check if we are selecting a different sticker or first one
    const stickerChange = document.querySelector('.moving__sticker');
    if (stickerChange) {
      stickerChange.remove();
    }

    // current element position
    const rect = stickerEl.getBoundingClientRect();
    selectSticker(stickerEl, rect.top, rect.left);
  });
});

const selectSticker = (stickerEl, top, left) => {
  const copyStickerEl = stickerEl.cloneNode((deep = true));

  copyStickerEl.classList.add('moving__sticker');
  copyStickerEl.style.top = `${top}px`;
  copyStickerEl.style.left = `${left}px`;

  body.append(copyStickerEl);

  document.addEventListener('mousemove', (event) =>
    moveSticker(event, copyStickerEl)
  );
};

// move sticker with mouse
const moveSticker = (event, stickerEl) => {
  stickerEl.style.top = `${event.clientY}px`;
  stickerEl.style.left = `${event.clientX}px`;

  stickerEl.addEventListener('click', () => {
    putDownSticker(stickerEl);
  });
};

// put sticker down on the board
const putDownSticker = (stickerEl) => {
  const rect = stickerEl.getBoundingClientRect();

  const stampedSticker = stickerEl.cloneNode((deep = true));
  stampedSticker.classList.remove('moving__sticker');
  stampedSticker.classList.add('stamped__sticker');
  stampedSticker.style.top = `${rect.top}px`;
  stampedSticker.style.left = `${rect.left}px`;

  body.append(stampedSticker);
};
