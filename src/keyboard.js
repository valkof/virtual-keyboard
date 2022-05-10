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
  }
  if (!status.capsLock) {
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
          const BTN = document.querySelector(`.${button.className}`);
          if (button.className === 'CapsLock') {
            if (!status.capsLock) {
              BTN.classList.add('active');
            }
          } else {
            BTN.classList.add('active');
          }
          TEXTAREA.focus();
          switch (button.className) {
            case 'ShiftLeft':
              if (status.shift) return;
              status.shift = true;
              changeButton();
              return;
            case 'ShiftRight':
              if (status.shift) return;
              status.shift = true;
              changeButton();
              return;
            case 'CapsLock':
              status.capsLock = !status.capsLock;
              changeButton();
              return;
            case 'AltLeft':
              status.alt = true;
              return;
            case 'Tab':
              TEXTAREA.setRangeText('\t', TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
              return;
            case 'Space':
              TEXTAREA.setRangeText(' ', TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
              return;
            case 'Backspace':
              if (TEXTAREA.selectionStart > 0) {
                TEXTAREA.setRangeText('', TEXTAREA.selectionStart - 1, TEXTAREA.selectionStart, 'end');
              }
              return;
            case 'Delete':
              if (TEXTAREA.selectionEnd > -1) {
                TEXTAREA.setRangeText('', TEXTAREA.selectionStart, TEXTAREA.selectionStart + 1, 'end');
              }
              return;
            case 'Enter':
              if (TEXTAREA.selectionEnd > 0) {
                TEXTAREA.setRangeText('\n', TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
              }
              return;
            case 'ControlLeft':
              return;
            case 'ControlRight':
              return;
            case 'AltRight':
              return;
            case 'MetaLeft':
              return;
            default:
              break;
          }
          if (status.capsLock) {
            if (status.shift) {
              TEXTAREA.setRangeText(button[status.lang].shiftCaps, TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
            } else {
              TEXTAREA.setRangeText(button[status.lang].caps, TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
            }
          }
          if (!status.capsLock) {
            if (status.shift) {
              TEXTAREA.setRangeText(button[status.lang].caseUp, TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
            } else {
              TEXTAREA.setRangeText(button[status.lang].caseDown, TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
            }
          }
        });
        document.addEventListener('mouseup', () => {
          const BTN = document.querySelector(`.${button.className}`);
          if (button.className === 'CapsLock') {
            if (!status.capsLock) {
              BTN.classList.remove('active');
            }
          } else {
            BTN.classList.remove('active');
          }
          switch (button.className) {
            case 'ShiftLeft':
              if (!status.shift) break;
              status.shift = false;
              changeButton();
              break;
            case 'ShiftRight':
              if (!status.shift) break;
              status.shift = false;
              changeButton();
              break;
            case 'AltLeft':
              status.alt = false;
              break;
            case 'CapsLock':
              status.alt = false;
              break;
            default:
              break;
          }
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
    if (event.code === 'CapsLock') {
      if (!status.capsLock) {
        BUTTON.classList.add('active');
      }
    } else {
      BUTTON.classList.add('active');
    }
    const TEXTAREA = document.querySelector('textarea');
    TEXTAREA.focus();
    switch (event.code) {
      case 'ShiftLeft':
        if (status.shift) break;
        if (!status.alt) status.shift = true;
        if (status.shift) changeButton();
        break;
      case 'ShiftRight':
        if (status.shift) break;
        status.shift = true;
        changeButton();
        break;
      case 'CapsLock':
        status.capsLock = !status.capsLock;
        changeButton();
        break;
      case 'AltLeft':
        status.alt = true;
        break;
      case 'Tab':
        TEXTAREA.setRangeText('\t', TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
        break;
      case 'Space':
        TEXTAREA.setRangeText(' ', TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
        break;
      case 'Backspace':
        if (TEXTAREA.selectionStart > 0) {
          TEXTAREA.setRangeText('', TEXTAREA.selectionStart - 1, TEXTAREA.selectionStart, 'end');
        }
        break;
      case 'Delete':
        if (TEXTAREA.selectionEnd > -1) {
          TEXTAREA.setRangeText('', TEXTAREA.selectionStart, TEXTAREA.selectionStart + 1, 'end');
        }
        break;
      case 'Enter':
        if (TEXTAREA.selectionEnd > 0) {
          TEXTAREA.setRangeText('\n', TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
        }
        break;
      case 'ControlLeft':
        break;
      case 'ControlRight':
        break;
      case 'AltRight':
        break;
      case 'MetaLeft':
        break;
      default:
        TEXTAREA.setRangeText(BUTTON.querySelector('span:not(.hidden)').innerText, TEXTAREA.selectionStart, TEXTAREA.selectionStart, 'end');
        break;
    }
    status.combin.add(event.code);
    return false;
  }

  upEvent(event) {
    this.combin = false;
    const BUTTON = document.querySelector(`.${event.code}`);
    if (event.code === 'CapsLock') {
      if (!status.capsLock) {
        BUTTON.classList.remove('active');
      }
    } else {
      BUTTON.classList.remove('active');
    }
    switch (event.code) {
      case 'ShiftLeft':
        if (!status.shift) break;
        status.shift = false;
        if (!status.alt) changeButton();
        break;
      case 'ShiftRight':
        if (!status.shift) break;
        status.shift = false;
        changeButton();
        break;
      case 'AltLeft':
        status.alt = false;
        break;
      case 'CapsLock':
        status.alt = false;
        break;
      default:
        break;
    }
    const combinKeys = new Set(['AltLeft', 'ShiftLeft']);
    const COMBIN_KEYS = Array.from(combinKeys);
    for (let i = 0; i < COMBIN_KEYS.length; i += 1) {
      if (!status.combin.has(COMBIN_KEYS[i])) {
        status.combin.delete(event.code);
        return false;
      }
    }
    status.combin.clear();
    if (status.lang === 'eng') {
      status.lang = 'rus';
    } else {
      status.lang = 'eng';
    }
    changeButton();
    localStorage.setItem('lang', status.lang);
    return false;
  }
}

export default Keyboard;
