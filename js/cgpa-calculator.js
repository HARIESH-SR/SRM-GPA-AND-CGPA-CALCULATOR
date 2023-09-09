const regulations = {
    "2018": {
        "CSE": {
            "1": 20,
            "2": 21,
            "3": 24,
            "4": 26,
            "5": 22,
            "6": 25,
            "7": 12,
            "8": 10
        },
        "ECE": {
            "1": 20,
            "2": 21,
            "3": 24,
            "4": 22,
            "5": 23,
            "6": 24,
            "7": 16,
            "8": 10
        },
        "AI-ML": {
            "1": 20,
            "2": 21,
            "3": 24,
            "4": 26,
            "5": 22,
            "6": 25,
            "7": 12,
            "8": 10
        }
    },
    "2021": {
        "CSE": {
            "1": 22,
            "2": 21,
            "3": 23,
            "4": 23,
            "5": 21,
            "6": 20,
            "7": 18,
            "8": 15
        },
        "AI-ML": {
            "1": 22,
            "2": 21,
            "3": 23,
            "4": 23,
            "5": 21,
            "6": 20,
            "7": 18,
            "8": 15
        },
        "Big Data Analytics": {
            "1": 22,
            "2": 21,
            "3": 23,
            "4": 23,
            "5": 21,
            "6": 20,
            "7": 18,
            "8": 15
        },
        "Cybersecurity": {
            "1": 22,
            "2": 21,
            "3": 23,
            "4": 23,
            "5": 21,
            "6": 20,
            "7": 18,
            "8": 15
        },
        "IT": {
            "1": 22,
            "2": 21,
            "3": 23,
            "4": 23,
            "5": 21,
            "6": 20,
            "7": 18,
            "8": 15
        },
        "ECE": {
            "1": 18,
            "2": 25,
            "3": 24,
            "4": 21,
            "5": 20,
            "6": 22,
            "7": 18,
            "8": 15
        },
        "Biotechnology": {
            "1": 18,
            "2": 25,
            "3": 23,
            "4": 23,
            "5": 22,
            "6": 19,
            "7": 18,
            "8": 15
        },
        "EEE": {
            "1": 18,
            "2": 25,
            "3": 22,
            "4": 23,
            "5": 21,
            "6": 21,
            "7": 18,
            "8": 15
        }
    }
}


// Select the regulation and course elements
const regulationSelect = document.getElementById('regulation');
const courseSelect = document.getElementById('course');

// Populate the course options when the regulation changes
regulationSelect.addEventListener('change', function() {
    const selectedRegulation = this.value;
    courseSelect.innerHTML = '';  // Clear previous options
    for (const course in regulations[selectedRegulation]) {
        const option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    }
});

// Manually trigger the change event to populate courses for the initial selected regulation
regulationSelect.dispatchEvent(new Event('change'));

let semesterCount = 1;

function addSemester() {
    semesterCount++;
    if (semesterCount <= 8) {
        const semesterDiv = document.getElementById("additional-semesters");
        const newInput = document.createElement("div");
        newInput.innerHTML = `
            <label for="semester${semesterCount}">Semester ${semesterCount} GPA:</label>
            <input type="number" id="semester${semesterCount}" step="0.01" min="0" max="4.0" required>
        `;
        semesterDiv.appendChild(newInput);
    }
}

function removeSemester() {
    if (semesterCount > 1) {
        const semesterDiv = document.getElementById("additional-semesters");
        semesterDiv.removeChild(semesterDiv.lastChild);
        semesterCount--;
    }
}

function calculateCGPA() {
    let weightedGPA = 0;
    let totalCredits = 0;
    const selectedRegulation = document.getElementById('regulation').value;
    const selectedCourse = document.getElementById('course').value;

    for (let i = 1; i <= semesterCount; i++) {
        const semesterGPA = parseFloat(document.getElementById(`semester${i}`).value);
        if (isNaN(semesterGPA)) {
            alert(`Please enter a valid GPA for Semester ${i}`);
            return;  // Exit the function if invalid data is found.
        }
        const semesterCredits = regulations[selectedRegulation][selectedCourse][i];
        weightedGPA += semesterGPA * semesterCredits;
        totalCredits += semesterCredits;
    }

    const cgpa = (weightedGPA / totalCredits).toFixed(2);
    const cgpaElement = document.getElementById("cgpa");
    cgpaElement.textContent = `${cgpa}`;
    // Make the CGPA visible
    cgpaElement.style.opacity = "1";
    cgpaElement.style.transform = "translateY(0)";

    // Scroll to the CGPA results section
    cgpaElement.scrollIntoView({ behavior: 'smooth' });
}
