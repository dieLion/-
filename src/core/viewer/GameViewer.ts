import { Game } from "../Game";
import { SquareGroup } from "../SquareGroup";
import { GameStatus, GameViewerShow, direction } from "../types";
import { BaseSize, NextSize, SquareSize } from "./PageConfig";
import { SquareViewer } from "./SquareViewer";

export class GameViewer implements GameViewerShow {
  private _nextDom: HTMLElement | null = document.querySelector("#nextView")
  private _gameDom: HTMLElement | null = document.querySelector("#gameView")
  private _scoreDom: HTMLElement | null = document.querySelector("#scoreView")
  private _pauseDom: HTMLElement | null = document.querySelector("#msg")

  /**
   * @description: 初始化 配置控制面板 添加键盘事件
   * @param {Game} game
   * @return {*}
   */
  init(game: Game): void {
    if (this._nextDom && this._gameDom) {
      this._gameDom.style.width = `${BaseSize.width * SquareSize.width}px`
      this._gameDom.style.height = `${BaseSize.height * SquareSize.height}px`
      this._nextDom.style.width = `${NextSize.width * SquareSize.width}px`
      this._nextDom.style.height = `${NextSize.height * SquareSize.height}px`
    }
    this.addEventListener(game)
  }
  showScore(score: number): void {
    if (this._scoreDom) {
      this._scoreDom.textContent = `${score}分`
    }
  }
  /**
   * @description: 是否显示提示框 如暂停或者结束
   * @param {boolean} visable
   * @return {*}
   */
  showPause(visable: boolean, msg?: string): void {
    if (this._pauseDom) {
      this._pauseDom.style.visibility = visable ? 'visible' : 'hidden'
      if(msg){
        this._pauseDom.innerHTML = msg
      }
    }
  }
  /**
   * @description: 给下一个方块 添加展示者
   * @param {SquareGroup} squareGroup 方块集合类
   * @return {*}
   */
  nextShow(squareGroup: SquareGroup): void {
    squareGroup.squares.map(item => {
      if (this._nextDom) {
        item.viewer = new SquareViewer(item, this._nextDom)
      }
    })
  }
  /**
   * @description: 切换下一个方块显示到游戏面板中
   * @param {SquareGroup} squareGroup 方块集合类
   * @return {*}
   */
  switchShow(squareGroup: SquareGroup): void {
    squareGroup.squares.map(item => {
      item.viewer?.remove()
      if (this._gameDom) {
        item.viewer = new SquareViewer(item, this._gameDom)
      }
    })
  }
  private addEventListener(game: Game) {
    window.addEventListener('keydown', (event) => {
      if (this.hasDirectionKey(event.key)) {
        const value = Object.values(direction).find((item) => item === event.key)
        if (value) {
          game[`control${value}`]()
        }
      }
      else if (event.key === "ArrowUp") {
        game.controlRotate()
      }
      else if (event.key === " ") {
        if (game.gameStatus === GameStatus.player) {
          game.pause()
        } else {
          game.start()
        }
      }
    });
  }
  private hasDirectionKey(key: any): key is direction {
    if (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowDown") {
      return true
    }
    return false
  }
}