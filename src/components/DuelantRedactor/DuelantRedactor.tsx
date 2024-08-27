import styles from './DuelantRedactor.module.css'
import {ChangeEvent} from "react";
import {DuelantState} from "../../shared/types";

interface DuelantRedactorProps {
    isVisible: boolean;
    onClose: () => void;
    duelant: DuelantState;
    handleChange: (state: Partial<DuelantState>) => void;
}

function DuelantRedactor({isVisible, onClose, duelant, handleChange}: DuelantRedactorProps) {

    return (
        <div className={[styles.container, isVisible ? styles.active : ''].join(' ')}>
            <label className={styles.label}>
                Circle color:
                <input
                    type={'color'}
                    value={duelant.color}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleChange({color: e.target.value})
                    }}
                />
            </label>
            <label className={styles.label}>
                Spells color:
                <input
                    type={'color'}
                    value={duelant.spellsColor}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleChange({spellsColor: e.target.value})
                    }}
                />
            </label>

            <button
                className={styles.button}
                onClick={() => onClose()}
            >
                Закрыть
            </button>
        </div>
    );
}

export default DuelantRedactor;