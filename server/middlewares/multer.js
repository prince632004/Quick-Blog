// ============================================================
// multer.js - File Upload Middleware Configuration
// ============================================================
// Configures Multer to handle multipart/form-data file uploads.
// Uses diskStorage with an empty config, which stores files in
// the OS temporary directory automatically. The file is then
// read and uploaded to ImageKit CDN in the blog controller.
// This middleware is applied only to the POST /api/blog/add route.
// ============================================================

import multer from "multer";

// Use disk storage so the file is accessible via req.file.path
const upload = multer({ storage: multer.diskStorage({}) });

export default upload;
