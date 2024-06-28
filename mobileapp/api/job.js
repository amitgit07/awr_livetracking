import {setItem} from '../utils/localStorageUtils';
import {jobsClient} from './index';
export const validateOtp = async (otp) => {
  try {
    const response = await jobsClient.get(`/access-job?otp=${otp}`);
    if (response.data.status === "OK") {
      const job = response.data.data;
      await setItem("currentJob", job);
      return job;
    } else {
      throw new Error('Invalid OTP');
    }
  } catch (error) {
    throw error;
  }
};
