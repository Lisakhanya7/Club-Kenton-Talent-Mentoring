# Email Integration & Component Architecture Guide

## Overview

This document explains:
1. How the website is organized into modular components
2. How to set up email sending for applications and contact messages
3. How to troubleshoot and maintain the system

---

## Project Structure - Modular Organization

### **Utilities Layer** (`js/utils/`)
Independent, reusable functions:
- `dateUtils.js` - Date formatting
- `storage.js` - LocalStorage management
- `componentLoader.js` - Dynamic component loading
- `emailService.js` - Email service integration

### **Components Layer** (`js/components/`)
Individual page features:
- `navbar.js` - Navigation bar
- `fixtures.js` - Fixtures & results
- `squad.js` - Player squad
- `news.js` - News items
- `programApplication.js` - Program applications modal
- `contactForm.js` - Contact form handling

### **Modules Layer** (`js/modules/`)
Complex features:
- `admin.js` - Admin dashboard

### **HTML Components** (`html-components/`)
Reusable HTML chunks (optional):
- `navbar.html`
- `hero.html`
- `about.html`

### **Main Application** (`index.html`, `app.js`)
- Orchestrates all components
- Main entry point

---

## Email Integration Setup

### **What It Does**

**Applications & Contact Messages are sent to:** `clubktm1@gmail.com`

1. **Program Applications** - When users click "Apply Now" and submit
2. **Contact Form Messages** - When users fill contact form and submit

Both are:
- Saved to LocalStorage (for admin access)
- Sent to club email via EmailJS
- Confirmed to user with success message

---

### **Setup Steps**

#### **Step 1: Create Free EmailJS Account**

1. Go to https://www.emailjs.com/
2. Sign up for a **free account**
3. Verify your email
4. Go to **Dashboard** → **Account** → Copy your **App ID** (looks like: `qb0ycO-MnNAJp0cB6`)

#### **Step 2: Create Email Service**

1. In EmailJS Dashboard, go to **Email Services**
2. Click **Add Service**
3. Select **Gmail** as service type
4. Connect your Gmail account (clubktm1@gmail.com)
5. Name it: `service_clubktm`
6. Verify the connection

#### **Step 3: Create Email Templates**

You need to create **2 templates**.

**Template 1: Program Applications**
1. Go to **Email Templates** → **Create New**
2. Template Name: `template_applications`
3. Use this template:

```html
Subject: New Program Application - {{program}} from {{from_name}}

Dear Club KTM,

New program application received:

Applicant Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Date: {{submission_date}}

Program Details:
- Program: {{program}}
- Role: {{role}}
- Age: {{age}}
- Experience: {{experience}}

Message:
{{message}}

---
This is an automated email from Club KTM website.
Please respond to: {{from_email}}
```

**Template 2: Contact Messages**
1. Create another template
2. Template Name: `template_contact`
3. Use this template:

```html
Subject: New Contact Message from {{from_name}}

Dear Club KTM,

Contact form submission received:

Sender Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Date: {{submission_date}}

Program Interest: {{program_interest}}
Participant Age: {{participant_age}}

Message:
{{message}}

---
This is an automated email from Club KTM website.
Please respond to: {{from_email}}
```

#### **Step 4: Update Configuration in Code**

Open `js/utils/emailService.js` and update:

```javascript
SERVICE_ID: 'service_clubktm',           // From EmailJS setup
APP_ID: 'YOUR_APP_ID_HERE',              // Paste your App ID here
TEMPLATE_APPLICATIONS: 'template_applications',
TEMPLATE_CONTACT: 'template_contact',
CLUB_EMAIL: 'clubktm1@gmail.com',
```

Example with real IDs:
```javascript
SERVICE_ID: 'service_clubktm',
APP_ID: 'qb0ycO-MnNAJp0cB6',
TEMPLATE_APPLICATIONS: 'template_applications',
TEMPLATE_CONTACT: 'template_contact',
CLUB_EMAIL: 'clubktm1@gmail.com',
```

#### **Step 5: Test It**

1. Open website in browser
2. Click "Apply Now" on any program
3. Fill form and submit
4. Check emailJS dashboard → **Logs** to see if email was sent
5. Check clubktm1@gmail.com inbox

---

## Component-Based Architecture Benefits

### **Advantages**

✅ **Easy to Fix Bugs** - Each component is isolated; fix one without affecting others  
✅ **Easy to Add Features** - Create new components without modifying existing ones  
✅ **Reusable Code** - Utilities can be used across multiple components  
✅ **Better Maintenance** - Small files are easier to understand and update  
✅ **Parallel Development** - Multiple components can be worked on simultaneously  

### **Component Dependencies**

```
index.html
├── emailService.js (utilities)
├── dateUtils.js (utilities)
├── storage.js (utilities)
├── navbar.js (component)
├── programApplication.js (component)
│   ├── storage.js
│   └── emailService.js
├── contactForm.js (component)
│   └── emailService.js
└── app.js (main orchestrator)
```

---

## How Email Sending Works

### **Application Email Flow**

```
User fills "Apply Now" form
        ↓
ProgramApplicationComponent.setupFormHandling()
        ↓
Save to localStorage via StorageManager
        ↓
Send email via EmailService.sendApplicationEmail()
        ↓
EmailJS API → Gmail SMTP → clubktm1@gmail.com
        ↓
User sees success message
        ↓
Admin can view in admin.html
```

### **Contact Email Flow**

```
User fills contact form
        ↓
ContactFormHandler.handleSubmit()
        ↓
Send email via EmailService.sendContactEmail()
        ↓
EmailJS API → Gmail SMTP → clubktm1@gmail.com
        ↓
User confirmation message
```

---

## File Breakdown

### **index.html** (Main HTML)
- **Size**: ~1000 lines
- **Contains**: All HTML structure
- **Loads**: All CSS and JavaScript
- **Key Addition**: EmailJS library in `<head>`

### **js/utils/emailService.js** (NEW)
- **Size**: ~110 lines
- **Purpose**: Manage all email operations
- **Methods**: 
  - `init()` - Initialize EmailJS
  - `sendApplicationEmail()` - Send app emails
  - `sendContactEmail()` - Send contact emails
  - `isAvailable()` - Check if email service ready

### **js/components/programApplication.js** (UPDATED)
- **Updated**: `setupFormHandling()` method
- **Added**: Email integration on form submit
- **Maintains**: LocalStorage backup

### **js/components/contactForm.js** (NEW)
- **Size**: ~70 lines
- **Purpose**: Handle contact form submissions
- **Features**: Email sending, validation, UI feedback

### **js/utils/componentLoader.js** (NEW)
- **Size**: ~40 lines
- **Purpose**: System for loading HTML components
- **Future**: Allows splitting index.html into chunks

---

## Troubleshooting

### **Issue: Emails not sending**

**Debug Steps:**
1. Open browser Console (F12)
2. Look for error messages
3. Check EmailJS Dashboard → Logs
4. Ensure App ID is correct in emailService.js
5. Verify email templates exist and names match

**Common Issues:**
- App ID wrong → Get from EmailJS Account page
- Service ID wrong → Use exactly: `service_clubktm`
- Template names wrong → Case sensitive!
- Gmail not configured → Verify in EmailJS Email Services

### **Issue: Emails going to spam**

- This is normal for first few emails
- EmailJS automatically improves delivery over time
- Add `clubktm1@gmail.com` to trusted senders in your email client

### **Issue: Components not loading/working**

1. Check browser Console for JS errors
2. Verify all script files exist in `js/` folders
3. Check that utilities load before components
4. Ensure index.html loads scripts in correct order

### **Issue: Data not saving**

- Check localStorage is enabled
- Try clearing browser cache
- Check browser Console for errors
- Verify storage.js is loaded

---

## Maintenance Guide

### **Adding New Email Template**

1. Create in EmailJS Dashboard
2. Add to emailService.js:
   ```javascript
   TEMPLATE_NEWSLETTER: 'template_newsletter',
   ```
3. Add method in emailService.js:
   ```javascript
   sendNewsletterEmail(data) {
       const emailParams = { ...data };
       return emailjs.send(this.SERVICE_ID, this.TEMPLATE_NEWSLETTER, emailParams);
   }
   ```

### **Creating New Component**

1. Create file: `js/components/myComponent.js`
2. Structure:
   ```javascript
   const MyComponent = {
       init() { /* setup */ },
       // methods
   };
   document.addEventListener('DOMContentLoaded', () => {
       MyComponent.init();
   });
   ```
3. Add to index.html:
   ```html
   <script src="js/components/myComponent.js"></script>
   ```

### **Debugging Email Issues**

1. **Test email sending:**
   ```javascript
   // In browser console:
   EmailService.sendApplicationEmail({
       name: 'Test',
       email: 'test@example.com',
       phone: '123456',
       program: 'Test Program',
       role: 'participant',
       age: '18',
       message: 'Test message'
   });
   ```

2. **Check EmailJS logs:**
   - Go to emailjs.com Dashboard
   - Click "Logs" to see sent emails

3. **Verify localStorage:**
   - F12 → Application → LocalStorage
   - Check for 'applications' key

---

## Security Notes

⚠️ **App ID is PUBLIC** - It's intentionally shown in JavaScript but limited to one email address

⚠️ **Email rate limits** - Free EmailJS plan has limits (100/day for free tier)

⚠️ **No server needed** - All email handled client-side via EmailJS

---

## Future Improvements

Possible enhancements:
- Send confirmation email to applicant
- Webhook notifications to Slack
- Export applications to Google Sheets
- Automated application responses
- SMS notifications to coach

---

## Support Resources

- **EmailJS Docs**: https://www.emailjs.com/docs/
- **EmailJS API**: https://www.emailjs.com/docs/sdk/
- **GitHub Issues**: Check for community solutions
- **Club Email**: clubktm1@gmail.com

---

**Last Updated:** February 11, 2026  
**System Version:** 2.0 (Component-based with Email Integration)
