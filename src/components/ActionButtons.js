import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddTaskIcon from '@mui/icons-material/AddTask';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deleteProject } from '../services/projectService';
import { Link } from 'react-router-dom';

const ActionButtons = ({ projectId, onDelete }) => {
  const handleDelete = async () => {
    const confirmation = window.confirm('Você tem certeza que gostaria de deletar esse projeto?');
    if (!confirmation) return;

    try {
      await deleteProject(projectId);
      alert('Projeto deletado com sucesso!');
      if (onDelete) onDelete(projectId);
    } catch (error) {
      console.error('Erro ao deletar o projeto:', error);
      alert('Falha ao deletar o projeto.');
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Tooltip title="Adicionar uma atividade">
        <IconButton
          aria-label="atividade"
          color="primary"
          component={Link}
          to={`/projects/${projectId}/add-activity`}
        >
          <AddTaskIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Ver informações do projeto">
        <IconButton
          aria-label="verificar"
          color="primary"
          component={Link}
          to={`/projects/${projectId}`}
        >
          <VisibilityIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Editar projeto">
        <IconButton
          aria-label="edit"
          color="primary"
          component={Link}
          to={`/projects/${projectId}/edit`}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Deletar projeto">
        <IconButton aria-label="delete" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ActionButtons;
