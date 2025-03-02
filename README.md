# PhotoScout

PhotoScout is a modern web application built with Next.js that allows users to explore and discover high-quality photos from multiple sources (Unsplash, Pexels, PixaBay etc.). It provides a seamless interface for browsing, searching, and downloading beautiful images.

## Features

- Browse through a curated collection of high-quality photos
- Search functionality to find specific images
- Responsive design for optimal viewing on all devices
- Fast image loading and optimization
- Built with Next.js 15 and modern web technologies

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/photoscout.git
```
2. Install dependencies:
```bash
cd photoscout

npm install
# or
yarn install
# or
pnpm install
```
3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open http://localhost:3000 with your browser to see the application.

### Tech Stack
- Next.js - React framework for production
- ShadCn UI Library
- Tailwind CSS - For styling
- Unsplash API, Pexels API, PixaBay API - Photo service integration

## Project Structure
```plaintext
/src                    # Next.js app directory
  /app                  # Pages
  /components           # UI and page components
  /context              # For passing the parameters
  /helpers              # API functionalities
  /lib                  # utils.js
```

### Development
You can start editing the page by modifying app/page.js . The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a custom font family.

### Deployment
The easiest way to deploy your Next.js app is to use the Vercel Platform .

Check out the Next.js deployment documentation for more details.

### License
This project is licensed under the MIT License - see the LICENSE file for details.