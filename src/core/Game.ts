import { Square } from "./Square"
import { SquareGroup } from "./SquareGroup"
import { createTeris } from "./Teris"
import { TerisRule } from "./TerisRule"
import { GameStatus, Point, direction } from "./types"
import { GameViewer } from "./viewer/GameViewer"
import { BaseSize, NextSize, level } from "./viewer/PageConfig"

export class Game {
  private _gameStatus: GameStatus = GameStatus.init
  private _currentSquareGroup?: SquareGroup
  private _newxtSquareGroup: SquareGroup
  private _timer?: number
  private _existsSquare: Square[] = []
  private _score: number = 0

  constructor(private _viewer: GameViewer, private _duration: number = level[0].duration) {
    //没意义代码防止ts报错
    this._newxtSquareGroup = createTeris({ x: 0, y: 0 })
    this.createNext()
    this._viewer.init(this)
    this._viewer.showScore(this.score)
  }
  get score() {
    return this._score
  }
  set score(score) {
    this._score = score
    this._viewer.showScore(score)
    const duration = level.filter(level => level.score <= score).slice(-1)[0].duration
    console.log(duration)
    if (this._duration === duration) {
      return
    }
    this._duration = duration
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = undefined
    }
    this.autorunToDown()
  }
  get gameStatus() {
    return this._gameStatus
  }
  /**
   * @description: 初始化
   * @return {*}
   */
  private init() {
    this._gameStatus = GameStatus.init
    this._currentSquareGroup = undefined
    this.score = 0
    this._newxtSquareGroup.squares.map(item => {
      item.viewer?.remove()
    })
    this._existsSquare.map(item => {
      item.viewer?.remove()
    })
    this._existsSquare = []
    this.createNext()
  }
  /**
   * @description: 创建下一个方块
   * @return {*}
   */
  private createNext() {
    this._newxtSquareGroup = createTeris(this.setconterPoint(NextSize.width, 1))
    this._viewer.nextShow(this._newxtSquareGroup)
  }
  start() {
    if (this._gameStatus === GameStatus.player) {
      return
    }
    //从游戏结束到开始
    if (this._gameStatus === GameStatus.gameOver) {
      this.init()
    }
    this._gameStatus = GameStatus.player
    if (!this._currentSquareGroup) {
      this.switchSquareGroup()
    }
    this._viewer.showPause(false)
    this.autorunToDown()
  }
  pause() {
    if (this._gameStatus === GameStatus.player) {
      this._gameStatus = GameStatus.pause
      clearInterval(this._timer)
      this._viewer.showPause(true, "游戏暂停")
      this._timer = undefined
    }
  }
  controlArrowLeft() {
    if (this._gameStatus === GameStatus.player && this._currentSquareGroup) {
      TerisRule.move(this._currentSquareGroup, direction.left, this._existsSquare)
    }
  }
  controlArrowRight() {
    if (this._gameStatus === GameStatus.player && this._currentSquareGroup) {
      TerisRule.move(this._currentSquareGroup, direction.right, this._existsSquare)
    }
  }
  controlArrowDown() {
    if (this._gameStatus === GameStatus.player && this._currentSquareGroup) {
      if (!TerisRule.move(this._currentSquareGroup, direction.downBottom, this._existsSquare)) {
        this.hitBottom()
      }
    }
  }
  controlRotate() {
    if (this._gameStatus === GameStatus.player && this._currentSquareGroup) {
      TerisRule.canWeRotateIt(this._currentSquareGroup, this._existsSquare)
    }
  }
  /**
   * @description: 给当前方块添加自动下落
   * @return {*}
   */
  private autorunToDown() {
    if (!this._timer && this._gameStatus === GameStatus.player && this._currentSquareGroup) {
      this._timer = window.setInterval(() => {
        this.controldown()
      }, this._duration)
    }
  }
  private controldown() {
    if (this._gameStatus === GameStatus.player && this._currentSquareGroup) {
      if (!TerisRule.move(this._currentSquareGroup, direction.down, this._existsSquare)) {
        this.hitBottom()
      }
    }
  }
  /**
   * @description: 切换下一个方块到游戏面板的方块并生成新的方块
   * @return {*}
   */
  private switchSquareGroup() {
    this._currentSquareGroup = this._newxtSquareGroup
    //当有可能出现问题：当前方块出现时与之前方块重叠
    if (!TerisRule.canWeMoveIt(this._currentSquareGroup!.shape, this.setconterPoint(BaseSize.width), this._existsSquare)) {
      this._gameStatus = GameStatus.gameOver
      clearInterval(this._timer)
      this._timer = undefined
      this._viewer.showPause(true, "游戏结束")
      return
    }
    this._currentSquareGroup.conterPoint = this.setconterPoint(BaseSize.width)
    this._viewer.switchShow(this._currentSquareGroup)
    this.createNext()
  }
  /**
   * @description: 设置中心点 用于创建方块集合再游戏面板的中心
   * @param {number} width 宽度
   * @param {number} offsetY 偏移量
   * @return {*}
   */
  private setconterPoint(width: number, offsetY: number = 0): Point {
    return {
      x: Math.floor(width / 2),
      y: 0 + offsetY
    }
  }
  /**
   * @description: 触底
   * @return {*}
   */
  private hitBottom() {
    //将当前的俄罗斯方块包含的小方块加入到已存在的方块数组种
    this._existsSquare.push(...this._currentSquareGroup!.squares)
    //处理移出
    const num = TerisRule.deleteSquares(this._existsSquare)
    //添加积分
    this.addScore(num)
    console.log(this.score)
    //切换方块
    this.switchSquareGroup()
  }

  private addScore(lineNum: number) {
    switch (lineNum) {
      case 0:
        this.score += 0
        break
      case 1:
        this.score += 10
        break
      case 2:
        this.score += 30
        break
      case 3:
        this.score += 60
        break
      default:
        this.score += 100
        break
    }
  }
}
