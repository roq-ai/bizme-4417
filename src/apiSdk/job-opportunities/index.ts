import axios from 'axios';
import queryString from 'query-string';
import { JobOpportunityInterface, JobOpportunityGetQueryInterface } from 'interfaces/job-opportunity';
import { GetQueryInterface } from '../../interfaces';

export const getJobOpportunities = async (query?: JobOpportunityGetQueryInterface) => {
  const response = await axios.get(`/api/job-opportunities${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createJobOpportunity = async (jobOpportunity: JobOpportunityInterface) => {
  const response = await axios.post('/api/job-opportunities', jobOpportunity);
  return response.data;
};

export const updateJobOpportunityById = async (id: string, jobOpportunity: JobOpportunityInterface) => {
  const response = await axios.put(`/api/job-opportunities/${id}`, jobOpportunity);
  return response.data;
};

export const getJobOpportunityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/job-opportunities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteJobOpportunityById = async (id: string) => {
  const response = await axios.delete(`/api/job-opportunities/${id}`);
  return response.data;
};
