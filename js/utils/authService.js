/**
 * Authentication Service for Club Staff
 * Manages staff login and authorization
 */
const AuthService = {
    // Default staff credentials - Keep confidential, update as needed
    // These are used as initial values; passwords can be changed by users
    DEFAULT_STAFF: {
        'khayalethu': { 
            password: 'YourPassword@123', 
            name: 'Khayalethu Ngangqu', 
            role: 'Director' 
        },
        'coach_john': { 
            password: 'CoachPass@456', 
            name: 'John Smith', 
            role: 'Coach' 
        }
    },

    /**
     * Get the current staff list (from localStorage or defaults)
     * @returns {Object} Staff list
     */
    getStaffList() {
        const stored = localStorage.getItem('staffCredentials');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored credentials, using defaults');
                return { ...this.DEFAULT_STAFF };
            }
        }
        return { ...this.DEFAULT_STAFF };
    },

    /**
     * Initialize staff credentials (run once on first load)
     */
    initializeCredentials() {
        if (!localStorage.getItem('staffCredentials')) {
            localStorage.setItem('staffCredentials', JSON.stringify(this.DEFAULT_STAFF));
        }
    },

    // Keep STAFF_LIST as a getter for backward compatibility
    get STAFF_LIST() {
        return this.getStaffList();
    },

    /**
     * Check if user is currently authenticated
     * @returns {boolean} True if user is logged in
     */
    isAuthenticated() {
        return localStorage.getItem('authToken') !== null && 
               localStorage.getItem('staffId') !== null;
    },

    /**
     * Get current authenticated staff member
     * @returns {Object|null} Staff object or null
     */
    getCurrentStaff() {
        if (!this.isAuthenticated()) return null;
        
        const staffId = localStorage.getItem('staffId');
        return {
            id: staffId,
            name: localStorage.getItem('staffName'),
            role: localStorage.getItem('staffRole'),
            loginTime: localStorage.getItem('loginTime')
        };
    },

    /**
     * Login staff member
     * @param {string} username - Staff username
     * @param {string} password - Staff password
     * @returns {Object} Result {success: boolean, message: string}
     */
    login(username, password) {
        const staff = this.STAFF_LIST[username];
        
        if (!staff) {
            return {
                success: false,
                message: '❌ Invalid username. Only authorized staff can access this area.'
            };
        }

        if (staff.password !== password) {
            return {
                success: false,
                message: '❌ Incorrect password. Please try again.'
            };
        }

        // Create auth token
        const token = 'token_' + Math.random().toString(36).substr(2, 9);
        const now = new Date().toLocaleString();

        // Store authentication in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('staffId', username);
        localStorage.setItem('staffName', staff.name);
        localStorage.setItem('staffRole', staff.role);
        localStorage.setItem('loginTime', now);

        return {
            success: true,
            message: `✅ Welcome ${staff.name}! Logged in as ${staff.role}.`,
            staff: {
                id: username,
                name: staff.name,
                role: staff.role
            }
        };
    },

    /**
     * Logout staff member
     */
    logout() {
        const staffName = localStorage.getItem('staffName');
        
        localStorage.removeItem('authToken');
        localStorage.removeItem('staffId');
        localStorage.removeItem('staffName');
        localStorage.removeItem('staffRole');
        localStorage.removeItem('loginTime');

        return {
            success: true,
            message: `✅ ${staffName} logged out successfully.`
        };
    },

    /**
     * Add new staff member (Administrator only)
     * @param {string} username - New staff username
     * @param {string} name - Staff full name
     * @param {string} password - Staff password
     * @param {string} role - Staff role (Coach, Director, etc.)
     * @returns {Object} Result {success: boolean, message: string}
     */
    addStaff(username, name, password, role) {
        const currentStaff = this.getCurrentStaff();
        
        // Only admin can add staff
        if (!currentStaff || currentStaff.role !== 'Administrator') {
            return {
                success: false,
                message: '❌ Only administrators can add new staff members.'
            };
        }

        const staffList = this.getStaffList();
        
        if (staffList[username]) {
            return {
                success: false,
                message: '❌ Username already exists.'
            };
        }

        if (password.length < 8) {
            return {
                success: false,
                message: '❌ Password must be at least 8 characters long.'
            };
        }

        // Add new staff
        staffList[username] = {
            password: password,
            name: name,
            role: role
        };
        
        // Save to localStorage
        localStorage.setItem('staffCredentials', JSON.stringify(staffList));

        return {
            success: true,
            message: `✅ Staff member "${name}" added successfully.`
        };
    },

    /**
     * Change password for currently logged in staff member
     * @param {string} currentPassword - Staff's current password (for verification)
     * @param {string} newPassword - The desired new password
     * @returns {Object} Result {success: boolean, message: string}
     */
    changePassword(currentPassword, newPassword) {
        try {
            const staff = this.verifyAccess();
            const staffList = this.getStaffList();
            const record = staffList[staff.id];
            
            if (!record) {
                return { success: false, message: '❌ Unable to locate your account.' };
            }

            if (record.password !== currentPassword) {
                return { success: false, message: '❌ Current password is incorrect.' };
            }

            if (newPassword.length < 8) {
                return { success: false, message: '❌ New password must be at least 8 characters.' };
            }

            if (newPassword === currentPassword) {
                return { success: false, message: '❌ New password must be different from the old one.' };
            }

            // Update password and save to localStorage
            record.password = newPassword;
            localStorage.setItem('staffCredentials', JSON.stringify(staffList));

            // if email service available and staff record has email field, send notification
            if (typeof EmailService !== 'undefined' && EmailService.isAvailable() && record.email) {
                EmailService.sendPasswordChangeEmail({
                    to_email: record.email,
                    recipient_name: record.name || staff.id,
                    submission_date: new Date().toLocaleString()
                }).then(() => {
                    console.log('✅ Password change notification email sent');
                }).catch(err => {
                    console.warn('⚠️ Failed to send password change email', err);
                });
            }

            return { success: true, message: '✅ Password changed successfully. Your new password is saved.' };
        } catch (err) {
            return { success: false, message: err.message };
        }
    },


    /**
     * Verify staff can perform action
     * @returns {Object} Staff info if authenticated
     */
    verifyAccess() {
        if (!this.isAuthenticated()) {
            throw new Error('Access denied. Please log in as staff member.');
        }
        return this.getCurrentStaff();
    }
};

// Initialize auth check on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize credentials from localStorage
    AuthService.initializeCredentials();
    
    // Only check auth on admin pages
    if (document.title.includes('Admin') || window.location.pathname.includes('admin')) {
        if (!AuthService.isAuthenticated()) {
            console.log('🔐 Admin access requires staff login');
        } else {
            const staff = AuthService.getCurrentStaff();
            console.log(`✅ Authenticated as: ${staff.name} (${staff.role})`);
        }
    }
});
