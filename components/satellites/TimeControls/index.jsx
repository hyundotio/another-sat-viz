import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Slider, TextInput, IconButton } from '@carbon/react';
import { Play, Pause, SkipBack } from '@carbon/icons-react';

function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str); 
  return d instanceof Date && !isNaN(d.getTime()) && d.toISOString()===str; // valid date 
}

const SECONDS_IN_A_DAY = 86400000;

const TimeControls = ({
  handleMultiplierChange,
  currentTime,
  resetClock,
  startDate
}) => {
  const [inputMultiplier, setInputMultiplier] = useState(0);
  const [exponentialMultiplier, setExponentialMultiplier] = useState(0);
  const [timestamp, setTimestamp] = useState(currentTime);
  const range = 100;

  const handleTimeChange = (value, existingValue) => {
    if (!isNaN(value)) {
      setInputMultiplier(value);

      let expMultiplier = 0;
      if (Math.abs(value) === 0) {
        // set time as stopped
        expMultiplier = 0;
      } else {
        // calculate exponentially rising multiplier
        expMultiplier = Math.round(Math.exp((Math.log(range*100)/range) * Math.abs(value)));
        if (value < 0) {
          expMultiplier = expMultiplier * -1;
        }
      }
      if (expMultiplier !== existingValue) {
        setExponentialMultiplier(expMultiplier);
        handleMultiplierChange(expMultiplier);
      }
    }
  };

  useEffect(() => {
    setTimestamp(currentTime);
  }, [currentTime]);

  const stopTime = () => {
    setInputMultiplier(0);
    setExponentialMultiplier(0);
    handleMultiplierChange(0);
  };

  return (
    <div
      className={`
        ${styles["time-controls"]}
      `}
    >
        <div className={styles['time-controls']}>
          <TextInput
            id="timestamp"
            invalidText="A valid ISO8601 Timestamp is required"
            helperText="+/- 80 minutes max"
            labelText={`UTC Timestamp (Epoch: ${startDate.toISOString()})`}
            placeholder="2023-08-31T12:34:56.789Z"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            onBlur={(e) => {
              const startDateTs = startDate.getTime();
              const newDate = new Date(e.target.value);
              if (isIsoDate(e.target.value) && Math.abs(startDateTs - newDate.getTime()) < (SECONDS_IN_A_DAY * 3)) {
                resetClock(newDate);
              } else {
                setTimestamp(currentTime);
              }
            }}
          />
        </div>
        <Slider
          id="time-slider"
          labelText={`Playback speed`}
          min={-range}
          max={range}
          value={inputMultiplier}
          onChange={(d) => handleTimeChange(d.value, exponentialMultiplier)}
        />
        <div className={styles['control-buttons-container']}>
          <div>
            <IconButton
              label='Reset clock'
              kind="secondary"
              onClick={() => {
                stopTime();
                resetClock();
              }}>
                <SkipBack />
              </IconButton>
          </div>
          <div>
            <IconButton
              label={Math.abs(inputMultiplier) ? 'Pause' : 'Play'}
              kind="secondary"
              onClick={() => {
                if (Math.abs(inputMultiplier) > 0) {
                  stopTime();
                } else {
                  handleTimeChange(30);
                }
              }}>
              {Math.abs(inputMultiplier) > 0 ? <Pause /> : <Play />}
            </IconButton>
          </div>
        </div>
    </div>
  );
};

export default TimeControls;
