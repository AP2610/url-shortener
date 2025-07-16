# Shortly - URL Shortening Service

A modern, feature-rich URL shortening service built with Next.js 15, featuring a beautiful animated UI and comprehensive link management capabilities. The main goal of this project was to learn Prisma, and to create some cool animations. This is **not** intended to be an actual tool used by the public, its more to play around with different technologies and learn.

Try it out: https://url-shortener-ap2610.vercel.app/

## �� Features

### Core Functionality
- **URL Shortening**: Convert long URLs into short links
- **Custom Expiry Dates**: Set expiration dates for your shortened links (optional, defaults to one year)
- **Admin Dashboard**: View statistics for shortened URLs (per user basis is being implemented along with authentication)

### User Experience
- **Beautiful Animations**: Smooth, modern UI with motion animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Error Handling**: Error messages and validation

### Technical Features
- **URL Validation**: Input sanitization and validation
- **Database Integration**: PrismaPostgres using Vercel integration
- **Server Actions and Functions**: Next.js server-side form handling

## 🛠️ Tech Stack

### Frontend
- Next.js 15 - App router
- React 19
- TypeScript
- Tailwind CSS 4
- Motion/Framer-motion
- React Icons
- React DatePicker

### Backend & Database
- PrismaPostgres
- Prisma Accelerate
- Next.js API Routes
- Next.js middleware
- Nanoid for short-code generation

### Authentication & Security
- Clerk - Authentication service (currently being implemented)

### Architecture

#### **SSR and SSG with App Router**
- Admin dashboard renders server-side for up-to-date data, homepage is statically generated
- **Server Actions**: Form handling for url-submission
- **API Routes**: For redirects and authentication
- **Middleware**: Request interception for authentication and shortcode routing

#### **State Management**
- **Zustand**: Used for animations

#### **Data Flow**
1. **URL Creation**: Form → Server Action → Database → Response
2. **URL Redirect**: Short URL → Middleware → API Route → Database → Redirect
3. **Admin Dashboard**: Protected Route (currently being implemented) → Server Component → Database → Table

#### **Security & Performance**
- **Authentication**: Clerk integration for user management (currently being implemented)
- **Input Validation**: Server-side sanitization
- **Database**: Prisma Accelerate for connection pooling

## 🔧 Getting Started

Running this locally is not very straightforward as you will need your own development database that is created using Vercel. If you want to, you'll have to go through those setup steps. The same goes with Auth, it will require the creation of a Clerk account (auth is still being implemented). If you just want to go through the code in your own IDE, feel free to clone it and use the production URl to check out how everything comes together.

### Prerequisites
- Node.js 20+ 
- PrismaPostgres set up with Vercel
- Clerk account (for authentication)

## 🗄️ Database Setup

### **Vercel Prisma Postgres Required**
This project uses Vercel's Prisma Postgres integration. You'll need to:

1. **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Create New Project**: Set up a new Vercel project
3. **Add Prisma Postgres**: In Vercel dashboard → Storage → Create Database → Postgres
4. **Enable Prisma Integration**: Vercel will provide connection strings
5. **Set Environment Variables**: Use the development database URL in `.env.local`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   DATABASE_URL="from_vercel"
   BASE_URL=http://localhost:3000
   CLERK_SECRET_KEY="your_clerk_secret_key"
   CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


## 🔐 Authentication Status

**Currently in Development**: Authentication is being implemented using Clerk. The login and registration pages are currently placeholders and will be fully functional once the Clerk integration is complete.

### Planned Authentication Features
- User registration and login (currently just placeholders)
- Protected routes for user-specific features
- Admin dashboard (currently open, but will be protected)
- User-specific URL list

## Known Issues & TODOs

- Authentication system is currently being implemented
- Admin panel authentication guard needs to be added
- Rate limiting is yet to be implemented
- Password show/hide button currently has a bug

