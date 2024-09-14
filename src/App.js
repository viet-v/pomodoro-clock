
import './App.css';
import TimerControls from './component/TimerControls';
import TimerDisplay from './component/TimerDisplay';

function App() {
  return (
    <div className='container'>
      <TimerControls/>
      <TimerDisplay/>
    </div>
  );
}

export default App;
