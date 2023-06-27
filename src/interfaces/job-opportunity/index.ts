import { ApplicationInterface } from 'interfaces/application';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface JobOpportunityInterface {
  id?: string;
  title: string;
  description: string;
  skills_required: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;
  application?: ApplicationInterface[];
  company?: CompanyInterface;
  _count?: {
    application?: number;
  };
}

export interface JobOpportunityGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  skills_required?: string;
  company_id?: string;
}
