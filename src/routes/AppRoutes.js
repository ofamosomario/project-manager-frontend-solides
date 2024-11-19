import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const ProjectList = React.lazy(() => import('../pages/Project/ProjectList'));
const ProjectForm = React.lazy(() => import('../pages/Project/ProjectForm'));
const ProjectShow = React.lazy(() => import('../pages/Project/ProjectShow'));
const ActivityForm = React.lazy(() => import('../pages/Activity/ActivityForm'));

const AppRoutes = () => {
  const routesConfig = [
    { path: '/', element: <ProjectList /> },
    { path: '/projects', element: <ProjectList /> },
    { path: '/projects/create', element: <ProjectForm /> },
    { path: '/projects/:id/edit', element: <ProjectForm /> },
    { path: '/projects/:id', element: <ProjectShow /> },
    { path: '/projects/:projectId/add-activity', element: <ActivityForm /> },
    { path: '/projects/:projectId/edit-activity/:id', element: <ActivityForm /> },
    { path: '*', element: <div>Página não encontrada</div> },
  ];

  const routes = useRoutes(routesConfig);

  return (
    <Suspense fallback={<CircularProgress />}>
      {routes}
    </Suspense>
  );
};

export default AppRoutes;
