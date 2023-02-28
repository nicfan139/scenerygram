# Scenerygram client

## Installation

1. Clone the top-level `scenerygram` repo to your local machine
2. Navigate to the `/client` directory
3. Run `nvm use` to use this project's version of node, then run install dependencies using `yarn install`
4. Create `.env` file with the following environment variables:

```
  NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
  VITE_CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
  VITE_CLOUDINARY_UPLOAD_PRESET_NAME=<YOUR_CLOUDINARY_UPLOAD_PRESET_NAME>
  VITE_CLOUDINARY_FOLDER=<YOUR_CLOUDINARY_FOLDER>
  VITE_MAPBOX_ACCESS_TOKEN=<YOUR_MAPBOX_ACCESS_TOKEN>
```

5. Start the client using `yarn dev` (ensure the server is running before doing this)
