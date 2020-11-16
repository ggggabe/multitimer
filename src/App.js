import { MultiTimerScene } from './scenes'
import { MultiTimerContextProvider, MultiTimerContext } from './contexts'
import { useContext } from 'react'

function App() {
  const { state: defaultMultiTimerContext } = useContext(MultiTimerContext)

  return <MultiTimerContextProvider {...defaultMultiTimerContext}>
    <MultiTimerScene />
</MultiTimerContextProvider>
}

export default App;
