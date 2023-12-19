import { Game } from "./Game"
import { SquareGroup } from "./SquareGroup"

export interface Point {
  readonly x: number,
  readonly y: number
}

export interface IViewer {
  //显示
  show(): void
  //移除
  remove(): void
}

//形状
export type Shape = Point[]

//方向
export enum direction {
  "left" = "ArrowLeft",
  "right" = "ArrowRight",
  "downBottom" = "ArrowDown",
  "down" = "down"
}

//游戏状态
export enum GameStatus {
  "init" = "init",
  "player" = "player",
  "pause" = "pause",
  "gameOver" = "gameOver",
}

export interface GameViewerShow {
  init(game: Game): void
  showScore(score: number): void
  showPause(visable: boolean, msg?: string): void
  nextShow(squareGroup: SquareGroup): void
  switchShow(squareGroup: SquareGroup): void
}