import styles from './DuelantRedactor.module.css'
import {ChangeEvent, FormEvent, useState} from "react";
import {DuelantRedactorState} from "../../shared/types";

interface DuelantRedactorProps {
    state: DuelantRedactorState,
    setState: (state: DuelantRedactorState) => void,
}

function DuelantRedactor(props: DuelantRedactorProps) {
    const {state, setState} = props;

    const [formState, setFormState] = useState({
        color: state.duelant.color,
        speed: Math.abs(state.duelant.speed),
        spellsColor: state.duelant.spellsColor,
        spellRate: state.duelant.spellRate,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        state.onSubmit({
            ...formState,
            speed: state.duelant.speed > 0 ? formState.speed : -formState.speed,
        })

        setState({
            ...state,
            isVisible: false
        })
    }

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <label className={styles.label}>
                Circle color:
                <input
                    type={'color'}
                    value={formState.color}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState({...formState, color: e.target.value})}
                />
            </label>
            <label className={styles.label}>
                Circle Speed:
                <input
                    type={'range'}
                    min={1}
                    max={10}
                    step={1}
                    value={formState.speed}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState({
                        ...formState,
                        speed: +e.target.value
                    })}
                />
            </label>
            <label className={styles.label}>
                Spells color:
                <input
                    type={'color'}
                    value={formState.spellsColor}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState({
                        ...formState,
                        spellsColor: e.target.value
                    })}
                />
            </label>
            <label className={styles.label}>
                SpellRate:
                <input
                    type={'range'}
                    min={0.5}
                    max={5}
                    step={0.5}
                    value={formState.spellRate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState({
                        ...formState,
                        spellRate: +e.target.value
                    })}
                />
            </label>

            <button
                type={'submit'}
                className={styles.button}
            >
                Подтвердить
            </button>
        </form>
    );
}

export default DuelantRedactor;