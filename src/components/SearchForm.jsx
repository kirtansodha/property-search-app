import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function SearchForm({ onSearch }) {
  const [filters, setFilters] = useState({
    type: 'any',
    postcode: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const emptyFilters = {
      type: 'any',
      postcode: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  return (
    <div className="search-container">
      <h2>Search Properties</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Property Type</Form.Label>
              <Form.Select
                name="type"
                value={filters.type}
                onChange={handleChange}
              >
                <option value="any">Any Type</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
                <option value="bungalow">Bungalow</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type="text"
                name="postcode"
                value={filters.postcode}
                onChange={handleChange}
                placeholder="e.g., SW1A"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Min Price (£)</Form.Label>
              <Form.Control
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Min Price"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Max Price (£)</Form.Label>
              <Form.Control
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max Price"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Min Bedrooms</Form.Label>
              <Form.Control
                type="number"
                name="minBedrooms"
                value={filters.minBedrooms}
                onChange={handleChange}
                placeholder="Min bedrooms"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Max Bedrooms</Form.Label>
              <Form.Control
                type="number"
                name="maxBedrooms"
                value={filters.maxBedrooms}
                onChange={handleChange}
                placeholder="Max bedrooms"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Date From</Form.Label>
              <Form.Control
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Date To</Form.Label>
              <Form.Control
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit">
            Search
          </Button>
          <Button variant="secondary" type="button" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SearchForm;
