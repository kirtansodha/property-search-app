import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Badge } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-tabs/style/react-tabs.css";

function PropertyDetails({ properties }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return (
      <Container className="mt-4 text-center">
        <h2>Property not found</h2>
        <Button onClick={() => navigate("/")}>Back to Search</Button>
      </Container>
    );
  }

  const galleryImages = property.images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <Button
          variant="secondary"
          onClick={() => navigate("/")}
          className="mb-3"
        >
          ← Back to Search
        </Button>

        <h1>{property.title}</h1>
        <h3 className="text-primary">£{property.price.toLocaleString()}</h3>

        <Row className="mb-3">
          <Col>
            <Badge bg="info" className="me-2">
              {property.type}
            </Badge>
            <Badge bg="secondary" className="me-2">
              {property.bedrooms} bedrooms
            </Badge>
            <Badge bg="success">{property.postcode}</Badge>
          </Col>
        </Row>

        <div className="mb-4">
          <ImageGallery
            items={galleryImages}
            showPlayButton={false}
            showFullscreenButton={true}
            showThumbnails={true}
            thumbnailPosition="bottom"
          />
        </div>

        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Map</Tab>
          </TabList>

          <TabPanel>
            <div className="p-3">
              <h4>Property Description</h4>
              <p>{property.longDescription}</p>
              <h5>Details</h5>
              <ul>
                <li>
                  <strong>Location:</strong> {property.location}
                </li>
                <li>
                  <strong>Type:</strong> {property.type}
                </li>
                <li>
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </li>
                <li>
                  <strong>Price:</strong> £{property.price.toLocaleString()}
                </li>
                <li>
                  <strong>Date Added:</strong> {property.dateAdded}
                </li>
              </ul>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="p-3 text-center">
              <h4>Floor Plan</h4>
              <img
                src={property.floorPlan}
                alt="Floor Plan"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="p-3">
              <h4>Location Map</h4>
              <iframe
                title="Property Location"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                  property.location
                )}`}
              ></iframe>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default PropertyDetails;
