const mapping: Record<string, string> = {
  applications: 'application',
  companies: 'company',
  'job-opportunities': 'job_opportunity',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
