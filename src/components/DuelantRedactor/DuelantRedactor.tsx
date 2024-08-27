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
        spellsColor: state.duelant.spellsColor,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        state.onSubmit({
            ...formState,
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