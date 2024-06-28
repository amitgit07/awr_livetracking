import React from "react";
import JobItem from "./JobItem";

const JobList = ({ jobs, selectedJobIndex, onSelectJob }) => {
  return (
    <div
      style={styles.container}>
      {jobs.map((job, index) => (
        <JobItem
          key={job.id}
          job={job}
          isSelected={selectedJobIndex === index}
          onSelect={() => onSelectJob(index)}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: '30%',
    borderRight: '1px solid #ccc',
    padding: '10px',
  }
}
export default JobList;
