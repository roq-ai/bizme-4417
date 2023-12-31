import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getJobOpportunityById, updateJobOpportunityById } from 'apiSdk/job-opportunities';
import { Error } from 'components/error';
import { jobOpportunityValidationSchema } from 'validationSchema/job-opportunities';
import { JobOpportunityInterface } from 'interfaces/job-opportunity';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';

function JobOpportunityEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<JobOpportunityInterface>(
    () => (id ? `/job-opportunities/${id}` : null),
    () => getJobOpportunityById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: JobOpportunityInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateJobOpportunityById(id, values);
      mutate(updated);
      resetForm();
      router.push('/job-opportunities');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<JobOpportunityInterface>({
    initialValues: data,
    validationSchema: jobOpportunityValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Job Opportunity
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
              {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
            </FormControl>
            <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
              <FormLabel>Description</FormLabel>
              <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
              {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
            </FormControl>
            <FormControl id="skills_required" mb="4" isInvalid={!!formik.errors?.skills_required}>
              <FormLabel>Skills Required</FormLabel>
              <Input
                type="text"
                name="skills_required"
                value={formik.values?.skills_required}
                onChange={formik.handleChange}
              />
              {formik.errors.skills_required && <FormErrorMessage>{formik.errors?.skills_required}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<CompanyInterface>
              formik={formik}
              name={'company_id'}
              label={'Select Company'}
              placeholder={'Select Company'}
              fetcher={getCompanies}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'job_opportunity',
  operation: AccessOperationEnum.UPDATE,
})(JobOpportunityEditPage);
