# Portfolio 2026 - ShivansH

Hey! Welcome to the repo. This is my personal portfolio website, built to showcase my projects (ChargeBrize, RoadSathi, etc.) with a premium, high-performance feel.

The core idea was to make it immersive—that's why you'll see a lot of scroll-linked animations ("scrollytelling") and dynamic interactions.

## Tech Stack
I built this using the modern React stack:
-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS (v4)
-   **Animations**: Framer Motion
-   **Loader**: Custom "Identity Rain" Glitch Effect (HTML5 Canvas)
-   **Canvas**: Native HTML5 Canvas for the image sequence
-   **Emails**: Nodemailer (server-side sending)

## Getting Started

If you want to run this locally on your machine, just follow these steps:

### 1. Clone & Install
Grab the code and install the dependencies.
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install
```

### 2. Set Up Environment Variables
The contact form needs Gmail credentials to work. Create a `.env.local` file in the root directory:

```env
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_TO=your.email@gmail.com
```
*Note: For `EMAIL_PASS`, you can't use your normal password. Go to your Google Account > Security > App Passwords to generate one.*

### 3. Run It
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) and you're good to go.

## Project Structure
Here's a quick map so you don't get lost:

-   `/app`: The main routing logic.
    -   `page.tsx`: The homepage (where all the sections live).
    -   `tech/[slug]`: The detailed pages for each project (dynamic routing).
    -   `api/contact`: The backend endpoint for sending emails.
-   `/components`: All the UI pieces.
    -   `ScrollyCanvas.tsx`: The big animation loop on the homepage.
    -   `GlitchLoader.tsx`: The "Matrix/Rain" style entry loader.
    -   `Ecosystem.tsx`: The cards section with the "Flip" and "Learn More" logic.
-   `/public/sequence`: The 120+ optimized WebP frames for the scroll animation.

## Deploying
I host this on **Netlify** (migrated from Vercel). It works seamlessly with the Next.js adapter. Just connect your repo and add the environment variables.

---
*Feel free to poke around the code! If you see something that could be optimized, let me know.*
