import {GameState} from "../types";
import {getRandomInt} from "../utils";

export const gameStateInitial: GameState = {
    duelantLeftState: {
        x: 40,
        y: getRandomInt(40, 920),
        color: '#000',
        speed: 5,
        spells: [],
        spellsColor: '#000',
        spellRate: 1,
    },
    duelantRightState: {
        x: 920,
        y: getRandomInt(40, 920),
        color: '#000',
        speed: -5,
        spells: [],
        spellsColor: '#000',
        spellRate: 1,
    },
    score: {leftDuelantScore: 0, rightDuelantScore: 0},
}