// ============================================
// CONFIG & MASTER DATA
// ============================================

const ROSTER_START_DATE = "2025-12-15";

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

// ... UTILITY FUNCTIONS SAME AS BEFORE ...
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

function formatDayDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]} - ${date.getDate()} ${months[date.getMonth()]}`;
}

function formatDateISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseISODate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function getStorageKey(empId) { return `roster_${empId}_${ROSTER_START_DATE}`; }

function getAllSubmissions() {
    const submissions = [];
    const prefix = `roster_`;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix) && key.includes(ROSTER_START_DATE)) {
            try { submissions.push(JSON.parse(localStorage.getItem(key))); } catch (e) {}
        }
    }
    return submissions;
}

function saveSubmission(data) { localStorage.setItem(getStorageKey(data.empId), JSON.stringify(data)); }
function loadSubmission(empId) { const data = localStorage.getItem(getStorageKey(empId)); return data ? JSON.parse(data) : null; }
function deleteSubmission(empId) { localStorage.removeItem(getStorageKey(empId)); }

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
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

const leaveToggle = document.getElementById('leaveToggle');
const leaveFields = document.getElementById('leaveFields');
const leaveDatesGrid = document.getElementById('leaveDatesGrid');
const selectAllLeaves = document.getElementById('selectAllLeaves');
const leaveError = document.getElementById('leaveError');
const leaveReasonInput = document.getElementById('leaveReason');
const leaveReasonCount = document.getElementById('leaveReasonCount');

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
    renderLeaveCheckboxes();
    checkExistingSubmission();
}

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

function populateWeekoffDropdowns() {
    const dates = generateRosterDates();
    for (let i = 0; i < 7; i++) {
        const option = document.createElement('option');
        option.value = formatDateISO(dates[i]);
        option.textContent = formatDayDate(dates[i]);
        weekoff1Select.appendChild(option);
    }
    for (let i = 7; i < 14; i++) {
        const option = document.createElement('option');
        option.value = formatDateISO(dates[i]);
        option.textContent = formatDayDate(dates[i]);
        weekoff2Select.appendChild(option);
    }
}

// *** NEW RENDER FUNCTION FOR TILES ***
function renderLeaveCheckboxes() {
    const dates = generateRosterDates();
    leaveDatesGrid.innerHTML = '';
    dates.forEach(date => {
        const dateStr = formatDateISO(date);
        const labelStr = formatDayDate(date);
        
        // Changed structure for Tile styling
        const wrapper = document.createElement('label');
        wrapper.className = 'checkbox-tile';
        
        wrapper.innerHTML = `
            <input type="checkbox" class="leave-date-checkbox" value="${dateStr}" data-label="${labelStr}">
            <span class="tile-content">${labelStr}</span>
        `;
        
        const checkbox = wrapper.querySelector('input');
        checkbox.addEventListener('change', () => {
            updateSelectAllState();
            validateForm();
        });
        leaveDatesGrid.appendChild(wrapper);
    });
}

function attachEventListeners() {
    agentNameInput.addEventListener('input', handleNameInput);
    empIdInput.addEventListener('input', handleEmpIdInput);
    leaveToggle.addEventListener('change', handleLeaveToggle);
    specialShiftToggle.addEventListener('change', handleSpecialShiftToggle);
    addSpecialShiftBtn.addEventListener('click', () => addSpecialShiftRow());
    selectAllLeaves.addEventListener('change', handleSelectAllLeaves);
    leaveReasonInput.addEventListener('input', () => { leaveReasonCount.textContent = leaveReasonInput.value.length; });
    specialShiftCommentInput.addEventListener('input', () => { specialShiftCommentCount.textContent = specialShiftCommentInput.value.length; });
    form.addEventListener('input', validateForm);
    form.addEventListener('change', validateForm);
    form.addEventListener('submit', handleSubmit);
    shareWhatsAppBtn.addEventListener('click', handleWhatsAppShare);
    editPreferenceBtn.addEventListener('click', closeSuccessModal);
    confirmYesBtn.addEventListener('click', handleConfirmYes);
    confirmNoBtn.addEventListener('click', handleConfirmNo);
    devToggle.addEventListener('click', toggleAdminPanel);
    closeAdmin.addEventListener('click', toggleAdminPanel);
    clearAllBtn.addEventListener('click', handleClearAll);
    refreshAdminBtn.addEventListener('click', refreshAdminPanel);
}

// ... EVENT HANDLERS (Same as before) ...
function handleNameInput(e) {
    const name = e.target.value;
    const agent = agents.find(a => a.name === name);
    if (agent) {
        empIdInput.value = agent.empId;
        nameError.textContent = ''; empIdError.textContent = '';
        checkExistingSubmissionForAgent(agent.empId);
    } else { empIdInput.value = ''; }
    validateAgentSelection();
}

function handleEmpIdInput(e) {
    const empId = e.target.value;
    const agent = agents.find(a => a.empId === empId);
    if (agent) {
        agentNameInput.value = agent.name;
        nameError.textContent = ''; empIdError.textContent = '';
        checkExistingSubmissionForAgent(agent.empId);
    } else { agentNameInput.value = ''; }
    validateAgentSelection();
}

function validateAgentSelection() {
    const name = agentNameInput.value; const empId = empIdInput.value;
    const agent = agents.find(a => a.name === name && a.empId === empId);
    if (name && empId && !agent) {
        nameError.textContent = 'Mismatch'; empIdError.textContent = 'Mismatch'; return false;
    }
    nameError.textContent = ''; empIdError.textContent = ''; return !!agent;
}

function handleLeaveToggle(e) {
    if (e.target.checked) {
        leaveFields.style.display = 'block';
    } else {
        leaveFields.style.display = 'none';
        document.querySelectorAll('.leave-date-checkbox').forEach(cb => cb.checked = false);
        selectAllLeaves.checked = false;
        leaveReasonInput.value = ''; leaveReasonCount.textContent = '0';
    }
    validateForm();
}

function handleSelectAllLeaves(e) {
    document.querySelectorAll('.leave-date-checkbox').forEach(cb => cb.checked = e.target.checked);
    validateForm();
}

function updateSelectAllState() {
    const checkboxes = document.querySelectorAll('.leave-date-checkbox');
    const checkedCount = document.querySelectorAll('.leave-date-checkbox:checked').length;
    if (checkedCount === 0) { selectAllLeaves.checked = false; selectAllLeaves.indeterminate = false; }
    else if (checkedCount === checkboxes.length) { selectAllLeaves.checked = true; selectAllLeaves.indeterminate = false; }
    else { selectAllLeaves.checked = false; selectAllLeaves.indeterminate = true; }
}

function handleSpecialShiftToggle(e) {
    if (e.target.checked) {
        specialShiftFields.style.display = 'block';
        if (specialShiftsContainer.children.length === 0) addSpecialShiftRow();
    } else {
        specialShiftFields.style.display = 'none';
        specialShiftsContainer.innerHTML = '';
        specialShiftCommentInput.value = ''; specialShiftCommentCount.textContent = '0';
    }
    validateForm();
}

function addSpecialShiftRow(data = null) {
    const rowId = Date.now();
    const row = document.createElement('div');
    row.className = 'special-shift-row';
    row.id = `row-${rowId}`;
    
    // Options logic same as before...
    const dates = generateRosterDates();
    let dateOptions = '<option value="">Select Date...</option>';
    dates.forEach(d => { dateOptions += `<option value="${formatDateISO(d)}">${formatDayDate(d)}</option>`; });
    
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
            <label>Date</label>
            <select class="special-date-select" required>${dateOptions}</select>
        </div>
        <div class="form-group">
            <label>Shift</label>
            <select class="special-shift-select" required>${shiftOptions}</select>
        </div>
        <button type="button" class="btn-remove" onclick="removeSpecialShiftRow('${rowId}')">×</button>
    `;
    specialShiftsContainer.appendChild(row);
    if (data) {
        row.querySelector('.special-date-select').value = data.date;
        row.querySelector('.special-shift-select').value = data.shift;
    }
    row.querySelector('.special-date-select').addEventListener('change', validateForm);
    row.querySelector('.special-shift-select').addEventListener('change', validateForm);
    validateForm();
}

function removeSpecialShiftRow(rowId) {
    const row = document.getElementById(`row-${rowId}`);
    if (row) { row.remove(); validateForm(); }
}

function validateLeave() {
    if (!leaveToggle.checked) return true;
    const checkedBoxes = document.querySelectorAll('.leave-date-checkbox:checked');
    if (checkedBoxes.length === 0) { leaveError.textContent = 'Select at least one day.'; return false; }
    leaveError.textContent = ''; return true;
}

function validateSpecialShift() {
    if (!specialShiftToggle.checked) return true;
    const rows = document.querySelectorAll('.special-shift-row');
    if (rows.length === 0) return false;
    let isValid = true; const selectedDates = [];
    rows.forEach(row => {
        const date = row.querySelector('.special-date-select').value;
        const shift = row.querySelector('.special-shift-select').value;
        if (!date || !shift) isValid = false;
        if (date) {
            if (selectedDates.includes(date)) isValid = false;
            selectedDates.push(date);
            // Check conflict with leave
            const checkedLeaves = document.querySelectorAll('.leave-date-checkbox:checked');
            checkedLeaves.forEach(cb => { if(cb.value === date) isValid = false; });
        }
    });
    return isValid;
}

function validateForm() {
    const allFieldsFilled = validateAgentSelection() && preferredShiftSelect.value && weekoff1Select.value && weekoff2Select.value && (!leaveToggle.checked || validateLeave()) && (!specialShiftToggle.checked || validateSpecialShift());
    submitBtn.disabled = !allFieldsFilled;
}

function handleSubmit(e) {
    e.preventDefault();
    const weekoff1Date = new Date(weekoff1Select.value);
    const weekoff2Date = new Date(weekoff2Select.value);
    if (weekoff1Date.getDay() === weekoff2Date.getDay() && !pendingConfirmation) {
        confirmMessage.textContent = `Same weekday selected for both offs. Sure?`;
        confirmModal.classList.add('active'); return;
    }

    const formData = {
        name: agentNameInput.value, empId: empIdInput.value,
        preferredShift: preferredShiftSelect.value,
        weekoff1: { date: weekoff1Select.value, label: weekoff1Select.options[weekoff1Select.selectedIndex].text },
        weekoff2: { date: weekoff2Select.value, label: weekoff2Select.options[weekoff2Select.selectedIndex].text },
        leave: null, specialShift: null, timestamp: Date.now(), rosterStartDate: ROSTER_START_DATE
    };

    if (leaveToggle.checked) {
        const leaveDates = [];
        document.querySelectorAll('.leave-date-checkbox:checked').forEach(cb => {
            leaveDates.push({ date: cb.value, label: cb.dataset.label });
        });
        formData.leave = { dates: leaveDates, reason: leaveReasonInput.value || 'Not specified' };
    }

    if (specialShiftToggle.checked) {
        const specialShifts = [];
        document.querySelectorAll('.special-shift-row').forEach(row => {
            const dateVal = row.querySelector('.special-date-select').value;
            const shiftVal = row.querySelector('.special-shift-select').value;
            specialShifts.push({ date: dateVal, dateLabel: formatDayDate(new Date(dateVal)), shift: shiftVal });
        });
        formData.specialShift = { requests: specialShifts, comment: specialShiftCommentInput.value || '' };
    }

    currentSubmission = formData; saveSubmission(formData);
    successModal.classList.add('active'); pendingConfirmation = false;
}

function handleConfirmYes() { confirmModal.classList.remove('active'); pendingConfirmation = true; form.dispatchEvent(new Event('submit')); }
function handleConfirmNo() { confirmModal.classList.remove('active'); pendingConfirmation = false; }
function closeSuccessModal() { successModal.classList.remove('active'); currentSubmission = null; }

function handleWhatsAppShare() {
    if (!currentSubmission) return;
    const data = currentSubmission;
    let message = `Hi, Roster Pref for ${data.name} (${data.empId}):\nShift: ${data.preferredShift}\nOffs: ${data.weekoff1.label}, ${data.weekoff2.label}\n`;
    if (data.leave) { message += `Leave: ${data.leave.dates.length} days (${data.leave.dates.map(d=>d.label.split('-')[0]).join(',')})\n`; }
    if (data.specialShift) { message += `Special: ${data.specialShift.requests.length} requests\n`; }
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

function checkExistingSubmissionForAgent(empId) {
    const submission = loadSubmission(empId);
    if (submission) {
        lastSubmissionInfo.style.display = 'flex';
        lastSubmitTime.textContent = formatTimestamp(submission.timestamp);
        agentNameInput.value = submission.name; empIdInput.value = submission.empId;
        preferredShiftSelect.value = submission.preferredShift;
        weekoff1Select.value = submission.weekoff1.date; weekoff2Select.value = submission.weekoff2.date;

        if (submission.leave) {
            leaveToggle.checked = true; leaveFields.style.display = 'block';
            document.querySelectorAll('.leave-date-checkbox').forEach(cb => cb.checked = false);
            if (submission.leave.dates) submission.leave.dates.forEach(d => {
                const cb = document.querySelector(`.leave-date-checkbox[value="${d.date}"]`); if (cb) cb.checked = true;
            });
            updateSelectAllState();
            leaveReasonInput.value = submission.leave.reason;
        }

        if (submission.specialShift) {
            specialShiftToggle.checked = true; specialShiftFields.style.display = 'block';
            specialShiftsContainer.innerHTML = '';
            if (submission.specialShift.requests) submission.specialShift.requests.forEach(req => addSpecialShiftRow(req));
            specialShiftCommentInput.value = submission.specialShift.comment;
        }
        validateForm();
    } else { lastSubmissionInfo.style.display = 'none'; }
}

function toggleAdminPanel() { adminPanel.classList.toggle('active'); if(adminPanel.classList.contains('active')) refreshAdminPanel(); }
function refreshAdminPanel() {
    const submissions = getAllSubmissions();
    submittedCount.textContent = submissions.length;
    submissionsList.innerHTML = '';
    submissions.forEach(s => {
        const d = document.createElement('div'); d.className = 'submission-card';
        d.innerHTML = `<strong>${s.name}</strong><br>${s.preferredShift}`;
        submissionsList.appendChild(d);
    });
}
function handleClearAll() { if(confirm('Clear all?')) { localStorage.clear(); refreshAdminPanel(); } }

document.addEventListener('DOMContentLoaded', init);
