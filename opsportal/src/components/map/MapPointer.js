import { Pin } from "@vis.gl/react-google-maps";
import React from "react";

const MapPointer = ({ type }) => {
  const getPinType = (type) => {
    const validTypes = ["origin", "destination", "live"];
    if (validTypes.includes(type)) {
      return type;
    } else {
      return "default";
    }
  };

  const pinType = getPinType(type);
  return (
    <Pin
      background={styles[pinType].background}
      borderColor={styles[pinType].borderColor}
      glyphColor={styles[pinType].glyphColor}
    />
  );
};

const styles = {
  origin: {
    background: "#b0128f",
    borderColor: "#691357",
    glyphColor: "#ff40d7",
  },
  destination: {
    background: "#9840e6",
    borderColor: "#380763",
    glyphColor: "#5f15a1",
  },
  live: {
    background: "#056634",
    borderColor: "#056634",
    glyphColor: "#09e372",
  },
  default: {
    background: "#c75f28",
    borderColor: "#a6430d",
    glyphColor: "#ed5505",
  },
};

export default MapPointer;
