var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define("Utils/text", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function draw_text(context, text, x, y, color) {
        if (color === void 0) { color = 'white'; }
        var prev_fillstyle = context.fillStyle;
        var size = (context.canvas.width / 32);
        context.fillStyle = color;
        context.font = size + 'px serif';
        context.fillStyle = "white";
        context.fillText(text, x, y + size - 24);
        context.fillStyle = prev_fillstyle;
        return;
    }
    exports["default"] = draw_text;
});
define("Elements/Element", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Element = (function () {
        function Element(context, x, y, width, height) {
            var _this = this;
            this.id = Math.floor(Math.random() * 420);
            this.onclick = null;
            this.onmouseenter = null;
            this.onmouseleave = null;
            this.onmouseover = null;
            this.onmouseup = null;
            this.onmousedown = null;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            ["click", "mouseup", "mousedown"].forEach(function (key) {
                context.canvas.addEventListener(key, function (e) {
                    var func_ = _this["on" + key];
                    if (_this.inside(_this, e.clientX, e.clientY) && func_ && (func_ instanceof Function))
                        func_(e);
                });
            });
        }
        Element.prototype.render = function (context) {
            return;
        };
        Element.prototype.update = function () {
            return;
        };
        Element.prototype.inside = function (object, x, y) {
            if ((x >= object.x) && (x <= object.x + object.width) && (y >= object.y) && (y <= object.y + object.height))
                return true;
            return false;
        };
        return Element;
    }());
    exports["default"] = Element;
});
define("Elements/Button", ["require", "exports", "Utils/text", "Elements/Element"], function (require, exports, text_1, Element_1) {
    "use strict";
    exports.__esModule = true;
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(context, text, x, y, width, height) {
            var _this = _super.call(this, context, x, y, width, height) || this;
            _this.text = text;
            _this.render(context);
            return _this;
        }
        Button.prototype.render = function (context) {
            var prev_fillstyle = context.fillStyle;
            if (this.inside(this, 170, 96)) {
                context.fillStyle = "darkblue";
            }
            else {
                context.fillStyle = "aqua";
            }
            context.fillRect(this.x - (this.width / 32), this.y + (this.height / 8), this.width, this.height);
            context.fillStyle = "blue";
            context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = prev_fillstyle;
            text_1["default"](context, this.text, (this.x + this.width / 5), (this.y + this.height));
            return;
        };
        Button.prototype.update = function () {
            return;
        };
        return Button;
    }(Element_1["default"]));
    exports["default"] = Button;
});
define("Elements/Text", ["require", "exports", "Utils/text", "Elements/Element"], function (require, exports, text_2, Element_2) {
    "use strict";
    exports.__esModule = true;
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(context, text, x, y) {
            var _this = this;
            function getWidth() {
                return (context.canvas.width / 16) - 12 * text.length;
            }
            function getHeight() {
                return (context.canvas.height / 16) - 12;
            }
            _this = _super.call(this, context, x, y, getWidth(), getHeight()) || this;
            _this.text = text;
            _this.render(context);
            return _this;
        }
        Text.prototype.render = function (context) {
            var prev_fillstyle = context.fillStyle;
            text_2["default"](context, this.text, this.x, this.y, (context.canvas.width / 16));
            context.fillStyle = prev_fillstyle;
            return;
        };
        Text.prototype.update = function () {
            return;
        };
        return Text;
    }(Element_2["default"]));
    exports["default"] = Text;
});
define("index", ["require", "exports", "Elements/Button", "Elements/Text"], function (require, exports, Button_1, Text_1) {
    "use strict";
    exports.__esModule = true;
    exports.ELEMENTS_ = void 0;
    var context = document.getElementById('painting').getContext('2d');
    if (context == null)
        throw new Error('Found canvas but failed to get context "2d" ;(');
    var width = context.canvas.width;
    var height = context.canvas.height;
    var fps = 0;
    var times = [];
    var running = true;
    var show_fps = true;
    function getFPS() {
        var now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000)
            times.shift();
        times.push(now);
        fps = times.length;
        return fps;
    }
    function registerElement(func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = new (func.bind.apply(func, __spreadArrays([void 0, context], args)))();
        _a.onclick = function (e) {
            console.log('Clicked!', e);
        };
        _a.onmousedown = function () {
            console.log('Moused down!');
        };
        _a.onmouseup = function () {
            console.log('Moused up!');
        };
        return _a;
    }
    exports.ELEMENTS_ = [
        registerElement(Button_1["default"], "Button #1", 100, 75, 125, 25),
        registerElement(Button_1["default"], "Pizza time!", 100, 75 * 2, 125, 25),
        registerElement(Text_1["default"], "TEXT", 500, 500)
    ];
    window['getButtonById'] = function (id) {
        return exports.ELEMENTS_.filter(function (val) { return val.id == id; })[0];
    };
    console.log(exports.ELEMENTS_);
    var fps_c = registerElement(Text_1["default"], "", 10, 20);
    function main() {
        context.fillRect(0, 0, width, height);
        fps_c.text = getFPS() + " fps";
        show_fps ? fps_c.render(context) : null;
        exports.ELEMENTS_.forEach(function (e) {
            try {
                e.render(context);
                e.update();
            }
            catch (err) {
                var _el_name = e.toString().split(" ")[1].split("]")[0];
                console.log("Unable to render element '" + _el_name + "'. \n", err);
            }
        });
        if (running)
            requestAnimationFrame(main);
    }
    main();
});
