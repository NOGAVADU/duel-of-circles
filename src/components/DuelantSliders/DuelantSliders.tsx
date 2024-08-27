import styles from './DuelantSliders.module.css'
import {ChangeEvent} from 'react';
import {DuelantState} from "../../shared/types";

interface Props {
    duelant: DuelantState,
    onChange: (state: Partial<DuelantState>) => void
}

function DuelantSliders({duelant, onChange}: Props) {

    return (
        <div className={styles.container}>
            <label className={styles.label}>
                Speed: {duelant.speed > 0 ? duelant.speed : -duelant.speed}
                <input
                    type={'range'}
                    min={1}
                    max={10}
                    step={1}
                    value={duelant.speed > 0 ? duelant.speed : -duelant.speed}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange({speed: +e.target.value});
                    }}
                    className={styles.slider}
                />
            </label>
            <label className={styles.label}>
                SpellRate: {duelant.spellRate}
                <input
                    type={'range'}
                    min={0.5}
                    max={5}
                    step={0.5}
                    value={duelant.spellRate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChange({spellRate: +e.target.value});
                    }}
                    className={styles.slider}
                />
            </label>
        </div>
    )
}

export default DuelantSliders;