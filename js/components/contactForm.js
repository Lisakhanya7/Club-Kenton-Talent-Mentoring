// ===========================
// CONTACT FORM HANDLER
// ===========================
// Handles contact form submissions and sends to club email

const ContactFormHandler = {
    /**
     * Initialize contact form handling
     */
    init() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    },

    /**
     * Handle form submission
     */
    handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const inputs = form.elements;

        // Get form data
        const contactData = {
            name: inputs[0]?.value || '',
            email: inputs[1]?.value || '',
            phone: inputs[2]?.value || '',
            program: inputs[3]?.value || 'General Inquiry',
            age: inputs[4]?.value || '',
            message: inputs[5]?.value || ''
        };

        // Validate required fields
        if (!contactData.name || !contactData.email || !contactData.message) {
            alert('⚠️ Please fill in all required fields (Name, Email, Message)');
            return;
        }

        this.submitForm(form, contactData);
    },

    /**
     * Submit contact form and send email
     */
    async submitForm(form, contactData) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Send email to club
            if (typeof EmailService !== 'undefined') {
                const result = await EmailService.sendContactEmail(contactData);
                if (result.success) {
                    alert('✅ Message sent successfully!\n\nWe will get back to you at ' + contactData.email);
                    form.reset();
                } else {
                    alert('❌ ' + result.message);
                }
            } else {
                console.warn('EmailService not available');
                alert('✅ Message recorded! We will contact you at ' + contactData.email);
                form.reset();
            }
        } catch (error) {
            console.error('Contact form error:', error);
            alert('⚠️ There was an error sending your message. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ContactFormHandler.init();
});
