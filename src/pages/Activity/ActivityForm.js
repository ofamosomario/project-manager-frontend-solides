import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createActivity, getActivityById, updateActivity } from '../../services/activityService';

const ActivityForm = () => {
  const { projectId, id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    finished: false,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        setLoading(true);
        try {
          const activity = await getActivityById(projectId, id);
          setFormData({
            name: activity.data.attributes.name,
            start_date: activity.data.attributes.start_date,
            end_date: activity.data.attributes.end_date,
            finished: activity.data.attributes.finished,
          });
        } catch (error) {
          console.error('Erro ao buscar a atividade:', error);
          alert('Falha ao carregar os dados da atividade.');
        } finally {
          setLoading(false);
        }
      };

      fetchActivity();
    }
  }, [id, projectId]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'O nome da atividade é obrigatório.';
    }
    if (!formData.start_date) {
      newErrors.start_date = 'A data de início é obrigatória.';
    }
    if (!formData.end_date) {
      newErrors.end_date = 'A data de fim é obrigatória.';
    }
    if (formData.start_date && formData.end_date && formData.start_date > formData.end_date) {
      newErrors.end_date = 'A data de fim deve ser posterior à data de início.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined })); // Limpa o erro ao editar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Validação dos campos

    setSaving(true);
    try {
      if (id) {
        await updateActivity(projectId, id, formData);
        alert('Atividade atualizada com sucesso!');
      } else {
        await createActivity(projectId, formData);
        alert('Atividade criada com sucesso!');
      }
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Erro ao salvar a atividade:', error);
      alert('Falha ao salvar a atividade. Verifique os dados e tente novamente.');
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
          {id ? 'Editar Atividade' : 'Criar Atividade'}
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
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Data de início"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
                error={!!errors.start_date}
                helperText={errors.start_date}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Data de fim"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
                error={!!errors.end_date}
                helperText={errors.end_date}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="finished"
                    checked={formData.finished}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Finalizado"
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
              {saving ? <CircularProgress size={24} /> : id ? 'Atualizar Atividade' : 'Criar Atividade'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ActivityForm;
