import { Point, IViewer } from './types'
/**
 *  当个方块类
 * @return {*}
 */
export class Square {
  //属性：显示者
  private _viewer: IViewer | undefined = undefined

  //逻辑坐标 x y 
  constructor(private _color: string = "", private _point?: Point) { }
  get point() {
    return this._point
  }
  set point(point) {
    this._point = point
    //完成显示
    this._viewer?.show()
  }
  get color() {
    return this._color
  }
  get viewer() {
    return this._viewer
  }
  set viewer(viewer) {
    this._viewer = viewer
    this._viewer?.show()
  }
}