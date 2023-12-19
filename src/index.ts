import { Game } from "./core/Game";
import { GameViewer } from "./core/viewer/GameViewer";
import "./less/index.less"
const game = new Game(new GameViewer())
game.start()