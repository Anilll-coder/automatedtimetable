// Show different tabs with smooth transitions
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        setTimeout(() => {
            content.style.display = 'none';
        }, 300);
    });

    setTimeout(() => {
        let activeTab = document.getElementById(`${tabName}-tab`);
        activeTab.style.display = 'block';
        setTimeout(() => {
            activeTab.style.opacity = '1';
            activeTab.style.transform = 'translateY(0)';
        }, 50);
    }, 300);
}

// Generate subject input fields dynamically
function generateSubjects() {
    const numSubjects = document.getElementById("numSubjects").value;
    if (numSubjects < 1 || numSubjects > 10) {
        showToast("Please enter a number between 1 and 10");
        return;
    }

    const container = document.getElementById("subjectInputs");
    container.innerHTML = "";
    
    for (let i = 0; i < numSubjects; i++) {
        let inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        let label = document.createElement("label");
        label.innerText = `Subject ${i + 1}:`;

        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Enter Subject ${i + 1}`;
        input.id = `subject-${i}`;

        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        container.appendChild(inputGroup);
    }

    document.getElementById("subjects-container").classList.remove("hidden");
}

// Generate timetable randomly
function generateSchedule() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const periodsPerDay = 6;
    let subjects = [];

    for (let i = 0; i < 10; i++) {
        let subjectInput = document.getElementById(`subject-${i}`);
        if (subjectInput && subjectInput.value.trim()) {
            subjects.push(subjectInput.value.trim());
        }
    }

    if (subjects.length === 0) {
        showToast("Please enter at least one subject.");
        return;
    }

    let scheduleBody = document.getElementById("schedule-body");
    scheduleBody.innerHTML = "";

    days.forEach(day => {
        let row = document.createElement("tr");
        let dayCell = document.createElement("td");
        dayCell.textContent = day;
        row.appendChild(dayCell);

        for (let i = 0; i < periodsPerDay; i++) {
            let cell = document.createElement("td");
            cell.textContent = subjects[Math.floor(Math.random() * subjects.length)];
            row.appendChild(cell);
        }

        scheduleBody.appendChild(row);
    });

    showToast("Timetable generated successfully!");
}

// Show toast notifications
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
// Function to reschedule a subject and regenerate the timetable
function reschedule() {
    let absentDay = document.getElementById("absentDay").value.trim().toLowerCase();
    let absentSubject = document.getElementById("absentSubject").value.trim();
    
    if (!absentDay || !absentSubject) {
        showToast("Please enter both the day and the subject to reschedule.");
        return;
    }

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
    if (!days.includes(absentDay)) {
        showToast("Invalid day entered. Please enter a valid weekday.");
        return;
    }

    let scheduleBody = document.getElementById("schedule-body");
    let rows = scheduleBody.getElementsByTagName("tr");
    let found = false;

    // Remove the subject from the specified day
    for (let row of rows) {
        let dayCell = row.cells[0].textContent.toLowerCase();
        if (dayCell === absentDay) {
            for (let i = 1; i < row.cells.length; i++) {
                if (row.cells[i].textContent === absentSubject) {
                    row.cells[i].textContent = "Free Period";
                    found = true;
                }
            }
            break;
        }
    }

    if (!found) {
        showToast("Subject not found on the specified day.");
        return;
    }

    // Generate a new timetable after rescheduling
    generateSchedule();
    showToast(`Successfully rescheduled ${absentSubject} and updated the timetable.`);
}

// Function to generate a new timetable dynamically
function generateSchedule() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const periodsPerDay = 6;
    let subjects = [];

    for (let i = 0; i < 10; i++) {
        let subjectInput = document.getElementById(`subject-${i}`);
        if (subjectInput && subjectInput.value.trim()) {
            subjects.push(subjectInput.value.trim());
        }
    }

    if (subjects.length === 0) {
        showToast("Please enter at least one subject.");
        return;
    }

    let scheduleBody = document.getElementById("schedule-body");
    scheduleBody.innerHTML = "";

    days.forEach(day => {
        let row = document.createElement("tr");
        let dayCell = document.createElement("td");
        dayCell.textContent = day;
        row.appendChild(dayCell);

        for (let i = 0; i < periodsPerDay; i++) {
            let cell = document.createElement("td");
            cell.textContent = subjects[Math.floor(Math.random() * subjects.length)];
            row.appendChild(cell);
        }

        scheduleBody.appendChild(row);
    });

    showToast("New timetable generated successfully!");
}

// Function to show notifications
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Function to reschedule a subject and regenerate the timetable with a visual highlight
function reschedule() {
    let absentDay = document.getElementById("absentDay").value.trim().toLowerCase();
    let absentSubject = document.getElementById("absentSubject").value.trim();
    
    if (!absentDay || !absentSubject) {
        showToast("Please enter both the day and the subject to reschedule.");
        return;
    }

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
    if (!days.includes(absentDay)) {
        showToast("Invalid day entered. Please enter a valid weekday.");
        return;
    }

    let scheduleBody = document.getElementById("schedule-body");
    let rows = scheduleBody.getElementsByTagName("tr");
    let found = false;
    let rescheduledCell = null;

    // Remove the subject from the specified day
    for (let row of rows) {
        let dayCell = row.cells[0].textContent.toLowerCase();
        if (dayCell === absentDay) {
            for (let i = 1; i < row.cells.length; i++) {
                if (row.cells[i].textContent === absentSubject) {
                    row.cells[i].textContent = "Free Period";
                    found = true;
                }
            }
            break;
        }
    }

    if (!found) {
        showToast("Subject not found on the specified day.");
        return;
    }

    // Find a new day to move the subject to
    let newDay = days.find(d => d !== absentDay); // Pick another day
    if (!newDay) {
        showToast("No available day to move this subject.");
        return;
    }

    // Assign the subject to a random free period on the new day
    for (let row of rows) {
        let dayCell = row.cells[0].textContent.toLowerCase();
        if (dayCell === newDay) {
            for (let i = 1; i < row.cells.length; i++) {
                if (row.cells[i].textContent === "Free Period") {
                    row.cells[i].textContent = absentSubject;
                    row.cells[i].classList.add("highlight-reschedule"); // Add highlight effect
                    rescheduledCell = row.cells[i];
                    showToast(`Successfully rescheduled ${absentSubject} from ${absentDay} to ${newDay}`);
                    break;
                }
            }
        }
    }

    // Remove highlight effect after transition
    if (rescheduledCell) {
        setTimeout(() => {
            rescheduledCell.classList.remove("highlight-reschedule");
        }, 2000);
    }

    // Generate a new timetable with updates
    generateSchedule();
}
