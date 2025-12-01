// ============================================
// CONFIG & MASTER DATA
// ============================================

// Change this date to update the roster period (must be a Monday)
const ROSTER_START_DATE = "2025-12-15";

// Agent master data (do not modify)
const agents = [
  {"empId":"PW76279","name":"Mayank Bhardwaj"},
  {"empId":"PW64731","name":"Satyam Tripathi"},
  {"empId":"PW83494","name":"Aditya Kumar Chaubey"},
  {"empId":"PW76277","name":"Madhav Anand"},
  {"empId":"PW27994","name":"Ashish Sharma"},
  {"empId":"PW43250","name":"Sanjay"},
  {"empId":"PW83444","name":"Sahil Gambhir"},
  {"empId":"PW75372","name":"Sidhant Bisht"},
  {"empId":"PW75776","name":"Ashish Kumar"},
  {"empId":"PW56244","name":"R Kalyan Nayak"},
  {"empId":"PW48359","name":"Biki Chetia"},
  {"empId":"PW76128","name":"Dinesh Kumar Raigar"},
  {"empId":"PW49158","name":"Kalpana Sharma"},
  {"empId":"PW76274","name":"Karan Singh"},
  {"empId":"PW51965","name":"Amit Sharma"},
  {"empId":"PW44376","name":"Jahanur Miah"},
  {"empId":"PW82788","name":"Prince"},
  {"empId":"PW69698","name":"Ravi Kumar Mishra"},
  {"empId":"PW83513","name":"Dev Gupta"},
  {"empId":"PW42520","name":"Aditya Jain"},
  {"empId":"PW71814","name":"Ishant"},
  {"empId":"PW82448","name":"Anshul"},
  {"empId":"PW43984","name":"Shivang Jaiswal"},
  {"empId":"PW52480","name":"Mohd Samim"},
  {"empId":"PW51977","name":"Anand Kumar Choudhary"},
  {"empId":"PW43981","name":"Rahul Kumar Jha"},
  {"empId":"PW27749","name":"Varun"},
  {"empId":"PW44333","name":"Ravinder Kaur"},
  {"empId":"PW75732","name":"BADAL PAL"},
  {"empId":"PW51799","name":"Yogesh Yadav"},
  {"empId":"PW75360","name":"Kirti Kumari"},
  {"empId":"PW52505","name":"Sakina Noor"},
  {"empId":"PW44939","name":"Priyanka Thakur"},
  {"empId":"PW51776","name":"Asmin Ara Begum"},
  {"empId":"PW76282","name":"Neha"},
  {"empId":"PW44380","name":"Muskan Singh"},
  {"empId":"PW71816","name":"Anushka Sijwali"},
  {"empId":"PW63637","name":"Reshma Sharma"},
  {"empId":"PW50903","name":"Nivedita Dev"},
  {"empId":"PW54677","name":"Harshal Deepak Meshram"},
  {"empId":"PW82804","name":"Sanjeev Kumar Sharma"},
  {"empId":"PW83506","name":"Dev Kumar Ray"},
  {"empId":"PW76281","name":"Mohit Mishra"},
  {"empId":"PW83447","name":"Laxmikant Sharma"},
  {"empId":"PW76280","name":"Milisha Kumari"},
  {"empId":"PW83509","name":"Sumit Kumar"},
  {"empId":"PW51767","name":"Navnita Singh"},
  {"empId":"PW76270","name":"Dhruv Godara"}
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate array of roster dates from start date
 * @returns {Array} Array of Date objects for 14 days
 */
function generateRosterDates() {
    const dates = [];
    const startDate = new Date(ROSTER_START_DATE);
    
    for (let i = 0; i < 14; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
    }
    
    return dates;
}

/**
 * Format date as "Day - DD Mon" (e.g., "Mon - 15 Dec")
 * @param {Date} date 
 * @returns {string}
 */
function formatDayDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return `${dayName} - ${day} ${month}`;
}

/**
 * Format date as YYYY-MM-DD
 * @param {Date} date 
 * @returns {string}
 */
function formatDateISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Parse ISO date string to Date object
 * @param {string} dateStr 
 * @returns {Date}
 */
function parseISODate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Get storage key for agent submission
 * @param {string} empId 
 * @returns {string}
 */
function getStorageKey(empId) {
    return `roster_${empId}_${ROSTER_START_DATE}`;
}

/**
 * Get all submissions from localStorage
 * @returns {Array}
 */
function getAllSubmissions() {
    const submissions = [];
    const prefix = `roster_`;
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix) && key.includes(ROSTER_START_DATE)) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                submissions.push(data);
            } catch (e) {
                console.error('Error parsing submission:', e);
            }
        }
    }
    
    return submissions;
}

/**
 * Save submission to localStorage
 * @param {object} data 
 */
function saveSubmission(data) {
    const key = getStorageKey(data.empId);
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Load submission for an agent
 * @param {string} empId 
 * @returns {object|null}
 */
function loadSubmission(empId) {
    const key = getStorageKey(empId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

/**
 * Delete submission for an agent
 * @param {string} empId 
 */
function deleteSubmission(empId) {
    const key = getStorageKey(empId);
    localStorage.removeItem(key);
}

/**
 * Format timestamp for display
 * @param {number} timestamp 
 * @returns {string}
 */
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    // 12-hour format with AM/PM
    return date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Check if date is within roster range
 * @param {string} dateStr ISO format
 * @returns {boolean}
 */
function isDateInRosterRange(dateStr) {
    const dates = generateRosterDates();
    const checkDate = parseISODate(dateStr);
    
    return dates.some(d => formatDateISO(d) === formatDateISO(checkDate));
}

// ============================================
// DOM ELEMENTS
// ============================================

const form = document.getElementById('preferenceForm');
const agentNameInput = document.getElementById('agentName');
const empIdInput = document.getElementById('empId');
const nameList = document.getElementById('nameList');
const empIdList = document.getElementById('empIdList');
const preferredShiftSelect = document.getElementById('preferredShift');
const weekoff1Select = document.getElementById('weekoff1');
const weekoff2Select = document.getElementById('weekoff2');

// Leave Elements (New)
const leaveToggle = document.getElementById('leaveToggle');
const leaveFields = document.getElementById('leaveFields');
const leaveDatesGrid = document.getElementById('leaveDatesGrid');
const selectAllLeaves = document.getElementById('selectAllLeaves');
const leaveError = document.getElementById('leaveError');
const leaveReasonInput = document.getElementById('leaveReason');
const leaveReasonCount = document.getElementById('leaveReasonCount');

// Special Shift Elements
const specialShiftToggle = document.getElementById('specialShiftToggle');
const specialShiftFields = document.getElementById('specialShiftFields');
const specialShiftsContainer = document.getElementById('specialShiftsContainer');
const addSpecialShiftBtn = document.getElementById('addSpecialShiftBtn');
const specialShiftError = document.getElementById('specialShiftError');
const specialShiftCommentInput = document.getElementById('specialShiftComment');
const specialShiftCommentCount = document.getElementById('specialShiftCommentCount');

const submitBtn = document.getElementById('submitBtn');
const nameError = document.getElementById('nameError');
const empIdError = document.getElementById('empIdError');
const weekoffError = document.getElementById('weekoffError');
const lastSubmissionInfo = document.getElementById('lastSubmissionInfo');
const lastSubmitTime = document.getElementById('lastSubmitTime');
const successModal = document.getElementById('successModal');
const confirmModal = document.getElementById('confirmModal');
const confirmMessage = document.getElementById('confirmMessage');
const shareWhatsAppBtn = document.getElementById('shareWhatsAppBtn');
const editPreferenceBtn = document.getElementById('editPreferenceBtn');
const confirmYesBtn = document.getElementById('confirmYesBtn');
const confirmNoBtn = document.getElementById('confirmNoBtn');
const devToggle = document.getElementById('devToggle');
const adminPanel = document.getElementById('adminPanel');
const closeAdmin = document.getElementById('closeAdmin');
const clearAllBtn = document.getElementById('clearAllBtn');
const refreshAdminBtn = document.getElementById('refreshAdminBtn');
const submittedCount = document.getElementById('submittedCount');
const pendingCount = document.getElementById('pendingCount');
const submissionsList = document.getElementById('submissionsList');

// ============================================
// STATE
// ============================================

let currentSubmission = null;
let pendingConfirmation = false;

// ============================================
// INITIALIZATION
// ============================================

function init() {
    populateDataLists();
    populateWeekoffDropdowns();
    attachEventListeners();
    renderLeaveCheckboxes(); // Render the new leave grid
    checkExistingSubmission();
}

/**
 * Populate name and empId datalists
 */
function populateDataLists() {
    agents.forEach(agent => {
        const nameOption = document.createElement('option');
        nameOption.value = agent.name;
        nameList.appendChild(nameOption);
        
        const empIdOption = document.createElement('option');
        empIdOption.value = agent.empId;
        empIdList.appendChild(empIdOption);
    });
}

/**
 * Populate weekoff dropdowns with dates
 */
function populateWeekoffDropdowns() {
    const dates = generateRosterDates();
    
    // Week 1 (Days 1-7)
    for (let i = 0; i < 7; i++) {
        const option = document.createElement('option');
        option.value = formatDateISO(dates[i]);
        option.textContent = formatDayDate(dates[i]);
        weekoff1Select.appendChild(option);
    }
    
    // Week 2 (Days 8-14)
    for (let i = 7; i < 14; i++) {
        const option = document.createElement('option');
        option.value = formatDateISO(dates[i]);
        option.textContent = formatDayDate(dates[i]);
        weekoff2Select.appendChild(option);
    }
}

/**
 * Render checkboxes for leave dates
 */
function renderLeaveCheckboxes() {
    const dates = generateRosterDates();
    leaveDatesGrid.innerHTML = '';

    dates.forEach(date => {
        const dateStr = formatDateISO(date);
        const labelStr = formatDayDate(date);

        const wrapper = document.createElement('label');
        wrapper.className = 'checkbox-wrapper';
        
        wrapper.innerHTML = `
            <input type="checkbox" class="leave-date-checkbox" value="${dateStr}" data-label="${labelStr}">
            <span class="custom-check"></span>
            <span class="label-text">${labelStr}</span>
        `;
        
        // Add change listener to update Select All state
        const checkbox = wrapper.querySelector('input');
        checkbox.addEventListener('change', () => {
            updateSelectAllState();
            validateForm();
        });

        leaveDatesGrid.appendChild(wrapper);
    });
}

/**
 * Attach all event listeners
 */
function attachEventListeners() {
    // Agent selection
    agentNameInput.addEventListener('input', handleNameInput);
    empIdInput.addEventListener('input', handleEmpIdInput);
    
    // Toggle fields
    leaveToggle.addEventListener('change', handleLeaveToggle);
    specialShiftToggle.addEventListener('change', handleSpecialShiftToggle);
    
    // Special Shift Button
    addSpecialShiftBtn.addEventListener('click', () => addSpecialShiftRow());

    // Select All Leaves
    selectAllLeaves.addEventListener('change', handleSelectAllLeaves);

    // Character counters
    leaveReasonInput.addEventListener('input', () => {
        leaveReasonCount.textContent = leaveReasonInput.value.length;
    });
    specialShiftCommentInput.addEventListener('input', () => {
        specialShiftCommentCount.textContent = specialShiftCommentInput.value.length;
    });
    
    // Form validation
    form.addEventListener('input', validateForm);
    form.addEventListener('change', validateForm);
    
    // Form submission
    form.addEventListener('submit', handleSubmit);
    
    // Modal actions
    shareWhatsAppBtn.addEventListener('click', handleWhatsAppShare);
    editPreferenceBtn.addEventListener('click', closeSuccessModal);
    confirmYesBtn.addEventListener('click', handleConfirmYes);
    confirmNoBtn.addEventListener('click', handleConfirmNo);
    
    // Admin panel
    devToggle.addEventListener('click', toggleAdminPanel);
    closeAdmin.addEventListener('click', toggleAdminPanel);
    clearAllBtn.addEventListener('click', handleClearAll);
    refreshAdminBtn.addEventListener('click', refreshAdminPanel);
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle name input (auto-link to empId)
 */
function handleNameInput(e) {
    const name = e.target.value;
    const agent = agents.find(a => a.name === name);
    
    if (agent) {
        empIdInput.value = agent.empId;
        nameError.textContent = '';
        empIdError.textContent = '';
        checkExistingSubmissionForAgent(agent.empId);
    } else {
        empIdInput.value = '';
    }
    
    validateAgentSelection();
}

/**
 * Handle empId input (auto-link to name)
 */
function handleEmpIdInput(e) {
    const empId = e.target.value;
    const agent = agents.find(a => a.empId === empId);
    
    if (agent) {
        agentNameInput.value = agent.name;
        nameError.textContent = '';
        empIdError.textContent = '';
        checkExistingSubmissionForAgent(agent.empId);
    } else {
        agentNameInput.value = '';
    }
    
    validateAgentSelection();
}

/**
 * Validate agent selection matches
 */
function validateAgentSelection() {
    const name = agentNameInput.value;
    const empId = empIdInput.value;
    
    const agent = agents.find(a => a.name === name && a.empId === empId);
    
    if (name && empId && !agent) {
        nameError.textContent = 'Name and Employee ID do not match';
        empIdError.textContent = 'Name and Employee ID do not match';
        return false;
    } else if (agent) {
        nameError.textContent = '';
        empIdError.textContent = '';
        return true;
    }
    
    return false;
}

/**
 * Handle leave toggle
 */
function handleLeaveToggle(e) {
    if (e.target.checked) {
        leaveFields.style.display = 'block';
    } else {
        leaveFields.style.display = 'none';
        // Uncheck all
        document.querySelectorAll('.leave-date-checkbox').forEach(cb => cb.checked = false);
        selectAllLeaves.checked = false;
        leaveReasonInput.value = '';
        leaveReasonCount.textContent = '0';
        leaveError.textContent = '';
    }
    validateForm();
}

/**
 * Handle Select All Leaves
 */
function handleSelectAllLeaves(e) {
    const checkboxes = document.querySelectorAll('.leave-date-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = e.target.checked;
    });
    validateForm();
}

/**
 * Update Select All State based on individual checkboxes
 */
function updateSelectAllState() {
    const checkboxes = document.querySelectorAll('.leave-date-checkbox');
    const checkedCount = document.querySelectorAll('.leave-date-checkbox:checked').length;
    
    if (checkedCount === 0) {
        selectAllLeaves.checked = false;
        selectAllLeaves.indeterminate = false;
    } else if (checkedCount === checkboxes.length) {
        selectAllLeaves.checked = true;
        selectAllLeaves.indeterminate = false;
    } else {
        selectAllLeaves.checked = false;
        selectAllLeaves.indeterminate = true;
    }
}

/**
 * Handle special shift toggle
 */
function handleSpecialShiftToggle(e) {
    if (e.target.checked) {
        specialShiftFields.style.display = 'block';
        // Add one empty row if none exist
        if (specialShiftsContainer.children.length === 0) {
            addSpecialShiftRow();
        }
    } else {
        specialShiftFields.style.display = 'none';
        specialShiftsContainer.innerHTML = ''; // Clear all rows
        specialShiftCommentInput.value = '';
        specialShiftCommentCount.textContent = '0';
        specialShiftError.textContent = '';
    }
    validateForm();
}

/**
 * Add a new dynamic row for special shift
 * @param {object} data Optional data to pre-fill
 */
function addSpecialShiftRow(data = null) {
    const rowId = Date.now(); // Unique ID for the row
    const row = document.createElement('div');
    row.className = 'special-shift-row';
    row.id = `row-${rowId}`;

    // Get date options
    const dates = generateRosterDates();
    let dateOptions = '<option value="">Select Date...</option>';
    dates.forEach(d => {
        dateOptions += `<option value="${formatDateISO(d)}">${formatDayDate(d)}</option>`;
    });

    // Shift Options
    const shiftOptions = `
        <option value="">Select Shift...</option>
        <option value="08:00 AM - 05:00 PM">08:00 AM - 05:00 PM</option>
        <option value="09:00 AM - 06:00 PM">09:00 AM - 06:00 PM</option>
        <option value="10:00 AM - 07:00 PM">10:00 AM - 07:00 PM</option>
        <option value="11:00 AM - 08:00 PM">11:00 AM - 08:00 PM</option>
        <option value="12:00 PM - 09:00 PM">12:00 PM - 09:00 PM</option>
        <option value="01:00 PM - 10:00 PM">01:00 PM - 10:00 PM</option>
    `;

    row.innerHTML = `
        <div class="form-group">
            <label style="font-size: 0.8rem;">Date</label>
            <select class="special-date-select" required>${dateOptions}</select>
        </div>
        <div class="form-group">
            <label style="font-size: 0.8rem;">Shift</label>
            <select class="special-shift-select" required>${shiftOptions}</select>
        </div>
        <button type="button" class="btn-remove" onclick="removeSpecialShiftRow('${rowId}')">×</button>
    `;

    specialShiftsContainer.appendChild(row);

    // If data provided (loading from storage), set values
    if (data) {
        row.querySelector('.special-date-select').value = data.date;
        row.querySelector('.special-shift-select').value = data.shift;
    }

    // Add validation listeners to new inputs
    const newDateSelect = row.querySelector('.special-date-select');
    const newShiftSelect = row.querySelector('.special-shift-select');
    
    newDateSelect.addEventListener('change', validateForm);
    newShiftSelect.addEventListener('change', validateForm);

    validateForm();
}

/**
 * Remove a special shift row
 */
function removeSpecialShiftRow(rowId) {
    const row = document.getElementById(`row-${rowId}`);
    if (row) {
        row.remove();
        validateForm();
    }
}

/**
 * Validate leave entries (Checkboxes)
 */
function validateLeave() {
    if (!leaveToggle.checked) return true;
    
    const checkedBoxes = document.querySelectorAll('.leave-date-checkbox:checked');
    if (checkedBoxes.length === 0) {
        leaveError.textContent = 'Please select at least one date or turn off Leave Request.';
        return false;
    }

    leaveError.textContent = '';
    return true;
}

/**
 * Validate special shift request
 */
function validateSpecialShift() {
    if (!specialShiftToggle.checked) return true;
    
    const rows = document.querySelectorAll('.special-shift-row');
    if (rows.length === 0) {
        specialShiftError.textContent = 'Please add at least one date or turn off the toggle.';
        return false;
    }

    let isValid = true;
    const selectedDates = [];

    rows.forEach(row => {
        const date = row.querySelector('.special-date-select').value;
        const shift = row.querySelector('.special-shift-select').value;

        if (!date || !shift) {
            isValid = false;
        }

        // Check for duplicates
        if (date) {
            if (selectedDates.includes(date)) {
                specialShiftError.textContent = 'You have selected the same date multiple times.';
                isValid = false;
            }
            selectedDates.push(date);
        }
        
        // Check conflict with Leave
        if (leaveToggle.checked && date) {
             const checkedLeaves = document.querySelectorAll('.leave-date-checkbox:checked');
             checkedLeaves.forEach(cb => {
                 if (cb.value === date) {
                     specialShiftError.textContent = 'Cannot request special shift on a leave day';
                     isValid = false;
                 }
             });
        }
    });

    if (!isValid && !specialShiftError.textContent) {
        specialShiftError.textContent = 'Please fill all date and shift fields.';
    } else if (isValid) {
        specialShiftError.textContent = '';
    }

    return isValid;
}

/**
 * Validate entire form
 */
function validateForm() {
    const agentValid = validateAgentSelection();
    const leaveValid = validateLeave();
    const specialShiftValid = validateSpecialShift();
    
    const allFieldsFilled = agentValid &&
        preferredShiftSelect.value &&
        weekoff1Select.value &&
        weekoff2Select.value &&
        (!leaveToggle.checked || leaveValid) &&
        (!specialShiftToggle.checked || specialShiftValid);
    
    const allValid = allFieldsFilled && leaveValid && specialShiftValid;
    
    submitBtn.disabled = !allValid;
}

/**
 * Handle form submission
 */
function handleSubmit(e) {
    e.preventDefault();
    
    // Check if weekoffs are same day of week
    const weekoff1Date = new Date(weekoff1Select.value);
    const weekoff2Date = new Date(weekoff2Select.value);
    
    if (weekoff1Date.getDay() === weekoff2Date.getDay() && !pendingConfirmation) {
        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][weekoff1Date.getDay()];
        confirmMessage.textContent = `You selected the same weekday (${dayName}) for both weekoffs. Continue?`;
        confirmModal.classList.add('active');
        return;
    }
    
    // Collect form data
    const formData = {
        name: agentNameInput.value,
        empId: empIdInput.value,
        preferredShift: preferredShiftSelect.value,
        weekoff1: {
            date: weekoff1Select.value,
            label: weekoff1Select.options[weekoff1Select.selectedIndex].text
        },
        weekoff2: {
            date: weekoff2Select.value,
            label: weekoff2Select.options[weekoff2Select.selectedIndex].text
        },
        leave: null,
        specialShift: null,
        timestamp: Date.now(),
        rosterStartDate: ROSTER_START_DATE
    };
    
    // Add leave if enabled
    if (leaveToggle.checked) {
        const leaveDates = [];
        document.querySelectorAll('.leave-date-checkbox:checked').forEach(cb => {
            leaveDates.push({
                date: cb.value,
                label: cb.dataset.label
            });
        });

        formData.leave = {
            dates: leaveDates,
            reason: leaveReasonInput.value || 'Not specified'
        };
    }
    
    // Add special shift if enabled
    if (specialShiftToggle.checked) {
        const specialShifts = [];
        document.querySelectorAll('.special-shift-row').forEach(row => {
            const dateVal = row.querySelector('.special-date-select').value;
            const shiftVal = row.querySelector('.special-shift-select').value;
            const dateObj = new Date(dateVal);
            
            specialShifts.push({
                date: dateVal,
                dateLabel: formatDayDate(dateObj),
                shift: shiftVal
            });
        });

        formData.specialShift = {
            requests: specialShifts,
            comment: specialShiftCommentInput.value || ''
        };
    }
    
    // Save submission
    currentSubmission = formData;
    saveSubmission(formData);
    
    // Show success modal
    successModal.classList.add('active');
    pendingConfirmation = false;
}

/**
 * Handle weekoff confirmation yes
 */
function handleConfirmYes() {
    confirmModal.classList.remove('active');
    pendingConfirmation = true;
    form.dispatchEvent(new Event('submit', { cancelable: true }));
}

/**
 * Handle weekoff confirmation no
 */
function handleConfirmNo() {
    confirmModal.classList.remove('active');
    pendingConfirmation = false;
}

/**
 * Generate WhatsApp message
 */
function generateWhatsAppMessage(data) {
    const dates = generateRosterDates();
    const startLabel = formatDayDate(dates[0]);
    const endLabel = formatDayDate(dates[13]);
    
    let message = `Hi — I have submitted my roster preference for the period ${startLabel} → ${endLabel}.\n\n`;
    message += `Name: ${data.name}\n`;
    message += `EmpID: ${data.empId}\n`;
    message += `Shift: ${data.preferredShift}\n`;
    message += `Weekoff1: ${data.weekoff1.label}\n`;
    message += `Weekoff2: ${data.weekoff2.label}\n`;
    
    if (data.leave && data.leave.dates && data.leave.dates.length > 0) {
        message += `Leave Requests (${data.leave.dates.length} days):\n`;
        data.leave.dates.forEach(l => {
             message += `• ${l.label}\n`;
        });
        if (data.leave.reason) {
            message += `Reason: ${data.leave.reason}\n`;
        }
    } else {
        message += `Leave: None\n`;
    }
    
    if (data.specialShift && data.specialShift.requests && data.specialShift.requests.length > 0) {
        message += `Special requests:\n`;
        data.specialShift.requests.forEach(req => {
            message += `• ${req.dateLabel}: ${req.shift}\n`;
        });
        if (data.specialShift.comment) {
            message += `Note: ${data.specialShift.comment}\n`;
        }
    } else {
        message += `Special request: None\n`;
    }
    
    message += `\n— Please update if needed.`;
    
    return encodeURIComponent(message);
}

/**
 * Handle WhatsApp share
 */
function handleWhatsAppShare() {
    if (currentSubmission) {
        const message = generateWhatsAppMessage(currentSubmission);
        const url = `https://wa.me/?text=${message}`;
        window.open(url, '_blank');
    }
}

/**
 * Close success modal
 */
function closeSuccessModal() {
    successModal.classList.remove('active');
    currentSubmission = null;
}

/**
 * Check for existing submission on page load
 */
function checkExistingSubmission() {
    // This will be called when agent is selected
}

/**
 * Check for existing submission for specific agent
 */
function checkExistingSubmissionForAgent(empId) {
    const submission = loadSubmission(empId);
    
    if (submission) {
        lastSubmissionInfo.style.display = 'block';
        lastSubmitTime.textContent = formatTimestamp(submission.timestamp);
        
        // Pre-fill form with existing data
        agentNameInput.value = submission.name;
        empIdInput.value = submission.empId;
        preferredShiftSelect.value = submission.preferredShift;
        weekoff1Select.value = submission.weekoff1.date;
        weekoff2Select.value = submission.weekoff2.date;
        
        if (submission.leave) {
            leaveToggle.checked = true;
            leaveFields.style.display = 'block';
            
            // Uncheck all first
            document.querySelectorAll('.leave-date-checkbox').forEach(cb => cb.checked = false);

            if (submission.leave.dates && Array.isArray(submission.leave.dates)) {
                // New format
                submission.leave.dates.forEach(d => {
                     const cb = document.querySelector(`.leave-date-checkbox[value="${d.date}"]`);
                     if (cb) cb.checked = true;
                });
            } else if (submission.leave.from) {
                 // Fallback for old format
                 const cbFrom = document.querySelector(`.leave-date-checkbox[value="${submission.leave.from}"]`);
                 if (cbFrom) cbFrom.checked = true;
                 if(submission.leave.till !== submission.leave.from) {
                     const cbTill = document.querySelector(`.leave-date-checkbox[value="${submission.leave.till}"]`);
                     if (cbTill) cbTill.checked = true;
                 }
            }
            
            updateSelectAllState();
            leaveReasonInput.value = submission.leave.reason === 'Not specified' ? '' : submission.leave.reason;
            leaveReasonCount.textContent = leaveReasonInput.value.length;
        }
        
        if (submission.specialShift) {
            specialShiftToggle.checked = true;
            specialShiftFields.style.display = 'block';
            specialShiftsContainer.innerHTML = ''; // Clear defaults

            if (Array.isArray(submission.specialShift.requests)) {
                submission.specialShift.requests.forEach(req => {
                    addSpecialShiftRow(req);
                });
            } else if (submission.specialShift.date) {
                addSpecialShiftRow({
                    date: submission.specialShift.date,
                    shift: submission.specialShift.shift
                });
            }

            specialShiftCommentInput.value = submission.specialShift.comment || '';
            specialShiftCommentCount.textContent = specialShiftCommentInput.value.length;
        }
        
        validateForm();
    } else {
        lastSubmissionInfo.style.display = 'none';
    }
}

// ============================================
// ADMIN PANEL
// ============================================

/**
 * Toggle admin panel
 */
function toggleAdminPanel() {
    adminPanel.classList.toggle('active');
    if (adminPanel.classList.contains('active')) {
        refreshAdminPanel();
    }
}

/**
 * Refresh admin panel data
 */
function refreshAdminPanel() {
    const submissions = getAllSubmissions();
    const submittedAgents = submissions.map(s => s.empId);
    const pendingAgents = agents.filter(a => !submittedAgents.includes(a.empId));
    
    submittedCount.textContent = submissions.length;
    pendingCount.textContent = pendingAgents.length;
    
    // Render submissions list
    submissionsList.innerHTML = '';
    
    // Submitted agents
    submissions.forEach(submission => {
        const card = document.createElement('div');
        card.className = 'submission-card submitted';
        
        let detailsHTML = `
            <div class="submission-header">
                <h3>${submission.name} (${submission.empId})</h3>
                <span class="submission-badge">Submitted</span>
            </div>
            <div class="submission-details">
                <div><strong>Submitted:</strong> ${formatTimestamp(submission.timestamp)}</div>
                <div><strong>Shift:</strong> ${submission.preferredShift}</div>
                <div><strong>Week Off 1:</strong> ${submission.weekoff1.label}</div>
                <div><strong>Week Off 2:</strong> ${submission.weekoff2.label}</div>
        `;
        
        if (submission.leave) {
            if (submission.leave.dates) {
                let leaveHtml = '<div><strong>Leave Dates:</strong></div><ul style="margin:0; padding-left:1.2rem;">';
                submission.leave.dates.forEach(d => {
                    leaveHtml += `<li>${d.label}</li>`;
                });
                leaveHtml += '</ul>';
                detailsHTML += leaveHtml;
            } else if(submission.leave.from) {
                const fromDate = new Date(submission.leave.from);
                const tillDate = new Date(submission.leave.till);
                detailsHTML += `<div><strong>Leave:</strong> ${formatDayDate(fromDate)} to ${formatDayDate(tillDate)}</div>`;
            }

            if (submission.leave.reason !== 'Not specified') {
                detailsHTML += `<div><strong>Reason:</strong> ${submission.leave.reason}</div>`;
            }
        }
        
        if (submission.specialShift && submission.specialShift.requests) {
            let specialHtml = '<div><strong>Special Shifts:</strong></div><ul style="margin:0; padding-left:1.2rem;">';
            submission.specialShift.requests.forEach(req => {
                specialHtml += `<li>${req.dateLabel} — ${req.shift}</li>`;
            });
            specialHtml += '</ul>';
            detailsHTML += specialHtml;
            
            if (submission.specialShift.comment) {
                detailsHTML += `<div><strong>Comment:</strong> ${submission.specialShift.comment}</div>`;
            }
        }
        
        detailsHTML += `
            </div>
            <div class="submission-actions">
                <button onclick="deleteAgentSubmission('${submission.empId}')">Clear Submission</button>
            </div>
        `;
        
        card.innerHTML = detailsHTML;
        submissionsList.appendChild(card);
    });
    
    // Pending agents
    pendingAgents.forEach(agent => {
        const card = document.createElement('div');
        card.className = 'pending-card';
        card.innerHTML = `<strong>${agent.name}</strong> (${agent.empId}) — Pending submission`;
        submissionsList.appendChild(card);
    });
}

/**
 * Delete agent submission
 */
function deleteAgentSubmission(empId) {
    if (confirm('Are you sure you want to clear this submission?')) {
        deleteSubmission(empId);
        refreshAdminPanel();
    }
}

/**
 * Clear all submissions
 */
function handleClearAll() {
    if (confirm('Are you sure you want to clear ALL submissions? This cannot be undone.')) {
        const submissions = getAllSubmissions();
        submissions.forEach(s => deleteSubmission(s.empId));
        refreshAdminPanel();
        alert('All submissions cleared');
    }
}

// ============================================
// START APP
// ============================================

document.addEventListener('DOMContentLoaded', init);