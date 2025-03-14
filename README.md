# Countries Explorer

A modern web application built with Next.js that allows users to explore and compare countries using data from the REST Countries API.

## Features

- View a list of all countries with essential information
- Real-time search functionality
- Detailed country information pages
- Compare two countries side by side
- Responsive design with modern UI
- Error handling and loading states

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Heroicons
- REST Countries API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app/` - Next.js app router pages and layouts
- `src/components/` - Reusable React components
- `src/types/` - TypeScript type definitions

## Features in Detail

### Country List Page
- Displays a table of countries with flags, names, capitals, regions, and populations
- Real-time search filtering
- Country comparison functionality
- Links to detailed country pages

### Country Detail Page
- Comprehensive country information
- Flag display
- General information section
- Demographics and geography section
- Bordering countries
- Google Maps link

### Country Comparison
- Select up to two countries for comparison
- Compare population, area, and region
- Clear visual representation of differences

## Error Handling

The application includes proper error handling for:
- API request failures
- Invalid country names
- Loading states
- Missing data fields

## Performance Considerations

- Optimized image loading
- Responsive design for all screen sizes
- Real-time search with client-side filtering
- Efficient state management

## Future Improvements

- Add sorting functionality to the country list
- Implement more detailed country comparisons
- Add data visualization for country statistics
- Include a map view for country locations
- Add favorite countries functionality
