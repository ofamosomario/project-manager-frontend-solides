import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Container,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, getProjectById, updateProject } from '../../services/projectService';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        setLoading(true);
        try {
          const project = await getProjectById(id);
          setFormData({
            name: project.data.attributes.name,
            start_date: project.data.attributes.start_date,
            end_date: project.data.attributes.end_date,
          });
        } catch (error) {
          console.error('Erro ao buscar o projeto:', error);
          alert('Erro ao carregar os dados do projeto.');
        } finally {
          setLoading(false);
        }
      };

      fetchProject();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (id) {
        await updateProject(id, formData);
        alert('Projeto atualizado com sucesso!');
      } else {
        await createProject(formData);
        alert('Projeto criado com sucesso!');
      }
      navigate('/projects');
    } catch (error) {
      console.error('Erro ao salvar o projeto:', error);
      alert('Falha ao salvar o projeto.');
    } finally {
      setSaving(false);
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
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          {id ? 'Editar Projeto' : 'Criar Projeto'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Data de Início"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Data de Fim"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
          </Grid>
          <Box textAlign="center" marginTop={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={saving}
              size="large"
            >
              {saving ? 'Salvando...' : id ? 'Atualizar Projeto' : 'Criar Projeto'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectForm;
