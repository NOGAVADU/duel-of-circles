import {useState} from "react";
import {Duelant} from "../models";
import {Spell} from "../models/Spell.ts";
import {getRandomInt} from "../utils";

export interface GameState {
    duelantLeftState: DuelantState;
    duelantRightState: DuelantState;
    spells: Spell[]
    score: { leftDuelantScore: number, rightDuelantScore: number };
}

export interface DuelantState {
    x: number,
    y: number,
    color: string,
    speed: number,
    spells: Spell[],
}

const initialState: GameState = {
    duelantLeftState: {
        x: 40,
        y: getRandomInt(40, 920),
        color: '#000',
        speed: 5,
        spells: [],
    },
    duelantRightState: {
        x: 920,
        y: getRandomInt(40, 920),
        color: '#000',
        speed: -5,
        spells: [],
    },
    score: {leftDuelantScore: 0, rightDuelantScore: 0},
    spells: []
}

export function useGameState() {

    const [state, setState] = useState<GameState>({...initialState})

    const duelantLeft = new Duelant(
        state.duelantLeftState.x,
        state.duelantLeftState.y,
        30,
        state.duelantLeftState.color,
        state.duelantLeftState.speed,
    )

    const duelantRight = new Duelant(
        state.duelantRightState.x,
        state.duelantRightState.y,
        30,
        state.duelantRightState.color,
        state.duelantRightState.speed,
    )

    setInterval(() => {
        duelantLeft.spells.push(
            new Spell(
                duelantLeft.x,
                duelantLeft.y,
                15,
                '#000',
                10,
                duelantRight,
                incrementDuelantLeftScore
            ))
    }, 1000)

    setInterval(() => {
        duelantRight.spells.push(
            new Spell(
                duelantRight.x,
                duelantRight.y,
                15,
                '#000',
                -10,
                 duelantLeft,
                incrementDuelantRightScore
            ))
    }, 1000)

    const getActualDuelantState = () => {
        return {
            duelantLeftState: {
                ...state.duelantLeftState,
                x: duelantLeft.x,
                y: duelantLeft.y,
                speed: duelantLeft.speed,
                spells: duelantLeft.spells,
                enemy: duelantRight,
            },
            duelantRightState: {
                ...state.duelantRightState,
                x: duelantRight.x,
                y: duelantRight.y,
                speed: duelantRight.speed,
                spells: duelantRight.spells,
                enemy: duelantLeft,
            },
            spells: [...duelantLeft.spells, ...duelantRight.spells]
        }
    }

    const incrementDuelantLeftScore = () => {
        setState(prevState => ({
            ...prevState,
            ...getActualDuelantState(),
            score: {
                leftDuelantScore: state.score.leftDuelantScore + 1,
                rightDuelantScore: state.score.rightDuelantScore
            },
        }))
    }

    const incrementDuelantRightScore = () => {
        setState(prevState => ({
            ...prevState,
            ...getActualDuelantState(),
            score: {
                leftDuelantScore: state.score.leftDuelantScore,
                rightDuelantScore: state.score.rightDuelantScore + 1
            },
        }))
    }


    const objectsToDraw = [duelantLeft, duelantRight, ...state.spells.filter(s => !s.destroyed)]

    return {state, objectsToDraw}
}