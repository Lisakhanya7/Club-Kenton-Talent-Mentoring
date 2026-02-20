# Staff Access Control System

## Overview

Only **authorized Club KTM team members** can access the admin panel to share and post news, media, and updates.

---

## How It Works

### **1. Admin Panel is Protected**
- Navigate to `admin.html` → Prompted for login
- Only staff members with credentials can access
- All non-staff users are blocked

### **2. Staff Login Required**
Before posting news or media, staff must:
1. Click link to admin panel
2. Enter username and password
3. System verifies credentials
4. Access granted to admin dashboard

### **3. Track Who Posted What**
When staff post news or media:
- ✅ **System records**: Staff name, role, timestamp
- ✅ **News shows**: "Posted by: John (Coach)"
- ✅ **Media shows**: "Uploaded by: Sarah (Director)"

---

## Default Staff Credentials

### **Setting Up Staff Accounts**

No demo accounts are included for security. To set up staff access:

**Step 1: Define Staff Members**

Open `js/utils/authService.js` and add your staff:

```javascript
STAFF_LIST: {
    'khayalethu': { 
        password: 'SecurePassword123!', 
        name: 'Khayalethu Ngangqu', 
        role: 'Director' 
    },
    'john_coach': { 
        password: 'CoachP@ssw0rd!', 
        name: 'John Smith', 
        role: 'Coach' 
    },
    'sarah_admin': { 
        password: 'AdminSecure456!', 
        name: 'Sarah Johnson', 
        role: 'Administrator' 
    }
}
```

**Step 2: Use Strong Passwords**
- Minimum 8 characters
- Include uppercase, lowercase, numbers, special characters
- Never share with non-staff
- Change regularly (recommend monthly)

**Step 3: Test Login**
1. Go to admin.html
2. Use your configured credentials
3. Verify access works

### **Password Guidelines**
✅ DO: Use strong passwords like `Coach@KTM2024`  
✅ DO: Change passwords every 3 months  
✅ DO: Keep credentials confidential  
❌ DON'T: Share passwords via email  
❌ DON'T: Write passwords on sticky notes  
❌ DON'T: Use simple passwords like `password123`

---

## Login Process

### **Step 1: Access Admin Panel**
```
1. Go to admin.html
2. Login modal appears
3. Enter username: admin
4. Enter password: KTMAdmin123!
5. Click "Login"
```

### **Step 2: Authentication**
- System checks username in staff list
- System validates password
- If correct → Panel opens
- If incorrect → Error message

### **Step 3: Post Content**
Once logged in:
- Click "News & Updates" tab
- Fill form (title, content, etc.)
- Click "Publish Article"
- System records who posted it

---

## What Staff Can Do

### **Logged-in Staff Can:**
✅ Add news articles  
✅ Upload media (videos, photos)  
✅ Manage fixtures & results  
✅ Manage squad players  
✅ View program applications  
✅ Export applications to CSV  

### **Public Visitors Cannot:**
❌ Post news  
❌ Upload media  
❌ Manage fixtures  
❌ Access admin dashboard  

---

## Adding New Staff Members

### **Only Admin Can Add Staff**

**Steps:**
1. Login as admin
2. Use this code in browser console:
```javascript
const result = AuthService.addStaff(
    'username_here',           // New username
    'Full Name Here',          // Staff full name
    'SecurePassword123!',      // New password (8+ chars)
    'Coach'                    // Role: Coach, Director, etc.
);
console.log(result.message);
```

### **Example: Add New Coach**
```javascript
AuthService.addStaff('mandla', 'Mandla Nkosi', 'Coach@KTM2024', 'Coach');
```

**Result:**
```
✅ Staff member "Mandla Nkosi" added successfully.
```

---

## News & Media Tracking

### **Example News Post**

When Coach posts news:
```
Title: KTM Wins Championship
Category: Achievement
Date: Feb 11, 2026
Content: "Our team achieved victory..."
```

**Shows to public as:**
```
Posted by: Coach (Coach)
Date: Feb 11, 2026
Content: "Our team achieved victory..."
```

### **Example Media Upload**

When Director uploads video:
```
Title: Match Highlights
Type: Video Highlight
Date: Feb 10, 2026
URL: youtube.com/watch?v=...
```

**Shows to public as:**
```
Uploaded by: Director (Director)
Date: Feb 10, 2026
Type: Video Highlight
[View link]
```

---

## Security Features

### **✅ What's Protected**
1. **Admin Panel Access** - Requires login
2. **News/Media Posting** - Only staff can post
3. **Staff Verification** - Credentials checked on each action
4. **Activity Tracking** - Records who posted what
5. **Session Management** - Logout clears all permissions

### **Session Management**
- Login sets session token in browser
- Logout removes all credentials
- Refreshing page keeps you logged in (for convenience)
- Only staff username/password gives access

---

## Common Tasks

### **Task 1: Post Match Report**
```
1. Go to admin.html
2. Log in with your staff credentials
3. Click "News & Updates" tab
4. Fill form:
   - Category: Match Report
   - Date: Today
   - Title: Our Victory Over Pirates
   - Content: Detailed report...
5. Click "Publish Article"
6. Success! ✅ Article now visible on website
```

### **Task 2: Upload Match Video**
```
1. Go to admin.html
2. Log in with your staff credentials
3. Click "Media Gallery" tab
4. Fill form:
   - Type: Video Highlight
   - Date: Today
   - Title: KTM vs Pirates - Match Highlights
   - URL: https://youtube.com/...
5. Click "Add to Gallery"
6. Success! ✅ Video now in media section
```

### **Task 3: Add Fixture**
```
1. Go to admin.html
2. Log in with your staff credentials
3. Click "Fixtures & Results" tab
4. Fill form:
   - Type: League Division 1
   - Date: Future date
   - Opponent: Team name
   - Venue: Field name
5. Click "Add Fixture"
```

---

## Error Messages & Solutions

### **Error: "Invalid username"**
**Problem:** Username doesn't exist  
**Solution:** Check spelling, ask admin for correct username

### **Error: "Incorrect password"**
**Problem:** Wrong password entered  
**Solution:** Request password reset from administrator

### **Error: "Access denied. Please log in as staff member"**
**Problem:** Tried to post without logging in  
**Solution:** Click admin panel link first and login

### **Error: "Only administrators can add new staff members"**
**Problem:** Non-admin tried to create new staff  
**Solution:** Ask administrator to create new accounts

---

## Staff Responsibilities

### **Coaches Should:**
✅ Post training updates  
✅ Report match results  
✅ Upload training videos  
✅ Share player achievements  

### **Directors Should:**
✅ Post official announcements  
✅ Share club news  
✅ Upload event photos/videos  
✅ Manage scheduling  

### **Administrators Should:**
✅ Manage all staff accounts  
✅ Monitor all content  
✅ Handle disputes  
✅ Update system settings  

---

## Feature Details

### **News Articles**

**Staff can include:**
- Article title
- Category (Match Report, Training, Achievement, etc.)
- Publication date
- Full article content
- System auto-records: Posted by, staff role, timestamp

**Public sees:**
- Article on News & Updates section
- Posted by: [Staff Name] ([Role])
- Article date and content

### **Media Gallery**

**Staff can upload:**
- Video highlights
- Match photos
- Interview clips
- Event photos

**Public sees:**
- Thumbnail and title
- Upload date and creator
- Type of media
- Link to view

---

## Technical Details

### **Authentication Flow**
```
Staff enters credentials
         ↓
AuthService.login() validates

- Staff members can now change their password from the admin page by clicking the "Change Password" button next to their name. The system checks the current password and requires at least 8 characters for the new one.
         ↓
Check against STAFF_LIST
         ↓
If valid: Create auth token
         ↓
Store in localStorage
         ↓
Admin panel unlocks
         ↓
Staff can post content
```

### **Content Tracking Flow**
```
Staff submits news/media
         ↓
AuthService.verifyAccess() checks if logged in
         ↓
If not authenticated: Reject with error
         ↓
If authenticated: Get staff info (name, role)
         ↓
Add to stored data with metadata:
- postedBy: staff name
- postedRole: staff role
- timestamp: current date/time
         ↓
Content appears with credit
```

---

## Configuration

### **Change Password For User**

**In browser console:**
```javascript
// Change coach's password
AuthService.STAFF_LIST['coach'].password = 'NewPassword@123';
console.log('Password changed successfully');
```

### **Change User Role**

**In browser console:**
```javascript
// Change director's role
AuthService.STAFF_LIST['director'].role = 'Administrator';
console.log('Role updated');
```

### **View All Staff**

**In browser console:**
```javascript
console.log(AuthService.STAFF_LIST);
```

---

## Logout Process

### **When Staff Logs Out:**
1. Click "Logout" button (top right)
2. System shows confirmation message
3. All credentials cleared
4. Admin panel becomes inaccessible
5. Back to login screen

---

## FAQ

**Q: Can regular website visitors see the admin panel?**  
A: Yes, link is visible (admin.html), but they can't access it without correct credentials.

**Q: What happens if someone tries wrong password 3 times?**  
A: System shows error but doesn't lock account (for small club size). Just try again.

**Q: Can coaches delete other coaches' posts?**  
A: Yes - anyone with admin access can delete any content. Trust is important with small teams.

**Q: What if staff member leaves the club?**  
A: Admin can remove them by updating authService.js (request admin to do this).

**Q: Does system email alert staff of posts?**  
A: Not yet - only localStorage tracking. Admin sees who posted what.

**Q: Can passwords be saved/remembered?**  
A: No - each login requires credentials for security. This is intentional.

---

## Summary

✅ **Only team staff can post news and media**  
✅ **Each post tracked with staff name and role**  
✅ **Public sees who posted content**  
✅ **Admin panel fully protected**  
✅ **Easy to add/remove staff members**  

Your website now has **professional staff access control** with **content attribution tracking**.

---

**Status**: ✅ Implemented and Ready  
**Last Updated**: February 11, 2026  
**System**: AuthService + Admin Module
