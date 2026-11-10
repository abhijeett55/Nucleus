import axios, { AxiosError } from 'axios';
import type {
  CreateFromTemplateParams,
  CreateFromTemplateResponse,
  ProjectDto,
} from '../types/template';

const PROJECT_API_BASE_URL = import.meta.env.VITE_PROJECT_API_BASE_URL as string;

const projectApiClient = axios.create({
  baseURL: PROJECT_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;
    if (err.response?.data?.message) return err.response.data.message;
    if (!err.response) return 'Cannot reach the project service. Check your connection and try again.';
  }
  return 'Could not complete the request. Please try again.';
}

export async function createFromTemplate(
  params: CreateFromTemplateParams
): Promise<CreateFromTemplateResponse> {
  try {
    const { data } = await projectApiClient.post<CreateFromTemplateResponse>('/projects', params);
    return data;
  } catch (error) {
    // eslint-disable-next-line preserve-caught-error
    throw new Error(extractErrorMessage(error));
  }
}

export async function getProjectById(id: string): Promise<ProjectDto> {
  try {
    const { data } = await projectApiClient.get<ProjectDto>(`/projects/${id}`);
    return data;
  } catch (error) {
    // eslint-disable-next-line preserve-caught-error
    throw new Error(extractErrorMessage(error));
  }
}

export async function getMyProjects(): Promise<ProjectDto[]> {
  try {
    const { data } = await projectApiClient.get<ProjectDto[]>('/projects');
    return data;
  } catch (error) {
    // eslint-disable-next-line preserve-caught-error
    throw new Error(extractErrorMessage(error));
  }
}

export default projectApiClient;