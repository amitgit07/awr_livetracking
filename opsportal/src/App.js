import JobList from "./components/jobs/JobList";
import MapView from "./components/map/MapView";
import React, { useState, useEffect } from 'react';
import { getJobList } from "./api/jobs";

function App() {
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await getJobList();
        setJobs(jobs);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch jobs. Please try again later.');
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (jobs.length === 0) {
    return <div>No jobs available</div>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <JobList jobs={jobs} selectedJobIndex={selectedJobIndex} onSelectJob={setSelectedJobIndex} />
      <MapView job={jobs[selectedJobIndex]} />
    </div>
  );
}

export default App;
