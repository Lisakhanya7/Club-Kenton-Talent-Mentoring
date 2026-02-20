const EmailService = {
    // EmailJS Configuration
    SERVICE_ID: 'service_clubktm',
    APP_ID: 'qb0ycO-MnNAJp0cB6', 
    TEMPLATE_APPLICATIONS: 'template_applications',
    TEMPLATE_CONTACT: 'template_contact',
    TEMPLATE_PASSWORD_CHANGE: 'template_password_change',
    CLUB_EMAIL: 'clubktm1@gmail.com',


    init() {

        emailjs.init(this.APP_ID);
        console.log('✅ EmailJS Service initialized');
    },

    /**
     * Send program application to club email
     * @param {Object} applicationData - Application details
     */
    sendApplicationEmail(applicationData) {
        const emailParams = {
            to_email: this.CLUB_EMAIL,
            from_name: applicationData.name,
            from_email: applicationData.email,
            phone: applicationData.phone,
            program: applicationData.program,
            role: applicationData.role.toUpperCase(),
            age: applicationData.age || 'N/A',
            experience: applicationData.experience || 'N/A',
            message: applicationData.message || 'No additional message provided',
            submission_date: new Date().toLocaleString()
        };

        return emailjs.send(this.SERVICE_ID, this.TEMPLATE_APPLICATIONS, emailParams)
            .then((response) => {
                console.log('✅ Application email sent successfully!', response);
                return { success: true, message: 'Application sent to club email!' };
            })
            .catch((error) => {
                console.error('❌ Failed to send application email:', error);
                // Don't fail silently - still save to localStorage even if email fails
                return { success: true, message: 'Application saved (email backup failed)' };
            });
    },

    /**
     * Send contact form message to club email
     * @param {Object} contactData - Contact form details
     */
    sendContactEmail(contactData) {
        const emailParams = {
            to_email: this.CLUB_EMAIL,
            from_name: contactData.name,
            from_email: contactData.email,
            phone: contactData.phone || 'Not provided',
            program_interest: contactData.program || 'General Inquiry',
            participant_age: contactData.age || 'N/A',
            message: contactData.message,
            submission_date: new Date().toLocaleString()
        };

        return emailjs.send(this.SERVICE_ID, this.TEMPLATE_CONTACT, emailParams)
            .then((response) => {
                console.log('✅ Contact email sent successfully!', response);
                return { success: true, message: 'Message sent to club!' };
            })
            .catch((error) => {
                console.error('❌ Failed to send contact email:', error);
                return { success: false, message: 'Failed to send message. Please try again.' };
            });
    },

    /**
     * Check if EmailJS is available (service initialized)
     */
    isAvailable() {
        return typeof emailjs !== 'undefined';
    },

    /**
     * Notify a staff member that their password was changed
     * @param {Object} data - { to_email, recipient_name, submission_date }
     */
    sendPasswordChangeEmail(data) {
        if (!this.isAvailable() || !this.TEMPLATE_PASSWORD_CHANGE) {
            return Promise.resolve({ success: false, message: 'Email service not configured.' });
        }
        const params = {
            to_email: data.to_email,
            recipient_name: data.recipient_name,
            submission_date: data.submission_date || new Date().toLocaleString()
        };
        return emailjs.send(this.SERVICE_ID, this.TEMPLATE_PASSWORD_CHANGE, params)
            .then(response => {
                console.log('✅ Password change email sent', response);
                return { success: true };
            }).catch(err => {
                console.error('❌ Password change email failed', err);
                return { success: false };
            });
    }
};

// Initialize EmailJS when page loads
document.addEventListener('DOMContentLoaded', () => {
    EmailService.init();
});
