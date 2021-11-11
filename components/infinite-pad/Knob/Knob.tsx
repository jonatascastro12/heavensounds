import { ChevronLeft, ChevronRight } from '@components/icons';
import s from './Knob.module.css';

const Knob = ({dec = false}) => {
    return (
        <div className={s.slider}>
            <div className={s.knob}></div>
        </div>
    )
}

export default Knob
