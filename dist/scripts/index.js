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
define("Utils/TextUtil", ["require", "exports", "Utils/Util"], function (require, exports, Util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextUtil = (function (_super) {
        __extends(TextUtil, _super);
        function TextUtil() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextUtil.draw_text = function (context, text, pos, color) {
            if (color === void 0) { color = "white"; }
            if (pos == null)
                return;
            var prev_fillstyle = context.fillStyle;
            var size = (context.canvas.width / 32);
            context.fillStyle = color;
            context.font = size + "px serif";
            context.fillStyle = "white";
            context.fillText(text, pos.x, pos.y + size - 24);
            context.fillStyle = prev_fillstyle;
            return;
        };
        return TextUtil;
    }(Util_1.Util));
    exports.default = TextUtil;
});
define("Utils/EventListenerUtil", ["require", "exports", "Utils/Util"], function (require, exports, Util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventListenerUtil = (function (_super) {
        __extends(EventListenerUtil, _super);
        function EventListenerUtil() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.listeners = new Map;
            return _this;
        }
        EventListenerUtil.prototype.addEventListener = function (name, func, removable) {
            if (!this.listeners.has(name))
                this.listeners.set(name, []);
            var listeners = this.listeners.get(name);
            listeners.push(func);
            listeners.push(removable || true);
            return;
        };
        EventListenerUtil.prototype.removeEventListener = function (name, func) {
            if (!this.listeners.has(name))
                return;
            console.log(this.listeners);
            var listeners = this.listeners.get(name);
            var index = listeners.indexOf(listeners.find(function (a) { return a == func; }));
            if (listeners[index + 1])
                this.listeners.get(name).splice(index, 1);
            console.log(this.listeners);
            return;
        };
        EventListenerUtil.prototype.emit = function (name, data) {
            if (!this.listeners.has(name))
                return;
            this.listeners.get(name).forEach(function (f) {
                if (f instanceof Function)
                    f(data);
            });
            return;
        };
        return EventListenerUtil;
    }(Util_2.Util));
    exports.default = EventListenerUtil;
});
define("Elements/Element", ["require", "exports", "Utils/EventListenerUtil"], function (require, exports, EventListenerUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Element = (function (_super) {
        __extends(Element, _super);
        function Element(size, pos, context) {
            if (size === void 0) { size = { width: 0, height: 0 }; }
            var _this = _super.call(this) || this;
            _this.onclick = null;
            _this.onmouseenter = null;
            _this.onmouseleave = null;
            _this.onmouseover = null;
            _this.onmouseup = null;
            _this.onmousedown = null;
            _this.setSize(size);
            _this.setPosition(pos || { x: 0, y: 0 });
            if (context)
                _this.setContext(context);
            return _this;
        }
        Element.prototype.render = function (pos) {
            return;
        };
        Element.prototype.update = function () {
            return;
        };
        Element.prototype.setContext = function (context) {
            this.context = context;
            this.setup_listeners(context);
            this.render(this.getPosition());
            return;
        };
        Element.prototype.getContext = function () {
            return this.context;
        };
        Element.prototype.setPosition = function (pos) {
            this.pos = pos;
            return;
        };
        Element.prototype.getPosition = function () {
            return this.pos;
        };
        Element.prototype.setSize = function (size) {
            this.size = size;
            return;
        };
        Element.prototype.getSize = function () {
            return this.size;
        };
        Element.prototype.inside = function (object, pos) {
            return (pos.x >= object.getPosition().x) &&
                (pos.x <= object.getPosition().x + object.getSize().width) &&
                (pos.y >= object.getPosition().y) &&
                (pos.y <= object.getPosition().y + object.getSize().height);
        };
        Element.prototype.setup_listeners = function (context) {
            var _this = this;
            ["click", "mouseup", "mousedown", "mouseenter", "mouseleave", "mouseover"].forEach(function (key) {
                context.canvas.addEventListener(key, function (e) {
                    if (_this.inside(_this, { x: e.clientX, y: e.clientY })) {
                        var func_ = _this["on" + key];
                        if (func_ instanceof Function)
                            func_(e);
                        _this.emit(key, e);
                    }
                });
            });
        };
        return Element;
    }(EventListenerUtil_1.default));
    exports.default = Element;
});
define("Elements/BooleanToggle", ["require", "exports", "Utils/TextUtil", "Elements/Element"], function (require, exports, TextUtil_1, Element_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BooleanToggle = (function (_super) {
        __extends(BooleanToggle, _super);
        function BooleanToggle(state, pos, size, context) {
            var _this = _super.call(this) || this;
            _this.onchange = null;
            _this.setPosition(pos);
            _this.setSize(size || { width: 125, height: 25 });
            _this.state = state;
            if (context)
                _this.setContext(context);
            _this.addEventListener("click", function () {
                _this.setState(!_this.getState());
                if (_this.onchange != null)
                    _this.onchange({ oldValue: !_this.getState(), newValue: _this.getState() });
            }, false);
            return _this;
        }
        BooleanToggle.prototype.render = function (pos) {
            var context = this.getContext();
            var prev_fillstyle = context.fillStyle;
            if (!this.getState()) {
                context.fillStyle = "aqua";
                context.fillRect(pos.x - (this.getSize().width / 64), pos.y + (this.getSize().height / 16), this.getSize().width, this.getSize().height);
                context.fillStyle = "blue";
                context.fillRect(pos.x, pos.y, this.getSize().width, this.getSize().height);
            }
            else {
                context.fillStyle = "red";
                context.fillRect(pos.x - (this.getSize().width / 64), pos.y + (this.getSize().height / 16), this.getSize().width, this.getSize().height);
                context.fillStyle = "darkred";
                context.fillRect(pos.x, pos.y, this.getSize().width, this.getSize().height);
            }
            var text = "Toggle: " + (this.getState() ? "ON" : "OFF");
            TextUtil_1.default.draw_text(context, text, {
                x: (pos.x + this.getSize().width / 5 - (text.length)),
                y: (pos.y + this.getSize().height)
            });
            context.fillStyle = prev_fillstyle;
            return;
        };
        BooleanToggle.prototype.getState = function () {
            return this.state;
        };
        BooleanToggle.prototype.setState = function (state) {
            this.state = state;
            return;
        };
        BooleanToggle.prototype.update = function () {
            return;
        };
        return BooleanToggle;
    }(Element_1.default));
    exports.default = BooleanToggle;
});
define("Elements/Button", ["require", "exports", "Utils/TextUtil", "Elements/Element"], function (require, exports, TextUtil_2, Element_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(text, pos, size, context) {
            var _this = _super.call(this) || this;
            _this.setPosition(pos);
            _this.setSize(size || { width: 125, height: 25 });
            _this.text = text;
            if (context)
                _this.setContext(context);
            _this.addEventListener("click", function () {
                if (_this.down)
                    return;
                _this.down = true;
                setTimeout(function () {
                    _this.down = false;
                }, 300);
            });
            return _this;
        }
        Button.prototype.render = function (pos) {
            var context = this.getContext();
            var prev_fillstyle = context.fillStyle;
            context.fillStyle = "aqua";
            if (!this.down) {
                context.fillRect(pos.x - (this.getSize().width / 64), pos.y + (this.getSize().height / 16), this.getSize().width, this.getSize().height);
            }
            else {
                context.fillRect(pos.x - (this.getSize().width / 24), pos.y + (this.getSize().height / 8), this.getSize().width, this.getSize().height);
            }
            context.fillStyle = "blue";
            context.fillRect(pos.x, pos.y, this.getSize().width, this.getSize().height);
            TextUtil_2.default.draw_text(context, this.text, {
                x: (pos.x + this.getSize().width / 5),
                y: (pos.y + this.getSize().height)
            });
            context.fillStyle = prev_fillstyle;
            return;
        };
        Button.prototype.getText = function () {
            return this.text;
        };
        Button.prototype.setText = function (text) {
            this.text = text;
            this.render(this.getPosition());
            return;
        };
        Button.prototype.update = function () {
            return;
        };
        return Button;
    }(Element_2.default));
    exports.default = Button;
});
define("Elements/Checkbox", ["require", "exports", "Elements/Element"], function (require, exports, Element_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Checkbox = (function (_super) {
        __extends(Checkbox, _super);
        function Checkbox(checked, pos, size, context) {
            if (checked === void 0) { checked = false; }
            var _this = _super.call(this) || this;
            _this.onchange = null;
            _this.setPosition(pos);
            if (size == null)
                size = 1;
            _this.setSize({ width: 10 * size, height: 10 * size });
            _this.checked = checked;
            if (context)
                _this.setContext(context);
            _this.addEventListener("click", function () {
                _this.setChecked(!_this.checked);
                if (_this.onchange != null)
                    _this.onchange({ oldValue: !_this.checked, newValue: _this.checked });
            }, false);
            return _this;
        }
        Checkbox.prototype.drawCheckmark = function (context, pos) {
            var color = "red";
            context.fillStyle = color;
            context.fillRect(this.getPosition().x + 4, this.getPosition().y + 4, this.getSize().width - 8, this.getSize().height - 8);
        };
        Checkbox.prototype.render = function (pos) {
            var context = this.getContext();
            var prev_fillstyle = context.fillStyle;
            context.fillStyle = "white";
            context.fillRect(this.getPosition().x, this.getPosition().y, this.getSize().width, this.getSize().height);
            if (this.checked)
                this.drawCheckmark(context, this.getPosition());
            context.fillStyle = prev_fillstyle;
            return;
        };
        Checkbox.prototype.isChecked = function () {
            return this.checked;
        };
        Checkbox.prototype.setChecked = function (checked) {
            this.checked = checked;
            return;
        };
        Checkbox.prototype.update = function () {
            return;
        };
        return Checkbox;
    }(Element_3.default));
    exports.default = Checkbox;
});
define("Elements/Container", ["require", "exports", "Elements/Element"], function (require, exports, Element_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(context, pos) {
            var _this = _super.call(this) || this;
            _this.children = new Array;
            _this.setPosition(pos || { x: 0, y: 0 });
            _this.setContext(context);
            return _this;
        }
        Container.prototype.render = function (pos) {
            var _this = this;
            var context = this.getContext();
            var prev_fillstyle = context.fillStyle;
            this.children.forEach(function (child) {
                child.render({
                    x: _this.getPosition().x + child.getPosition().x,
                    y: _this.getPosition().y + child.getPosition().y
                });
                child.update();
            });
            context.fillStyle = prev_fillstyle;
            return;
        };
        Container.prototype.appendChild = function (child) {
            child.setContext(this.getContext());
            this.children.push(child);
            return;
        };
        Container.prototype.getChildren = function () {
            return this.children;
        };
        Container.prototype.update = function () {
            return;
        };
        return Container;
    }(Element_4.default));
    exports.default = Container;
});
define("Elements/IterableToggle", ["require", "exports", "Utils/TextUtil", "Elements/Element"], function (require, exports, TextUtil_3, Element_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IterableToggle = (function (_super) {
        __extends(IterableToggle, _super);
        function IterableToggle(values, pos, size, context) {
            var _this = _super.call(this) || this;
            _this.onchange = null;
            _this.setPosition(pos);
            _this.setSize(size || { width: 125, height: 25 });
            _this.setValue(values[0].toString());
            if (context)
                _this.setContext(context);
            _this.addEventListener("click", function () {
                var oldval = _this.getValue();
                var index = values.indexOf(_this.getValue()) + 1;
                console.log(values, index);
                if (index == values.length) {
                    _this.setValue(values[0]);
                    console.log("VALUE SET TO 0");
                }
                else {
                    _this.setValue(values[index++]);
                    console.log("VALUE SET TO " + index++);
                }
                if (_this.onchange != null)
                    _this.onchange({ oldValue: oldval, newValue: _this.getValue() });
            }, false);
            return _this;
        }
        IterableToggle.prototype.render = function (pos) {
            var context = this.getContext();
            var prev_fillstyle = context.fillStyle;
            context.fillStyle = "aqua";
            context.fillRect(pos.x - (this.getSize().width / 64), pos.y + (this.getSize().height / 16), this.getSize().width, this.getSize().height);
            context.fillStyle = "blue";
            context.fillRect(pos.x, pos.y, this.getSize().width, this.getSize().height);
            var text = "Value: " + this.getValue();
            TextUtil_3.default.draw_text(context, text, {
                x: (pos.x + this.getSize().width / 5 - (text.length)),
                y: (pos.y + this.getSize().height)
            });
            context.fillStyle = prev_fillstyle;
            return;
        };
        IterableToggle.prototype.getValue = function () {
            return this.value;
        };
        IterableToggle.prototype.setValue = function (value) {
            this.value = value;
            return;
        };
        IterableToggle.prototype.update = function () {
            return;
        };
        return IterableToggle;
    }(Element_5.default));
    exports.default = IterableToggle;
});
define("Elements/Text", ["require", "exports", "Utils/TextUtil", "Elements/Element"], function (require, exports, TextUtil_4, Element_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(text, pos, context) {
            var _this = _super.call(this) || this;
            _this.setPosition(pos);
            if (context) {
                _this.setContext(context);
                _this.setSize({
                    width: _this.getContext().canvas.width / 16 - 12 * text.length,
                    height: _this.getContext().canvas.height / 16 - 12
                });
            }
            _this.text = text;
            return _this;
        }
        Text.prototype.render = function (pos) {
            var context = this.getContext();
            var prev_fillstyle = context.fillStyle;
            TextUtil_4.default.draw_text(context, this.text, pos);
            context.fillStyle = prev_fillstyle;
            return;
        };
        Text.prototype.getText = function () {
            return this.text;
        };
        Text.prototype.setText = function (text) {
            this.text = text;
            this.render(this.getPosition());
            return;
        };
        Text.prototype.update = function () {
            return;
        };
        return Text;
    }(Element_6.default));
    exports.default = Text;
});
define("CanvasGUI", ["require", "exports", "Elements/BooleanToggle", "Elements/Button", "Elements/Checkbox", "Elements/Container", "Elements/Element", "Elements/IterableToggle", "Elements/Text"], function (require, exports, BooleanToggle_1, Button_1, Checkbox_1, Container_1, Element_7, IterableToggle_1, Text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CanvasGUI = (function () {
        function CanvasGUI(context, options) {
            this.fps = 0;
            this.times = [];
            this.context = context;
            this.main_container = new Container_1.default(context, { x: 0, y: 0 });
            this.MAX_FPS = (options === null || options === void 0 ? void 0 : options.maxFPS) || 60;
            this.show_fps = (options === null || options === void 0 ? void 0 : options.showFPS) || true;
            this.running = (options === null || options === void 0 ? void 0 : options.run) || true;
            this.run();
        }
        CanvasGUI.prototype.run = function () {
            var _this = this;
            var cwidth = this.context.canvas.width;
            var cheight = this.context.canvas.height;
            var fps_counter = new Text_1.default("", { x: 10, y: 20 });
            fps_counter.setContext(this.context);
            var loop = function () {
                _this.context.fillStyle = "black";
                _this.context.fillRect(0, 0, cwidth, cheight);
                if (_this.show_fps)
                    fps_counter.setText(_this.getFPS() + " / " + _this.MAX_FPS + " fps");
                _this.main_container.render(null);
                _this.main_container.update();
            };
            setInterval(function () {
                if (_this.running)
                    loop();
            }, this.getFPS());
        };
        CanvasGUI.prototype.appendChild = function (child) {
            this.main_container.appendChild(child);
            return;
        };
        CanvasGUI.prototype.getElementById = function (id) {
            return this.main_container.getChildren().find(function (e) { return e.id == id; });
        };
        CanvasGUI.prototype.getContext = function () {
            return this.context;
        };
        CanvasGUI.prototype.createElement = function (name, options) {
            switch (name.toLowerCase()) {
                case "button":
                    return new Button_1.default("", { x: 0, y: 0 });
                case "checkbox":
                    return new Checkbox_1.default(false, { x: 0, y: 0 });
                case "container":
                    return new Container_1.default(this.getContext(), { x: 0, y: 0 });
                case "element":
                    return new Element_7.default();
                case "text":
                    return new Text_1.default("", { x: 0, y: 0 });
                default:
                    return new Element_7.default();
            }
        };
        CanvasGUI.prototype.getFPS = function () {
            var now = performance.now();
            while (this.times.length > 0 && this.times[0] <= now - 1000)
                this.times.shift();
            this.times.push(now);
            this.fps = this.times.length;
            return this.fps > this.MAX_FPS ? this.MAX_FPS : this.fps;
        };
        CanvasGUI.BooleanToggle = BooleanToggle_1.default;
        CanvasGUI.Button = Button_1.default;
        CanvasGUI.Checkbox = Checkbox_1.default;
        CanvasGUI.Container = Container_1.default;
        CanvasGUI.Element = Element_7.default;
        CanvasGUI.IterableToggle = IterableToggle_1.default;
        CanvasGUI.Text = Text_1.default;
        return CanvasGUI;
    }());
    exports.default = CanvasGUI;
});
define("index", ["require", "exports", "CanvasGUI"], function (require, exports, CanvasGUI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var context = document.getElementById("painting").getContext('2d');
    if (context == null)
        throw new Error('Found canvas but failed to get context "2d" ;(');
    var gui = new CanvasGUI_1.default(context);
    var btn = new CanvasGUI_1.default.Button("Button #1", { x: 125, y: 25 });
    btn.onclick = function () {
        console.log("CLICKED");
    };
    gui.appendChild(btn);
    gui.appendChild(new CanvasGUI_1.default.Button("Pizza time!", { x: 125, y: 25 * 4 }));
    gui.appendChild(new CanvasGUI_1.default.Text("TEXT", { x: 500, y: 500 }));
    gui.appendChild(new CanvasGUI_1.default.IterableToggle(["Yay", "Oh"], { x: 400, y: 400 }));
    var c = new CanvasGUI_1.default.Checkbox(false, { x: 300, y: 300 }, 3);
    c.id = "co";
    c.onclick = function () {
        console.log("CLICKED CHECKBOX");
    };
    c.onchange = function (e) {
        console.log(e);
    };
    gui.appendChild(c);
    gui.getElementById("co").addEventListener("click", function () {
        console.log("Test");
    });
    window['gui'] = gui;
});
define("Utils/TextRendererUtil", ["require", "exports", "Utils/Util"], function (require, exports, Util_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextRendererUtil = (function (_super) {
        __extends(TextRendererUtil, _super);
        function TextRendererUtil(context) {
            return _super.call(this) || this;
        }
        TextRendererUtil.prototype.renderString = function (str, size, pos) { };
        return TextRendererUtil;
    }(Util_3.Util));
    exports.default = TextRendererUtil;
});
