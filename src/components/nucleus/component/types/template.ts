export interface TemplateCardProps {
    id: string;
    name: string;
    author: string;
    price: string;
    icon: string;
    category: string;
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
  category?: string;
  search?: string;
  limit?: number;
  skip?: number;
}

export interface TemplatesGalleryProps {
  onBack?: () => void;
  initialCategory?: string;
}