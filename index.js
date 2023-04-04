const body = document.querySelector('body');
const stickerSection = document.querySelector('.stickers__section');
const stickerBoard = document.querySelector('.stickers');

// select sticker
const selectSticker = (event) => {
  const stickerEl = event.target.closest('li');
  if (stickerEl) {
    // check if we are selecting a different sticker or first one
    const stickerChange = document.querySelector('.moving__sticker');
    if (stickerChange) {
      stickerChange.remove();
    }

    // current element position
    const rect = stickerEl.getBoundingClientRect();
    createNewSticker(stickerEl, rect.top, rect.left);
  }
};

stickerBoard.addEventListener('click', selectSticker);

// create the new sticker to be put on the board
const createNewSticker = (sticker, top, left) => {
  const copyStickerEl = sticker.cloneNode((deep = true));

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

// -------------------------------
// create custom sticker
const customStickerUpload = document.querySelector('#custom-sticker-upload');

const handleCustomStickerUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener('load', (event) => {
    const newSticker = document.createElement('li');
    newSticker.innerHTML = `<img src="${event.target.result}" alt="Custom Sticker">`;

    stickerBoard.append(newSticker);
    customStickerUpload.style.display = 'none';
  });
};

customStickerUpload.addEventListener('change', handleCustomStickerUpload);
