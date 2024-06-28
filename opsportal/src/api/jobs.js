import {jobsClient} from './index';
export const getJobList = async () => {
  try {
    const response = await jobsClient.get("/jobs");
    console.log(response)
    console.log(response.status)
    if (response.data.status === "OK") {
      const jobs = response.data.data;
      return jobs;
    } else {
      throw new Error('Something went wrong. Please try again later.');
    }
  } catch (error) {
    throw error;
  }
};
