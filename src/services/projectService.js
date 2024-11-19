import api from './api';

const BASE_URL = '/projects';

const handleApiError = (error, message) => {
  console.error(message, error);
  throw error;
};

/**
 * Obtém a lista de todos os projetos.
 * @returns {Promise<Array>} - Lista de projetos.
 */
export const getProjects = async () => {
  try {
    const response = await api.get(BASE_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Erro ao buscar projetos');
  }
};

/**
 * Obtém os detalhes de um projeto específico.
 * @param {string} id - ID do projeto.
 * @returns {Promise<Object>} - Detalhes do projeto.
 */
export const getProjectById = async (id) => {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Erro ao buscar o projeto com o ID ${id}`);
  }
};

/**
 * Cria um novo projeto.
 * @param {Object} projectData - Dados do novo projeto.
 * @returns {Promise<Object>} - Dados do projeto criado.
 */
export const createProject = async (projectData) => {
  try {
    const response = await api.post(BASE_URL, projectData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Erro ao criar o projeto');
  }
};

/**
 * Atualiza os dados de um projeto existente.
 * @param {string} id - ID do projeto.
 * @param {Object} projectData - Dados atualizados do projeto.
 * @returns {Promise<Object>} - Dados do projeto atualizado.
 */
export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`${BASE_URL}/${id}`, projectData);
    return response.data;
  } catch (error) {
    handleApiError(error, `Erro ao atualizar o projeto com o ID ${id}`);
  }
};

/**
 * Deleta um projeto.
 * @param {string} id - ID do projeto.
 * @returns {Promise<Object>} - Dados da resposta da exclusão.
 */
export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Erro ao deletar o projeto com o ID ${id}`);
  }
};