import React, { useEffect, useState } from 'react';
import { getProjects } from '../../services/projectService';
import './Pages.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Container,
} from '@mui/material';
import ActionButtons from '../../components/ActionButtons'

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data.data);
      } catch (error) {
        console.error('Erro ao buscar os projetos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = (deletedProjectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== deletedProjectId)
    );
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container maxWidth="xl">
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Progresso (%)</TableCell>
                <TableCell align="right">Data de início</TableCell>
                <TableCell align="right">Data de fim</TableCell>
                <TableCell align="right">Em atrasado?</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.attributes.name}</TableCell>
                  <TableCell align="right">
                    {project.attributes.progress_percentage}%
                  </TableCell>
                  <TableCell align="right">
                    {project.attributes.start_date}
                  </TableCell>
                  <TableCell align="right">{project.attributes.end_date}</TableCell>
                  <TableCell align="right">{project.attributes.delayed ? 'Sim' : 'Não'}</TableCell>
                  <TableCell align="right">
                    <ActionButtons projectId={project.id} onDelete={handleDelete} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Container>
  );
};

export default ProjectList;