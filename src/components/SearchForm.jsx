import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

/**
 * SearchForm Component
 * Provides search interface with 5 criteria:
 * - Property type (house/flat/any)
 * - Price range (min/max)
 * - Bedrooms (min/max)
 * - Postcode area
 * - Date range (from/to)
 * 
 * Uses React Bootstrap components for consistent UI
 * 
 * @param {Function} onSearch - Callback function to handle search submission
 */
function SearchForm({ onSearch }) {

  const [criteria, setCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateFrom: '',
    dateTo: ''
  });

  const handleChange = (e) => {
    setCriteria({
      ...criteria,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  
    // Validate postcode before submitting
    if (criteria.postcode && !validatePostcode(criteria.postcode)) {
      alert('Invalid postcode format. Please use only letters and numbers.');
      return;
    }
  
  // Sanitize all inputs before searching
  const sanitizedCriteria = sanitizeSearchCriteria(criteria);
  onSearch(sanitizedCriteria);
};


  const handleReset = () => {
    setCriteria({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateFrom: '',
      dateTo: ''
    });
    onSearch({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  return (
    <div className="search-container">
      <h2>Search Properties</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Property Type</Form.Label>
              <Form.Select 
                name="type"
                value={criteria.type}
                onChange={handleChange}
              >
                <option value="any">Any</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Postcode Area</Form.Label>
              <Form.Control
                type="text"
                name="postcode"
                placeholder="e.g. BR1, NW1"
                value={criteria.postcode}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Min Price (£)</Form.Label>
              <Form.Control
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={criteria.minPrice}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Max Price (£)</Form.Label>
              <Form.Control
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={criteria.maxPrice}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Min Bedrooms</Form.Label>
              <Form.Control
                type="number"
                name="minBedrooms"
                placeholder="Min Bedrooms"
                value={criteria.minBedrooms}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Max Bedrooms</Form.Label>
              <Form.Control
                type="number"
                name="maxBedrooms"
                placeholder="Max Bedrooms"
                value={criteria.maxBedrooms}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Date Added From</Form.Label>
              <Form.Control
                type="date"
                name="dateFrom"
                value={criteria.dateFrom}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Date Added To</Form.Label>
              <Form.Control
                type="date"
                name="dateTo"
                value={criteria.dateTo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="me-2">
          Search
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Form>
    </div>
  );
}

export default SearchForm;
