// ===========================
// PROGRAM APPLICATION COMPONENT
// ===========================

const ProgramApplicationComponent = {
    /**
     * Initialize application modal functionality
     */
    init() {
        this.createApplicationModal();
        this.setupApplyButtons();
        this.setupFormHandling();
    },

    /**
     * Create the application modal HTML
     */
    createApplicationModal() {
        const modalHTML = `
            <div id="applicationModal" class="modal" style="display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5);">
                <div class="modal-content" style="background-color: #fefefe; margin: 5% auto; padding: 2rem; border-radius: 10px; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                    <span class="close" onclick="ProgramApplicationComponent.closeModal()" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer;">&times;</span>
                    
                    <h2 style="color: #0052a3; margin-top: 0;" id="modalProgramTitle">Apply for Program</h2>
                    
                    <form id="applicationForm" style="margin-top: 1.5rem;">
                        <!-- Program selection (hidden, set by button) -->
                        <input type="hidden" id="programName" name="program">
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; font-weight: bold; margin-bottom: 0.5rem;">What is your role? *</label>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <label style="display: flex; align-items: center; cursor: pointer; padding: 1rem; border: 2px solid #ddd; border-radius: 5px; transition: all 0.3s;">
                                    <input type="radio" name="role" value="participant" required style="margin-right: 0.5rem;"> Participant / Player / Learner
                                </label>
                                <label style="display: flex; align-items: center; cursor: pointer; padding: 1rem; border: 2px solid #ddd; border-radius: 5px; transition: all 0.3s;">
                                    <input type="radio" name="role" value="coach" style="margin-right: 0.5rem;"> Coach / Instructor / Teacher
                                </label>
                            </div>
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; font-weight: bold; margin-bottom: 0.5rem;">Full Name *</label>
                            <input type="text" id="applicantName" name="name" placeholder="Enter your full name" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem; box-sizing: border-box;">
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; font-weight: bold; margin-bottom: 0.5rem;">Email *</label>
                            <input type="email" id="applicantEmail" name="email" placeholder="Enter your email" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem; box-sizing: border-box;">
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; font-weight: bold; margin-bottom: 0.5rem;">Phone Number *</label>
                            <input type="tel" id="applicantPhone" name="phone" placeholder="Enter your phone number" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem; box-sizing: border-box;">
                        </div>

                        <div id="participantFields" style="margin-bottom: 1rem;">
                            <label style="display: block; font-weight: bold; margin-bottom: 0.5rem;">Age *</label>
                            <input type="number" id="applicantAge" name="age" placeholder="Enter your age" min="5" max="60" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem; box-sizing: border-box;">
                        </div>

                        <div id="coachFields" style="display: none; margin-bottom: 1rem;">
                            <label style="display: block; font-weight: bold; margin-bottom: 0.5rem;">Experience / Qualifications *</label>
                            <textarea id="coachExperience" name="experience" placeholder="Tell us about your coaching experience and qualifications" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem; box-sizing: border-box; resize: vertical;" rows="4"></textarea>
                        </div>

                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; font-weight: bold; margin-bottom: 0.5rem;">Message / Additional Info</label>
                            <textarea id="applicantMessage" name="message" placeholder="Tell us anything else you'd like us to know..." style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem; box-sizing: border-box; resize: vertical;" rows="3"></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 1.1rem; cursor: pointer;">Submit Application</button>
                    </form>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Setup role change listener
        document.querySelectorAll('input[name="role"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateFormFields());
        });
    },

    /**
     * Update form fields based on selected role
     */
    updateFormFields() {
        const role = document.querySelector('input[name="role"]:checked')?.value;
        const participantFields = document.getElementById('participantFields');
        const coachFields = document.getElementById('coachFields');
        const ageInput = document.getElementById('applicantAge');
        const experienceInput = document.getElementById('coachExperience');

        if (role === 'participant') {
            participantFields.style.display = 'block';
            coachFields.style.display = 'none';
            ageInput.required = true;
            experienceInput.required = false;
        } else if (role === 'coach') {
            participantFields.style.display = 'none';
            coachFields.style.display = 'block';
            ageInput.required = false;
            experienceInput.required = true;
        }
    },

    /**
     * Setup apply buttons on program cards
     */
    setupApplyButtons() {
        const observer = new MutationObserver(() => {
            const programCards = document.querySelectorAll('.program-card');
            programCards.forEach(card => {
                if (!card.querySelector('.apply-btn')) {
                    const title = card.querySelector('h3')?.textContent || 'Program';
                    const applyBtn = document.createElement('button');
                    applyBtn.className = 'apply-btn';
                    applyBtn.style.cssText = `
                        display: block;
                        width: 100%;
                        padding: 0.8rem;
                        margin-top: 1rem;
                        background-color: #0052a3;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: background-color 0.3s;
                    `;
                    applyBtn.textContent = 'Apply Now';
                    applyBtn.onclick = () => ProgramApplicationComponent.openModal(title);
                    
                    // Add hover effect
                    applyBtn.onmouseover = () => applyBtn.style.backgroundColor = '#003d7a';
                    applyBtn.onmouseout = () => applyBtn.style.backgroundColor = '#0052a3';
                    
                    card.appendChild(applyBtn);
                }
            });
        });

        // Start observing for DOM changes
        observer.observe(document.body, { childList: true, subtree: true });

        // Also check current elements
        const programCards = document.querySelectorAll('.program-card');
        programCards.forEach(card => {
            if (!card.querySelector('.apply-btn')) {
                const title = card.querySelector('h3')?.textContent || 'Program';
                const applyBtn = document.createElement('button');
                applyBtn.className = 'apply-btn';
                applyBtn.style.cssText = `
                    display: block;
                    width: 100%;
                    padding: 0.8rem;
                    margin-top: 1rem;
                    background-color: #0052a3;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background-color 0.3s;
                `;
                applyBtn.textContent = 'Apply Now';
                applyBtn.onclick = () => ProgramApplicationComponent.openModal(title);
                
                // Add hover effect
                applyBtn.onmouseover = () => applyBtn.style.backgroundColor = '#003d7a';
                applyBtn.onmouseout = () => applyBtn.style.backgroundColor = '#0052a3';
                
                card.appendChild(applyBtn);
            }
        });
    },

    /**
     * Open application modal for a specific program
     * @param {string} programName - Name of the program
     */
    openModal(programName) {
        const modal = document.getElementById('applicationModal');
        document.getElementById('modalProgramTitle').textContent = `Apply for ${programName}`;
        document.getElementById('programName').value = programName;
        document.getElementById('applicationForm').reset();
        document.getElementById('participantFields').style.display = 'block';
        document.getElementById('coachFields').style.display = 'none';
        modal.style.display = 'block';

        // Scroll to modal
        document.querySelector('.modal-content').scrollTop = 0;
    },

    /**
     * Close application modal
     */
    closeModal() {
        document.getElementById('applicationModal').style.display = 'none';
    },

    /**
     * Setup form submission
     */
    setupFormHandling() {
        document.getElementById('applicationForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.querySelector('#applicationForm button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            const application = {
                id: StorageManager.getNextId('applications'),
                timestamp: new Date().toISOString(),
                program: document.getElementById('programName').value,
                role: document.querySelector('input[name="role"]:checked').value,
                name: document.getElementById('applicantName').value,
                email: document.getElementById('applicantEmail').value,
                phone: document.getElementById('applicantPhone').value,
                age: document.querySelector('input[name="role"]:checked').value === 'participant' ? 
                    document.getElementById('applicantAge').value : null,
                experience: document.querySelector('input[name="role"]:checked').value === 'coach' ? 
                    document.getElementById('coachExperience').value : null,
                message: document.getElementById('applicantMessage').value
            };

            // Save to localStorage for admin access
            StorageManager.addItem('applications', application);

            // Send email to club
            try {
                if (typeof EmailService !== 'undefined') {
                    await EmailService.sendApplicationEmail(application);
                    console.log('✅ Application email sent to club');
                } else {
                    console.log('⚠️ EmailService not available, application saved to storage only');
                }
            } catch (error) {
                console.error('Email error (application still saved):', error);
            }

            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            alert('✅ Application submitted successfully!\n\nWe will contact you shortly at ' + application.email);
            this.closeModal();
            document.getElementById('applicationForm').reset();
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ProgramApplicationComponent.init();
});
