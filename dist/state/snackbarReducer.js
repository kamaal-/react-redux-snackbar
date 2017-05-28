'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var actionTypes = exports.actionTypes = {
	SHOW_SNACK: 'RRS_SHOW_SNACK',
	DISMISS_SNACK: 'RRS_DISMISS_SNACK'
};

var initialState = {
	queue: []
};

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    type = _ref.type,
	    payload = _ref.payload;

	var queue = void 0;
	switch (type) {
		case actionTypes.SHOW_SNACK:
			queue = state.queue.slice();
			queue.push({ id: payload.id, data: payload.data });
			return { queue: queue };
		case actionTypes.DISMISS_SNACK:
			queue = state.queue.filter(function (snack) {
				return snack.id !== payload.id;
			});
			return { queue: queue };
		default:
			return state;
	}
};