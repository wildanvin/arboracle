import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Timer = ({ show, ancillary }) => {
  const [time, setTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (show && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [show, time]);

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
      <p>{ancillary}</p>
      {time === 0 ? (
        <Button type="primary" onClick={handleStart}>
          Settle Request
        </Button>
      ) : (
        <Button type="primary" danger onClick={handleStop}>
          No, dispute
        </Button>
      )}
      <br />
      <br />
      <Title level={2} style={{ marginBottom: 0 }}>
        <ClockCircleOutlined /> {formatTime(time)}
      </Title>
    </div>
  );
  return <div>{show ? timerFunctionality : <h1>Hello, World!</h1>}</div>;
};

export default Timer;
