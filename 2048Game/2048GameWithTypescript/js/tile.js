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
var _Tile_tileElement, _Tile_x, _Tile_y, _Tile_value;
export class Tile {
    constructor(boardElement, val = Math.random() > 0.5 ? 2 : 4) {
        _Tile_tileElement.set(this, void 0);
        _Tile_x.set(this, void 0);
        _Tile_y.set(this, void 0);
        _Tile_value.set(this, void 0);
        __classPrivateFieldSet(this, _Tile_tileElement, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Tile_tileElement, "f").classList.add("tile");
        boardElement === null || boardElement === void 0 ? void 0 : boardElement.append(__classPrivateFieldGet(this, _Tile_tileElement, "f"));
        this.value = val;
    }
    get value() {
        return __classPrivateFieldGet(this, _Tile_value, "f");
    }
    set value(val) {
        __classPrivateFieldSet(this, _Tile_value, val, "f");
        __classPrivateFieldGet(this, _Tile_tileElement, "f").textContent = `${val}`;
        const power = !!val ? Math.log2(val) : 2;
        const backgroudLightness = 100 - power * 9;
        __classPrivateFieldGet(this, _Tile_tileElement, "f").style.setProperty("--background-lightness", `${backgroudLightness}%`);
        __classPrivateFieldGet(this, _Tile_tileElement, "f").style.setProperty("--text-lightness", `${backgroudLightness < 50 ? 90 : 10}%`);
    }
    get x() {
        return __classPrivateFieldGet(this, _Tile_x, "f");
    }
    set x(value) {
        __classPrivateFieldSet(this, _Tile_x, value, "f");
        __classPrivateFieldGet(this, _Tile_tileElement, "f").style.setProperty("--x", `${value}`);
    }
    get y() {
        return __classPrivateFieldGet(this, _Tile_y, "f");
    }
    set y(value) {
        __classPrivateFieldSet(this, _Tile_y, value, "f");
        __classPrivateFieldGet(this, _Tile_tileElement, "f").style.setProperty("--y", `${value}`);
    }
    remove() {
        __classPrivateFieldGet(this, _Tile_tileElement, "f").remove();
    }
    waitForTransistion(animation = false) {
        return new Promise((resolve) => {
            __classPrivateFieldGet(this, _Tile_tileElement, "f").addEventListener(animation ? "animationEnd" : "transitionEnd", resolve, { once: true });
        });
    }
}
_Tile_tileElement = new WeakMap(), _Tile_x = new WeakMap(), _Tile_y = new WeakMap(), _Tile_value = new WeakMap();
