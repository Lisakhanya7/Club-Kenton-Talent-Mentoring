# Website Architecture & Structure

## Overview
Your website has been reorganized into a **modular, component-based architecture** where separate files work together as one cohesive system. This makes the code easier to maintain, test, and expand.

---

## Directory Structure

```
Club-Kenton-Talent-Mentoring/
├── index.html              (Main website)
├── admin.html              (Admin dashboard)
│
├── css/
│   ├── styles.css          (Main website styles)
│   └── admin.css           (Admin dashboard styles)
│
└── js/
    ├── app.js              (Main application entry point)
    │
    ├── utils/
    │   ├── dateUtils.js    (Date formatting functions)
    │   └── storage.js      (LocalStorage management)
    │
    ├── components/
    │   ├── navbar.js       (Navigation functionality)
    │   ├── fixtures.js     (Fixtures & results display)
    │   ├── squad.js        (Player squad display)
    │   └── news.js         (News items display)
    │
    └── modules/
        └── admin.js        (Admin dashboard functionality)
```

---

## How It All Works Together

### **1. Utilities Layer** (`js/utils/`)
These provide core, reusable functions used throughout the website:

- **`dateUtils.js`** - Date formatting functions
  - `getDateDay()` - Extract day from date
  - `getMonth()` - Get month abbreviation
  - `formatDate()` - Format as "18 Feb"
  - `formatTime()` - Convert 24h to 12h format

- **`storage.js`** - LocalStorage management system
  - `StorageManager.loadAll()` - Load all data
  - `StorageManager.load(type)` - Load specific data
  - `StorageManager.save(type, data)` - Save data
  - `StorageManager.addItem()` - Add new item
  - `StorageManager.removeItem()` - Delete item
  - `StorageManager.updateItem()` - Update item
  - `StorageManager.clearAll()` - Clear all data

### **2. Components Layer** (`js/components/`)
These handle displaying specific sections of the website:

- **`navbar.js`** - Navigation bar functionality
  - Menu toggle for mobile
  - Smooth scroll to sections
  - Navbar styling on scroll

- **`fixtures.js`** - Fixtures & results
  - `FixturesComponent.displayUpcoming()` - Show upcoming matches
  - `FixturesComponent.displayResults()` - Show latest results

- **`squad.js`** - Player squad display
  - `SquadComponent.display()` - Show all players

- **`news.js`** - News articles display
  - `NewsComponent.display()` - Show news items

### **3. Modules Layer** (`js/modules/`)
These handle larger, feature-rich functionality:

- **`admin.js`** - Admin dashboard
  - All CRUD operations (Create, Read, Update, Delete)
  - Form handling
  - Data display and management

### **4. Main Application** (`app.js`)
The entry point that coordinates everything:
- Initializes all components on page load
- Loads data from storage and displays it
- Provides `refreshContent()` function to update page

---

## Data Flow

```
index.html (page loads)
    ↓
Loads all utility scripts
    ↓
Loads all component scripts
    ↓
Loads app.js
    ↓
DOMContentLoaded event fires
    ↓
app.js initializes:
  - NavbarComponent.init() (setup navigation)
  - loadAndDisplayContent() (fetch data & display)
    ↓
Components fetch and display data using:
  - StorageManager.loadAll() (get data from localStorage)
  - Utility functions to format data
    ↓
Website displays with live data!
```

---

## Admin Dashboard Data Flow

```
admin.html (page loads)
    ↓
Loads utility scripts
    ↓
Loads admin module
    ↓
AdminModule.init() initializes:
  - setupNavigation() (section switching)
  - setupEventListeners() (form submissions)
  - loadAllData() (display existing data)
    ↓
User submits form (e.g., add fixture)
    ↓
Form handler calls StorageManager.addItem()
    ↓
Data saved to localStorage
    ↓
Component display function updates the list
    ↓
Changes immediately visible on page
```

---

## How to Use

### **For Users (Main Website)**
- Simply visit `index.html`
- The website automatically loads all data from storage and displays it
- Navigation, fixtures, squad, and news all work together

### **For Admins (Admin Dashboard)**
1. Go to `admin.html` (or click the settings icon on the main site)
2. Add fixtures, results, players, and news through forms
3. Data is automatically saved to browser's localStorage
4. Changes appear on the main website immediately

### **Adding New Components**
To add a new feature:
1. Create a new file in `js/components/` (e.g., `gallery.js`)
2. Create an object with display functions
3. Add the script tag to the HTML files
4. Call it from `app.js` or `admin.js`

Example:
```javascript
// js/components/gallery.js
const GalleryComponent = {
    display(items) {
        // Display gallery items
    }
};
```

Then in `app.js`:
```javascript
if (data.gallery.length > 0) {
    GalleryComponent.display(data.gallery);
}
```

---

## Data Storage

All data is stored in browser's **localStorage** under these keys:
- `fixtures` - Upcoming matches
- `results` - Past match results
- `players` - Squad members
- `news` - News articles
- `media` - Media files

Each item has:
- `id` - Unique identifier (auto-generated)
- Other fields specific to the item type

---

## Benefits of This Structure

✅ **Modularity** - Each file has one responsibility  
✅ **Reusability** - Utilities are used across the site  
✅ **Maintainability** - Easy to find and fix bugs  
✅ **Scalability** - Simple to add new features  
✅ **Separation of Concerns** - UI, data, and logic are separate  
✅ **Easy Testing** - Individual components can be tested  

---

## Scripts Load Order

The order matters! Scripts are loaded in this sequence:

1. **Utilities first** - `dateUtils.js`, `storage.js`
   - (Other scripts depend on these)

2. **Components second** - `navbar.js`, `fixtures.js`, `squad.js`, `news.js`
   - (Use utilities, called by app.js)

3. **App/Modules last** - `app.js` or `admin.js`
   - (Initialize everything when DOM is ready)

This ensures everything is defined before it's used.

---

## Troubleshooting

**Issue: Data not appearing on website?**
- Check browser console for errors (F12 → Console tab)
- Ensure all scripts are loading (F12 → Network tab)
- Check if data exists in localStorage (F12 → Application → LocalStorage)

**Issue: Admin changes not appearing on main site?**
- Refresh the main website page
- Check that both pages are accessing the same localStorage

**Issue: Scripts not loading?**
- Verify file paths are correct
- Check that all files exist in the `js/` directory
- Ensure no typos in filename references

---

## Quick Reference

| File | Purpose | Used By |
|------|---------|---------|
| `dateUtils.js` | Format dates/times | All components |
| `storage.js` | Manage data | App, Admin, Components |
| `navbar.js` | Navigation logic | app.js |
| `fixtures.js` | Display matches | app.js |
| `squad.js` | Display players | app.js |
| `news.js` | Display news | app.js |
| `admin.js` | Admin functionality | admin.html |
| `app.js` | Coordinate all components | index.html |

---

## Next Steps

1. **Test the website** - Ensure everything works
2. **Add data via admin** - Use admin.html to add fixtures/players/news
3. **Verify on main site** - Check that data appears on index.html
4. **Customize as needed** - Modify styles in CSS files or add new components

Happy coding! 🎉
