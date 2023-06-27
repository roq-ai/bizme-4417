import * as yup from 'yup';

export const jobOpportunityValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  skills_required: yup.string().required(),
  company_id: yup.string().nullable(),
});
