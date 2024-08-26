import styles from './DuelantRedactor.module.css'
import {DuelantState} from "../../shared/hooks";
import {ChangeEvent, FormEvent, useState} from "react";

interface DuelantRedactorProps {
    setIsRedactorVisible: (value: boolean) => void;
    duelant: DuelantState;
}

function DuelantRedactor(props: DuelantRedactorProps) {
    const {setIsRedactorVisible, duelant} = props;

    const [formState, setFormState] = useState({
        color: duelant.color,
        speed: duelant.speed,
        spellsColor: duelant.spellsColor,
        spellRate: duelant.spellRate,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsRedactorVisible(false)
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