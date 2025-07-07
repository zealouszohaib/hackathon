import React from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h3 className="mb-4 fw-bold text-primary">Disaster Detection Dashboard</h3>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h5>Total Images</h5>
              <h2 className="text-primary">124</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h5>Total Area Damaged</h5>
              <h2 className="text-danger">3420 m²</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h5>Recent Detections</h5>
              <h2 className="text-warning">8</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <h5>Reports Generated</h5>
              <h2 className="text-success">27</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Chart + Upload Shortcut */}
      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Damage Trend (Placeholder)</h5>
              <div
                style={{
                  height: '250px',
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#888',
                }}
              >
                [ Chart.js or Recharts goes here ]
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center h-100">
              <h5 className="text-center mb-3">Upload New Image</h5>
              <Button variant="primary" href="/upload">Go to Upload</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Uploads */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Recent Uploads</h5>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Damage %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>flood_area_1.jpg</td>
                    <td>2025-07-07</td>
                    <td><span className="text-success">Processed</span></td>
                    <td>38%</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>earthquake_zone_3.png</td>
                    <td>2025-07-06</td>
                    <td><span className="text-warning">Pending</span></td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>storm_zone.jpg</td>
                    <td>2025-07-05</td>
                    <td><span className="text-success">Processed</span></td>
                    <td>61%</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
