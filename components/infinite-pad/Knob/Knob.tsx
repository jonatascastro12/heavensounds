import s from './Knob.module.css'
import React, { useState } from 'react'

const getXYFromEvent = (e: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent) => {
  let x: number, y: number
  if (['mousestart', 'mousemove'].includes(e.type)) {
    // @ts-ignore
    x = e.clientX
    // @ts-ignore
    y = e.clientY

  } else if (['touchmove', 'touchstart'].includes(e.type)) {
    // @ts-ignore
    x = e.touches[0].clientX
    // @ts-ignore
    y = e.touches[0].clientY
  } else {
    return [0, 0]
  }
  return [x, y]
}

const angleRange = 270

const angleToValue = (angle: number, minVal: number, maxVal: number) => {
  let pct = angle / angleRange

  return Math.round(minVal + (maxVal - minVal) * pct)
}

const valueToAngle = (value: number, minVal: number, maxVal: number) => {
  let pct = (value - minVal) / (maxVal - minVal)

  return Math.round(pct * angleRange)

}

const calcAngle = (angle: number, delta: number) => {
  angle += delta
  if (angle > angleRange) {
    angle -= angle - angleRange
  } else if (angle < 0) {
    angle += Math.abs(angle)
  }
  return angle
}

const Knob = ({
                dec = false,
                label = '',
                unit = '',
                initialValue = 0,
                mouseSpeed = 2,
                minValue = 0,
                maxValue = 127,
                ...props
              }) => {
  let [state, setState] = useState<{ angle: number, prevY?: number | null }>({
    angle: valueToAngle(initialValue, minValue, maxValue)
  })

  const updatePosition = (e: React.TouchEvent | React.MouseEvent | TouchEvent | MouseEvent) => {
    let { angle, prevY } = state
    const [, y] = getXYFromEvent(e)

    if (!prevY) {
      setState(prev => {
        let obj = { ...prev, prevY: y }
        state = obj
        return obj
      })
      return
    }

    const delta = (prevY - y) * mouseSpeed
    angle = calcAngle(angle, delta)
    setState(prev => ({
      ...prev,
      angle,
      prevY: y
    }))
    if (props.onChangeValue)
      props.onChangeValue(angleToValue(angle, minValue, maxValue))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    updatePosition(e)
    window && window.addEventListener('mousemove', handleMouseMove)
    window && window.addEventListener('mouseup', handleMouseUp)


  }

  const handleMouseMove = (e: MouseEvent) => {
    updatePosition(e)
  }

  const handleMouseUp = () => {
    setState(prev => ({ ...prev, prevY: null }))
    window && window.removeEventListener('mousemove', handleMouseMove)
    window && window.removeEventListener('mousemove', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    updatePosition(e)
    window && window.addEventListener('touchmove', handleTouchMove)
    window && window.addEventListener('touchend', handleTouchEnd)
  }

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    updatePosition(e)
  }

  const handleTouchEnd = (e: TouchEvent) => {
    setState(prev => ({ ...prev, prevY: null }))
    e.preventDefault()
    window && window.removeEventListener('touchmove', handleTouchMove)
    window && window.removeEventListener('touchend', handleTouchEnd)
  }

  return (
    <div className={s.slider}
         onMouseDown={(e) => handleMouseDown(e)}
         onTouchStart={(e) => handleTouchStart(e)}
    >
      <label className={s.label}>{label} ({angleToValue(state.angle, minValue, maxValue)}{unit})</label>
      <div className={s.knob}
           style={{ transform: `rotate(${state.angle}deg)` }}>
        <div className={s['knob-outer-led']}
             style={{
               borderColor: `rgba(255,255,255, ${state.angle / angleRange})`,
               boxShadow: `0px 0px 10px rgba(52, 155, 235, ${state.angle / angleRange}), inset 0px 0px 10px rgba(52, 155, 235, ${state.angle / angleRange})`
             }}></div>
      </div>
    </div>
  )
}

export default Knob
