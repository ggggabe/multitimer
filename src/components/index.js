import { useState, useEffect, useRef, useMemo } from 'react'


/*
 * Headers should be usable in any container
 */

export const Header = (props) => {
  return <div {...props} className='header' style={{
    display: 'flex',
    flexFlow: 'row',
    textAlign: 'left',
    width: '100%',
    ...props.style
  }}/>
}

export const Card = (props) => {
  return <div {...props} className='card' style={{
    borderRadius: 4,
    border: 'solid 1px #333',
    display: 'flex',
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 400,
    width: 280,
    ...props.style
  }} />
}

export const Button = (props) => {
  return <div {...props} style={{
    width: 100,
    borderRadius: '2px',
    height: 40,
    cursor: 'pointer',
    lineHeight: '40px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgb(249, 173, 77)',
    ...props.style
  }} />
}

export const InputGroup = (props) => {
  return <div {...props} style={{
    display: 'flex',
    flexFlow: 'column',
    ...props.style
  }} />
}


const EXIT_EDIT_KEY_CODES = [13, 27]
// PROP TYPE INFO
//
// props = {
//   value: string,
//   onEdit: (newValue: string) => {
//     does whatever you want
//     nothing is done with the return value
//   }
// }
//
// BEHAVIOR
//
// On click, textEdits the value it's provided, and on EXIT (see const EXIT_EDIT_KEYS)
// calls the provided onEdit function with the current value stored in
// `editedValue` passed as it's arg
//
//  onEdit(editedValue)

export const Editable = (props) => {
  const { children, value, onEdit } = props
  const ref = useRef()

  const [editable, setEditable] = useState(false)
  const [editedValue, setCurrentEditedValue] = useState(value)
  const exit = () => {
    onEdit(editedValue)
    setEditable(false)
  }

  const handleExitHotKeys = useMemo(() => e => {
    if (!EXIT_EDIT_KEY_CODES.filter( k => k === e.keyCode ).length ) return
    e.preventDefault()
    exit()
  }, [onEdit, editedValue])

  useEffect(() => {
    if (!editable) return () => {}

    const inputElement = ref.current

    inputElement && inputElement.addEventListener('keypress', handleExitHotKeys)

    return () => {
      inputElement && inputElement.removeEventListener('keypress', handleExitHotKeys)
    }
  }, [editable, handleExitHotKeys, ref])

  return (
    <div style={{ cursor: 'pointer' }} onClick={() => editable || setEditable(true)}>
      {
        editable ? (
          <InputGroup>
            <label>Name </label>
            <input ref={ref} value={editedValue} type='text' onChange={e => {
              e.preventDefault()
              setCurrentEditedValue(e.target.value)
            }} />
            <Button onClick={() => { exit() } }>
              <code>Done</code>
            </Button>
          </InputGroup>
        )
        : children
      }
    </div>
  )
}
