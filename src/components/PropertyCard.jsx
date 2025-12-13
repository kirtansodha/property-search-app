import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDraggable } from '@dnd-kit/core';

function PropertyCard({ property, onAddFavorite, isFavorite }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `property-${property.id}`,
    data: { property }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  } : undefined;

  return (
    <Card 
      className="mb-3 h-100" 
      ref={setNodeRef} 
      style={style}
    >
      <div 
        {...listeners} 
        {...attributes} 
        style={{ cursor: 'grab' }}
        className="property-card-image"
      >
        <Card.Img 
          variant="top" 
          src={property.images[0]} 
          alt={property.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </div>
      
      {/* Rest of the component stays the same */}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{property.title}</Card.Title>
        <Card.Text>{property.description}</Card.Text>
        <div className="mt-auto">
          <Badge bg="info" className="me-2">{property.type}</Badge>
          <Badge bg="secondary">{property.bedrooms} bed</Badge>
          <h4 className="text-primary mt-2">£{property.price.toLocaleString()}</h4>
          <p className="text-muted small">{property.location}</p>
          <p className="text-muted small">Added: {property.dateAdded}</p>
          
          <div className="d-grid gap-2">
            <Link to={`/property/${property.id}`} className="btn btn-primary">
              View Details
            </Link>
            <Button 
              variant={isFavorite ? "warning" : "outline-warning"}
              onClick={() => onAddFavorite(property)}
              disabled={isFavorite}
            >
              {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;
