import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Timer = ({ show, ancillary, tx, writeContracts, contractName }) => {
  const [time, setTime] = useState(30);
  const [stopTimer, setStopTimer] = useState(false);

  useEffect(() => {
    let interval;
    if (show && time > 0 && !stopTimer) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [show, time, stopTimer]);

  async function handleSettle() {
    tx(writeContracts[contractName].settleRequest(), update => {
      console.log("📡 Transaction Update:", update);
      if (update && (update.status === "confirmed" || update.status === 1)) {
        console.log(" 🍾 Transaction " + update.hash + " finished!");
      }
    });
  }

  async function handleDispute() {
    setStopTimer(true);
    tx(writeContracts[contractName].dispute(), update => {
      console.log("📡 Transaction Update:", update);
      if (update && (update.status === "confirmed" || update.status === 1)) {
        console.log(" 🍾 Transaction " + update.hash + " finished!");
      }
    });
  }

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
        <Button type="primary" onClick={handleSettle}>
          Settle Request
        </Button>
      ) : (
        <Button type="primary" danger onClick={handleDispute}>
          Dispute
        </Button>
      )}
      <br />
      <br />
      <Title level={2} style={{ marginBottom: 0 }}>
        <ClockCircleOutlined /> {formatTime(time)}
      </Title>
    </div>
  );
  return <div>{show ? timerFunctionality : <></>}</div>;
};

export default Timer;
