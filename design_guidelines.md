# Design Guidelines: Redweyne Portfolio

## Design Approach
**Reference-Based Creative Portfolio** - Drawing inspiration from award-winning developer portfolios (Bruno Simon, Lynn Fisher, Stripe Press) combined with modern SaaS landing pages. This portfolio will be immersive, highly interactive, and showcase technical sophistication while maintaining elegance.

## Typography System
- **Display**: Inter or Sora (900 weight) for large hero text and section headers
- **Headings**: Inter (700) for project titles and subsection headers  
- **Body**: Inter (400-500) for descriptions and content
- **Code/Technical**: JetBrains Mono for any code snippets or technical details

Hierarchy: Hero text (5xl-8xl), Section headers (3xl-5xl), Project titles (2xl-3xl), Body (base-lg)

## Layout & Spacing System
**Tailwind spacing units: 4, 8, 12, 16, 20, 24, 32**
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component spacing: gap-8 to gap-12 for grids
- Container: max-w-7xl with px-4 to px-8
- Content blocks: max-w-4xl for readable text

## Page Structure & Sections

### 1. Hero Section (Full viewport impact)
**Layout**: Asymmetric split - Large animated text on left (60%), abstract 3D visual element on right (40%)
- Massive headline: "Redweyne" with animated gradient shimmer effect
- Subheading: "Crafting Exceptional Digital Experiences" 
- Scroll indicator with smooth animation
- Large hero visual: Abstract 3D geometric composition or animated mesh gradient (placeholder for WebGL/Three.js implementation)
- Floating navigation: Fixed header with blur backdrop, minimal design

### 2. Featured Work Section
**Layout**: Alternating project showcases (staggered diagonal layout)

**Project Card Structure** (each project gets full section):
- Large mockup image: Browser window with live screenshot of InboxAI/TempMail
- Bento-box style info panel alongside: Project name (large), tech stack badges, key features (3-4 bullet points), live demo button + GitHub link
- Hover: Subtle lift effect with enhanced mockup preview

InboxAI Card: Lead with messaging/inbox interface screenshot, emphasize AI-powered features
TempMail Card: Show temporary email interface, highlight privacy/security aspects

### 3. Skills & Expertise Section  
**Layout**: Multi-column badge cloud (3-4 columns desktop, 1 mobile)
- Floating skill cards in masonry grid: React, Next.js, TypeScript, Tailwind, AI/ML, API Development, etc.
- Each card: Icon (from Heroicons) + skill name + proficiency indicator (animated progress bar or star rating)
- Staggered reveal animation on scroll

### 4. About Section
**Layout**: Two-column (image + content)
- Professional headshot or creative avatar illustration (left column, 40%)
- Bio content (right column, 60%): Personal introduction, passion for web development, what drives the work
- Include link to resume/CV
- Stats row below: Years of experience, Projects completed, Technologies mastered

### 5. Contact Section
**Layout**: Centered content with split form
- Large heading: "Let's Build Something Together"
- Two-column layout: Contact form (name, email, message) on left | Social links + availability status on right
- Form buttons with blur backdrop treatment
- Social icons: GitHub, LinkedIn, Twitter/X, Email (Heroicons)
- Response time indicator: "Usually responds within 24 hours"

### 6. Footer
Minimal design with:
- Copyright notice
- Quick links: Home, Work, About, Contact
- Back to top button (smooth scroll)
- "Made with [technologies used]" credit line

## Component Specifications

### Navigation
Fixed header with blur backdrop (backdrop-blur-lg)
- Logo/Name (left): "Redweyne" in bold display font
- Menu items (right): Work, About, Contact
- Mobile: Hamburger menu with slide-in overlay

### Project Cards
- Glass-morphism treatment: semi-transparent backdrop, subtle border
- Mockup images: Tilted perspective (3D transform), shadow depth
- Tech badges: Small rounded pills with subtle backdrop
- Buttons: Primary CTA for live demo, secondary for code

### Skill Badges
- Rounded rectangles with generous padding (p-4 to p-6)
- Icon + text horizontal layout
- Hover: Gentle scale and lift effect

### Form Elements
- Large input fields with clear labels
- Focus states: Visible border accent
- Submit button: Prominent, full-width on mobile
- Validation feedback: Inline error messages

## Images & Visual Assets

### Required Images
1. **Hero Visual**: Abstract 3D composition - geometric shapes, gradient mesh, or particle system (1920x1080)
2. **InboxAI Screenshot**: Clean browser mockup showing dashboard/inbox interface (1600x1000)
3. **TempMail Screenshot**: Browser mockup of temporary email generator interface (1600x1000)
4. **Profile Photo**: Professional headshot or creative avatar (800x800 square)

### Icon Library
**Heroicons** (outline style) via CDN for all UI icons: navigation, skills, social links, contact methods

## Interaction Patterns
- Smooth scroll behavior across all anchor links
- Parallax effect: Hero elements move at different speeds on scroll
- Scroll-triggered animations: Fade-up for sections, stagger for grids
- Hover states: Scale (1.02-1.05), lift (shadow increase), shimmer effect on buttons
- Cursor: Custom cursor that responds to interactive elements (optional enhancement)

## Responsive Behavior
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hero: Stack vertically on mobile, side-by-side on lg+
- Projects: Single column on mobile/tablet, alternating on desktop
- Skills grid: 1 column mobile, 2 columns tablet, 3-4 columns desktop
- About section: Stack on mobile, side-by-side on md+

## Performance Considerations
- Lazy load project images below fold
- Optimize hero visual for fast initial paint
- Preload critical fonts
- Compress all images to WebP format
- Implement intersection observer for scroll animations

This portfolio will position Redweyne as a cutting-edge developer with exceptional design sensibility and technical prowess. Every interaction should feel polished and intentional.