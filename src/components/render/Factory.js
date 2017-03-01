﻿
/**
*   设置访问器属性
*   @modelues Factory
*/
define(['Utils'],function (Utils) {
    // CONSTANTS
    var ABSOLUTE_OPACITY = 'absoluteOpacity',
        ABSOLUTE_TRANSFORM = 'absoluteTransform',
        ADD = 'add',
        B = 'b',
        BEFORE = 'before',
        BLACK = 'black',
        CHANGE = 'Change',
        CHILDREN = 'children',
        DEG = 'Deg',
        DOT = '.',
        EMPTY_STRING = '',
        G = 'g',
        GET = 'get',
        HASH = '#',
        ID = 'id',
        KINETIC = 'kinetic',
        LISTENING = 'listening',
        MOUSEENTER = 'mouseenter',
        MOUSELEAVE = 'mouseleave',
        NAME = 'name',
        OFF = 'off',
        ON = 'on',
        PRIVATE_GET = '_get',
        R = 'r',
        RGB = 'RGB',
        SET = 'set',
        SHAPE = 'Shape',
        SPACE = ' ',
        STAGE = 'Stage',
        TRANSFORM = 'transform',
        UPPER_B = 'B',
        UPPER_G = 'G',
        UPPER_HEIGHT = 'Height',
        UPPER_R = 'R',
        UPPER_WIDTH = 'Width',
        UPPER_X = 'X',
        UPPER_Y = 'Y',
        VISIBLE = 'visible',
        X = 'x',
        Y = 'y';
    //本地函数/类型导入
    var capitalize = Utils.self._capitalize,
        removeLastLetter = Utils.self._removeLastLetter,
        degToRad = Utils.self._degToRad,
        radToDeg = Utils.self._radToDeg,
        rgbToHex = Utils.self._rgbToHex,
        getRGB = Utils.self.getRGB;

    var _factory = {
        addGetterSetter: function (constructor, attr, def) {
            this.addGetter(constructor, attr, def);
            this.addSetter(constructor, attr);
        },
        addPointGetterSetter: function (constructor, attr, def) {
            this.addPointGetter(constructor, attr, def);
            this.addPointSetter(constructor, attr);
            this.addGetter(constructor, attr + UPPER_X, def);
            this.addGetter(constructor, attr + UPPER_Y, def);
            this.addSetter(constructor, attr + UPPER_X);
            this.addSetter(constructor, attr + UPPER_Y);
        },
        addBoxGetterSetter: function (constructor, attr, def) {
            this.addBoxGetter(constructor, attr, def);
            this.addBoxSetter(constructor, attr);
            this.addGetter(constructor, attr + UPPER_X, def);
            this.addGetter(constructor, attr + UPPER_Y, def);
            this.addGetter(constructor, attr + UPPER_WIDTH, def);
            this.addGetter(constructor, attr + UPPER_HEIGHT, def);

            this.addSetter(constructor, attr + UPPER_X);
            this.addSetter(constructor, attr + UPPER_Y);
            this.addSetter(constructor, attr + UPPER_WIDTH);
            this.addSetter(constructor, attr + UPPER_HEIGHT);
        },
        addPointsGetterSetter: function (constructor, attr) {
            this.addPointsGetter(constructor, attr);
            this.addPointsSetter(constructor, attr);
            this.addPointAdder(constructor, attr);
        },
        addRotationGetterSetter: function (constructor, attr, def) {
            this.addRotationGetter(constructor, attr, def);
            this.addRotationSetter(constructor, attr);
        },
        addColorGetterSetter: function (constructor, attr) {
            this.addGetter(constructor, attr);
            this.addSetter(constructor, attr);
            this.addColorRGBGetter(constructor, attr);
            this.addColorComponentGetter(constructor, attr, R);
            this.addColorComponentGetter(constructor, attr, G);
            this.addColorComponentGetter(constructor, attr, B);

            // component setters
            this.addColorRGBSetter(constructor, attr);
            this.addColorComponentSetter(constructor, attr, R);
            this.addColorComponentSetter(constructor, attr, G);
            this.addColorComponentSetter(constructor, attr, B);
        },
        addColorRGBGetter: function (constructor, attr) {
            var method = GET + capitalize(attr) + RGB;
            constructor.prototype[method] = function () {
                return getRGB(this.attrs[attr]);
            };
        },
        addColorComponentGetter: function (constructor, attr, c) {
            var prefix = GET + capitalize(attr),
                method = prefix + capitalize(c);
            constructor.prototype[method] = function () {
                return this[prefix + RGB]()[c];
            };
        },
        addPointsGetter: function (constructor, attr) {
            var that = this,
                method = GET + capitalize(attr);

            constructor.prototype[method] = function () {
                var val = this.attrs[attr];
                return val === undefined ? [] : val;
            };
        },
        addGetter: function (constructor, attr, def) {
            var that = this,
                method = GET + capitalize(attr);

            constructor.prototype[method] = function () {
                var val = this.attrs[attr];
                return val === undefined ? def : val;
            };
        },
        addPointGetter: function (constructor, attr) {
            var that = this,
                baseMethod = GET + capitalize(attr);

            constructor.prototype[baseMethod] = function () {
                var that = this;
                return {
                    x: that[baseMethod + UPPER_X](),
                    y: that[baseMethod + UPPER_Y]()
                };
            };
        },
        addBoxGetter: function (constructor, attr) {
            var that = this,
                baseMethod = GET + capitalize(attr);

            constructor.prototype[baseMethod] = function () {
                var that = this;
                return {
                    x: that[baseMethod + UPPER_X](),
                    y: that[baseMethod + UPPER_Y](),
                    width: that[baseMethod + UPPER_WIDTH](),
                    height: that[baseMethod + UPPER_HEIGHT]()
                };
            };
        },
        addRotationGetter: function (constructor, attr, def) {
            var that = this,
                method = GET + capitalize(attr);

            // radians
            constructor.prototype[method] = function () {
                var val = this.attrs[attr];
                if (val === undefined) {
                    val = def;
                }
                return val;
            };
            // degrees
            constructor.prototype[method + DEG] = function () {
                var val = this.attrs[attr];
                if (val === undefined) {
                    val = def;
                }
                return radToDeg(val);
            };
        },
        addColorRGBSetter: function (constructor, attr) {
            var method = SET + capitalize(attr) + RGB;

            constructor.prototype[method] = function (obj) {
                var r = obj && obj.r !== undefined ? obj.r | 0 : this.getAttr(attr + UPPER_R),
                    g = obj && obj.g !== undefined ? obj.g | 0 : this.getAttr(attr + UPPER_G),
                    b = obj && obj.b !== undefined ? obj.b | 0 : this.getAttr(attr + UPPER_B);

                this._setAttr(attr, HASH + rgbToHex(r, g, b));
            };
        },
        addColorComponentSetter: function (constructor, attr, c) {
            var prefix = SET + capitalize(attr),
                method = prefix + capitalize(c);
            constructor.prototype[method] = function (val) {
                var obj = {};
                obj[c] = val;
                this[prefix + RGB](obj);
            };
        },
        addPointsSetter: function (constructor, attr) {
            var method = SET + capitalize(attr);
            constructor.prototype[method] = function (val) {
                this._setAttr('points', val);
            };
        },
        addSetter: function (constructor, attr) {
            var method = SET + capitalize(attr);
            constructor.prototype[method] = function (val) {
                this._setAttr(attr, val);
            };
        },
        addPointSetter: function (constructor, attr) {
            var that = this,
                baseMethod = SET + capitalize(attr);
            constructor.prototype[baseMethod] = function (pos) {
                var oldVal = this.attrs[attr],
                    x = 0,
                    y = 0;

                if (pos) {
                    x = pos.x;
                    y = pos.y;

                    if (x !== undefined) {
                        this[baseMethod + UPPER_X](x);
                    }
                    if (y !== undefined) {
                        this[baseMethod + UPPER_Y](y);
                    }
                    this._fireChangeEvent(attr, oldVal, pos);
                }
            };
        },
        addBoxSetter: function (constructor, attr) {
            var that = this,
                baseMethod = SET + capitalize(attr);
            constructor.prototype[baseMethod] = function (box) {
                var oldVal = this.attrs[attr],
                    x, y, width, height;

                if (box) {
                    x = box.x;
                    y = box.y;
                    width = box.width;
                    height = box.height;

                    if (x !== undefined) {
                        this[baseMethod + UPPER_X](x);
                    }
                    if (y !== undefined) {
                        this[baseMethod + UPPER_Y](y);
                    }
                    if (width !== undefined) {
                        this[baseMethod + UPPER_WIDTH](width);
                    }
                    if (height !== undefined) {
                        this[baseMethod + UPPER_HEIGHT](height);
                    }
                    this._fireChangeEvent(attr, oldVal, box);
                }
            };
        },
        addRotationSetter: function (constructor, attr) {
            var that = this,
                method = SET + capitalize(attr);
            constructor.prototype[method] = function (val) {
                this._setAttr(attr, val);
            };
            // degrees
            constructor.prototype[method + DEG] = function (deg) {
                this._setAttr(attr, degToRad(deg));
            };
        },
        // add adders
        addPointAdder: function (constructor, attr) {
            var that = this,
                baseMethod = ADD + removeLastLetter(capitalize(attr));
            constructor.prototype[baseMethod] = function (pos) {
                var oldVal = this.attrs[attr];
                if (pos) {
                    this.attrs[attr].push(pos);
                    this._fireChangeEvent(attr, oldVal, pos);
                }
            };
        }
    };
    return {
        self:_factory,
    }
});