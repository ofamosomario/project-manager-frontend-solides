import api from './api';

const BASE_URL = '/projects';

const handleApiError = (error, message) => {
  console.error(message, error);
  throw error;
};

/**
 * Obtém a lista de atividades de um projeto.
 * @param {string} projectId - ID do projeto.
 * @returns {Promise<Array>} - Lista de atividades.
 */
export const getActivities = async (projectId) => {
  try {
    const response = await api.get(`${BASE_URL}/${projectId}/activities`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Erro ao buscar as atividades do projeto ${projectId}`);
  }
};

/**
 * Obtém os detalhes de uma atividade específica.
 * @param {string} projectId - ID do projeto.
 * @param {string} id - ID da atividade.
 * @returns {Promise<Object>} - Detalhes da atividade.
 */
export const getActivityById = async (projectId, id) => {
  try {
    const response = await api.get(`${BASE_URL}/${projectId}/activities/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Erro ao buscar a atividade ${id} do projeto ${projectId}`);
  }
};

/**
 * Cria uma nova atividade em um projeto.
 * @param {string} projectId - ID do projeto.
 * @param {Object} activityData - Dados da nova atividade.
 * @returns {Promise<Object>} - Dados da atividade criada.
 */
export const createActivity = async (projectId, activityData) => {
  try {
    const response = await api.post(`${BASE_URL}/${projectId}/activities`, activityData);
    return response.data;
  } catch (error) {
    handleApiError(error, `Erro ao criar atividade do projeto ${projectId}`);
  }
};

/**
 * Atualiza uma atividade existente em um projeto.
 * @param {string} projectId - ID do projeto.
 * @param {string} id - ID da atividade.
 * @param {Object} activityData - Dados atualizados da atividade.
 * @returns {Promise<Object>} - Dados da atividade atualizada.
 */
export const updateActivity = async (projectId, id, activityData) => {
  try {
    const response = await api.put(`${BASE_URL}/${projectId}/activities/${id}`, activityData);
    return response.data;
  } catch (error) {
    handleApiError(error, `Erro ao atuailizar a atividade ${id} do prjeto ${projectId}`);
  }
};

/**
 * Deleta uma atividade de um projeto.
 * @param {string} projectId - ID do projeto.
 * @param {string} activityId - ID da atividade.
 * @returns {Promise<Object>} - Dados da resposta da exclusão.
 */
export const deleteActivity = async (projectId, activityId) => {
  try {
    const response = await api.delete(`${BASE_URL}/${projectId}/activities/${activityId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Erro ao deletar a atividade ${activityId} do projeto ${projectId}`);
  }
};