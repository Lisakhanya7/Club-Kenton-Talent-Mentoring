# Kenton-On-Sea Football & Mentoring Club Website

## Overview

A professional, fully responsive website for the Kenton-On-Sea Football & Mentoring Club located in Ekuphumleni, Eastern Cape. The club is dedicated to developing young talent through quality football training while providing comprehensive mentoring to help children excel academically, socially, and personally.

## Features

### 🎨 Professional Design
- Modern, clean UI with a professional color scheme (Primary: #0052cc, Secondary: #f97316)
- Fully responsive design that works on desktop, tablet, and mobile devices
- Smooth animations and transitions for enhanced user experience
- Professional gradient backgrounds and modern typography

### 📱 Responsive Layout
- Mobile-first approach
- Hamburger menu for mobile navigation
- Optimized layouts for all screen sizes
- Touch-friendly buttons and navigation

### 🏠 Key Sections

1. **Navigation Bar** - Sticky navigation with smooth scrolling and mobile menu
2. **Hero Section** - Compelling landing section with call-to-action buttons
3. **About Section** - Mission, vision, and key statistics about the club
4. **Programs Section** - Three main programs:
   - Academic Support
   - Life Skills & Mentoring
   - Youth Development

5. **Team Section** - Staff members with profiles and social links
6. **Testimonials Section** - Success stories from members and parents
7. **Gallery Section** - Showcase of club activities and events
8. **Contact Section** - Contact form, location details, and business hours
9. **Footer** - Newsletter subscription and quick links

### ✨ Interactive Features

- Smooth scrolling navigation
- Mobile hamburger menu with toggle functionality
- Contact form with validation
- Newsletter subscription form
- Notification system for form submissions
- Scroll-to-top button
- Intersection observer for scroll animations
- Active navigation link highlighting
- Animated counters for statistics
- Lazy loading support for images

### 🎯 Contact Information

- **Location**: Ekuphumleni Location, Kenton-On-Sea, Eastern Cape, South Africa
- **Phone**: +27 (0) 73 123 4567 | +27 (0) 46 681 0000
- **Email**: info@kentontalent.co.za | programs@kentontalent.co.za
- **Hours**: Mon-Fri: 4:00 PM - 7:00 PM | Sat-Sun: 9:00 AM - 5:00 PM

## File Structure

```
Club-Kenton-Talent-Mentoring/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Complete styling
├── js/
│   └── script.js       # Interactive features
└── README.md           # This file
```

## Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid and Flexbox, CSS animations
- **JavaScript (ES6)** - Vanilla JavaScript for interactivity
- **Font Awesome** - Icon library for professional icons
- **Google Fonts** - Segoe UI typography

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)

### Installation & Usage

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd Club-Kenton-Talent-Mentoring
   ```

2. **Open the website**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # or with Node.js
     npx http-server
     ```

3. **Access the website**
   - Open `http://localhost:8000` in your browser

## Customization Guide

### Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #0052cc;        /* Main blue */
    --secondary-color: #f97316;      /* Orange accent */
    --dark-color: #1a1a1a;           /* Dark backgrounds */
    --light-color: #f5f5f5;          /* Light backgrounds */
    --text-color: #333;              /* Main text */
    --text-light: #666;              /* Light text */
}
```

### Contact Information
Update contact details in the HTML:
- Find the contact section (around line 300)
- Update phone numbers, email addresses, and hours as needed

### Team Members
Add or modify team members in the Team Section:
```html
<div class="team-card">
    <div class="team-image">
        <i class="fas fa-user-circle"></i>
    </div>
    <h3>Name</h3>
    <p class="position">Position</p>
    <p class="bio">Bio text...</p>
</div>
```

### Programs
Modify program details in the Programs Section with your specific offerings.

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Minified CSS and JavaScript
- Responsive images with lazy loading support
- Optimized animations using CSS transforms
- Intersection Observer for efficient scroll animations
- Minimal external dependencies

## SEO Features

- Semantic HTML structure
- Proper heading hierarchy
- Meta descriptions
- Social media integration links
- Mobile-friendly design

## Future Enhancements

Potential features to add:
- Blog/News section
- Event calendar and registration system
- Photo gallery with lightbox
- Video integration
- Member login/dashboard
- Payment integration for fees
- Live match scores and updates
- Social media feed integration
- Email notification system
- Analytics tracking

## Hosting

### Recommended Hosting Options
1. **GitHub Pages** - Free, simple, perfect for static sites
2. **Netlify** - Free tier with continuous deployment
3. **Vercel** - Fast, modern hosting platform
4. **Traditional Web Hosting** - GoDaddy, Bluehost, etc.

### Deployment Steps (GitHub Pages)
1. Create a GitHub repository
2. Push the files to GitHub
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://username.github.io/Club-Kenton-Talent-Mentoring`

## Contact & Support

For questions or support regarding the website, contact:
- **Email**: info@kentontalent.co.za
- **Phone**: +27 (0) 73 123 4567

## License

This website template is created for Kenton-On-Sea Football & Mentoring Club. All rights reserved.

## Credits

- Font Awesome for icons
- Google Fonts for typography
- Modern CSS Grid and Flexbox techniques

---

**Website Version**: 1.0  
**Last Updated**: February 2026  
**Created for**: Kenton-On-Sea Football & Mentoring Club, Ekuphumleni, Eastern Cape
