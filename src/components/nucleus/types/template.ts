export interface TemplatesGalleryProps {
  onBack?: () => void;
  initialCategory?: string;
}

export interface TemplateCardProps {
    id: string;
    name: string;
    author: string;
    price: string;
    icon: string;
    categories: string[];
    color?: string;
    isSelected?: boolean;
    onClick? :(id: string) => void;
}

export interface TemplateListResponse {
  templates: TemplateCardProps[];
  total: number;
  limit: number;
  skip: number;
}


export interface GetTemplatesParams {
  categories?: string[];
  search?: string;
  limit?: number;
  skip?: number;
}

export interface CreateFromTemplateParams {
  templateId: string;
  name: string;
  visibility: 'private' | 'public';
  folder: string;
  runtime: 'sandbox' | 'devbox';
  vmSpec: string;
  openIn: string;
}

export interface CreateFromTemplateResponse {
  id: string;
}

export interface ProjectDto {
  id: string;
  templateId: string;
  name: string;
  visibility: 'private' | 'public';
  folder: string;
  runtime: 'sandbox' | 'devbox';
  vmSpec: string;
  openIn: string;
  ownerId: string;
  createdAt: string;
}