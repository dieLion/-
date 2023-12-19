import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { Point, Shape, direction } from "./types";
import { BaseSize } from "./viewer/PageConfig";

export class TerisRule {
  static canWeMoveIt(shape: Shape, targetPoint: Point, existsSquare: Square[]): boolean {
    const targetShape: Shape = shape.map(({ x, y }) => {
      return {
        x: x + targetPoint.x,
        y: y + targetPoint.y
      }
    })
    let result = targetShape.some(({ x, y }) => {
      return x < 0 || x > BaseSize.width - 1 || y > BaseSize.height - 1
    })
    if (result) {
      return false
    }
    result = targetShape.some((target) => existsSquare.some(({ point }) => target.x === point?.x && target.y === point?.y))
    if (!result) {
      return true
    }
    return false
  }
  static move(squareGroup: SquareGroup, direction: direction, existsSquare: Square[]): boolean;
  static move(squareGroup: SquareGroup, Point: Point, existsSquare: Square[]): boolean;
  static move(squareGroup: SquareGroup, directionOrPoint: direction | Point, existsSquare: Square[]): boolean {
    if (hasPoint(directionOrPoint)) {
      if (this.canWeMoveIt(squareGroup.shape, directionOrPoint, existsSquare)) {
        squareGroup.conterPoint = directionOrPoint
        return true
      }
      return false
    }
    else {
      switch (directionOrPoint) {
        case direction.downBottom:
          return this.moveDirectly(squareGroup, direction.down, existsSquare)
        case direction.left:
          return this.move(squareGroup, { x: squareGroup.conterPoint.x - 1, y: squareGroup.conterPoint.y }, existsSquare)
        case direction.right:
          return this.move(squareGroup, { x: squareGroup.conterPoint.x + 1, y: squareGroup.conterPoint.y }, existsSquare)
        case direction.down:
          return this.move(squareGroup, { x: squareGroup.conterPoint.x, y: squareGroup.conterPoint.y + 1 }, existsSquare)
      }
    }
  }
  /**
       * 将当前的方块，移动到目标方向的终点
       * @param squareGroup 
       * @param direction 
       */
  static moveDirectly(squareGroup: SquareGroup, direction: direction, existsSquare: Square[]) {
    while (this.move(squareGroup, direction, existsSquare)) {
    }
    return true
  }

  static canWeRotateIt(squareGroup: SquareGroup, existsSquare: Square[]): boolean {
    const newSquare = squareGroup.afterRotateShape()
    if (this.canWeMoveIt(newSquare, squareGroup.conterPoint, existsSquare)) {
      squareGroup.rotate()
      return true
    } else {
      return false
    }
  }

  /**
   * @description: 从已存在的方块中进行消除，并返回消除的行数
   * @param {Square} existsSquare 
   * @return {*} 消除的数量
   */
  static deleteSquares(existsSquare: Square[]): number {
    const ys = existsSquare.map(item => item.point!.y)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)
    let num = 0
    for (let y = minY; y <= maxY; y++) {
      if (this.deleteLine(existsSquare, y)) {
        num++
      }
    }
    return num
  }

  /**
   * @description: 消除一行
   * @param {Square} existsSquare
   * @param {number} y
   * @return {*}
   */
  static deleteLine(existsSquare: Square[], y: number): boolean {
    const existsFilter = existsSquare.filter(item => item.point?.y === y)
    if (existsFilter.length !== BaseSize.width) {
      return false
    }
    existsFilter.forEach((item) => {
      item.viewer!.remove()
      const index = existsSquare.indexOf(item)
      existsSquare.splice(index, 1);
    })
    existsSquare.filter(txistsItem => txistsItem.point!.y < y).forEach(txistsItem => {
      txistsItem.point = {
        x: txistsItem.point!.x,
        y: txistsItem.point!.y + 1
      }
    })
    return true
  }
}

function hasPoint(point: any): point is Point {
  if ((point.x || point.x === 0) && (point.y || point.y === 0)) {
    return true
  }
  return false
}