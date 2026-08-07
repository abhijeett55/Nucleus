import axios, { AxiosError } from 'axios';
import type {
  TemplateListResponse,
  GetTemplatesParams,
} from "../component/types/template";

const TEMPLATE_API_BASE_URL = import.meta.env.VITE_TEMPLATE_API_BASE_URL as string;

const templateApiClient = axios.create({
  baseURL: TEMPLATE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});



function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;
    if (err.response?.data?.message) return err.response.data.message;
    if (!err.response) return 'Cannot reach the template service. Check your connection and try again.';
  }
  return 'Could not load templates. Please try again.';
}

export async function getTemplates(params: GetTemplatesParams = {}): Promise<TemplateListResponse> {
  try {
    const { data } = await templateApiClient.get<TemplateListResponse>('/templates', {
      params: {
        category: params.category,
        search: params.search,
        limit: params.limit,
        skip: params.skip,
      },
    });
    return data;
  } catch (error) {
    // eslint-disable-next-line preserve-caught-error
    throw new Error(extractErrorMessage(error));
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const { data } = await templateApiClient.get<string[]>('/templates/categories');
    return data;
  } catch (error) {
    // eslint-disable-next-line preserve-caught-error
    throw new Error(extractErrorMessage(error));
  }
}

export default templateApiClient;