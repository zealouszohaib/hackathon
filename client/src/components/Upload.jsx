import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import JSZip from 'jszip';

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [segmentedImage, setSegmentedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostDamagedImage, setMostDamagedImage] = useState(null);
  const [previewMap, setPreviewMap] = useState({});

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const map = {};
    files.forEach(file => {
      map[file.name] = URL.createObjectURL(file);
    });
    setPreviewMap(map);
    setPreview(files.map(file => URL.createObjectURL(file)));
    setSegmentedImage(null);
    setMostDamagedImage(null);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      return Swal.fire({
        icon: 'warning',
        title: 'No images selected',
        text: 'Please select images before uploading.',
      });
    }
    setLoading(true);
    try {
      const zip = new JSZip();
      selectedFiles.forEach((file, idx) => {
        zip.file(file.name, file);
      });
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const formData = new FormData();
      formData.append('zip_file', zipBlob, 'images.zip');
      const response = await axios.post('http://34.93.86.68:8050/analyze/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data);
      setMostDamagedImage({
        ...response.data.message,
        localUrl: previewMap[response.data.message.image_name]
      });
      setPreview([]);
      Swal.fire({
        icon: 'success',
        title: 'Upload successful',
        text: 'Images uploaded and processed successfully!',
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
          <Form.Label>Select disaster images (up to 3)</Form.Label>
          <Form.Control type="file" accept="image/*" multiple onChange={handleImageChange} />
        </Form.Group>

        <Button variant="primary" disabled={!selectedFiles.length || loading} onClick={handleUpload}>
          {loading ? <Spinner size="sm" animation="border" /> : 'Upload & Analyze'}
        </Button>
      </Form>

      <Row className="mt-4">
        {mostDamagedImage ? (
          <Col md={6}>
            <h6>Most Damaged Image</h6>
            <img
              src={mostDamagedImage.localUrl}
              className="img-fluid border rounded"
              alt={mostDamagedImage.image_name}
            />
            <div className="mt-2">
              <strong>Damage Score:</strong> {mostDamagedImage.damage_score}
              <br />
              <strong>Justification:</strong> {mostDamagedImage.justification}
            </div>
          </Col>
        ) : (
          preview && preview.map((src, idx) => (
            <Col md={4} key={idx}>
              <h6>Original Image {idx + 1}</h6>
              <img src={src} className="img-fluid border rounded" alt={`Original ${idx + 1}`} />
            </Col>
          ))
        )}
      </Row>
    </Card>
  );
}

export default Upload;
