import {useState} from "react";
import {Duelant, Spell} from "../models";
import {getRandomInt} from "../utils";
import {DuelantState, GameState} from "../types";

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

export function useGameState(
    onLeftDuelantClick: (duelant: DuelantState) => void,
    onRightDuelantClick: (duelant: DuelantState) => void,
) {

    const [state, setState] = useState<GameState>({...initialState})

    const duelantLeft = new Duelant(
        state.duelantLeftState.x,
        state.duelantLeftState.y,
        30,
        state.duelantLeftState.color,
        state.duelantLeftState.speed,
        () => onLeftDuelantClick(state.duelantLeftState)
    )

    const duelantRight = new Duelant(
        state.duelantRightState.x,
        state.duelantRightState.y,
        30,
        state.duelantRightState.color,
        state.duelantRightState.speed,
        () => onRightDuelantClick(state.duelantRightState)
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

    const setLeftDuelantState = (state: DuelantState) => {
        setState(prevState => ({
            ...prevState,
            duelantRightState: getActualRightDuelantState(),
            duelantLeftState: {
                ...getActualLeftDuelantState(),
                ...state
            }
        }))
    }

    const setRightDuelantState = (state: DuelantState) => {
        setState(prevState => ({
            ...prevState,
            duelantLeftState: getActualLeftDuelantState(),
            duelantRightState: {
                ...getActualRightDuelantState(),
                ...state
            }
        }))
    }

    const objectsToDraw = [duelantLeft, duelantRight]

    return {
        state,
        objectsToDraw,
        setLeftDuelantState,
        setRightDuelantState,
    }
}