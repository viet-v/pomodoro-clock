
import './App.css';
import TimerDisplay from './Components/TimerDisplay';
import TimerControls from './Components/TimerControls';

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
