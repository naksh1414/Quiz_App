# Interactive Quiz Platform

A modern, interactive quiz application built with Next.js and TypeScript.

## Features

- Timed questions (30 seconds per question)
- Instant feedback on answers
- Progress tracking
- Multiple attempts
- Detailed results and statistics
- Mobile-friendly design
- IndexedDB for storing quiz history

## Tech Stack

- Next.js 13
- TypeScript
- Tailwind CSS
- Lucide React Icons
- IndexedDB for local storage

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app router pages
- `/components` - Reusable UI components
- `/data` - Quiz questions and other static data
- `/lib` - Utility functions and database operations
- `/types` - TypeScript type definitions

## Features in Detail

### Quiz Taking
- 30-second timer per question
- Instant feedback on answer selection
- Progress indicator
- Automatic progression on time expiry

### Results Tracking
- Score calculation
- Time tracking
- Attempt history
- Best score tracking
- Average completion time

### Data Persistence
- Quiz attempts stored in IndexedDB
- Persistent history across sessions
- Detailed attempt statistics

## Mobile Responsiveness

The application is fully responsive and works well on:
- Desktop browsers
- Tablets
- Mobile phones

## Performance

- Optimized for quick loading
- Minimal dependencies
- Efficient state management
- Local storage for offline capability