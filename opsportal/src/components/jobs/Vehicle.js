import React from "react";
import TitledLabel from "../common/TitledLabel";

const Vehicle = ({ vehicleImage, plateNumber }) => {
  return (
    <div style={styles.vehicleContainer}>
      <img src={vehicleImage} alt="Vehicle" style={styles.vehicleImage} />
      <TitledLabel title="Plate Number" text={plateNumber} />
    </div>
  );
};

const styles = {
  vehicleContainer: {
    display: "flex",
    alignItems: "center",
  },
  vehicleImage: {
    width: "100px",
    height: "75px",
    marginRight: "10px",
    objectFit: "cover",
  },
};

export default Vehicle;