/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/keyboard.js":
/*!*************************!*\
  !*** ./src/keyboard.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys */ "./src/keys.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var status = {
  shift: false,
  capsLock: false,
  alt: false,
  lang: 'eng',
  combin: new Set()
};

function changeButton() {
  var ENG = document.querySelectorAll('.eng');
  var RUS = document.querySelectorAll('.rus');
  ENG.forEach(function (node) {
    if (status.lang === 'eng') {
      node.classList.remove('hidden');
    } else {
      node.classList.add('hidden');
    }
  });
  RUS.forEach(function (node) {
    if (status.lang === 'rus') {
      node.classList.remove('hidden');
    } else {
      node.classList.add('hidden');
    }
  });
  var HIDDEN = document.querySelectorAll('span:not(.hidden)');
  var elementKeys;

  if (status.capsLock) {
    if (status.shift) {
      elementKeys = document.querySelectorAll(".".concat(status.lang, " .shiftCaps"));
    } else {
      elementKeys = document.querySelectorAll(".".concat(status.lang, " .caps"));
    }
  }

  if (!status.capsLock) {
    if (status.shift) {
      elementKeys = document.querySelectorAll(".".concat(status.lang, " .caseUp"));
    } else {
      elementKeys = document.querySelectorAll(".".concat(status.lang, " .caseDown"));
    }
  }

  elementKeys.forEach(function (el) {
    return el.classList.remove('hidden');
  });
  HIDDEN.forEach(function (el) {
    return el.classList.add('hidden');
  });
}

status.lang = localStorage.getItem('lang') || 'eng';
localStorage.setItem('lang', status.lang);

var Keyboard = /*#__PURE__*/function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    this.keyCode = _keys__WEBPACK_IMPORTED_MODULE_0__["default"];
    this.combin = false;
  }

  _createClass(Keyboard, [{
    key: "init",
    value: function init() {
      var KEYBOARD_BOX = document.createElement('div');
      KEYBOARD_BOX.classList.add('keyboard_box');
      var TEXTAREA = document.createElement('textarea');
      KEYBOARD_BOX.appendChild(TEXTAREA);

      TEXTAREA.onkeydown = function () {
        return false;
      };

      TEXTAREA.onkeyup = function () {
        return false;
      };

      document.onkeydown = function () {
        return false;
      };

      document.onkeyup = function () {
        return false;
      };

      var KEYBOARD = document.createElement('div');
      KEYBOARD.classList.add('keyboard');
      KEYBOARD_BOX.appendChild(KEYBOARD);
      this.keyCode.forEach(function (row) {
        var ROW = document.createElement('div');
        ROW.classList.add('row', 'keyboard__row');
        KEYBOARD.appendChild(ROW);
        row.forEach(function (button) {
          var hiddenRUS = true;

          if (status.lang === 'rus') {
            hiddenRUS = false;
          }

          var BUTTON = document.createElement('div');
          BUTTON.classList.add('key', 'row__key', button.className);
          ROW.appendChild(BUTTON);
          var ENG = document.createElement('span');
          ENG.classList.add('eng');
          if (!hiddenRUS) ENG.classList.add('hidden');
          BUTTON.appendChild(ENG);
          var RUS = document.createElement('span');
          RUS.classList.add('rus');
          if (hiddenRUS) RUS.classList.add('hidden');
          BUTTON.appendChild(RUS);
          var KEY_ENG = Object.keys(button.eng);

          for (var i = 0; i < KEY_ENG.length; i += 1) {
            var SPAN = document.createElement('span');
            SPAN.innerText = button.eng[KEY_ENG[i]];

            if (KEY_ENG[i] === 'caseDown' && hiddenRUS) {
              SPAN.classList.add(KEY_ENG[i]);
            } else {
              SPAN.classList.add(KEY_ENG[i], 'hidden');
            }

            ENG.appendChild(SPAN);
          }

          var KEY_RUS = Object.keys(button.rus);

          for (var _i = 0; _i < KEY_RUS.length; _i += 1) {
            var _SPAN = document.createElement('span');

            _SPAN.innerText = button.rus[KEY_RUS[_i]];

            if (KEY_RUS[_i] === 'caseDown' && !hiddenRUS) {
              _SPAN.classList.add(KEY_RUS[_i]);
            } else {
              _SPAN.classList.add(KEY_RUS[_i], 'hidden');
            }

            RUS.appendChild(_SPAN);
          }

          BUTTON.addEventListener('mousedown', function () {
            var BTN = document.querySelector(".".concat(button.className));

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
          document.addEventListener('mouseup', function () {
            var BTN = document.querySelector(".".concat(button.className));

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
  }, {
    key: "downEvent",
    value: function downEvent(event) {
      this.combin = false;
      var BUTTON = document.querySelector(".".concat(event.code));

      if (event.code === 'CapsLock') {
        if (!status.capsLock) {
          BUTTON.classList.add('active');
        }
      } else {
        BUTTON.classList.add('active');
      }

      var TEXTAREA = document.querySelector('textarea');
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
  }, {
    key: "upEvent",
    value: function upEvent(event) {
      this.combin = false;
      var BUTTON = document.querySelector(".".concat(event.code));

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

      var combinKeys = new Set(['AltLeft', 'ShiftLeft']);
      var COMBIN_KEYS = Array.from(combinKeys);

      for (var i = 0; i < COMBIN_KEYS.length; i += 1) {
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
  }]);

  return Keyboard;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyboard);

/***/ }),

/***/ "./src/keys.js":
/*!*********************!*\
  !*** ./src/keys.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var BUTTON_KEYS = [[{
  className: 'Backquote',
  eng: {
    caps: '`',
    caseDown: '`',
    caseUp: '~',
    shiftCaps: '~'
  },
  rus: {
    caps: 'Ё',
    caseDown: 'ё',
    caseUp: 'Ё',
    shiftCaps: 'ё'
  }
}, {
  className: 'Digit1',
  eng: {
    caps: '1',
    caseDown: '1',
    caseUp: '!',
    shiftCaps: '!'
  },
  rus: {
    caps: '1',
    caseDown: '1',
    caseUp: '!',
    shiftCaps: '!'
  }
}, {
  className: 'Digit2',
  eng: {
    caps: '2',
    caseDown: '2',
    caseUp: '@',
    shiftCaps: '@'
  },
  rus: {
    caps: '2',
    caseDown: '2',
    caseUp: '"',
    shiftCaps: '"'
  }
}, {
  className: 'Digit3',
  eng: {
    caps: '3',
    caseDown: '3',
    caseUp: '#',
    shiftCaps: '#'
  },
  rus: {
    caps: '3',
    caseDown: '3',
    caseUp: '№',
    shiftCaps: '№'
  }
}, {
  className: 'Digit4',
  eng: {
    caps: '4',
    caseDown: '4',
    caseUp: '$',
    shiftCaps: '$'
  },
  rus: {
    caps: '4',
    caseDown: '4',
    caseUp: ';',
    shiftCaps: ';'
  }
}, {
  className: 'Digit5',
  eng: {
    caps: '5',
    caseDown: '5',
    caseUp: '%',
    shiftCaps: '%'
  },
  rus: {
    caps: '5',
    caseDown: '5',
    caseUp: '%',
    shiftCaps: '%'
  }
}, {
  className: 'Digit6',
  eng: {
    caps: '6',
    caseDown: '6',
    caseUp: '^',
    shiftCaps: '^'
  },
  rus: {
    caps: '6',
    caseDown: '6',
    caseUp: ':',
    shiftCaps: ':'
  }
}, {
  className: 'Digit7',
  eng: {
    caps: '7',
    caseDown: '7',
    caseUp: '&',
    shiftCaps: '&'
  },
  rus: {
    caps: '7',
    caseDown: '7',
    caseUp: '?',
    shiftCaps: '?'
  }
}, {
  className: 'Digit8',
  eng: {
    caps: '8',
    caseDown: '8',
    caseUp: '*',
    shiftCaps: '*'
  },
  rus: {
    caps: '8',
    caseDown: '8',
    caseUp: '*',
    shiftCaps: '*'
  }
}, {
  className: 'Digit9',
  eng: {
    caps: '9',
    caseDown: '9',
    caseUp: '(',
    shiftCaps: '('
  },
  rus: {
    caps: '9',
    caseDown: '9',
    caseUp: '(',
    shiftCaps: '('
  }
}, {
  className: 'Digit0',
  eng: {
    caps: '0',
    caseDown: '0',
    caseUp: ')',
    shiftCaps: ')'
  },
  rus: {
    caps: '0',
    caseDown: '0',
    caseUp: ')',
    shiftCaps: ')'
  }
}, {
  className: 'Minus',
  eng: {
    caps: '-',
    caseDown: '-',
    caseUp: '_',
    shiftCaps: '_'
  },
  rus: {
    caps: '-',
    caseDown: '-',
    caseUp: '_',
    shiftCaps: '_'
  }
}, {
  className: 'Equal',
  eng: {
    caps: '=',
    caseDown: '=',
    caseUp: '+',
    shiftCaps: '+'
  },
  rus: {
    caps: '=',
    caseDown: '=',
    caseUp: '+',
    shiftCaps: '+'
  }
}, {
  className: 'Backspace',
  eng: {
    caps: 'Backspace',
    caseDown: 'Backspace',
    caseUp: 'Backspace',
    shiftCaps: 'Backspace'
  },
  rus: {
    caps: 'Backspace',
    caseDown: 'Backspace',
    caseUp: 'Backspace',
    shiftCaps: 'Backspace'
  }
}], [{
  className: 'Tab',
  eng: {
    caps: 'Tab',
    caseDown: 'Tab',
    caseUp: 'Tab',
    shiftCaps: 'Tab'
  },
  rus: {
    caps: 'Tab',
    caseDown: 'Tab',
    caseUp: 'Tab',
    shiftCaps: 'Tab'
  }
}, {
  className: 'KeyQ',
  eng: {
    caps: 'Q',
    caseDown: 'q',
    caseUp: 'Q',
    shiftCaps: 'q'
  },
  rus: {
    caps: 'Й',
    caseDown: 'й',
    caseUp: 'Й',
    shiftCaps: 'й'
  }
}, {
  className: 'KeyW',
  eng: {
    caps: 'W',
    caseDown: 'w',
    caseUp: 'W',
    shiftCaps: 'w'
  },
  rus: {
    caps: 'Ц',
    caseDown: 'ц',
    caseUp: 'Ц',
    shiftCaps: 'ц'
  }
}, {
  className: 'KeyE',
  eng: {
    caps: 'E',
    caseDown: 'e',
    caseUp: 'E',
    shiftCaps: 'e'
  },
  rus: {
    caps: 'У',
    caseDown: 'у',
    caseUp: 'У',
    shiftCaps: 'у'
  }
}, {
  className: 'KeyR',
  eng: {
    caps: 'R',
    caseDown: 'r',
    caseUp: 'R',
    shiftCaps: 'r'
  },
  rus: {
    caps: 'К',
    caseDown: 'к',
    caseUp: 'К',
    shiftCaps: 'к'
  }
}, {
  className: 'KeyT',
  eng: {
    caps: 'T',
    caseDown: 't',
    caseUp: 'T',
    shiftCaps: 't'
  },
  rus: {
    caps: 'Е',
    caseDown: 'е',
    caseUp: 'Е',
    shiftCaps: 'е'
  }
}, {
  className: 'KeyY',
  eng: {
    caps: 'Y',
    caseDown: 'y',
    caseUp: 'Y',
    shiftCaps: 'y'
  },
  rus: {
    caps: 'Н',
    caseDown: 'н',
    caseUp: 'Н',
    shiftCaps: 'н'
  }
}, {
  className: 'KeyU',
  eng: {
    caps: 'U',
    caseDown: 'u',
    caseUp: 'U',
    shiftCaps: 'u'
  },
  rus: {
    caps: 'Г',
    caseDown: 'г',
    caseUp: 'Г',
    shiftCaps: 'г'
  }
}, {
  className: 'KeyI',
  eng: {
    caps: 'I',
    caseDown: 'i',
    caseUp: 'I',
    shiftCaps: 'i'
  },
  rus: {
    caps: 'Ш',
    caseDown: 'ш',
    caseUp: 'Ш',
    shiftCaps: 'ш'
  }
}, {
  className: 'KeyO',
  eng: {
    caps: 'O',
    caseDown: 'o',
    caseUp: 'O',
    shiftCaps: 'o'
  },
  rus: {
    caps: 'Щ',
    caseDown: 'щ',
    caseUp: 'Щ',
    shiftCaps: 'щ'
  }
}, {
  className: 'KeyP',
  eng: {
    caps: 'P',
    caseDown: 'p',
    caseUp: 'P',
    shiftCaps: 'p'
  },
  rus: {
    caps: 'З',
    caseDown: 'з',
    caseUp: 'З',
    shiftCaps: 'з'
  }
}, {
  className: 'BracketLeft',
  eng: {
    caps: '[',
    caseDown: '[',
    caseUp: '{',
    shiftCaps: '{'
  },
  rus: {
    caps: 'Х',
    caseDown: 'х',
    caseUp: 'Х',
    shiftCaps: 'х'
  }
}, {
  className: 'BracketRight',
  eng: {
    caps: ']',
    caseDown: ']',
    caseUp: '}',
    shiftCaps: '}'
  },
  rus: {
    caps: 'Ъ',
    caseDown: 'ъ',
    caseUp: 'Ъ',
    shiftCaps: 'ъ'
  }
}, {
  className: 'Backslash',
  eng: {
    caps: '\\',
    caseDown: '\\',
    caseUp: '|',
    shiftCaps: '|'
  },
  rus: {
    caps: '\\',
    caseDown: '\\',
    caseUp: '/',
    shiftCaps: '/'
  }
}, {
  className: 'Delete',
  eng: {
    caps: 'Del',
    caseDown: 'Del',
    caseUp: 'Del',
    shiftCaps: 'Del'
  },
  rus: {
    caps: 'Del',
    caseDown: 'Del',
    caseUp: 'Del',
    shiftCaps: 'Del'
  }
}], [{
  className: 'CapsLock',
  eng: {
    caps: 'CapsLock',
    caseDown: 'CapsLock',
    caseUp: 'CapsLock',
    shiftCaps: 'CapsLock'
  },
  rus: {
    caps: 'CapsLock',
    caseDown: 'CapsLock',
    caseUp: 'CapsLock',
    shiftCaps: 'CapsLock'
  }
}, {
  className: 'KeyA',
  eng: {
    caps: 'A',
    caseDown: 'a',
    caseUp: 'A',
    shiftCaps: 'a'
  },
  rus: {
    caps: 'Ф',
    caseDown: 'ф',
    caseUp: 'Ф',
    shiftCaps: 'ф'
  }
}, {
  className: 'KeyS',
  eng: {
    caps: 'S',
    caseDown: 's',
    caseUp: 'S',
    shiftCaps: 's'
  },
  rus: {
    caps: 'Ы',
    caseDown: 'ы',
    caseUp: 'Ы',
    shiftCaps: 'ы'
  }
}, {
  className: 'KeyD',
  eng: {
    caps: 'D',
    caseDown: 'd',
    caseUp: 'D',
    shiftCaps: 'd'
  },
  rus: {
    caps: 'В',
    caseDown: 'в',
    caseUp: 'В',
    shiftCaps: 'в'
  }
}, {
  className: 'KeyF',
  eng: {
    caps: 'F',
    caseDown: 'f',
    caseUp: 'F',
    shiftCaps: 'f'
  },
  rus: {
    caps: 'А',
    caseDown: 'а',
    caseUp: 'А',
    shiftCaps: 'а'
  }
}, {
  className: 'KeyG',
  eng: {
    caps: 'G',
    caseDown: 'g',
    caseUp: 'G',
    shiftCaps: 'g'
  },
  rus: {
    caps: 'П',
    caseDown: 'п',
    caseUp: 'П',
    shiftCaps: 'п'
  }
}, {
  className: 'KeyH',
  eng: {
    caps: 'H',
    caseDown: 'h',
    caseUp: 'H',
    shiftCaps: 'h'
  },
  rus: {
    caps: 'Р',
    caseDown: 'р',
    caseUp: 'Р',
    shiftCaps: 'р'
  }
}, {
  className: 'KeyJ',
  eng: {
    caps: 'J',
    caseDown: 'j',
    caseUp: 'J',
    shiftCaps: 'j'
  },
  rus: {
    caps: 'О',
    caseDown: 'о',
    caseUp: 'О',
    shiftCaps: 'о'
  }
}, {
  className: 'KeyK',
  eng: {
    caps: 'K',
    caseDown: 'k',
    caseUp: 'K',
    shiftCaps: 'k'
  },
  rus: {
    caps: 'Л',
    caseDown: 'л',
    caseUp: 'Л',
    shiftCaps: 'л'
  }
}, {
  className: 'KeyL',
  eng: {
    caps: 'L',
    caseDown: 'l',
    caseUp: 'L',
    shiftCaps: 'l'
  },
  rus: {
    caps: 'Д',
    caseDown: 'д',
    caseUp: 'Д',
    shiftCaps: 'д'
  }
}, {
  className: 'Semicolon',
  eng: {
    caps: ';',
    caseDown: ';',
    caseUp: ':',
    shiftCaps: ':'
  },
  rus: {
    caps: 'Ж',
    caseDown: 'ж',
    caseUp: 'Ж',
    shiftCaps: 'ж'
  }
}, {
  className: 'Quote',
  eng: {
    caps: "'",
    caseDown: "'",
    caseUp: '"',
    shiftCaps: '"'
  },
  rus: {
    caps: 'Э',
    caseDown: 'э',
    caseUp: 'Э',
    shiftCaps: 'э'
  }
}, {
  className: 'Enter',
  eng: {
    caps: 'Enter',
    caseDown: 'Enter',
    caseUp: 'Enter',
    shiftCaps: 'Enter'
  },
  rus: {
    caps: 'Enter',
    caseDown: 'Enter',
    caseUp: 'Enter',
    shiftCaps: 'Enter'
  }
}], [{
  className: 'ShiftLeft',
  eng: {
    caps: 'Shift',
    caseDown: 'Shift',
    caseUp: 'Shift',
    shiftCaps: 'Shift'
  },
  rus: {
    caps: 'Shift',
    caseDown: 'Shift',
    caseUp: 'Shift',
    shiftCaps: 'Shift'
  }
}, {
  className: 'KeyZ',
  eng: {
    caps: 'Z',
    caseDown: 'z',
    caseUp: 'Z',
    shiftCaps: 'z'
  },
  rus: {
    caps: 'Я',
    caseDown: 'я',
    caseUp: 'Я',
    shiftCaps: 'я'
  }
}, {
  className: 'KeyX',
  eng: {
    caps: 'X',
    caseDown: 'x',
    caseUp: 'X',
    shiftCaps: 'x'
  },
  rus: {
    caps: 'Ч',
    caseDown: 'ч',
    caseUp: 'Ч',
    shiftCaps: 'ч'
  }
}, {
  className: 'KeyC',
  eng: {
    caps: 'C',
    caseDown: 'c',
    caseUp: 'C',
    shiftCaps: 'c'
  },
  rus: {
    caps: 'С',
    caseDown: 'с',
    caseUp: 'С',
    shiftCaps: 'с'
  }
}, {
  className: 'KeyV',
  eng: {
    caps: 'V',
    caseDown: 'v',
    caseUp: 'V',
    shiftCaps: 'v'
  },
  rus: {
    caps: 'М',
    caseDown: 'м',
    caseUp: 'М',
    shiftCaps: 'м'
  }
}, {
  className: 'KeyB',
  eng: {
    caps: 'B',
    caseDown: 'b',
    caseUp: 'B',
    shiftCaps: 'b'
  },
  rus: {
    caps: 'И',
    caseDown: 'и',
    caseUp: 'И',
    shiftCaps: 'и'
  }
}, {
  className: 'KeyN',
  eng: {
    caps: 'N',
    caseDown: 'n',
    caseUp: 'N',
    shiftCaps: 'n'
  },
  rus: {
    caps: 'Т',
    caseDown: 'т',
    caseUp: 'Т',
    shiftCaps: 'т'
  }
}, {
  className: 'KeyM',
  eng: {
    caps: 'M',
    caseDown: 'm',
    caseUp: 'M',
    shiftCaps: 'm'
  },
  rus: {
    caps: 'Ь',
    caseDown: 'ь',
    caseUp: 'Ь',
    shiftCaps: 'ь'
  }
}, {
  className: 'Comma',
  eng: {
    caps: ',',
    caseDown: ',',
    caseUp: '<',
    shiftCaps: '<'
  },
  rus: {
    caps: 'Б',
    caseDown: 'б',
    caseUp: 'Б',
    shiftCaps: 'б'
  }
}, {
  className: 'Period',
  eng: {
    caps: '.',
    caseDown: '.',
    caseUp: '>',
    shiftCaps: '>'
  },
  rus: {
    caps: 'Ю',
    caseDown: 'ю',
    caseUp: 'Ю',
    shiftCaps: 'ю'
  }
}, {
  className: 'Slash',
  eng: {
    caps: '/',
    caseDown: '/',
    caseUp: '?',
    shiftCaps: '?'
  },
  rus: {
    caps: '.',
    caseDown: '.',
    caseUp: ',',
    shiftCaps: ','
  }
}, {
  className: 'ArrowUp',
  eng: {
    caps: '▲',
    caseDown: '▲',
    caseUp: '▲',
    shiftCaps: '▲'
  },
  rus: {
    caps: '▲',
    caseDown: '▲',
    caseUp: '▲',
    shiftCaps: '▲'
  }
}, {
  className: 'ShiftRight',
  eng: {
    caps: 'Shift',
    caseDown: 'Shift',
    caseUp: 'Shift',
    shiftCaps: 'Shift'
  },
  rus: {
    caps: 'Shift',
    caseDown: 'Shift',
    caseUp: 'Shift',
    shiftCaps: 'Shift'
  }
}], [{
  className: 'ControlLeft',
  eng: {
    caps: 'Ctrl',
    caseDown: 'Ctrl',
    caseUp: 'Ctrl',
    shiftCaps: 'Ctrl'
  },
  rus: {
    caps: 'Ctrl',
    caseDown: 'Ctrl',
    caseUp: 'Ctrl',
    shiftCaps: 'Ctrl'
  }
}, {
  className: 'MetaLeft',
  eng: {
    caps: 'Win',
    caseDown: 'Win',
    caseUp: 'Win',
    shiftCaps: 'Win'
  },
  rus: {
    caps: 'Win',
    caseDown: 'Win',
    caseUp: 'Win',
    shiftCaps: 'Win'
  }
}, {
  className: 'AltLeft',
  eng: {
    caps: 'Alt',
    caseDown: 'Alt',
    caseUp: 'Alt',
    shiftCaps: 'Alt'
  },
  rus: {
    caps: 'Alt',
    caseDown: 'Alt',
    caseUp: 'Alt',
    shiftCaps: 'Alt'
  }
}, {
  className: 'Space',
  eng: {
    caps: ' ',
    caseDown: ' ',
    caseUp: ' ',
    shiftCaps: ' '
  },
  rus: {
    caps: ' ',
    caseDown: ' ',
    caseUp: ' ',
    shiftCaps: ' '
  }
}, {
  className: 'AltRight',
  eng: {
    caps: 'Alt',
    caseDown: 'Alt',
    caseUp: 'Alt',
    shiftCaps: 'Alt'
  },
  rus: {
    caps: 'Alt',
    caseDown: 'Alt',
    caseUp: 'Alt',
    shiftCaps: 'Alt'
  }
}, {
  className: 'ArrowLeft',
  eng: {
    caps: '◄',
    caseDown: '◄',
    caseUp: '◄',
    shiftCaps: '◄'
  },
  rus: {
    caps: '◄',
    caseDown: '◄',
    caseUp: '◄',
    shiftCaps: '◄'
  }
}, {
  className: 'ArrowDown',
  eng: {
    caps: '▼',
    caseDown: '▼',
    caseUp: '▼',
    shiftCaps: '▼'
  },
  rus: {
    caps: '▼',
    caseDown: '▼',
    caseUp: '▼',
    shiftCaps: '▼'
  }
}, {
  className: 'ArrowRight',
  eng: {
    caps: '►',
    caseDown: '►',
    caseUp: '►',
    shiftCaps: '►'
  },
  rus: {
    caps: '►',
    caseDown: '►',
    caseUp: '►',
    shiftCaps: '►'
  }
}, {
  className: 'ControlRight',
  eng: {
    caps: 'Ctrl',
    caseDown: 'Ctrl',
    caseUp: 'Ctrl',
    shiftCaps: 'Ctrl'
  },
  rus: {
    caps: 'Ctrl',
    caseDown: 'Ctrl',
    caseUp: 'Ctrl',
    shiftCaps: 'Ctrl'
  }
}]];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BUTTON_KEYS);

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/normalize.css":
/*!**********************************!*\
  !*** ./src/styles/normalize.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/normalize.css */ "./src/styles/normalize.css");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboard */ "./src/keyboard.js");



var BODY = document.querySelector('body');
var WRAPPER = document.createElement('div');
WRAPPER.classList.add('wrapper');
BODY.appendChild(WRAPPER);
var CONTAINER = document.createElement('div');
CONTAINER.classList.add('container');
WRAPPER.appendChild(CONTAINER);
var H1 = document.createElement('h1');
CONTAINER.appendChild(H1).innerText = 'Virtual-Keyboard';
var KEYBOARD = new _keyboard__WEBPACK_IMPORTED_MODULE_2__["default"]();
CONTAINER.appendChild(KEYBOARD.init());
var SECTION_FOOTER = document.createElement('div');
SECTION_FOOTER.classList.add('footer');
CONTAINER.appendChild(SECTION_FOOTER);
var P1 = document.createElement('p');
var P2 = document.createElement('p');
SECTION_FOOTER.appendChild(P1).innerText = 'Клавиатура создана в операционной системе Windows';
SECTION_FOOTER.appendChild(P2).innerText = 'Для переключения языка комбинация: левыe Alt + Shift';
})();

/******/ })()
;
//# sourceMappingURL=main.js.map