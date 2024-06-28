import React from "react";
import Vehicle from "./Vehicle";
import TitledLabel from "../common/TitledLabel";

const JobItem = ({ job, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      style={{
        ...styles.jobItem,
        ...(isSelected ? styles.jobItemSelected : {}),
      }}
    >
      <p style={styles.jobId}>Job ID: {job.id}</p>
      <TitledLabel title="OTP" text={job.otp} />
      <TitledLabel title="Pickup Address" text={job.pickup.address} />
      <TitledLabel title="Dropoff Address" text={job.dropoff.address} />
      <TitledLabel title="Customer Name" text={job.dropoff.name} />
      <TitledLabel title="Notes" text={job.notes} />
      <Vehicle
        vehicleImage={job.vehicle.image}
        plateNumber={job.vehicle.plateNumber}
      />
    </div>
  );
};

const styles = {
  jobItem: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, backgroundColor 0.2s",
  },
  jobItemSelected: {
    backgroundColor: "#e0f7fa",
    transform: "scale(1.02)",
  },
  jobId: {
    marginBottom: "10px",
    fontWeight: "bold",
  },
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


export default JobItem;