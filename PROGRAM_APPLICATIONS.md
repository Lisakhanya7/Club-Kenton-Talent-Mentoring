# Club KTM Program Application System

## Overview

The Club KTM website now includes an integrated **Program Application System** that allows visitors to:
- Browse all available programs
- Apply as a **Participant/Player/Learner** 
- Apply as a **Coach/Instructor/Teacher**
- Submit applications directly from the website

All applications are automatically saved and can be managed through the admin dashboard.

---

## How It Works for Visitors

### **Step 1: Navigate to Programs**
- Click "Join Us Today" button on the hero section
- Scroll to the "Our Programs & Teams" section
- View all 8 available programs with descriptions

### **Step 2: Choose a Program & Click Apply**
- Each program card now has an **"Apply Now"** button at the bottom
- Click the button to open the application form
- The form automatically fills in the program name

### **Step 3: Fill Out Application Form**

The application form has two pathways:

#### **For Participants (Players/Learners)**
- Role: Select "Participant / Player / Learner"
- Full Name
- Email
- Phone Number
- **Age** (automatically shown)
- Optional: Message/Additional Info

#### **For Coaches (Instructors/Teachers)**
- Role: Select "Coach / Instructor / Teacher"
- Full Name
- Email
- Phone Number
- **Experience/Qualifications** (automatically shown)
- Optional: Message/Additional Info

### **Step 4: Submit & Confirmation**
- Click "Submit Application"
- Get instant confirmation with email address
- Application is saved and stored

---

## Admin Dashboard - Application Management

### **Access Applications**
1. Go to `admin.html`
2. Click "Program Applications" in the sidebar
3. View all submitted applications

### **Features**

**View Applications**
- See all applications sorted by date (newest first)
- Color-coded badges show role type (blue = participant, purple = coach)
- All applicant details displayed: name, email, phone, age/experience

**Filter Applications**
- Filter by: All / Participants / Coaches
- Quick filtering to find specific applicant types

**Export Data**
- Click "Export" button to download all applications as CSV file
- File format: `Club_KTM_Applications_YYYY-MM-DD.csv`
- Open in Excel, Google Sheets, or any spreadsheet application

**Delete Applications**
- Remove individual applications when processed
- Click "Remove" button on any application

---

## Application Data Storage

Applications are stored in browser's **localStorage** under the key `applications`.

Each application contains:
```javascript
{
    id: unique_number,
    timestamp: "2026-02-11T14:30:00.000Z",
    program: "Soccer Academy",
    role: "participant",
    name: "John Doe",
    email: "john@example.com",
    phone: "+27 123 456 7890",
    age: 15,
    experience: null,
    message: "Very interested in joining the U15 team"
}
```

---

## File Structure

### New Files Added
```
js/
└── components/
    └── programApplication.js    (Main application system)
```

### Updated Files
```
index.html                         (Added script reference & enhanced join flow)
admin.html                         (Added applications section & nav item)
js/modules/admin.js               (Added application management functions)
```

### Scripts Loaded
The system automatically loads `programApplication.js` on both:
- **index.html** - For visitor applications
- **admin.html** - Via admin module

---

## User Flow Diagram

```
Visitor on Website
    ↓
Click "Apply Now" on any program card
    ↓
Modal opens with application form
    ↓
Select Role (Participant or Coach)
    ↓
Form updates to show relevant fields
    ↓
Fill in personal details
    ↓
Submit application
    ↓
Data saved to localStorage
    ↓
Admin can view/export/manage in admin.html
```

---

## Technical Details

### Component: `ProgramApplicationComponent`

**Main Methods:**
- `init()` - Initialize the application system
- `createApplicationModal()` - Create the modal form
- `setupApplyButtons()` - Add "Apply Now" buttons to program cards
- `updateFormFields()` - Update form based on selected role
- `openModal(programName)` - Open application form for specific program
- `closeModal()` - Close the application form
- `setupFormHandling()` - Handle form submission and data saving

**Features:**
- Automatically detects all program cards
- Dynamically adds "Apply Now" buttons
- Responsive modal design
- Role-based form fields
- Real-time form validation
- Data persistence using StorageManager

---

## Admin Module Extensions

**New Admin Functions:**
- `displayApplications(applications)` - Show all applications with details
- `filterApplications(role)` - Filter by participant/coach role
- `deleteApplication(id)` - Remove specific application
- `exportApplications()` - Export applications to CSV

---

## Benefits

✅ **Streamlined Recruitment** - Collect applications directly from website  
✅ **Role-Based Approach** - Separate pathways for participants and coaches  
✅ **Data Management** - Automatically organize and export applications  
✅ **Admin Control** - Easy filtering and export for club management  
✅ **User-Friendly** - Simple, intuitive application process  
✅ **Persistent Storage** - Applications saved even if browser closes  
✅ **No Backend Needed** - Works entirely on browser's localStorage  

---

## Example Use Cases

### Scenario 1: New Player Wants to Join
1. Sarah visits website
2. Scrolls to Programs & Teams section
3. Finds "Soccer Academy" program
4. Clicks "Apply Now"
5. Selects "Participant / Player / Learner"
6. Fills in: name, email, phone, age
7. Submits application
8. Admin sees Sarah's application in dashboard
9. Admin contacts Sarah to confirm enrollment

### Scenario 2: Experienced Coach Offers Services
1. Coach Marcus visits website
2. Finds "Tennis Program" 
3. Clicks "Apply Now"
4. Selects "Coach / Instructor / Teacher"
5. Provides coaching experience and qualifications
6. Submits application
7. Admin reviews experience
8. Admin exports applications for hiring committee
9. Club contacts Marcus for interview

---

## Future Enhancements

Possible improvements:
- Email notifications when application submitted
- Application status tracking
- Payment integration for registration fees
- Automatic confirmation emails
- Application review/approval workflow
- Calendar integration for training schedules

---

## Troubleshooting

**Issue: "Apply Now" buttons not appearing?**
- Ensure `programApplication.js` is loaded (check in browser console)
- Check that program cards have the class `program-card`
- Refresh page

**Issue: Applications not saving?**
- Check browser storage (F12 → Application → LocalStorage)
- Ensure localStorage is not disabled
- Try clearing cache and refreshing

**Issue: Can't access admin applications?**
- Make sure you're on `admin.html`
- Check that `admin.js` module is loaded
- Verify "Program Applications" nav item is visible

---

## Support

For issues or questions about the application system, contact:
- **Email:** clubktm1@gmail.com
- **Phone:** +27 083 736 4603
- **Address:** 2610 Tana Square, Ekuphumleni Location, Kenton-on-Sea, 6191

---

**Last Updated:** February 11, 2026
**System Version:** 1.0
