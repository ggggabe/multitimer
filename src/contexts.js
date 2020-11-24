import React, {
  createContext,
  useReducer
} from 'react'
import { TIMER_NAME } from './defaults'

const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60

function makeTwoDigits(num) {
  return `${Math.floor(num/10)}${num%10}`
}

function secondsToDisplayTime(seconds) {
  seconds = seconds || 0

  return [
    Math.floor( (seconds / SECONDS_IN_HOUR )),                     // Hrs
    Math.floor( (seconds / SECONDS_IN_MINUTE) % 60 ),    // Minutes
    seconds % SECONDS_IN_MINUTE                                   // Seconds
  ].map( makeTwoDigits )
}

function displayTimeToSeconds([hr, min, sec]) {
  return (parseInt(hr || 0) * SECONDS_IN_HOUR) + (parseInt(min || 0) * SECONDS_IN_MINUTE) + parseInt(sec || 0)
}

export const TimerContext = createContext({
  state: {
    duration: 360,
    name: "",
    displayTime: secondsToDisplayTime(360)
  }
})

export const MultiTimerContext = createContext({
  state: {
    timers: [{
      duration: 149,
      name: "",
      displayTime: secondsToDisplayTime(149)
    }, {
      duration: 90000,
      name: "",
      displayTime: secondsToDisplayTime(90000)
    }, {
      duration: 30,
      name: "",
      displayTime: secondsToDisplayTime(30)
    }]
  }
})

export const TimerContextProvider = (props) => {
  const {
    name,
    duration,
    displayTime
  } = props

  const [state, dispatch] = useReducer( ( acc, action) => {
    const { type, payload } = action

    switch (type) {
      case 'run':
        const elapsed = acc.elapsed + 1

        return {
          ...acc,
          displayTime: secondsToDisplayTime( elapsed < acc.duration ? acc.duration - elapsed : elapsed - acc.duration ),
          expired: elapsed > acc.duration,
          elapsed
        }
      case 'start':
        return {
          ...acc,
          elapsed: 0,
          expired: false,
          running: true
        }
      case 'stop':
        return {
          ...acc,
          elapsed: 0,
          displayTime: secondsToDisplayTime(acc.duration),
          running: false
        }
      case 'reset':
        return {
          ...acc,
          seconds: 0,
          expired: false,
          running: false
        }
      case 'set duration':
        return {
          ...acc,
          displayTime: secondsToDisplayTime(payload.duration),
          duration: payload.duration
        }
      case 'set displayTime':
        const duration = displayTimeToSeconds(payload.displayTime)
        const displayTime = secondsToDisplayTime(duration)

        return {
          ...acc,
          displayTime,
          duration,
        }
      case 'set name':
        return {
          ...acc,
          name: payload.name.length ? payload.name : TIMER_NAME
        }
      default:
        return acc
    }
  }, {
    name: name.length ? name : TIMER_NAME,
    duration,
    displayTime
  })

  return <TimerContext.Provider {...props} value={{
    state,
    dispatch
  }}/>
}

export const MultiTimerContextProvider = (props) => {
  const [state, dispatch] = useReducer( ( acc, action) => {
    const { type, payload } = action

    switch (type) {
      case 'add timer':
        return {
          ...acc,
          timers: [...acc.timers, payload.timer]
        }
      case 'remove timer':
        const { index } = payload

        return {
          ...acc,
          timers: [
            ...acc.timers.slice(0, index),
            ...acc.timers.slice(index + 1)
          ]
        }
      case 'set name':
        return {
          ...acc,
          name: payload.name
        }
      default:
        return acc
    }
  }, {
    timers: props.timers,
  })

  return <MultiTimerContext.Provider {...props}
    value={{
      state,
      dispatch
    }}
   />
}


