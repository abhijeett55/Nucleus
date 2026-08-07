import type { TemplateCardProps } from '../types/template';
import './Templatecard.css';

export function TemplateCard({
  id,
  name,
  author,
  price,
  icon,
  category,
  color = '#e2e8f0',
  isSelected = false,
  onClick,
}: TemplateCardProps) {
  const handleClick = () => {
    onClick?.(id);
  };

  const cardClassName = `template-card ${isSelected ? 'selected' : ''}`;

  return (
    <div
      className={cardClassName}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Select template ${name}`}
    >
      <div
        className="icon-wrapper"
        style={{ backgroundColor: `${color}20` }}
      >
        <span>{icon}</span>
      </div>
      <div className="info">
        <div className="row">
          <h4 className="name">{name}</h4>
          <span className="price">{price}</span>
        </div>
        <p className="author">
          <i className="fas fa-code" aria-hidden="true"></i>
          {author}
        </p>
        <div className="category">
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
}