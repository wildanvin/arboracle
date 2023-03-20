import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Timer = ({ show }) => {
  const [time, setTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(30);
    setIsRunning(false);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const timerFunctionality = (
    <div style={{ textAlign: "center" }}>
      <Title level={2} style={{ marginBottom: 0 }}>
        <ClockCircleOutlined /> {formatTime(time)}
      </Title>
      <Button.Group style={{ marginTop: 16 }}>
        {!isRunning ? (
          <Button type="primary" onClick={handleStart}>
            Start
          </Button>
        ) : (
          <Button type="primary" danger onClick={handleStop}>
            Stop
          </Button>
        )}
        <Button onClick={handleReset}>Reset</Button>
      </Button.Group>
    </div>
  );
  return <div>{show ? timerFunctionality : <h1>Hello, World!</h1>}</div>;
};

export default Timer;
