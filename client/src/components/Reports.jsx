import React from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';

function Reports() {
  // Static mock data
  const report = {
    id: 1,
    imageName: 'flood_area_7.jpg',
    originalImage: '/images/original.jpg',
    segmentedImage: '/images/segmented.jpg',
    date: '2025-07-07',
    location: 'Swat Valley, Pakistan',
    damagePercent: 62,
    area: '1,420 m²',
    description: 'Flood damaged the eastern section of the valley affecting infrastructure and crops.',
  };

  return (
    <Card className="shadow-sm p-4">
      <h4 className="mb-3 text-primary">Damage Report</h4>

      <Row>
        <Col md={6}>
          <p><strong>Report ID:</strong> #{report.id}</p>
          <p><strong>Date:</strong> {report.date}</p>
          <p><strong>Location:</strong> {report.location}</p>
          <p><strong>Image:</strong> {report.imageName}</p>
          <p><strong>Area Damaged:</strong> {report.area}</p>
          <p>
            <strong>Damage:</strong>{' '}
            <Badge bg={
              report.damagePercent > 70 ? 'danger' :
              report.damagePercent > 40 ? 'warning' : 'success'
            }>
              {report.damagePercent}%
            </Badge>
          </p>
        </Col>

        <Col md={6}>
          <p><strong>Description:</strong></p>
          <p className="text-muted">{report.description}</p>
        </Col>
      </Row>

      <hr className="my-4" />

      <Row className="mb-4">
        <Col md={6}>
          <h6>Original Image</h6>
          <img src={report.originalImage} alt="Original" className="img-fluid rounded border" />
        </Col>
        <Col md={6}>
          <h6>Segmented Output</h6>
          <img src={report.segmentedImage} alt="Segmented" className="img-fluid rounded border" />
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-3">
        <Button variant="outline-primary" onClick={() => alert('Downloading...')}>Download Report</Button>
        <Button variant="outline-secondary" onClick={() => window.print()}>Print</Button>
      </div>
    </Card>
  );
}

export default Reports;
