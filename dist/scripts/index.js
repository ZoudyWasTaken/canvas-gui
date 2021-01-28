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
define("Utils/Util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Util = void 0;
    var Util = (function () {
        function Util() {
        }
        return Util;
    }());
    exports.Util = Util;
});
define("Utils/EventListenerUtil", ["require", "exports", "Utils/Util"], function (require, exports, Util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventListenerUtil = (function (_super) {
        __extends(EventListenerUtil, _super);
        function EventListenerUtil() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.listeners = new Map;
            return _this;
        }
        EventListenerUtil.prototype.addEventListener = function (name, func) {
            if (!this.listeners.has(name))
                this.listeners.set(name, []);
            this.listeners.get(name).push(func);
            return;
        };
        EventListenerUtil.prototype.removeEventListener = function (name, func) {
            if (!this.listeners.has(name))
                return;
            console.log(this.listeners);
            var index = this.listeners.get(name).indexOf(this.listeners.get(name).find(function (a) { return a == func; }));
            this.listeners.get(name).splice(index, 1);
            console.log(this.listeners);
            return;
        };
        EventListenerUtil.prototype.emit = function (name, data) {
            if (!this.listeners.has(name))
                return;
            this.listeners.get(name).forEach(function (f) {
                f(data);
            });
            return;
        };
        return EventListenerUtil;
    }(Util_1.Util));
    exports.default = EventListenerUtil;
});
define("Elements/Element", ["require", "exports", "Utils/EventListenerUtil"], function (require, exports, EventListenerUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Element = (function (_super) {
        __extends(Element, _super);
        function Element(context, size, pos) {
            if (size === void 0) { size = { width: 0, height: 0 }; }
            if (pos === void 0) { pos = { x: 0, y: 0 }; }
            var _this = _super.call(this) || this;
            _this.onclick = null;
            _this.onmouseenter = null;
            _this.onmouseleave = null;
            _this.onmouseover = null;
            _this.onmouseup = null;
            _this.onmousedown = null;
            _this.size = size;
            _this.pos = pos;
            ["click", "mouseup", "mousedown", "mouseenter", "mouseleave", "mouseover"].forEach(function (key) {
                context.canvas.addEventListener(key, function (e) {
                    var func_ = _this["on" + key];
                    if (_this.inside(_this, { x: e.clientX, y: e.clientY }) && func_ && (func_ instanceof Function)) {
                        _this.emit(key, e);
                        func_(e);
                    }
                });
            });
            return _this;
        }
        Element.prototype.render = function (context, pos) {
            return;
        };
        Element.prototype.update = function () {
            return;
        };
        Element.prototype.inside = function (object, pos) {
            return (pos.x >= object.pos.x) &&
                (pos.x <= object.pos.x + object.size.width) &&
                (pos.y >= object.pos.y) &&
                (pos.y <= object.pos.y + object.size.height);
        };
        return Element;
    }(EventListenerUtil_1.default));
    exports.default = Element;
});
define("Elements/Container", ["require", "exports", "Elements/Element"], function (require, exports, Element_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(context, pos) {
            var _this = _super.call(this, context) || this;
            _this.children = new Array;
            _this.render(context, pos);
            return _this;
        }
        Container.prototype.append = function (child) {
            this.children.push(child);
            return;
        };
        Container.prototype.render = function (context, pos) {
            if (pos == null)
                pos = this.pos;
            var prev_fillstyle = context.fillStyle;
            this.children.forEach(function (child) {
                child.render(context, {
                    x: pos.x + child.pos.x,
                    y: pos.y + child.pos.y
                });
                child.update();
            });
            context.fillStyle = prev_fillstyle;
            return;
        };
        Container.prototype.update = function () {
            return;
        };
        return Container;
    }(Element_1.default));
    exports.default = Container;
});
define("Utils/TextUtil", ["require", "exports", "Utils/Util"], function (require, exports, Util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextUtil = (function (_super) {
        __extends(TextUtil, _super);
        function TextUtil() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextUtil.draw_text = function (context, text, pos, color) {
            if (color === void 0) { color = 'white'; }
            var prev_fillstyle = context.fillStyle;
            var size = (context.canvas.width / 32);
            context.fillStyle = color;
            context.font = size + 'px serif';
            context.fillStyle = "white";
            context.fillText(text, pos.x, pos.y + size - 24);
            context.fillStyle = prev_fillstyle;
            return;
        };
        return TextUtil;
    }(Util_2.Util));
    exports.default = TextUtil;
});
define("Elements/Button", ["require", "exports", "Utils/TextUtil", "Elements/Element"], function (require, exports, TextUtil_1, Element_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(context, text, size, pos) {
            var _this = _super.call(this, context, {
                width: size.width,
                height: size.height
            }, pos) || this;
            _this.innerText = text;
            _this.render(context, _this.pos);
            return _this;
        }
        Button.prototype.render = function (context, pos) {
            if (pos === void 0) { pos = this.pos; }
            var prev_fillstyle = context.fillStyle;
            context.fillStyle = "aqua";
            context.fillRect(pos.x - (this.size.width / 32), pos.y + (this.size.height / 8), this.size.width, this.size.height);
            context.fillStyle = "blue";
            context.fillRect(pos.x, pos.y, this.size.width, this.size.height);
            context.fillStyle = prev_fillstyle;
            TextUtil_1.default.draw_text(context, this.innerText, {
                x: (pos.x + this.size.width / 5),
                y: (pos.y + this.size.height)
            });
            return;
        };
        Button.prototype.update = function () {
            return;
        };
        return Button;
    }(Element_2.default));
    exports.default = Button;
});
define("Elements/Text", ["require", "exports", "Utils/TextUtil", "Elements/Element"], function (require, exports, TextUtil_2, Element_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(context, text, pos) {
            var _this = this;
            function getWidth() {
                return (context.canvas.width / 16) - 12 * text.length;
            }
            function getHeight() {
                return (context.canvas.height / 16) - 12;
            }
            _this = _super.call(this, context, {
                width: getWidth(),
                height: getHeight()
            }, pos) || this;
            _this.text = text;
            _this.render(context, pos);
            return _this;
        }
        Text.prototype.render = function (context, pos) {
            if (pos == null)
                pos = this.pos;
            var prev_fillstyle = context.fillStyle;
            TextUtil_2.default.draw_text(context, this.text, pos);
            context.fillStyle = prev_fillstyle;
            return;
        };
        Text.prototype.update = function () {
            return;
        };
        return Text;
    }(Element_3.default));
    exports.default = Text;
});
define("index", ["require", "exports", "Elements/Container", "Elements/Button", "Elements/Text"], function (require, exports, Container_1, Button_1, Text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ELEMENTS_ = void 0;
    var context = document.getElementById('painting').getContext('2d');
    if (context == null)
        throw new Error('Found canvas but failed to get context "2d" ;(');
    var cwidth = context.canvas.width;
    var cheight = context.canvas.height;
    var fps = 0;
    var MAX_FPS = 60;
    var times = [];
    var running = true;
    var show_fps = true;
    function getFPS() {
        var now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000)
            times.shift();
        times.push(now);
        fps = times.length;
        return fps > MAX_FPS ? MAX_FPS : fps;
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
        registerElement(Button_1.default, "Button #1", { width: 100, height: 75 }, { x: 125, y: 25 }),
        registerElement(Button_1.default, "Pizza time!", { width: 100, height: 75 * 2 }, { x: 125, y: 250 }),
        registerElement(Text_1.default, "TEXT", { x: 500, y: 500 })
    ];
    window['ELEMENTS_'] = exports.ELEMENTS_;
    var cont = new Container_1.default(context, { x: 40, y: 40 });
    for (var i = 0; i < exports.ELEMENTS_.length; ++i)
        cont.append(exports.ELEMENTS_[i]);
    console.log(exports.ELEMENTS_);
    var fps_c = registerElement(Text_1.default, "", { x: 10, y: 20 });
    function main() {
        context.fillRect(0, 0, cwidth, cheight);
        fps_c.text = getFPS() + "/" + MAX_FPS + " fps";
        show_fps ? fps_c.render(context, null) : null;
        cont.render(context, null);
        cont.update();
    }
    setInterval(function () {
        if (running)
            main();
    }, getFPS());
});
