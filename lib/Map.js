'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('react-raphael'),
    Raphael = _require.Raphael,
    Paper = _require.Paper,
    Set = _require.Set,
    Path = _require.Path,
    Text = _require.Text;

var Shape = function (_React$Component) {
    _inherits(Shape, _React$Component);

    function Shape(props) {
        _classCallCheck(this, Shape);

        var _this = _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).call(this, props));

        _this.state = {
            text: {
                x: 0 + (props.data.xx || 0),
                y: 0 + (props.data.yy || 0),
                text: props.data.name
            },
            path: props.data.path,
            color: {
                fill: props.data.fill,
                stroke: props.data.stroke,
                textFill: props.data.textFill,
                textStroke: props.data.textStroke
            }
        };
        return _this;
    }

    _createClass(Shape, [{
        key: 'handleLoad',
        value: function handleLoad(path) {
            var props = this.props;
            var box = path.getBBox();
            var center = {
                x: box.x + box.width / 2,
                y: box.y + box.height / 2
            };
            var text = this.state.text;
            text.x = center.x + (props.data.xx || 0);
            text.y = center.y + (props.data.yy || 0);
            this.setState({
                text: text
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                text = _state.text,
                path = _state.path,
                color = _state.color;

            return React.createElement(
                Set,
                null,
                React.createElement(Path, { d: path, load: this.handleLoad.bind(this), attr: { fill: color.fill, stroke: color.stroke }, mouseover: this.props.mouseover, mouseout: this.props.mouseout }),
                React.createElement(Text, { x: text.x, y: text.y, text: text.text, attr: { fill: color.textFill, stroke: color.textStroke } })
            );
        }
    }]);

    return Shape;
}(React.Component);

var Map = function (_React$Component2) {
    _inherits(Map, _React$Component2);

    function Map() {
        _classCallCheck(this, Map);

        return _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).apply(this, arguments));
    }

    _createClass(Map, [{
        key: 'handleMouseOver',
        value: function handleMouseOver(e) {
            if (!this._fill) this._fill = this.attr("fill");
            this.animate({
                fill: Raphael.getColor()
            }, 500);
        }
    }, {
        key: 'handleMouseOut',
        value: function handleMouseOut(e) {
            this.animate({ fill: this._fill }, 500);
        }
    }, {
        key: 'render',
        value: function render() {
            var map = this.props.data;
            var mouseover = this.props.mouseover;
            var mouseout = this.props.mouseout;
            var data = [];
            for (var key in map) {
                data.push({
                    key: key,
                    name: map[key].name || "",
                    path: map[key].path || "",
                    xx: map[key].xx || 0,
                    yy: map[key].yy || 0,
                    fill: map[key].backColor || "#97d6f5",
                    stroke: map[key].borderColor || "#fff",
                    textFill: map[key].textFill || "#000",
                    textStroke: map[key].textStroke
                });
            }
            var handleMouseOver = this.handleMouseOver;
            var handleMouseOut = this.handleMouseOut;

            return React.createElement(
                Paper,
                { width: 1000, height: 1000 },
                data.map(function (ele, pos) {
                    return React.createElement(Shape, { data: ele, key: pos, mouseover: handleMouseOver, mouseout: handleMouseOut });
                })
            );
        }
    }]);

    return Map;
}(React.Component);

module.exports = Map;