import {Spell} from "../models";

export interface GameState {
    duelantLeftState: DuelantState;
    duelantRightState: DuelantState;
    score: { leftDuelantScore: number, rightDuelantScore: number };
}

export interface DuelantState {
    x: number,
    y: number,
    color: string,
    speed: number,
    spells: Spell[],
    spellsColor: string,
    spellRate: number,
}