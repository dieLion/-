import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./util";

export class LShape extends SquareGroup {
  constructor(conterPoint: Point, color?: string) {
    const shape: Shape = [
      { x: 0, y: -1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }
    ]
    super(shape, conterPoint, color)
  }
}

export class JShape extends SquareGroup {
  constructor(conterPoint: Point, color?: string) {
    const shape: Shape = [
      { x: 0, y: -1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }
    ]
    super(shape, conterPoint, color)
  }
}

export class TShape extends SquareGroup {
  constructor(conterPoint: Point, color?: string) {
    const shape: Shape = [
      { x: 0, y: -1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }
    ]
    super(shape, conterPoint, color)
  }
}

export class IShape extends SquareGroup {
  constructor(conterPoint: Point, color?: string) {
    const shape: Shape = [
      { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
    ]
    super(shape, conterPoint, color)
  }
  rotate(): void {
    super.rotate();
    this.rotateDirection = !this.rotateDirection
  }
}

export class OShape extends SquareGroup {
  constructor(conterPoint: Point, color?: string) {
    const shape: Shape = [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }
    ]
    super(shape, conterPoint, color)
  }
  afterRotateShape(): Shape {
    return this.shape
  }
}

export class ZShape extends SquareGroup {
  constructor(conterPoint: Point, color?: string) {
    const shape: Shape = [
      { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }
    ]
    super(shape, conterPoint, color)
  }
  rotate(): void {
    super.rotate();
    this.rotateDirection = !this.rotateDirection
  }
}

export class SShape extends SquareGroup {
  constructor(conterPoint: Point, color?: string) {
    const shape: Shape = [
      { x: 1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: -1, y: 0 }
    ]
    super(shape, conterPoint, color)
  }
  rotate(): void {
    super.rotate();
    this.rotateDirection = !this.rotateDirection
  }
}

export const shapes = [
  LShape,
  JShape,
  TShape,
  IShape,
  OShape,
  ZShape,
  SShape
]

export const colors: string[] = [
  "red", "blue", "green", "black", "pink", "orange"
]

export function createTeris(conterPoint: Point) {
  const shapesIndex = getRandom(shapes.length, 0)
  const colorsIndex = getRandom(colors.length, 0)
  return new shapes[shapesIndex](conterPoint, colors[colorsIndex])
}