import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import WheelComponent from "react-wheel-of-prizes";
function WheelWrapper({ data, dt }) {
  const [names, setNames] = useState([]);
  const [colors, setColors] = useState([]);
  useEffect(() => {
    const namesArray = data.map((segment) => segment.name);
    const colorsArray = data.map((segment) => segment.color);
    setNames(namesArray);
    setColors(colorsArray);
  }, [data]);
  return (
    <div>
      {dt != null && names.length != 0 && colors.length != 0 ? (
        <WheelComponent
          segments={names}
          segColors={colors}
          onFinished={(winner) => {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          winningSegment={dt}
          isOnlyOnce={false}
          size={190}
          upDuration={500}
          downDuration={600}
          fontFamily="Arial"
        />
      ) : null}
    </div>
  );
}

export default WheelWrapper;
