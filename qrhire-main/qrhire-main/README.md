# QR Scan Hire - Job Application System

A simple job application system where candidates can apply by scanning a QR code. Perfect for small-scale hiring (10-15 users) without requiring a database.

## Features

- 📱 **QR Code Application System**: Display QR codes in your store - candidates scan with their phone camera to apply
- 📝 **Simple Application Form**: Name, contact preference (email/phone), and experience
- 👨‍💼 **Admin Panel**: Generate QR codes and view all applicants
- 💾 **Local Storage**: No database needed - uses browser localStorage
- 🎨 **Modern UI**: Beautiful, responsive design

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## Usage

### How It Works

1. **Admin generates a QR code** for a job posting in the Admin Panel
2. **QR code is displayed** in your store, on a job board, or anywhere visible
3. **Candidates scan the QR code** with their phone's camera (no app needed!)
4. **They're taken to the application form** automatically
5. **They fill out and submit** their application
6. **Admin views applications** in the Admin Panel

### For Admins

1. Navigate to the **Admin Panel**
2. **Generate QR Codes**: 
   - Click on "Generate QR Code" tab
   - Enter your app's base URL (e.g., `https://yourdomain.com` or `http://localhost:3000` for testing)
   - Enter a job identifier (e.g., "JOB-001", "Cashier-Position")
   - Click "Generate QR Code"
   - Download the QR code image
3. **Display the QR code** in your store, on posters, or job boards
4. **View Applicants**: 
   - Click on "View Applicants" tab to see all applications
   - Use the search bar to filter applicants
   - Delete individual applications or clear all

### For Candidates

1. **See a QR code** displayed in the store
2. **Open your phone's camera app** and point it at the QR code
3. **Tap the notification** that appears (or scan with a QR scanner app)
4. **You'll be taken to the application form** automatically
5. **Fill out the form** with your name, contact info, and experience
6. **Submit your application**

## Project Structure

```
qr-scan-hire/
├── src/
│   ├── components/
│   │   ├── ApplicationPage.jsx  # Application page (landing page)
│   │   ├── ApplicationForm.jsx  # Job application form
│   │   ├── AdminPanel.jsx       # Admin dashboard
│   │   └── QRGenerator.jsx      # QR code generator for jobs
│   ├── utils/
│   │   └── storage.js           # LocalStorage utilities
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── package.json
└── vite.config.js
```

## Technologies

- React 18
- React Router
- Vite
- qrcode.react (QR code generation)
- LocalStorage (data persistence)

## Notes

- **No app installation needed**: Candidates use their phone's built-in camera to scan QR codes
- **Data storage**: Data is stored in browser localStorage, so it's specific to each browser/device
- **Production deployment**: Make sure to update the base URL in the QR generator when deploying to production
- **For multiple admins**: Consider implementing a backend API if you need shared data across devices
- **Mobile-friendly**: The application form is fully responsive and works great on mobile devices
- **Admin Password**: The default admin password is `admin123`. Change it in `src/components/AdminLogin.jsx` (line 12) for security
- **Admin Access**: The admin panel is password-protected and the admin link is hidden from the application pages

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to Vercel

This app is ready to deploy on Vercel! Here's how:

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub (Recommended)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Vite project
6. Click "Deploy" - no configuration needed!

### After Deployment

1. **Update QR Generator Base URL**: 
   - The QR generator automatically uses `window.location.origin`, so it will use your Vercel URL automatically
   - However, if you want to use a custom domain, update the base URL in the QR generator after deployment

2. **Change Admin Password**: 
   - Don't forget to change the default admin password in `src/components/AdminLogin.jsx` before deploying to production!

3. **Your app will be live at**: `https://your-project-name.vercel.app`

### Important Notes for Vercel

- ✅ The `vercel.json` file is already configured for SPA routing
- ✅ Build command is automatically detected (`npm run build`)
- ✅ Output directory is automatically detected (`dist`)
- ✅ QR codes will automatically use your Vercel URL when generated
- ⚠️ Remember: Data is stored in localStorage, so it's per-browser/device (not shared across users)

