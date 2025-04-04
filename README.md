# 🌍 Countries Explorer

A modern, interactive web application for exploring and comparing countries around the world. Built with Next.js and powered by the REST Countries API.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Here-blue?style=for-the-badge)](https://accolade-tech-frontend-code-assessment.onrender.com/)

## ✨ Features

- 🔍 Real-time country search
- 📊 Compare up to two countries side by side
- 📱 Responsive design for all devices
- 🎨 Modern UI with smooth animations
- ⚡ Fast and efficient data loading
- 🛡️ Error handling and loading states

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Apollo Client](https://www.apollographql.com/docs/react/)
- **Icons**: [Heroicons](https://heroicons.com/)
- **API**: [REST Countries API](https://restcountries.com/)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/countries-explorer.git
   cd countries-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # Reusable React components
│   ├── countries/        # Country-related components
│   │   ├── comparison/  # Comparison feature components
│   │   └── table/       # Table display components
│   ├── search/          # Search functionality
│   └── ui/              # UI components
├── lib/                  # Utility functions and configurations
└── types/               # TypeScript type definitions
```

## 🎯 Key Features in Detail

### Country Search
- Real-time filtering as you type
- Case-insensitive search
- Instant results update

### Country Comparison
- Select up to two countries for comparison
- Smooth collapse/expand animations
- Individual country removal
- Key metrics comparison:
  - Population
  - Area
  - Region
  - More details available

### Country Details
- Comprehensive country information
- Flag display
- Capital city
- Region and subregion
- Population statistics
- Area measurements

## 🎨 UI/UX Features

- **Sticky Header**: Search and comparison area stay visible while scrolling
- **Smooth Animations**: Collapse/expand transitions for comparison area
- **Responsive Design**: Works seamlessly on all device sizes
- **Interactive Elements**: Hover effects and clear visual feedback
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

## 🧪 Testing

The application includes comprehensive error handling for:
- API request failures
- Invalid country names
- Loading states
- Missing data fields

## 🚀 Deployment

The application is deployed on [Render](https://render.com/):
- Automatic deployments from the main branch
- Zero-downtime deployments
- HTTPS enabled
- Global CDN

## 📈 Performance Optimizations

- Optimized image loading
- Efficient state management
- Client-side filtering
- Responsive design
- Smooth animations
- Error boundary implementation

## 🔮 Future Improvements

- [ ] Add sorting functionality to the country list
- [ ] Implement more detailed country comparisons
- [ ] Add data visualization for country statistics
- [ ] Include a map view for country locations
- [ ] Add favorite countries functionality
- [ ] Implement dark mode
- [ ] Add more comparison metrics
- [ ] Include country time zones
- [ ] Add currency conversion

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [REST Countries API](https://restcountries.com/) for providing the country data
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Apollo Client](https://www.apollographql.com/docs/react/) for state management
- [Heroicons](https://heroicons.com/) for the beautiful icons
