import { create } from "zustand";
import { kanas } from "./constant";
import { subscribeWithSelector } from "zustand/middleware";

export const gameStates = {
  MENU: "MENU",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER"
}

export const playAudio = (name, mode = "hiragana", callback) => {
  const suffix = mode === "katakana" ? "_k" : ""
  const filePath = `./sounds/${name}${suffix}.mp3`
  const audio = new Audio(filePath);
  if (callback) {
    audio.addEventListener("ended", callback)
  }
  audio.play().catch((e) => console.error("Audio failed", filePath, e))
}

export const getGameLevel = ({ stages }) => {
  const level = [];
  const goodKanas = [];
  for (let i = 0; i < stages; i++) {
    const stage = []
    const options = 3 + i;
    for (let j = 0; j < options; j++) {
      let kana = null;
      while (!kana || stage.includes(kana) || goodKanas.includes(kana)) {
        kana = kanas[Math.floor(Math.random() * kanas.length)];
      }
      stage.push(kana)
    }
    const correctIndex = Math.floor(Math.random() * stage.length);
    stage[correctIndex] = { ...stage[correctIndex], correct: true }
    goodKanas.push(stage[correctIndex])
    level.push(stage)
  }
  return level;
};

export const useGameStore = create(subscribeWithSelector((set, get) => ({
  level: null,
  currentStage: 0,
  currentKana: null,
  lastWrongKana: null,
  mode: "hiragana",
  gameState: gameStates.MENU,
  wrongAnswers: 0,
  startGame: ({ mode }) => {
    const level = getGameLevel({ stages: 5 });
    const currentKana = level[0].find((kana) => kana.correct);
    playAudio("start", () => {
      playAudio(currentKana.name, mode)
    })
    set({
      level, currentStage: 0,
      currentKana,
      lastWrongKana: null,
      gameState: gameStates.GAME,
      wrongAnswers: 0,
      mode,
    })
  },
  nextStage: () => {
    set((state) => {
      if (state.currentStage + 1 === state.level.length) {
        playAudio("congratulations")
        return {
          currentStage: 0,
          currentKana: null,
          lastWrongKana: null,
          level: null,
          gameState: gameStates.GAME_OVER
        }
      }
      const currentStage = state.currentStage + 1;
      const currentKana = state.level[currentStage].find((kana) => kana.correct);
      playAudio("correct", "hiragana", () => {
        playAudio(currentKana.name, state.mode)
      })
      return { currentStage, currentKana, lastWrongKana: null }
    })
  },
  goToMenu: () => {
    set({
      gameState: gameStates.MENU
    })
  },
  kanaTouched: (kana) => {
    const state = get()
    const currentKana = get().currentKana
    if (currentKana.name === kana.name) {
      get().nextStage()
    } else {
      playAudio("wrong", "hiragana", () => {
        playAudio(kana.name, state.mode);
      })
      set((state) => ({
        wrongAnswers: state.wrongAnswers + 1,
        lastWrongKana: kana
      }))
    }
  },
  // CHARACTER STATE
  characterState: "Idle",
  setCharacterState: (characterState) =>
    set({
      characterState
    })
})))