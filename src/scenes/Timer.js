import React, { useContext, useState, useEffect } from 'react'
import {
  TimerContext,
} from '../contexts'

import {
  Button,
  Card,
  InputGroup,
} from '../components'


export const TimerButton = ({label, action}) => {
  const { dispatch } = useContext(TimerContext)

  return <Button onClick={(e) => {
    e.preventDefault()
    dispatch({
      type: action
    })
  }}>
    <label style={{
      cursor: 'pointer'
    }}>{label}</label>
  </Button>
}

const TimerEditor = () => {
  const { state, dispatch } = useContext(TimerContext)
  const { displayTime: [hr, min, sec] } = state

  return (
    <div style={{ display: 'flex', flexFlow: 'column'}}>
      <div style={{ display: 'flex', }}>
        <InputGroup>
          <label>Name </label>
          <input type='text' placeholder='Oscar' value={state.name} onChange={
            (e) => {
              e.preventDefault()
              dispatch({
                type: 'set name',
                payload: {
                  name: e.target.value
                }
              })
            }
            }/>
        </InputGroup>

      </div>

      <InputGroup style={{
        width: 109
      }}>
        <label>Timer</label>
        <div style={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-evenly',
        }}>
          <InputGroup style={{
            width: 30
          }}>
            <input type='text' placeholder='Oscar' value={hr} onChange={
              (e) => {
                e.preventDefault()
                dispatch({
                  type: 'set displayTime',
                  payload: {
                    displayTime: [e.target.value, min, sec]
                  }
                })
              }}/>
            <code>HRS </code>
          </InputGroup>

          <InputGroup style={{
            width: 30
          }}>
            <input type='text' placeholder='Oscar' value={min} onChange={
              (e) => {
                e.preventDefault()
                dispatch({
                  type: 'set displayTime',
                  payload: {
                    displayTime: [hr, e.target.value, sec]
                  }
                })
              }}/>
            <code>MIN </code>
          </InputGroup>

          <InputGroup style={{
            width: 30
          }}>
            <input type='text' placeholder='Oscar' value={sec} onChange={
              (e) => {
                e.preventDefault()
                dispatch({
                  type: 'set displayTime',
                  payload: {
                    displayTime: [hr, min, e.target.value]
                  }
                })
              }}/>
            <code>SEC </code>
          </InputGroup>
        </div>
      </InputGroup>
    </div>
  )
}

const TimerDisplay = props => {
  const { state: {expired, running, displayTime: [ hr, min, sec ]}, dispatch } = useContext(TimerContext)
  const [timer, setTimer] = useState()

  useEffect(() => {
    if (running && !timer) {
      setTimer(
        setInterval( () => {
          dispatch({
            type: 'run'
          })
        }, 1000)
      )
    }

    return () => {
      clearInterval(timer)
      timer && setTimer(null)
    }

  }, [timer, running, dispatch])

  return <div style={{
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center'
  }}>
    <h2>{expired ? '-' : ''}{hr}<span>:</span>{min}<span>:</span>{sec}</h2>
  </div>
}

export const TimerCard = (props) => {
  const { state } = useContext(TimerContext)
  const { running, name } = state
  const [editable, setEditable] = useState(false)

  return <Card>
    <div style={{
      display: 'flex',
      flexFlow: 'row',
      width: '100%'
    }}>
      <h1> {name} </h1>
    </div>

    <TimerDisplay></TimerDisplay>

    {!running && editable && <TimerEditor />}
    <div style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      {
        !running && <Button onClick={e => {
          setEditable(!editable)
        }}>
          {editable ? 'done' : 'edit'}
        </Button>
      }
      {
        !running && !editable && <TimerButton label='start' action='start'/>
      }

      {
        running && <>
          <span/>
          <TimerButton label='stop' action='stop'/>
        </>
      }
    </div>

  </Card>
}

