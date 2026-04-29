export const WORK_ROUTE_TITLES = {
  'fmcg-erp': 'Integrated FMCG Distribution ERP',
  mocs: 'Medical Operations Control System',
  'hr-docs': 'HR Documentation System',
  'erp-lite': 'ERP-Lite Integrated HR Control System',
} as const;

const WORK_ROUTE_SEGMENTS = {
  'fmcg-erp': 'fmcg-erp',
  mocs: 'mocs',
  'hr-docs': 'hr-documentation-control-system',
  'erp-lite': 'erp-lite',
} as const;

const LEGACY_WORK_ROUTE_SEGMENTS: Record<string, keyof typeof WORK_ROUTE_SEGMENTS> = {
  'med-ops': 'mocs',
  'hr-docs': 'hr-docs',
};

const WORK_PROJECT_IDS_BY_ROUTE_SEGMENT: Record<string, keyof typeof WORK_ROUTE_TITLES> = {
  'fmcg-erp': 'fmcg-erp',
  mocs: 'mocs',
  'hr-documentation-control-system': 'hr-docs',
  'erp-lite': 'erp-lite',
  ...LEGACY_WORK_ROUTE_SEGMENTS,
};

export function getWorkProjectIdFromRouteSegment(routeSegment: string) {
  return WORK_PROJECT_IDS_BY_ROUTE_SEGMENT[routeSegment];
}

export function getWorkRouteTitle(projectIdOrRouteSegment: string) {
  const projectId =
    getWorkProjectIdFromRouteSegment(projectIdOrRouteSegment) ??
    (projectIdOrRouteSegment in WORK_ROUTE_TITLES
      ? (projectIdOrRouteSegment as keyof typeof WORK_ROUTE_TITLES)
      : undefined);

  return projectId ? WORK_ROUTE_TITLES[projectId] : undefined;
}

export function getWorkRoutePath(projectId: string) {
  const routeSegment = WORK_ROUTE_SEGMENTS[projectId as keyof typeof WORK_ROUTE_SEGMENTS];
  return routeSegment ? `/work/${routeSegment}` : undefined;
}

export function normalizeWorkRoutePath(pathname: string) {
  if (!pathname.startsWith('/work/')) {
    return pathname;
  }

  const routeSegment = pathname.replace('/work/', '');
  if (routeSegment !== 'hr-docs') {
    return pathname;
  }

  return getWorkRoutePath('hr-docs') ?? pathname;
}
