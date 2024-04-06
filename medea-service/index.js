
const express = require('express');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const path = require('path');

// Initialize Express
const app = express();
const port = process.env.PORT || 3002;

// Initialize Google Cloud Storage client with a service account
const storage = new Storage({
  keyFilename: 'service-account.json'
});

// Multer configuration to store files in memory
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Serve static files from the "public" directory (if you have any)
app.use(express.static('public'));

// Redirect from root to the upload page
app.get('/', (req, res) => {
  res.redirect('/upload');
});

// Serve the HTML upload page
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

// Endpoint to handle file upload and optional overwrite
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const file = req.file; // Uploaded file
  const bucketName = 'simba-13'; // Specify your bucket name
  const bucket = storage.bucket(bucketName);
  const filename = file.originalname; // Use the original file name

  try {
    // Check if the file already exists
    const blob = bucket.file(filename);
    const [fileExists] = await blob.exists();

    // If file exists and overwrite is not confirmed, return conflict error
    if (fileExists && req.body.overwrite !== 'true') {
      return res.status(409).send('A file with the same name already exists.');
    }

    // If file exists and overwrite is confirmed, delete the old file first
    if (fileExists) {
      await blob.delete();
    }

    // Create a stream to upload the file to Google Cloud Storage
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).send(err.message);
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
      res.status(200).send('File uploaded successfully: ' + publicUrl);
    });

    // End the stream
    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send(error.message);
  }
});

// Endpoint to handle file download
app.get('/download/:filename', async (req, res) => {
  const filename = req.params.filename;
  const bucketName = 'simba-13';
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(filename);

  try {
    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).send('File not found.');
    }

    const [metadata] = await file.getMetadata();
    res.set('Content-Type', metadata.contentType);
    res.set('Content-Disposition', `attachment; filename="${filename}"`);

    const readStream = file.createReadStream();
    readStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send(error.message);
  }
});

// Endpoint to delete a file
app.get('/delete/:filename', async (req, res) => {
  const filename = req.params.filename;
  const bucket = storage.bucket('simba-13');
  const file = bucket.file(filename);

  try {
    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).send('File not found.');
    }
    await file.delete();
    res.send('File deleted successfully.');
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send(error.message);
  }
});

// Endpoint to list all files in the bucket
app.get('/list-files', async (req, res) => {
  const bucketName = 'simba-13';
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    const fileInfos = files.map(file => ({ name: file.name }));
    res.json(fileInfos);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
