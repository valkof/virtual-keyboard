import BUTTON_KEYS from './keys';

const status = {
  shift: false,
  capsLock: false,
  alt: false,
  lang: 'eng',
  combin: new Set(),
};

class Keyboard {
  constructor() {
    this.keyCode = BUTTON_KEYS;
    this.combin = new Set();
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
        const BUTTON = document.createElement('div');
        BUTTON.classList.add('key', 'row__key', button.className);
        ROW.appendChild(BUTTON);
        const ENG = document.createElement('span');
        ENG.classList.add('eng');
        BUTTON.appendChild(ENG);
        const RUS = document.createElement('span');
        RUS.classList.add('rus', 'hidden');
        BUTTON.appendChild(RUS);
        const KEY_ENG = Object.keys(button.eng);
        for (let i = 0; i < KEY_ENG.length; i += 1) {
          const SPAN = document.createElement('span');
          SPAN.innerText = button.eng[KEY_ENG[i]];
          if (KEY_ENG[i] === 'caseDown') {
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
          SPAN.classList.add(KEY_RUS[i], 'hidden');
          RUS.appendChild(SPAN);
        }
        BUTTON.addEventListener('mousedown', () => {
          console.log(status.capsLock);
          if (status.capsLock) {
            if (status.shift) {
              console.log(button[status.lang].shiftCaps);
            } else {
              console.log(button[status.lang].caps);
            }
          } else {
            if (status.shift) {
              console.log(button[status.lang].caseUp);
            } else {
              console.log(button[status.lang].caseDown);
            }
          }
        });
      });
    });
    document.addEventListener('keydown', this.downEvent);
    document.addEventListener('keyup', this.upEvent);
    return KEYBOARD_BOX;
  }

  downEvent(event) {
    switch (event.code) {
      case 'ShiftLeft':
        status.shift = true;
        console.log(status.shift);
        break;
      case 'CapsLock':
        status.capsLock = !status.capsLock;
        console.log(status.capsLock);
        break;
      case 'AltLeft':
        status.alt = true;
        console.log(status.lang);
        break;
      default:
        break;
    }
    status.combin.delete(event.code);
    status.combin.add(event.code);
    console.log(status.combin);
    // let asd = new Set(['AltLeft', 'ShiftLeft']);
    // console.log(asd);
    /* for (let code of asd) {
      if (!status.combin.has(code)) {
        return;
      }
    }
    console.log('ok');
    status.combin.clear();
    if (status.lang === 'eng') {
      status.lang = 'rus';
    } else {
      status.lang = 'eng';
    } */
    // console.log('code: ' + event.code + ' key ');
    // return false;
  }

  upEvent(event) {
    switch (event.code) {
      case 'ShiftLeft':
        status.shift = false;
        console.log('shift: ' + status.shift)
        break;
      case 'AltLeft':
        status.alt = false;
        break;
      default:
        break;
    }
    // status.combin.delete(event.code);
    // console.log(event.code);
    // status.combin.add(event.code);
    // console.log(status.combin);
    let asd = new Set(['AltLeft', 'ShiftLeft']);
    // console.log(asd);
    for (let code of asd) {
      if (!status.combin.has(code)) {
        status.combin.delete(event.code);
        return;
      }
    }
    console.log('ok');
    status.combin.clear();
    if (status.lang === 'eng') {
      status.lang = 'rus';
    } else {
      status.lang = 'eng';
    }
  }
}

export default Keyboard;
