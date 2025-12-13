import { Button, Badge, ListGroup } from 'react-bootstrap';
import { useDroppable } from '@dnd-kit/core';

function FavoritesList({ favorites, onRemove, onClear }) {
  const { setNodeRef } = useDroppable({
    id: 'favorites-dropzone',
  });

  return (
    <div className="favorites-sidebar p-3 bg-light border rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Favorites ({favorites.length})</h4>
        {favorites.length > 0 && (
          <Button variant="outline-danger" size="sm" onClick={onClear}>
            Clear All
          </Button>
        )}
      </div>

      <div ref={setNodeRef} style={{ minHeight: '200px' }}>
        {favorites.length === 0 ? (
          <p className="text-muted text-center">
            Drag properties here or click the heart icon to add favorites
          </p>
        ) : (
          <ListGroup>
            {favorites.map(property => (
              <ListGroup.Item key={property.id} className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">{property.title}</h6>
                    <small className="text-muted">£{property.price.toLocaleString()}</small>
                    <br />
                    <Badge bg="info" className="me-1">{property.type}</Badge>
                    <Badge bg="secondary">{property.bedrooms} bed</Badge>
                  </div>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(property.id);
                    }}
                  >
                    ✕
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </div>
  );
}

export default FavoritesList;
