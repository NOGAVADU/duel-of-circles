import {useEffect, useState} from "react";
import {Duelant} from "../models";
import {Spell} from "../models/Spell.ts";
import {getRandomInt} from "../utils";

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

const initialState: GameState = {
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
                state.duelantLeftState.spellsColor,
                10,
                duelantRight,
                incrementDuelantLeftScore
            ))
    }, 1000 / state.duelantLeftState.spellRate)

    setInterval(() => {
        duelantRight.spells.push(
            new Spell(
                duelantRight.x,
                duelantRight.y,
                15,
                state.duelantRightState.spellsColor,
                -10,
                duelantLeft,
                incrementDuelantRightScore
            ))
    }, 1000 / state.duelantRightState.spellRate)

    const getActualLeftDuelantState = (): DuelantState => {
        return {
            ...state.duelantLeftState,
            x: duelantLeft.x,
            y: duelantLeft.y,
            speed: duelantLeft.speed,
            spells: duelantLeft.spells,
        }
    }

    const getActualRightDuelantState = (): DuelantState => {
        return {
            ...state.duelantRightState,
            x: duelantRight.x,
            y: duelantRight.y,
            speed: duelantRight.speed,
            spells: duelantRight.spells,
        }
    }

    const incrementDuelantLeftScore = () => {
        setState(prevState => ({
            ...prevState,
            duelantLeftState: getActualLeftDuelantState(),
            duelantRightState: getActualRightDuelantState(),
            score: {
                leftDuelantScore: state.score.leftDuelantScore + 1,
                rightDuelantScore: state.score.rightDuelantScore
            },
        }))
    }

    const incrementDuelantRightScore = () => {
        setState(prevState => ({
            ...prevState,
            duelantLeftState: getActualLeftDuelantState(),
            duelantRightState: getActualRightDuelantState(),
            score: {
                leftDuelantScore: state.score.leftDuelantScore,
                rightDuelantScore: state.score.rightDuelantScore + 1
            },
        }))
    }

    const setLeftDuelantColor = (color: string) => {
        setState(prevState => ({
            ...prevState,
            duelantRightState: getActualRightDuelantState(),
            duelantLeftState: {
                ...getActualLeftDuelantState(),
                color
            }
        }))
    }

    const setRightDuelantColor = (color: string) => {
        setState(prevState => ({
            ...prevState,
            duelantRightState: {
                ...getActualRightDuelantState(),
                color
            }
        }))
    }

    const setLeftDuelantSpellColor = (color: string) => {
        setState(prevState => ({
            ...prevState,
            duelantRightState: getActualRightDuelantState(),
            duelantLeftState: {
                ...getActualLeftDuelantState(),
                spellsColor: color
            }
        }))
    }

    const setRightDuelantSpellColor = (color: string) => {
        setState(prevState => ({
            ...prevState,
            duelantLeftState: getActualLeftDuelantState(),
            duelantRightState: {
                ...getActualRightDuelantState(),
                spellsColor: color
            }
        }))
    }

    const setLeftDuelantSpellRate = (spellRate: number) => {
        setState(prevState => ({
            ...prevState,
            duelantRightState: getActualRightDuelantState(),
            duelantLeftState: {
                ...getActualLeftDuelantState(),
                spellRate
            }
        }))
    }

    const setRightDuelantSpellRate = (spellRate: number) => {
        setState(prevState => ({
            ...prevState,
            duelantLeftState: getActualLeftDuelantState(),
            duelantRightState: {
                ...getActualRightDuelantState(),
                spellRate
            }
        }))
    }

    const setLeftDuelantSpeed = (speed: number) => {
        setState(prevState => ({
            ...prevState,
            duelantRightState: getActualRightDuelantState(),
            duelantLeftState: {
                ...getActualLeftDuelantState(),
                speed
            }
        }))
    }

    const setRightDuelantSpeed = (speed: number) => {
        setState(prevState => ({
            ...prevState,
            duelantLeftState: getActualLeftDuelantState(),
            duelantRightState: {
                ...getActualRightDuelantState(),
                speed
            }
        }))
    }

    const objectsToDraw = [duelantLeft, duelantRight]

    return {
        state,
        objectsToDraw,
        setLeftDuelantColor,
        setRightDuelantColor,
        setLeftDuelantSpellColor,
        setRightDuelantSpellColor,
        setLeftDuelantSpellRate,
        setRightDuelantSpellRate,
        setLeftDuelantSpeed,
        setRightDuelantSpeed,
    }
}