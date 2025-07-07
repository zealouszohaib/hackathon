const multer = require('multer');
const path = require('path');
const AdmZip = require('adm-zip');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit for zip
});

// Single zip file upload endpoint
const uploadFile = async (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
      // Check if uploaded file is a zip
      if (path.extname(req.file.originalname).toLowerCase() !== '.zip') {
        return res.status(400).json({ error: 'Uploaded file must be a zip archive.' });
      }
      // Extract zip
      const zipPath = path.join(__dirname, '..', req.file.path);
      const extractPath = path.join(__dirname, '..', 'upload', path.parse(req.file.filename).name);
      if (!fs.existsSync(extractPath)) {
        fs.mkdirSync(extractPath);
      }
      const zip = new AdmZip(zipPath);
      zip.extractAllTo(extractPath, true);
      // List extracted files
      const extractedFiles = fs.readdirSync(extractPath).filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
      res.json({
        message: 'Zip uploaded and images extracted successfully',
        extractedFiles: extractedFiles.map(f => path.join('upload', path.parse(req.file.filename).name, f)),
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error processing zip or extracting images' });
    }
  });
};

exports.uploadFile = uploadFile;
