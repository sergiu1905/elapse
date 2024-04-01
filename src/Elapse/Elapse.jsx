import './Elapse.css';
import { useState, useEffect } from 'react';

export default function Elapse() {
  const [duration, setDuration] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [presetDuration, setPresetDuration] = useState(30);
  const [rangeValue, setRangeValue] = useState(30);

  const handleStartButton = () => {
    setIsRunning(!isRunning);
  };

  const handleResetButton = () => {
    setDuration(presetDuration);
    setIsRunning(false);
    setRangeValue(presetDuration);
  };

  const handleDurationChange = (event) => {
    const selectedDuration = parseInt(event.target.value);
    setDuration(selectedDuration);
    setPresetDuration(selectedDuration);
    setRangeValue(selectedDuration);
  };

  const labelColor = duration <= 5 ? 'red' : 'green';

  useEffect(() => {
    let intervalId;
    if (isRunning && duration > 0) {
      intervalId = setInterval(() => {
        setDuration((prevDuration) => prevDuration - 0.1);
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, duration]);

  useEffect(() => {
    let intervalId;
    if (duration === 0) {
      intervalId = setInterval(() => {
        setDuration((prevShowTime) => !prevShowTime);
      }, 500);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [duration]);

  const gradient = `linear-gradient(to left, rgb(230, 230, 229,1),rgb(230, 230, 229,0) ${
    ((60 - duration) * 100) / 60
  }%, green ${((60 - duration) * 100) / 60}%)`;

  const barStyle = {
    width: '100%',
    backgroundImage: gradient,
    backgroundColor: duration <= 5 ? 'red' : '',
  };

  return (
    <div className="body">
      <div className="container">
        <div className="header">
          <div className="circles">
            <div className="circle red"></div>
            <div className="circle yellow"></div>
            <div className="circle green"></div>
          </div>
          <h3 className="title">Timer</h3>
        </div>
        <div className="main_elapse">
          <div className="elapse">
            <h3>Elapsed time :</h3>
            <div className="elapse_bar" style={barStyle}></div>
          </div>
          <p
            className={`${
              labelColor === 'red' && duration <= 5 ? 'blinking' : ''
            }`}
            style={{ color: labelColor }}
          >
            {duration.toFixed(1)} Sec
          </p>
          <div className="duration">
            <h3>Duration: {presetDuration}</h3>
            <input
              type="range"
              onChange={handleDurationChange}
              value={rangeValue}
              min={0}
              max={60}
            />
          </div>
          <div className="buttons">
            <button onClick={handleStartButton}>
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={handleResetButton}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
