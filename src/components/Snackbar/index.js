'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _snackbarActions = require('../../state/snackbarActions');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Snackbar = function (_React$Component) {
    _inherits(Snackbar, _React$Component);

    function Snackbar(props) {
        _classCallCheck(this, Snackbar);

        var _this = _possibleConstructorReturn(this, (Snackbar.__proto__ || Object.getPrototypeOf(Snackbar)).call(this, props));

        _this.state = {
            snack: null,
            visible: false
        };
        return _this;
    }

    _createClass(Snackbar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.snack) {
                this.showSnack(this.props.snack);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var snack = this.props.snack;
            var nextSnack = nextProps.snack;
            var visibleSnack = this.state.snack;
            var isInactive = this.props.inactive;
            var willInactivate = nextProps.inactive;
            if (!willInactivate && (nextSnack && !snack || nextSnack && nextSnack.id !== (snack || {}).id)) {
                this.showSnack(nextSnack); // Active, and a new snack stands in line in the queue. Show it!
            } else if (isInactive && !willInactivate && snack && !visibleSnack) {
                this.showSnack(snack); // Will be active, and we have a snack. Show it!
            } else if (!isInactive && willInactivate && visibleSnack) {
                this.hideSnack(); // Will deactivate, remove the snack until we become active again
            } else if (!nextSnack && snack) {
                this.hideSnack(); // The current snack has been removed from the queue, no one stands in line. Hide it!
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearDismissTimer();
        }
    }, {
        key: 'showSnack',
        value: function showSnack(snack) {
            var _this2 = this;

            this.hideSnack().then(function () {
                _this2.setState({ snack: snack, visible: false });
                setTimeout(function () {
                    _this2.setState({ visible: true });
                    if (snack.data.timeout) {
                        _this2.snackTimer = setTimeout(function () {
                            _this2.props.dispatch((0, _snackbarActions.dismissSnack)(snack.id));
                        }, snack.data.timeout);
                    }
                }, 1);
            });
        }
    }, {
        key: 'hideSnack',
        value: function hideSnack() {
            var _this3 = this;

            if (!this.state.snack) {
                return Promise.resolve();
            }
            return new Promise(function (resolve) {
                _this3.clearDismissTimer();
                _this3.setState({ visible: false });
                _this3.afterTransition = function () {
                    _this3.setState({ snack: null });
                    resolve();
                };
            });
        }
    }, {
        key: 'clearDismissTimer',
        value: function clearDismissTimer() {
            if (this.snackTimer) {
                clearTimeout(this.snackTimer);
                this.snackTimer = null;
            }
        }
    }, {
        key: 'transitionEndHandler',
        value: function transitionEndHandler() {
            if (this.afterTransition) {
                this.afterTransition();
                this.afterTransition = null;
            }
        }
    }, {
        key: 'buttonClickHandler',
        value: function buttonClickHandler() {
            var onButtonClick = this.props.onButtonClick;
            var snack = this.state.snack;
            var id = snack.id,
                _snack$data$button = snack.data.button,
                button = _snack$data$button === undefined ? {} : _snack$data$button;


            if (onButtonClick) {
                onButtonClick(snack);
            } else if (button.action && typeof button.action === 'function') {
                button.action(snack);
            } else if (button.action === 'redirect' && button.href) {
                window.location.href = button.href;
            }

            this.props.dispatch((0, _snackbarActions.dismissSnack)(id));
        }
    }, {
        key: 'populateStyles',
        value: function populateStyles(elem) {
            var _props = this.props,
                theming = _props.theming,
                customStyles = _props.customStyles;

            var largeScreen = window.matchMedia('(min-width: 720px)').matches;
            return (0, _styles2.default)(elem, largeScreen, this.state.visible, theming, customStyles);
        }
    }, {
        key: 'render',
        value: function render() {
            var snack = this.state.snack;

            if (!snack) {
                return null;
            }
            var button = (snack.data.button || {}).label ? snack.data.button : null;
            return _react2.default.createElement(
                'div',
                { style: this.populateStyles('snack'),
                    onTransitionEnd: this.transitionEndHandler },
                _react2.default.createElement(
                    'span',
                    { style: this.populateStyles('label') },
                    snack.data.label
                ),
                button && _react2.default.createElement(
                    'button',
                    {
                        style: this.populateStyles('button'),
                        onClick: this.buttonClickHandler
                    },
                    button.label
                )
            );
        }
    }]);

    return Snackbar;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
    return { snack: state.snackbar.queue[0] || null };
})(Snackbar);