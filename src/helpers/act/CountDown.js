import React, { useEffect, useState } from "react";

export default function Countdown() {
  const [time, setTime] = useState(3);
  useEffect(() => {
    const tick = () => setTime((time) => (time > 0 ? time - 1 : time));
    setInterval(tick, 1000);
  }, []);
  return <div>{time || "Done!"}</div>;
}
