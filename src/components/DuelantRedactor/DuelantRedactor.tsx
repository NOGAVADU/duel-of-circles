import styles from './DuelantRedactor.module.css'
import {ChangeEvent, FormEvent, useState} from "react";
import {DuelantState} from "../../shared/types";

interface RedactorState {
    isRedactorVisible: boolean,
    duelantToRedact: DuelantState,
    onSave: (state: DuelantState) => void,
}

interface DuelantRedactorProps {
    redactorState: RedactorState,
    setRedactorState: (state: RedactorState) => void,
}

function DuelantRedactor(props: DuelantRedactorProps) {
    const {redactorState, setRedactorState} = props;

    const [formState, setFormState] = useState({
        color: redactorState.duelantToRedact.color,
        speed: redactorState.duelantToRedact.speed,
        spellsColor: redactorState.duelantToRedact.spellsColor,
        spellRate: redactorState.duelantToRedact.spellRate,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        redactorState.onSave({...redactorState.duelantToRedact, ...formState});
        setRedactorState({...redactorState, isRedactorVisible: false})
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
                CircleSpeed:
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