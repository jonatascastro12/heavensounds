import s from './Knob.module.css'
import React, { MutableRefObject, useMemo, useRef, useState } from 'react'

const calculateDegree = (e: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent, boundingBox: DOMRect) => {
  const x1 = boundingBox.left + boundingBox.width / 2
  const y1 = boundingBox.top + boundingBox.height / 2
  let x2: number, y2: number

  if (['mousestart', 'mousemove'].includes(e.type)) {
    // @ts-ignore
    x2 = e.clientX
    // @ts-ignore
    y2 = e.clientY
  } else if (['touchmove', 'touchstart'].includes(e.type)) {
    // @ts-ignore
    x2 = e.touches[0].clientX
    // @ts-ignore
    y2 = e.touches[0].clientY
  } else {
    return 0
  }

  const deltaX = x2 - x1
  const deltaY = y2 - y1

  const rad = Math.atan2(deltaY, deltaX)
  return rad * (180 / Math.PI)
}

/**
 * This is not prepared to work with TouchEvents
 * @param dec
 * @param label
 * @constructor
 */

const Knob = ({ dec = false, label = '', min = 0, max = 127 }) => {
  const [isMoving, setIsMoving] = useState(false)
  const [position, setPosition] = useState(0)

  const knob: MutableRefObject<any> = useRef(null)
  const boundingBox: DOMRect = useMemo(() => knob.current ? knob.current.getBoundingClientRect() : null, [knob.current])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (boundingBox) {
      const result = Math.floor(calculateDegree(e, boundingBox) + 90)
      setPosition(result)
    }
    window && window.addEventListener('mousemove', handleMouseMove)
    window && window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (boundingBox) {
      const result = Math.floor(calculateDegree(e, boundingBox) + 90)
      setPosition(result)
    }
  }

  const handleMouseUp = (e: MouseEvent) => {
    window && window.removeEventListener('mousemove', handleMouseMove)
    window && window.removeEventListener('mousemove', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    if (boundingBox) {
      const result = Math.floor(calculateDegree(e, boundingBox) + 90)
      setPosition(result)
    }
    window && window.addEventListener('touchmove', handleTouchMove)
    window && window.addEventListener('touchend', handleTouchEnd)
  }

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    if (boundingBox) {
      const result = Math.floor(calculateDegree(e, boundingBox) + 90)
      setPosition(result)
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault()
    window && window.removeEventListener('touchmove', handleTouchMove)
    window && window.removeEventListener('touchend', handleTouchEnd)
  }


  return (
    <div className={s.slider} ref={knob}
         onMouseDown={(e) => handleMouseDown(e)}
         onTouchStart={(e) => handleTouchStart(e)}
    >
      <label className={s.label}>{label} ({position})</label>
      <div className={s.knob}
           style={{ transform: `rotate(${position}deg)` }}>
      </div>
    </div>
  )
}

export default Knob
