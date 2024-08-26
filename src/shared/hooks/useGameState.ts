import {useState} from "react";
import {Duelant} from "../models";

export interface state {
    duelantLeftState: DuelantState;
    duelantRightState: DuelantState;
}

export interface DuelantState {
    x: number,
    y: number,
    color: string,
    speed: number,
}

export function useGameState() {

    const [state, setState] = useState<state>({
        duelantLeftState: {
            x: 40,
            y: 270,
            color: '#000',
            speed: 5,
        },
        duelantRightState: {
            x: 920,
            y: 270,
            color: '#000',
            speed: -5,
        }
    })

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

    const handleStateChange = () => {
        setState({
            duelantLeftState: {
                ...state.duelantLeftState,
                x: duelantLeft.x,
                y: duelantLeft.y,
                speed: duelantLeft.speed,
            },
            duelantRightState: {
                ...state.duelantRightState,
                x: duelantRight.x,
                y: duelantRight.y,
                speed: duelantRight.speed,
            }
        })
    }

    const objects = [duelantLeft, duelantRight]

    return {state, setState: handleStateChange, objects}
}