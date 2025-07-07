import React from 'react';
import { Card, Row, Col, ProgressBar, Button } from 'react-bootstrap';

function DamageAnalysisCard({ imageName, date, damagePercent, area, location, onView }) {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Row>
          <Col md={8}>
            <h5 className="text-primary mb-2">{imageName}</h5>
            <p className="mb-1"><strong>Date:</strong> {date}</p>
            {location && <p className="mb-1"><strong>Location:</strong> {location}</p>}
            <p className="mb-1"><strong>Area Damaged:</strong> {area}</p>

            <div className="mt-3">
              <p className="mb-1"><strong>Damage Percentage:</strong></p>
              <ProgressBar
                now={damagePercent}
                label={`${damagePercent}%`}
                variant={damagePercent > 60 ? 'danger' : damagePercent > 30 ? 'warning' : 'success'}
              />
            </div>
          </Col>

          <Col md={4} className="d-flex align-items-center justify-content-end">
            <Button variant="outline-primary" onClick={onView}>
              View Full Report
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default function DemageAnalysis(){
    return <DamageAnalysisCard
    imageName="flood_zone_7.jpg"
    date="2025-07-07"
    damagePercent={42}
    area="1,240 m²"
    location="Karachi, Pakistan"
    onView={() => alert("Redirect to report")}
  />
  
};