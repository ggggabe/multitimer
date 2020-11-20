import React, { useContext } from 'react'

import {
  TimerContext,
  TimerContextProvider,
  MultiTimerContext
} from '../contexts'

import {
  Button,
  Card
} from '../components'

import {
  TimerCard
} from './Timer'

export const MultiTimerScene = (props) => {
  const { state, dispatch } = useContext(MultiTimerContext)
  const { state: defaultTimer } = useContext(TimerContext)

  const { timers } = state

  return <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {
      timers.map(
        (timer, key) => (
          <TimerContextProvider key={`${key}_${timer.name}`}{...timer}>
            <TimerCard {...timer} />
          </TimerContextProvider>
        )
      )
    }

    <Card style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button onClick={
        e => {
          e.preventDefault()
          dispatch({
            type: 'add timer',
            payload: {
              timer: defaultTimer
            }
          })
        }
        }>
        new timer
      </Button>
    </Card>

  </div>
}
