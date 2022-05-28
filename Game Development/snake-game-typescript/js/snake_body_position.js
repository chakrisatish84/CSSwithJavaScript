var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _snake_body_position_x, _snake_body_position_y;
export class snake_body_position {
    /**
     *
     */
    constructor(x, y) {
        _snake_body_position_x.set(this, void 0);
        _snake_body_position_y.set(this, void 0);
        __classPrivateFieldSet(this, _snake_body_position_x, x, "f");
        __classPrivateFieldSet(this, _snake_body_position_y, y, "f");
    }
    get xPosition() {
        return __classPrivateFieldGet(this, _snake_body_position_x, "f");
    }
    set xPosition(value) {
        __classPrivateFieldSet(this, _snake_body_position_x, value, "f");
    }
    get yPosition() {
        return __classPrivateFieldGet(this, _snake_body_position_y, "f");
    }
    set yPosition(value) {
        __classPrivateFieldSet(this, _snake_body_position_y, value, "f");
    }
}
_snake_body_position_x = new WeakMap(), _snake_body_position_y = new WeakMap();
