import React, { useState, useEffect } from "react";

const Timer = ({ timeLimit, onTimeExpired, resetTimer }) => {
  const storedTimeRemaining = localStorage.getItem("timeRemaining");
  const initialTimeRemaining = storedTimeRemaining
    ? parseInt(storedTimeRemaining, 10)
    : timeLimit;
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);

  useEffect(() => {
    let intervalId;

    if (resetTimer) {
      // Reset the timer when resetTimer prop changes
      setTimeRemaining(timeLimit);
      // Update localStorage with the new timeRemaining
      localStorage.setItem("timeRemaining", timeLimit.toString());
    } else if (timeRemaining > 0) {
      // Set up an interval to update the timer every second
      intervalId = setInterval(() => {
        // Decrement the time remaining
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1;

          // Save the new timeRemaining to localStorage
          localStorage.setItem("timeRemaining", newTime.toString());

          return newTime;
        });
      }, 1000);
    } else {
      // If time is already expired, invoke onTimeExpired immediately
      onTimeExpired();
    }

    // Clean up the interval when the component is unmounted or time is expired
    return () => clearInterval(intervalId);
  }, [timeRemaining, onTimeExpired, timeLimit, resetTimer]);

  // Format the timeRemaining into minutes and seconds
  const formattedTime = `${Math.floor(timeRemaining / 60)}:${(
    timeRemaining % 60
  )
    .toString()
    .padStart(2, "0")}`;

  return (
    <div>
      <p>Time Remaining: {formattedTime}</p>
    </div>
  );
};

export default Timer;
