import { JobOpportunityInterface } from 'interfaces/job-opportunity';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ApplicationInterface {
  id?: string;
  cover_letter: string;
  status: string;
  job_opportunity_id?: string;
  freelancer_id?: string;
  created_at?: any;
  updated_at?: any;

  job_opportunity?: JobOpportunityInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  cover_letter?: string;
  status?: string;
  job_opportunity_id?: string;
  freelancer_id?: string;
}
