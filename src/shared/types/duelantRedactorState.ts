import {DuelantState} from "./gameState.ts";

export interface DuelantRedactorState {
    isVisible: boolean;
    duelant: DuelantState;
    onSubmit: (state:  Partial<DuelantState>) => void;
    onStateUpdate: () => void;
}