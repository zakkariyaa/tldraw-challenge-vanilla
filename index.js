const body = document.querySelector('body');
const stickerSection = document.querySelector('.stickers__section');
const stickerBoard = document.querySelector('.stickers');
const toolbarMenu = document.querySelector('.toolbar__menu');

// -------------------------------
// golbal state
let activeTask = 'hand';

// -------------------------------
// select sticker
const chooseSticker = (event) => {
  if (activeTask === 'hand') {
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
  }
};

stickerBoard.addEventListener('click', chooseSticker);

// -------------------------------
// create the new sticker to be put on the board
const createNewSticker = (sticker, top, left) => {
  const copyStickerEl = sticker.cloneNode((deep = true));

  copyStickerEl.classList.add('moving__sticker');
  copyStickerEl.style.top = `${top}px`;
  copyStickerEl.style.left = `${left}px`;

  body.append(copyStickerEl);

  document.addEventListener('mousemove', moveSticker);
};

// -------------------------------
// move sticker with mouse
const moveSticker = (event) => {
  const stickerEl = document.querySelector('.moving__sticker');
  stickerEl.style.top = `${event.clientY}px`;
  stickerEl.style.left = `${event.clientX}px`;

  document.addEventListener('mousedown', putDownSticker);
};

// -------------------------------
// put sticker down on the board
const putDownSticker = (e) => {
  if (activeTask === 'hand') {
    const stickerEl = e.target;

    const rect = stickerEl.getBoundingClientRect();
    const stampedSticker = stickerEl.cloneNode((deep = true));

    stampedSticker.classList.remove('moving__sticker');
    stampedSticker.classList.add('stamped__sticker');
    stampedSticker.style.top = `${rect.top}px`;
    stampedSticker.style.left = `${rect.left}px`;

    body.append(stampedSticker);
  }
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

// -------------------------------
// handle toolbar selections
const handIcon = document.querySelector('.select__sticker');
const cursorIcon = document.querySelector('.handle__sticker');
const trashIcon = document.querySelector('.remove__sticker');

[cursorIcon, handIcon].forEach((icon) => {
  icon.addEventListener('click', (event) => {
    const icon = event.target.closest('li');
    if (icon.classList[0] === 'handle__sticker') {
      document.removeEventListener('mousemove', moveSticker);

      icon.classList.add('active');
      handIcon.classList.remove('active');

      activeTask = 'cursor';
    }

    if (icon.classList[0] === 'select__sticker') {
      icon.classList.add('active');
      cursorIcon.classList.remove('active');
      activeTask = 'hand';
    }
  });
});

// -------------------------------
// remove (delete) stickers

// select sticker
const selectSticker = (event) => {
  if (activeTask === 'cursor') {
    const selectedSticker = event.target;
    const oldSelectedSticker = body.querySelector(
      '.stamped__sticker.selected__sticker'
    );

    // ensure only one item is selected at any moment
    // and only items from the board or img sticker can be deleted
    const isBoardSticker = selectedSticker.classList[0] === 'stamped__sticker';
    const isImgSticker = selectedSticker.matches('img');

    if (oldSelectedSticker && isBoardSticker) {
      oldSelectedSticker.classList.remove('selected__sticker');
    }

    if (isBoardSticker || isImgSticker) {
      trashIcon.classList.add('active');
      selectedSticker.classList.add('selected__sticker');
    }
  }
};

body.addEventListener('click', selectSticker);

// remove sticker
const removeSticker = () => {
  const selectedSticker = body.querySelector('.selected__sticker');
  const isToolbarImg = selectedSticker.classList[0] === 'selected__sticker';

  selectedSticker.style.display = 'none';

  trashIcon.classList.remove('active');
  if (isToolbarImg) customStickerUpload.style.display = 'inline-block';
};

trashIcon.addEventListener('click', removeSticker);

// -------------------------------
// handle sticker repositioning
const repostionSticker = (event) => {
  if (activeTask === 'cursor') {
    const selectedSticker = event.target;

    // prevent it from receiving focus and triggering the :focus pseudo-class
    selectedSticker.setAttribute('tabindex', '-1');

    const markElement = () => {
      document.addEventListener('mousemove', moveElement);
      document.addEventListener('mouseup', dropElement);
    };

    const moveElement = (event) => {
      selectedSticker.style.top = `${event.clientY}px`;
      selectedSticker.style.left = `${event.clientX}px`;
    };

    const dropElement = () => {
      const viewHeight = document.documentElement.clientHeight;
      const toolbarHeight = (12 * viewHeight) / 100;
      const boardHeight = viewHeight - toolbarHeight;
      const elementHeight = parseInt(selectedSticker.style.top) + 12;

      // check if element has went off view. If true, delete it
      if (elementHeight > boardHeight) {
        selectedSticker.remove();
      }

      document.removeEventListener('mousemove', moveElement);
      document.removeEventListener('mouseup', dropElement);
    };

    selectedSticker.addEventListener('mousedown', markElement);
  }
};

body.addEventListener('click', repostionSticker);
