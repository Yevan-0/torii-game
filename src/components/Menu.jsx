import { useGameStore, gameStates } from "../store"

export default function Menu() {
  const startGame = useGameStore((state) => state.startGame)
  const gameState = useGameStore((state) => state.gameState)
  const goToMenu = useGameStore((state)=> state.goToMenu)

  return (
    <div>
      <div className={`menu ${gameState !== gameStates.MENU ? "menu--hidden" : ""}`}>
        <h1>TORII GAME</h1>
        <button
          onClick={() => startGame({ mode: "hiragana" })}
          disabled={gameState !== gameStates.MENU}
        >
          START HIRAGANA
        </button>
        <button
          onClick={() => startGame({ mode: "katakana" })}
          disabled={gameState !== gameStates.MENU}
        >
          START KATAKANA
        </button>
      </div>
      <div className={`scores ${gameState !== gameStates.GAME_OVER ? "scores--hidden" : ""}`}>
        <h1>CONGRATULATIONS!</h1>
        <button onClick={goToMenu}>
          Play again
        </button>
      </div>
    </div>
  )
}