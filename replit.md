# Redweyne Portfolio

## Overview

This is a personal portfolio website for Redweyne, a creative developer showcasing digital experiences. The application is built as a modern single-page application (SPA) featuring sections for hero presentation, featured work (InboxAI and TempMail projects), skills, about, and contact functionality. The site emphasizes visual design with animations, parallax effects, and a polished UI using the shadcn/ui component library.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter-based client-side routing with a simple structure (Home page and 404 Not Found page).

**State Management**: React Query (@tanstack/react-query) for server state management, with queries configured for minimal refetching (no window focus refetch, infinite stale time).

**UI Framework**: shadcn/ui component library (New York style variant) built on Radix UI primitives, with Tailwind CSS for styling. The design system includes custom color tokens, spacing, and typography using CSS variables for theming support.

**Design Philosophy**: Reference-based creative portfolio drawing inspiration from award-winning developer portfolios. Features asymmetric layouts, staggered animations, parallax scrolling effects, and gradient animations. Typography uses Inter font family with weights from 400-900, and JetBrains Mono for code snippets.

**Component Structure**:
- Navigation: Fixed header with blur backdrop effect
- Hero: Full viewport section with animated gradient text and parallax 3D visual
- Featured Work: Alternating project showcases with mockup images and bento-box info panels
- Skills: Multi-column masonry grid with floating skill cards
- About: Two-column layout with professional headshot and bio
- Contact: Form with validation using react-hook-form and zod
- Footer: Multi-column footer with quick links and social connections

**Animations**: Custom scroll-based animations using Intersection Observer API for fade-in effects, plus parallax scrolling for hero visual element.

### Backend Architecture

**Server Framework**: Express.js with TypeScript, running in ESM mode.

**Development vs Production**: Separate entry points (index-dev.ts and index-prod.ts). Development mode integrates Vite middleware for HMR and hot reloading. Production mode serves pre-built static assets from dist/public.

**API Endpoints**:
- POST /api/contact - Submit contact form messages
- GET /api/contact - Retrieve all contact messages

**Data Validation**: Zod schemas defined in shared/schema.ts for request validation, integrated with Drizzle ORM schema definitions.

**Storage Layer**: Abstracted through IStorage interface with in-memory implementation (MemStorage) for development. The architecture supports swapping to database-backed storage (PostgreSQL via Drizzle ORM) without changing route handlers.

**Logging**: Custom request/response logging middleware tracking API endpoint performance and response times.

### Database Schema (Prepared for PostgreSQL)

**ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach.

**Tables**:
- `users`: Basic user authentication table (id, username, password)
- `contact_messages`: Stores contact form submissions (id, name, email, message, createdAt)

**Schema Location**: Centralized in shared/schema.ts with TypeScript types generated via drizzle-zod integration.

**Migration Strategy**: Drizzle Kit configured to output migrations to ./migrations directory with push command for schema synchronization.

### External Dependencies

**UI Component Libraries**:
- @radix-ui/* - Headless UI primitives for accessible components
- shadcn/ui - Pre-built component system using Radix primitives
- class-variance-authority - Component variant management
- tailwindcss - Utility-first CSS framework

**Database & ORM**:
- drizzle-orm - TypeScript ORM
- @neondatabase/serverless - Neon PostgreSQL serverless driver
- drizzle-zod - Zod schema generation from Drizzle schemas

**Form Management**:
- react-hook-form - Form state and validation
- @hookform/resolvers - Zod resolver integration
- zod - Schema validation

**Data Fetching**:
- @tanstack/react-query - Server state management and caching

**Routing**:
- wouter - Lightweight client-side routing

**Build Tools**:
- vite - Frontend build tool and dev server
- esbuild - Backend bundling for production
- tsx - TypeScript execution for development

**Development Tools**:
- Development error overlay for better debugging
- Code navigation and cartography tools
- Development environment banner

**Fonts**:
- Google Fonts: Inter (400, 500, 700, 900) for UI text
- Google Fonts: JetBrains Mono (400, 500) for code/technical content

**Asset Management**: Images stored in attached_assets/generated_images directory, aliased as @assets in Vite configuration.

**Session Management**: connect-pg-simple configured for PostgreSQL-backed sessions (currently unused but available).