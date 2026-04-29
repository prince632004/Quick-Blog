// ============================================================
// imageKit.js - ImageKit CDN Configuration
// ============================================================
// This file initializes and exports the ImageKit client used
// for uploading and serving blog thumbnail images.
// ImageKit provides image optimization features like automatic
// format conversion (WebP), quality adjustment, and resizing.
// All credentials are loaded from environment variables for security.
// ============================================================

import ImageKit from "imagekit";

// Create an ImageKit instance with credentials from environment variables
const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,    // Public key for client-side uploads
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,  // Private key for server-side authentication
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // Base URL for serving images via CDN
});

export default imageKit;
