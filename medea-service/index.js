// // // const express = require('express');
// // // const { Storage } = require('@google-cloud/storage');

// // // // Initialize Express
// // // const app = express();
// // // const port = process.env.PORT || 3002;

// // // // Initialize Google Cloud Storage client with a service account
// // // const storage = new Storage({
// // //   keyFilename: 'service-account.json'
// // // });

// // // // Root endpoint to check if the server is running
// // // app.get('/', (req, res) => {
// // //   res.send('Hello World!');
// // // });

// // // // Endpoint to list all the buckets in the Google Cloud Storage with additional details
// // // app.get('/buckets', async (req, res) => {
// // //   console.log("Attempting to fetch bucket list...");
// // //   try {
// // //     const [buckets] = await storage.getBuckets();
// // //     console.log("Buckets fetched successfully.");

// // //     const bucketDetails = buckets.map(bucket => {
// // //       return {
// // //         name: bucket.name,
// // //         location: bucket.metadata.location,
// // //         createTime: bucket.metadata.timeCreated,
// // //         storageClass: bucket.metadata.storageClass,
// // //         // Add more metadata fields as needed
// // //       };
// // //     });

// // //     res.json(bucketDetails); // Send back an array of bucket details as JSON
// // //   } catch (error) {
// // //     console.error("Error fetching buckets:", error);
// // //     res.status(500).json({ error: `Error fetching buckets: ${error.message}` });
// // //   }
// // // });

// // // // Start the server
// // // app.listen(port, () => {
// // //   console.log(`Server listening at http://localhost:${port}`);
// // // });


// // // const express = require('express');
// // // const { Storage } = require('@google-cloud/storage');
// // // const multer = require('multer'); // Middleware for handling file uploads

// // // // Initialize Express
// // // const app = express();
// // // const port = process.env.PORT || 3002;

// // // // Initialize Google Cloud Storage client with a service account
// // // const storage = new Storage({
// // //   keyFilename: 'service-account.json'
// // // });

// // // // Multer configuration
// // // const upload = multer({ dest: 'uploads/' }); // Destination folder for storing temporary uploads

// // // // Root endpoint to check if the server is running
// // // app.get('/', (req, res) => {
// // //   res.send('Hello World!');
// // // });

// // // // Endpoint to list all the buckets in the Google Cloud Storage
// // // app.get('/buckets', async (req, res) => {
// // //   try {
// // //     const [buckets] = await storage.getBuckets();
// // //     const bucketNames = buckets.map(bucket => bucket.name);
// // //     res.json(bucketNames); // Send back an array of bucket names as JSON
// // //   } catch (error) {
// // //     console.error("Error fetching buckets:", error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // Endpoint to handle file upload
// // // app.post('/upload', upload.single('file'), async (req, res) => {
// // //   try {
// // //     const file = req.file; // Uploaded file
// // //     const bucketName = 'simba-13'; // Specify your bucket name
// // //     const bucket = storage.bucket(bucketName);
// // //     const filename = Date.now() + '_' + file.originalname; // Append timestamp to filename
// // //     const blob = bucket.file(filename);

// // //     // Upload file to Google Cloud Storage
// // //     await blob.save(file.buffer);

// // //     // Provide public URL for accessing the uploaded file
// // //     const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;

// // //     res.json({ message: 'File uploaded successfully', publicUrl });
// // //   } catch (error) {
// // //     console.error("Error uploading file:", error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // Start the server
// // // app.listen(port, () => {
// // //   console.log(`Server listening at http://localhost:${port}`);
// // // });

// // const express = require('express');
// // const { Storage } = require('@google-cloud/storage');
// // const multer = require('multer');
// // const path = require('path');

// // // Initialize Express
// // const app = express();
// // const port = process.env.PORT || 3002;

// // // Initialize Google Cloud Storage client with a service account
// // const storage = new Storage({
// //   keyFilename: 'service-account.json'
// // });

// // // Multer configuration to store files in memory
// // const multerStorage = multer.memoryStorage();
// // const upload = multer({ storage: multerStorage });

// // // Redirect from root to the upload page
// // app.get('/', (req, res) => {
// //   res.redirect('/upload');
// // });

// // // Serve the HTML upload page
// // app.get('/upload', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'upload.html'));
// // });

// // // Endpoint to handle file upload
// // app.post('/upload', upload.single('file'), async (req, res) => {
// //   if (!req.file) {
// //     return res.status(400).json({ error: 'No file uploaded.' });
// //   }

// //   try {
// //     const file = req.file; // Uploaded file
// //     const bucketName = 'simba-13'; // Specify your bucket name
// //     const bucket = storage.bucket(bucketName);
// //     const filename = Date.now() + '_' + file.originalname; // Append timestamp to filename
// //     const blob = bucket.file(filename);

// //     // Create a stream to upload the file to Google Cloud Storage
// //     const blobStream = blob.createWriteStream({
// //       resumable: false,
// //       metadata: {
// //         contentType: file.mimetype,
// //       },
// //     });

// //     blobStream.on('error', (err) => {
// //       console.error('Stream error:', err);
// //       res.status(500).json({ error: err.message });
// //     });

// //     blobStream.on('finish', () => {
// //       // The public URL can be used to directly access the file via HTTP.
// //       const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
// //       res.status(200).json({ message: 'File uploaded successfully', publicUrl });
// //     });

// //     // End the stream
// //     blobStream.end(file.buffer);
// //   } catch (error) {
// //     console.error("Error uploading file:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Endpoint to handle file download
// // app.get('/download/:filename', async (req, res) => {
// //   try {
// //     const filename = req.params.filename; // Get the filename from the URL parameter
// //     const bucketName = 'simba-13'; // Specify your bucket name
// //     const bucket = storage.bucket(bucketName);
// //     const file = bucket.file(filename);

// //     // Check if file exists
// //     const [exists] = await file.exists();
// //     if (!exists) {
// //       return res.status(404).json({ error: 'File not found.' });
// //     }

// //     // Create a stream to download the file from Google Cloud Storage
// //     const readStream = file.createReadStream();

// //     // Set the proper content type and attachment headers
// //     res.attachment(filename);

// //     // Pipe the read stream to the response to start the download
// //     readStream.pipe(res);

// //   } catch (error) {
// //     console.error("Error downloading file:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });



// // // ...

// // // Serve the static files from the "public" directory
// // app.use(express.static('public'));

// // // Endpoint to list all files in the bucket
// // app.get('/list-files', async (req, res) => {
// //   try {
// //     const bucketName = 'simba-13'; // Specify your bucket name
// //     const [files] = await storage.bucket(bucketName).getFiles();
// //     const fileInfos = files.map(file => {
// //       return { name: file.name, publicUrl: `https://storage.googleapis.com/${bucketName}/${file.name}` };
// //     });
// //     res.json(fileInfos);
// //   } catch (error) {
// //     console.error("Error fetching files:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // ...



// // // Start the server
// // app.listen(port, () => {
// //   console.log(`Server listening at http://localhost:${port}`);
// // });



// const express = require('express');
// const { Storage } = require('@google-cloud/storage');
// const multer = require('multer');
// const path = require('path');

// // Initialize Express
// const app = express();
// const port = process.env.PORT || 3002;

// // Initialize Google Cloud Storage client with a service account
// const storage = new Storage({
//   keyFilename: 'service-account.json'
// });

// // Multer configuration to store files in memory
// const multerStorage = multer.memoryStorage();
// const upload = multer({ storage: multerStorage });

// // Serve static files from the "public" directory (if you have any)
// app.use(express.static('public'));

// // Redirect from root to the upload page
// app.get('/', (req, res) => {
//   res.redirect('/upload');
// });

// // Serve the HTML upload page
// app.get('/upload', (req, res) => {
//   res.sendFile(path.join(__dirname, 'upload.html'));
// });

// // Endpoint to handle file upload
// app.post('/upload', upload.single('file'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded.' });
//   }

//   const file = req.file; // Uploaded file
//   const bucketName = 'simba-13'; // Specify your bucket name
//   const bucket = storage.bucket(bucketName);
//   const filename = file.originalname; // Use the original file name

//   try {
//     // Check if the file already exists
//     const [fileExists] = await bucket.file(filename).exists();
//     if (fileExists) {
//       return res.status(409).json({ error: 'A file with the same name already exists.' });
//     }

//     const blob = bucket.file(filename);

//     // Create a stream to upload the file to Google Cloud Storage
//     const blobStream = blob.createWriteStream({
//       resumable: false,
//       metadata: {
//         contentType: file.mimetype,
//       },
//     });

//     blobStream.on('error', (err) => {
//       console.error('Stream error:', err);
//       res.status(500).json({ error: err.message });
//     });

//     blobStream.on('finish', () => {
//       // The public URL can be used to directly access the file via HTTP.
//       const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
//       res.status(200).json({ message: 'File uploaded successfully', publicUrl });
//     });

//     // End the stream
//     blobStream.end(file.buffer);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Endpoint to handle file download
// app.get('/download/:filename', async (req, res) => {
//   try {
//     const filename = req.params.filename; // Get the filename from the URL parameter
//     const bucketName = 'simba-13'; // Specify your bucket name
//     const bucket = storage.bucket(bucketName);
//     const file = bucket.file(filename);

//     // Check if file exists
//     const [exists] = await file.exists();
//     if (!exists) {
//       return res.status(404).json({ error: 'File not found.' });
//     }

//     // Create a stream to download the file from Google Cloud Storage
//     const readStream = file.createReadStream();

//     // Set the proper content type
//     const [metadata] = await file.getMetadata();
//     res.set('Content-Type', metadata.contentType);

//     // Set the proper content disposition including the filename
//     res.set('Content-Disposition', 'attachment; filename="' + filename + '"');

//     // Pipe the read stream to the response to start the download
//     readStream.pipe(res);

//   } catch (error) {
//     console.error("Error downloading file:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Endpoint to list all files in the bucket
// app.get('/list-files', async (req, res) => {
//   try {
//     const bucketName = 'simba-13'; // Specify your bucket name
//     const [files] = await storage.bucket(bucketName).getFiles();
//     const fileInfos = files.map(file => {
//       return { name: file.name };
//     });
//     res.json(fileInfos);
//   } catch (error) {
//     console.error("Error fetching files:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });




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
