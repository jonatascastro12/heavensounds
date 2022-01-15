import s from './PatchButton.module.css'

const PatchButton = ({ dec = false, ...props }) => {
  return (
    <svg className={s.button}
         onClick={(e) => props.onClick(e)}
         version='1.1' id='Layer_1' width='64' height='64'
         viewBox='0 0 460.5 531.74' overflow='visible'>
      {!dec ?
        <polygon fill='#333' stroke='#111' strokeWidth="5px" className={s.triangles} points='0.5,0.866 459.5,265.87 0.5,530.874 ' /> :
        <polygon fill='#333' stroke='#111' strokeWidth="5px" className={s.triangles} points='460,530.874 1,265.87 460,0.866 ' />
      }
    </svg>


    // <button className={[s.button, dec ? s.left : s.right].join(" ")}>
    // </button>
  )
}

export default PatchButton
