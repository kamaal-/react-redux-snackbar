'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function getDefaultStyles(theming) {
	return {
		snack: {
			display: 'flex',
			position: 'fixed',
			bottom: 0,
			left: 0,
			zIndex: 999,
			width: '100%',
			transition: 'transform 200ms ease-out',
			willChange: 'transform',
			transform: 'translate(0, 100%)',
			backgroundColor: theming.backgroundColor || 'rgba(0, 0, 0, 0.9)',
			padding: '13px 16px',
			largeScreen: {
				left: '50%',
				transform: 'translate(-50%, 100%)',
				borderRadius: '2px',
				padding: '20px 24px',
				minWidth: '400px',
				maxWidth: '600px'
			}
		},
		label: {
			flex: 4,
			font: theming.labelFont || 'normal 14px arial, sans-serif',
			color: theming.labelColor || '#fff'
		},
		button: {
			flex: 1,
			textAlign: 'right',
			font: theming.buttonFont || 'bold 14px arial, sans-serif',
			color: theming.buttonColor || '#bada55',
			border: 'none',
			background: 'none',
			padding: 0,
			margin: 0
		}
	};
}

function getTransitionStyles(elem, largeScreen, visible, theming) {
	if (elem === 'snack') {
		if (visible) {
			var small = 'translate(' + ((theming.transitionToXY || {}).smallScreen || '0, 0') + ')';
			var large = 'translate(' + ((theming.transitionToXY || {}).largeScreen || '-50%, 0') + ')';
			return {
				transform: largeScreen ? large : small
			};
		}
		return {};
	}
	return {
		transition: 'opacity 200ms ease-out',
		transitionDelay: '150ms',
		willChange: 'opacity',
		opacity: visible ? 1 : 0
	};
}

function getComputedStyles(elem, largeScreen, visible) {
	var theming = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	var customStyles = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

	var styles = _extends({}, getDefaultStyles(theming)[elem], customStyles[elem]);
	delete styles.largeScreen;
	if (largeScreen) {
		styles = _extends({}, styles, (getDefaultStyles(theming)[elem] || {}).largeScreen, (customStyles[elem] || {}).largeScreen);
	}
	styles = _extends({}, styles, getTransitionStyles(elem, largeScreen, visible, theming));
	return styles;
}

exports.default = getComputedStyles;