import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { DndContext } from '@dnd-kit/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import propertiesData from './data/properties.json';
import SearchForm from './components/SearchForm';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import FavoritesList from './components/FavoritesList';

/**
 * SECURITY MEASURES:
 * - React's built-in XSS protection through JSX escaping
 * - HTML5 input validation (type="number", type="date")
 * - No dangerous functions (eval, innerHTML) used
 * - Safe data handling throughout the application
 */

/**
 * SearchPage Component
 * Displays the main search interface with property results and favorites
 * 
 * @param {Array} allProperties - Complete list of properties
 * @param {Array} filteredProperties - Properties matching search criteria
 * @param {Function} handleSearch - Search handler function
 * @param {Array} favorites - List of favorited properties
 * @param {Function} onAddFavorite - Handler to add property to favorites
 * @param {Function} onRemoveFavorite - Handler to remove property from favorites
 * @param {Function} onClearFavorites - Handler to clear all favorites
 */
function SearchPage({ allProperties, filteredProperties, handleSearch, favorites, onAddFavorite, onRemoveFavorite, onClearFavorites }) {
  return (
    <Container fluid className="mt-4">
      {/* Page header with gradient background */}
      <div className="page-header">
        <h1>🏡 Estate Agent Property Search</h1>
        <p className="mb-0">Find your dream property today</p>
      </div>
      
      {/* Search form component */}
      <SearchForm onSearch={handleSearch} />
      
      <hr className="section-divider" />
      
      <Row>
        {/* Main property results column */}
        <Col lg={9}>
          <div className="results-header">
            <h3>📍 Properties Found: {filteredProperties.length}</h3>
          </div>
          <Row>
            {/* Map through filtered properties and display cards */}
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
        
        {/* Favorites sidebar - sticky positioned */}
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

/**
 * Main App Component
 * Manages application state and routing
 */
function App() {
  // State management
  const [allProperties] = useState(propertiesData); // All 7 properties from JSON
  const [filteredProperties, setFilteredProperties] = useState(propertiesData); // Currently displayed properties
  const [favorites, setFavorites] = useState([]); // User's favorite properties

  /**
   * Search handler - filters properties based on user criteria
   * Supports filtering by: type, price range, bedrooms, postcode, date range
   * 
   * @param {Object} criteria - Search criteria object
   */
  const handleSearch = (criteria) => {
    let results = allProperties.filter(property => {
      // Filter by property type (house/flat/any)
      if (criteria.type !== 'any' && property.type !== criteria.type) {
        return false;
      }
      
      // Filter by minimum price
      if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) {
        return false;
      }
      
      // Filter by maximum price
      if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) {
        return false;
      }
      
      // Filter by minimum bedrooms
      if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
        return false;
      }
      
      // Filter by maximum bedrooms
      if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
        return false;
      }
      
      // Filter by postcode area
      if (criteria.postcode && !property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())) {
        return false;
      }
      
      // Filter by date from
      if (criteria.dateFrom && property.dateAdded < criteria.dateFrom) {
        return false;
      }
      
      // Filter by date to
      if (criteria.dateTo && property.dateAdded > criteria.dateTo) {
        return false;
      }
      
      return true; // Property matches all criteria
    });

    setFilteredProperties(results);
  };

  /**
   * Add property to favorites
   * Prevents duplicate entries
   * 
   * @param {Object} property - Property object to add
   */
  const handleAddFavorite = (property) => {
    // Only add if not already in favorites
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  /**
   * Remove property from favorites by ID
   * 
   * @param {Number} propertyId - ID of property to remove
   */
  const handleRemoveFavorite = (propertyId) => {
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
  };

  /**
   * Clear all favorites
   */
  const handleClearFavorites = () => {
    setFavorites([]);
  };

  /**
   * Drag and drop handler
   * Adds property to favorites when dragged to favorites zone
   * 
   * @param {Object} event - Drag event object
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    // Check if dropped over favorites zone
    if (over && over.id === 'favorites-dropzone') {
      // Extract property ID from drag item
      const draggedPropertyId = parseInt(active.id.replace('property-', ''));
      const property = allProperties.find(p => p.id === draggedPropertyId);
      
      if (property) {
        handleAddFavorite(property);
      }
    }
  };

  return (
    <Router>
      {/* Drag and drop context for favorites functionality */}
      <DndContext onDragEnd={handleDragEnd}>
        <Routes>
          {/* Main search page route */}
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
          {/* Individual property details route */}
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
