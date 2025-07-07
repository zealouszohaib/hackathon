import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

import axios from 'axios';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [segmentedImage, setSegmentedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setSegmentedImage(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return Swal.fire({
        icon: 'warning',
        title: 'No image selected',
        text: 'Please select an image before uploading.',
      });
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await axios.post('http://localhost:3000/api/v1/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      // ✅ Example success popup
      Swal.fire({
        icon: 'success',
        title: 'Upload successful',
        text: 'Image uploaded and processed successfully!',
        timer: 2000,
        showConfirmButton: false,
      });
  
      // setSegmentedImage(response.data.segmentedImageUrl); // uncomment when backend is ready
  
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Upload failed',
        text: error.response?.data?.message || 'Something went wrong while uploading.',
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Card className="shadow-sm p-4 bg-white">
      <h4 className="mb-4 text-primary">Upload & View Segmentation</h4>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select a disaster image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

        <Button variant="primary" disabled={!selectedFile || loading} onClick={handleUpload}>
          {loading ? <Spinner size="sm" animation="border" /> : 'Upload & Analyze'}
        </Button>
      </Form>

      <Row className="mt-4">
        {preview && (
          <Col md={6}>
            <h6>Original Image</h6>
            <img src={preview} className="img-fluid border rounded" alt="Original" />
          </Col>
        )}

        {segmentedImage && (
          <Col md={6}>
            <h6>Segmented Output</h6>
            <img src={segmentedImage} className="img-fluid border rounded" alt="Segmented" />
          </Col>
        )}
      </Row>
    </Card>
  );
}

export default Upload;
