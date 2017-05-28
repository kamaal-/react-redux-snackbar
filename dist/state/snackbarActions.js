'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dismissSnack = exports.showSnack = undefined;

var _snackbarReducer = require('./snackbarReducer');

/**
 * To display a snack:
 *
 * dispatch(showSnack('myUniqueId', {
 * 	   label: 'Yay, there is a new version. Please reload the page to update',
 * 	   timeout: 5000,
 * 	   button: { label: 'RELOAD', action: 'redirect', href: window.location.href }
 * }));
 *
 * @param {String} id
 * @param {Object} data
 * @returns {Object}
 */
var showSnack = exports.showSnack = function showSnack(id) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { label: '', timeout: 7000, button: {} };

  return {
    type: _snackbarReducer.actionTypes.SHOW_SNACK,
    payload: { id: id, data: data }
  };
};

/**
 * To dismiss a snack:
 *
 * dispatch(dismissSnack('myUniqueId');
 *
 * @param {String} id
 * @returns {Object}
 */
var dismissSnack = exports.dismissSnack = function dismissSnack(id) {
  return {
    type: _snackbarReducer.actionTypes.DISMISS_SNACK,
    payload: { id: id }
  };
};