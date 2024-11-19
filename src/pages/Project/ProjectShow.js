import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Tooltip,
  Box,
  Typography,
  Container,
  CircularProgress,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../../services/projectService';
import { getActivities, deleteActivity } from '../../services/activityService';

const ProjectShow = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectData = await getProjectById(id);
        setProject(projectData.data.attributes);

        const activitiesData = await getActivities(id);
        setActivities(activitiesData.data);
      } catch (error) {
        console.error('Erro ao buscar as atividades:', error);
        alert('Erro ao carregar os dados do projeto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleDelete = async (activityId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar esta atividade?');
    if (!confirmDelete) return;

    try {
      await deleteActivity(id, activityId);
      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== activityId)
      );
      alert('Atividade deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar atividade:', error);
      alert('Falha ao deletar atividade.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="body1">
          <strong>Data de Início:</strong> {project.start_date}
        </Typography>
        <Typography variant="body1">
          <strong>Data de Finalização:</strong> {project.end_date}
        </Typography>
        <Typography variant="body1">
          <strong>Projeto atrasado?</strong> {project.delayed ? 'Sim' : 'Não'}
        </Typography>
        <Typography variant="body1">
          <strong>Progresso:</strong> {project.progress_percentage || 0}%
        </Typography>
        <Box sx={{ marginY: 2 }}>
          <LinearProgress
            variant="determinate"
            value={project.progress_percentage || 0}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/projects/${id}/add-activity`}
          startIcon={<AddTaskIcon />}
        >
          Adicionar Atividade
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h6" gutterBottom>
          Atividades
        </Typography>
        {activities.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Finalizado?</TableCell>
                  <TableCell>Data de Início</TableCell>
                  <TableCell>Data de Fim</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.attributes.name}</TableCell>
                    <TableCell>
                      {activity.attributes.finished ? 'Sim' : 'Não'}
                    </TableCell>
                    <TableCell>{activity.attributes.start_date}</TableCell>
                    <TableCell>{activity.attributes.end_date}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar atividade">
                        <IconButton
                          component={Link}
                          to={`/projects/${id}/edit-activity/${activity.id}`}
                          aria-label="edit"
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar atividade">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDelete(activity.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Nenhuma atividade encontrada.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ProjectShow;