import * as yup from 'yup';

export const applicationValidationSchema = yup.object().shape({
  cover_letter: yup.string().required(),
  status: yup.string().required(),
  job_opportunity_id: yup.string().nullable(),
  freelancer_id: yup.string().nullable(),
});
