import { Square } from "../Square";
import { IViewer } from "../types";
import { SquareSize } from "./PageConfig";

/**
 * @description: 方块展示类
 * @return {*}
 */
export class SquareViewer implements IViewer {
  private _dom?: HTMLElement
  private _isRemove = false
  constructor(private _square: Square, private _container: HTMLElement) { }
  show(): void {
    if (this._isRemove) {
      return void 0
    }
    if (!this._dom) {
      this._dom = document.createElement("div")
      this._dom.classList.toggle("square");
      this._dom.style.backgroundColor = this._square.color
      this._dom.style.width = `${SquareSize.width}px`
      this._dom.style.height = `${SquareSize.height}px`
      this._container.appendChild(this._dom)
    }
    this._dom.style.left = `${(this._square.point?.x || 0) * SquareSize.width}px`
    this._dom.style.top = `${(this._square.point?.y || 0) * SquareSize.height}px`
  }
  remove(): void {
    if (this._dom && this._isRemove === false) {
      this._dom.remove()
      this._isRemove = true
    }
  }
}