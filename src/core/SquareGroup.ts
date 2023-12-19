import { Square } from "./Square";
import { Point, Shape } from "./types";

/**
 * @description: 方块组合
 * @return {*}
 */
export class SquareGroup {
  private _squares: readonly Square[] = []
  /**
   * @description: 旋转方向 true 顺时针 false 逆时针
   * @return {*}
   */
  protected rotateDirection = true
  constructor(private _shape: Shape, private _conterPoint: Point, private _color: string = '') {
    const squares: Square[] = []
    this._shape.forEach(() => {
      squares.push(new Square(this._color))
    })
    this._squares = squares
    this.setSquaresPoints()
  }
  //方块形状
  get shape() {
    return this._shape
  }
  get squares() {
    return this._squares
  }
  get conterPoint() {
    return this._conterPoint
  }
  set conterPoint(conterPoint) {
    this._conterPoint = conterPoint
    this.setSquaresPoints()
  }
  setSquaresPoints() {
    this._shape.forEach(({ x, y }, i) => {
      this._squares[i].point = {
        x: this._conterPoint.x + x,
        y: this._conterPoint.y + y
      }
    })
  }
  rotate() {
    this._shape = this.afterRotateShape()
    this.setSquaresPoints()
  }
  afterRotateShape() {
    const newShape: Shape = this.shape.map(({ x, y }) => {
      if (this.rotateDirection) {
        return {
          x: -y,
          y: x
        }
      } else {
        return {
          x: y,
          y: -x
        }
      }
    })
    return newShape
  }
}