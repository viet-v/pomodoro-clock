
import './App.css';
import TimerControls from './Components/TimerControls';
import TimerDisplay from './Components/TimerDisplay';

function App() {
  return (
    <div className='container'>
      <TimerControls/>
      <TimerDisplay/>
    </div>
  );
}

export default App;
