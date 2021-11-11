import { ChevronLeft, ChevronRight } from '@components/icons';
import s from './PatchButton.module.css';

const PatchButton = ({dec = false}) => {
    return (
        <svg viewBox="0 0 32px 32px" x="0" y="0">
            <path fill="#CCC" xmlns="http://www.w3.org/2000/svg" d="M255.8,348.5L23.9,480.9c-18.5,10.6-18.5,27.7,0,38.2l231.9,132.3c18.5,10.6,33.5,1.8,33.5-19.5V368C289.3,346.7,274.3,338,255.8,348.5z"/>
        </svg>

        // <button className={[s.button, dec ? s.left : s.right].join(" ")}>
        // </button>
    )
}

export default PatchButton
