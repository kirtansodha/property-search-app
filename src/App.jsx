import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { DndContext } from "@dnd-kit/core";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import propertiesData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import PropertyDetails from "./components/PropertyDetails";
import FavoritesList from "./components/FavoritesList";


function SearchPage({ allProperties, filteredProperties, handleSearch, favorites, onAddFavorite, onRemoveFavorite, onClearFavorites }) {
  return (
    <Container fluid className="mt-4">
      <div className="page-header">
        <h1>🏡 Estate Agent Property Search</h1>
        <p className="mb-0">Find your dream property today</p>
      </div>
      
      <SearchForm onSearch={handleSearch} />
      
      <hr className="section-divider" />
      
      <Row>
        <Col lg={9}>
          <div className="results-header">
            <h3>📍 Properties Found: {filteredProperties.length}</h3>
          </div>
          <Row>
            {filteredProperties.map(property => (
              <Col key={property.id} md={6} lg={4} className="mb-4">
                <div className="property-card">
                  <PropertyCard 
                    property={property}
                    onAddFavorite={onAddFavorite}
                    isFavorite={favorites.some(fav => fav.id === property.id)}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        
        <Col lg={3}>
          <div style={{ position: 'sticky', top: '20px' }}>
            <FavoritesList 
              favorites={favorites}
              onRemove={onRemoveFavorite}
              onClear={onClearFavorites}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}


function App() {
  const [allProperties] = useState(propertiesData);
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = (criteria) => {
    let results = allProperties.filter((property) => {
      if (criteria.type !== "any" && property.type !== criteria.type) {
        return false;
      }
      if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) {
        return false;
      }
      if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) {
        return false;
      }
      if (
        criteria.minBedrooms &&
        property.bedrooms < parseInt(criteria.minBedrooms)
      ) {
        return false;
      }
      if (
        criteria.maxBedrooms &&
        property.bedrooms > parseInt(criteria.maxBedrooms)
      ) {
        return false;
      }
      if (
        criteria.postcode &&
        !property.postcode
          .toLowerCase()
          .includes(criteria.postcode.toLowerCase())
      ) {
        return false;
      }
      if (criteria.dateFrom && property.dateAdded < criteria.dateFrom) {
        return false;
      }
      if (criteria.dateTo && property.dateAdded > criteria.dateTo) {
        return false;
      }
      return true;
    });

    setFilteredProperties(results);
  };

  const handleAddFavorite = (property) => {
    // Check if property is already in favorites
    if (!favorites.some((fav) => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const handleRemoveFavorite = (propertyId) => {
    setFavorites(favorites.filter((fav) => fav.id !== propertyId));
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === "favorites-dropzone") {
      // Extract property from dragged item
      const draggedPropertyId = parseInt(active.id.replace("property-", ""));
      const property = allProperties.find((p) => p.id === draggedPropertyId);

      if (property) {
        handleAddFavorite(property);
      }
    }
  };

  return (
    <Router>
      <DndContext onDragEnd={handleDragEnd}>
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                allProperties={allProperties}
                filteredProperties={filteredProperties}
                handleSearch={handleSearch}
                favorites={favorites}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                onClearFavorites={handleClearFavorites}
              />
            }
          />
          <Route
            path="/property/:id"
            element={<PropertyDetails properties={allProperties} />}
          />
        </Routes>
      </DndContext>
    </Router>
  );
}

export default App;
