import BUTTON_KEYS from './keys';

const status = {
  shift: false,
  capsLock: false,
  alt: false,
  lang: 'eng',
  combin: new Set(),
};

function changeButton() {
  const ENG = document.querySelectorAll('.eng');
  const RUS = document.querySelectorAll('.rus');
  ENG.forEach((node) => {
    if (status.lang === 'eng') {
      node.classList.remove('hidden');
    } else {
      node.classList.add('hidden');
    }
  });
  RUS.forEach((node) => {
    if (status.lang === 'rus') {
      node.classList.remove('hidden');
    } else {
      node.classList.add('hidden');
    }
  });
  const HIDDEN = document.querySelectorAll('span:not(.hidden)');
  let elementKeys;
  if (status.capsLock) {
    if (status.shift) {
      elementKeys = document.querySelectorAll(`.${status.lang} .shiftCaps`);
    } else {
      elementKeys = document.querySelectorAll(`.${status.lang} .caps`);
    }
  } else {
    if (status.shift) {
      elementKeys = document.querySelectorAll(`.${status.lang} .caseUp`);
    } else {
      elementKeys = document.querySelectorAll(`.${status.lang} .caseDown`);
    }
  }
  elementKeys.forEach((el) => el.classList.remove('hidden'));
  HIDDEN.forEach((el) => el.classList.add('hidden'));
}

status.lang = localStorage.getItem('lang') || 'eng';
localStorage.setItem('lang', status.lang);

class Keyboard {
  constructor() {
    this.keyCode = BUTTON_KEYS;
    this.combin = false;
  }

  init() {
    const KEYBOARD_BOX = document.createElement('div');
    KEYBOARD_BOX.classList.add('keyboard_box');
    const TEXTAREA = document.createElement('textarea');
    KEYBOARD_BOX.appendChild(TEXTAREA);
    TEXTAREA.onkeydown = () => false;
    TEXTAREA.onkeyup = () => false;
    const KEYBOARD = document.createElement('div');
    KEYBOARD.classList.add('keyboard');
    KEYBOARD_BOX.appendChild(KEYBOARD);
    this.keyCode.forEach((row) => {
      const ROW = document.createElement('div');
      ROW.classList.add('row', 'keyboard__row');
      KEYBOARD.appendChild(ROW);
      row.forEach((button) => {
        let hiddenRUS = true;
        if (status.lang === 'rus') {
          hiddenRUS = false;
        }
        const BUTTON = document.createElement('div');
        BUTTON.classList.add('key', 'row__key', button.className);
        ROW.appendChild(BUTTON);
        const ENG = document.createElement('span');
        ENG.classList.add('eng');
        if (!hiddenRUS) ENG.classList.add('hidden');
        BUTTON.appendChild(ENG);
        const RUS = document.createElement('span');
        RUS.classList.add('rus');
        if (hiddenRUS) RUS.classList.add('hidden');
        BUTTON.appendChild(RUS);
        const KEY_ENG = Object.keys(button.eng);
        for (let i = 0; i < KEY_ENG.length; i += 1) {
          const SPAN = document.createElement('span');
          SPAN.innerText = button.eng[KEY_ENG[i]];
          if (KEY_ENG[i] === 'caseDown' && hiddenRUS) {
            SPAN.classList.add(KEY_ENG[i]);
          } else {
            SPAN.classList.add(KEY_ENG[i], 'hidden');
          }
          ENG.appendChild(SPAN);
        }
        const KEY_RUS = Object.keys(button.rus);
        for (let i = 0; i < KEY_RUS.length; i += 1) {
          const SPAN = document.createElement('span');
          SPAN.innerText = button.rus[KEY_RUS[i]];
          if (KEY_RUS[i] === 'caseDown' && !hiddenRUS) {
            SPAN.classList.add(KEY_RUS[i]);
          } else {
            SPAN.classList.add(KEY_RUS[i], 'hidden');
          }
          RUS.appendChild(SPAN);
        }
        BUTTON.addEventListener('mousedown', () => {
          // console.log(button.className);
          const BTN = document.querySelector(`.${button.className}`);
          BTN.classList.add('active');
          if (status.capsLock) {
            if (status.shift) {
              TEXTAREA.value += button[status.lang].shiftCaps;
            } else {
              TEXTAREA.value += button[status.lang].caps;
            }
          } else {
            if (status.shift) {
              TEXTAREA.value += button[status.lang].caseUp;
            } else {
              TEXTAREA.value += button[status.lang].caseDown;
            }
          }
        });
        document.addEventListener('mouseup', () => {
          // console.log(button.className);
          const BTN = document.querySelector(`.${button.className}`);
          BTN.classList.remove('active');
        });
      });
    });
    document.addEventListener('keydown', this.downEvent);
    document.addEventListener('keyup', this.upEvent);
    return KEYBOARD_BOX;
  }

  downEvent(event) {
    this.combin = false;
    const BUTTON = document.querySelector(`.${event.code}`);
    BUTTON.classList.add('active');
    const TEXTAREA = document.querySelector('textarea');
    switch (event.code) {
      case 'ShiftLeft':
        // console.log(status.shift);
        if (status.shift) break;
        if (!status.alt) status.shift = true;
        if (status.shift) changeButton();
        break;
      case 'CapsLock':
        status.capsLock = !status.capsLock;
        changeButton();
        break;
      case 'AltLeft':
        status.alt = true;
        break;
      default:
        TEXTAREA.value += BUTTON.querySelector('span:not(.hidden)').innerText;
        break;
    }
    status.combin.add(event.code);
    console.log(event.code);
  }

  upEvent(event) {
    this.combin = false;
    const BUTTON = document.querySelector(`.${event.code}`);
    BUTTON.classList.remove('active');
    switch (event.code) {
      case 'ShiftLeft':
        if (!status.shift) break;
        status.shift = false;
        if (!status.alt) changeButton();
        break;
      case 'AltLeft':
        status.alt = false;
        break;
      default:
        break;
    }
    let asd = new Set(['AltLeft', 'ShiftLeft']);
    for (let code of asd) {
      if (!status.combin.has(code)) {
        status.combin.delete(event.code);
        return;
      }
    }
    // console.log('ok');
    status.combin.clear();
    if (status.lang === 'eng') {
      status.lang = 'rus';
    } else {
      status.lang = 'eng';
    }
    changeButton();
    localStorage.setItem('lang', status.lang);
  }
}

export default Keyboard;
