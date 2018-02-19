"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var _require = require("react-vr"),
    View = _require.View,
    VrButton = _require.VrButton;

module.exports = function (_React$Component) {
  _inherits(GazeButton, _React$Component);

  function GazeButton(props) {
    _classCallCheck(this, GazeButton);

    var _this = _possibleConstructorReturn(this, (GazeButton.__proto__ || Object.getPrototypeOf(GazeButton)).call(this, props));

    _this.state = {
      beingLookedAt: false,
      remainingTime: 0
    };
    _this.handleEnter = _this.handleEnter.bind(_this);
    _this.handleExit = _this.handleExit.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.clearCountdown = _this.clearCountdown.bind(_this);
    _this.resetRemainingTime = _this.resetRemainingTime.bind(_this);
    return _this;
  }

  _createClass(GazeButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resetRemainingTime();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearCountdown();
    }
  }, {
    key: "resetRemainingTime",
    value: function resetRemainingTime() {
      var duration = this.props.duration;

      this.setState({ remainingTime: duration });
    }
  }, {
    key: "handleEnter",
    value: function handleEnter() {
      var _this2 = this;

      var _props = this.props,
          duration = _props.duration,
          onClick = _props.onClick;

      this.gazeStart = Date.now();
      var endTime = this.gazeStart + duration;
      this.setState({ beingLookedAt: true });
      this.countdown = setInterval(function () {
        var beingLookedAt = _this2.state.beingLookedAt;

        var currentTime = Date.now();
        if (!beingLookedAt) {
          _this2.clearCountdown();
        } else if (currentTime > endTime) {
          _this2.handleClick();
        } else {
          _this2.setState({ remainingTime: endTime - currentTime });
        }
      }, 16);
    }
  }, {
    key: "handleExit",
    value: function handleExit() {
      this.setState({ beingLookedAt: false });
    }
  }, {
    key: "clearCountdown",
    value: function clearCountdown() {
      var duration = this.props.duration;

      clearInterval(this.countdown);
      this.setState({ remainingTime: duration });
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      var onClick = this.props.onClick;

      this.clearCountdown();
      onClick();
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          onClick = _props2.onClick,
          children = _props2.children;
      var remainingTime = this.state.remainingTime;

      return React.createElement(
        View,
        { onEnter: this.handleEnter, onExit: this.handleExit },
        React.createElement(
          VrButton,
          { onClick: this.handleClick },
          children(remainingTime)
        )
      );
    }
  }]);

  return GazeButton;
}(React.Component);
