import { create } from "zustand";
import { kanas } from "./constant";

export const getGameLevel = ({ stages }) => {
  const level = [];
  for (let i = 0; i < stages; i++) {
    const stage = []
    const options = 3 + 1;
    for (let j = 0; j < options; j++) {
      let kana = null;
      while (!kana || stage.includes(kana)) {
        kana = kanas[Math.floor(Math.random() * kanas.length)];
      }
      stage.push(kana)
    }
    const correctIndex = Math.floor(Math.random() * stage.length);
    stage[correctIndex] = { ...stage[correctIndex], correct: true }
    level.push(stage)
  }
  return level;
};

export const useGameStore = create((set) => ({
  level: null,
  currentStage: 0,
  currentKana: null,
  mode: "hiragana",
  startGame: () => {
    const level = getGameLevel({ stages: 5 });
    const currentKana = level[0].find((kana) => kana.correct);
    set({ level, currentStage: 0, currentKana })
  },
  nextStage: () => set((state) => {
    const currentStage = state.currentStage + 1;
    const currentKana = state.level[currentStage].find((kana) => kana.correct);
    return { currentStage, currentKana }
  }
  )
}))