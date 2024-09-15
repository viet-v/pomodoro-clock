
import './App.css';
import TimerControls from './Components/TimerControls';
import TimerDisplay from './Components/TimerDisplay';

function App() {
  return (
    <div className='container'>
      <h1 className='title'>Pomodoro timer</h1>
      <TimerDisplay />
      <TimerControls />
    </div>
  );
}

export default App;
