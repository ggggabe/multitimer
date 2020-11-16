export const Card = (props) => {
  return <div {...props} style={{
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
