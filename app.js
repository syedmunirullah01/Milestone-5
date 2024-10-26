function updatePreview() {
    var firstname = document.getElementById("firstname")
        .value;
    var middlename = document.getElementById("middlename")
        .value;
    var lastname = document.getElementById("lastname")
        .value;
    var designation = document.getElementById("designation").value;
    var address = document.getElementById("address")
        .value;
    var email = document.getElementById("email").value;
    var phoneno = document.getElementById("phoneno")
        .value;
    var summary = document.getElementById("summary")
        .value;
    var ach_title = document.getElementById("ach_title")
        .value;
    var ach_description = document.getElementById("ach_description").value;
    var ex_title = document.getElementById("ex_title")
        .value;
    var ex_company = document.getElementById("ex_company")
        .value;
    var ex_location = document.getElementById("ex_location").value;
    var ex_start_date = document.getElementById("ex_start_date").value;
    var ex_end_date = document.getElementById("ex_end_date").value;
    var ex_description = document.getElementById("ex_description").value;
    var school = document.getElementById("school").value;
    var degree = document.getElementById("degree").value;
    var city = document.getElementById("city").value;
    var start_date = document.getElementById("start_date")
        .value;
    var end_date = document.getElementById("end_date")
        .value;
    var description = document.getElementById("description").value;
    var project = document.getElementById("project")
        .value;
    var pro_link = document.getElementById("pro_link")
        .value;
    var pro_description = document.getElementById("pro_description").value;
    var skills = document.getElementById("skills").value.split(",");
    var resumeData = {
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        designation: designation,
        address: address,
        email: email,
        phoneno: phoneno,
        summary: summary,
        achievements: { title: ach_title, description: ach_description },
        experiences: {
            title: ex_title,
            company: ex_company,
            location: ex_location,
            startDate: ex_start_date,
            endDate: ex_end_date,
            description: ex_description,
        },
        education: {
            school: school,
            degree: degree,
            city: city,
            startDate: start_date,
            endDate: end_date,
            description: description,
        },
        project: { title: project, link: pro_link, description: pro_description },
        skills: skills.map(function (skill) { return skill.trim(); }),
    };
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    document.getElementById("fullname_dsp").textContent = "Full Name: ".concat(firstname, " ").concat(middlename, " ").concat(lastname);
    document.getElementById("designation_dsp").textContent = "Designation: ".concat(designation);
    document.getElementById("phoneno_dsp").textContent = "Phone No: ".concat(phoneno);
    document.getElementById("email_dsp").textContent = "Email Address: ".concat(email);
    document.getElementById("address_dsp").textContent = "Address: ".concat(address);
    document.getElementById("summary_dsp").textContent = "Summary: ".concat(summary);
    document.getElementById("achievements_dsp").innerHTML = "Achievement Title / Description: ".concat(ach_title, ": ").concat(ach_description);
    document.getElementById("experiences_dsp").innerHTML = "Experience: ".concat(ex_title, " at ").concat(ex_company, ", ").concat(ex_location, " (").concat(ex_start_date, " - ").concat(ex_end_date, "): ").concat(ex_description);
    document.getElementById("educations_dsp").innerHTML = "Degree Info: ".concat(degree, " from ").concat(school, ", ").concat(city, " (").concat(start_date, " - ").concat(end_date, "): ").concat(description);
    document.getElementById("projects_dsp").innerHTML = "Project Details: ".concat(project, " (<a href=\"").concat(pro_link, "\" target=\"_blank\">Link</a>): ").concat(pro_description);
    var skillsContainer = document.getElementById("skills_dsp");
    skillsContainer.innerHTML = "";
    skills.forEach(function (skill) {
        var skillElement = document.createElement("p");
        skillElement.textContent = skill.trim();
        skillsContainer.appendChild(skillElement);
    });
}
var inputs = [
    "firstname",
    "middlename",
    "lastname",
    "designation",
    "address",
    "email",
    "phoneno",
    "summary",
    "ach_title",
    "ach_description",
    "ex_title",
    "ex_company",
    "ex_location",
    "ex_start_date",
    "ex_end_date",
    "ex_description",
    "school",
    "degree",
    "city",
    "start_date",
    "end_date",
    "description",
    "project",
    "pro_link",
    "pro_description",
    "skills",
    "yourimage",
];
inputs.forEach(function (id) {
    var inputField = document.getElementById(id);
    if (inputField) {
        inputField.addEventListener("input", updatePreview);
    }
});
var fileInput = document.getElementById("yourimage");
var displayImage = document.getElementById("image_dsp");
fileInput.addEventListener("change", function () {
    var _a;
    var file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            displayImage.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            displayImage.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
    else {
        displayImage.style.display = "none";
    }
});
document.getElementById("about-sc").addEventListener("submit", function (e) {
    e.preventDefault();
    updatePreview();
    document.getElementById("preview-sc").style.display = "block";
    document.getElementById("edit-button").style.display = "block";
});
document.getElementById("edit-button").addEventListener("click", function () {
    document.getElementById("about-sc").style.display = "block";
});
function printCV() {
    var elementsToHide = document.querySelectorAll("body > *:not(#print-section)");
    elementsToHide.forEach(function (element) {
        element.classList.add("hide-print");
    });
    window.print();
    elementsToHide.forEach(function (element) {
        element.classList.remove("hide-print");
    });
}
function generateShareableLink() {
    var firstname = document.getElementById("firstname")
        .value;
    var lastname = document.getElementById("lastname")
        .value;
    var uniqueId = "".concat(firstname, "-").concat(lastname, "-").concat(Date.now());
    var shareableLink = "".concat(window.location.origin).concat(window.location.pathname, "?id=").concat(encodeURIComponent(uniqueId));
    var linkDisplayElement = document.getElementById("shareable-link");
    linkDisplayElement.innerHTML = "Your CV Link: <a href=\"".concat(shareableLink, "\" target=\"_blank\">").concat(shareableLink, "</a>");
    linkDisplayElement.style.display = "block";
}
document
    .getElementById("generate-link-button")
    .addEventListener("click", generateShareableLink);
function loadCVFromLink() {
    var urlParams = new URLSearchParams(window.location.search);
    var cvId = urlParams.get("id");
    if (cvId) {
        var resumeDataString = localStorage.getItem("resumeData");
        if (resumeDataString) {
            var resumeData = JSON.parse(resumeDataString);
            document.getElementById("firstname").value =
                resumeData.firstname;
            document.getElementById("middlename").value =
                resumeData.middlename;
            document.getElementById("lastname").value =
                resumeData.lastname;
            document.getElementById("designation").value =
                resumeData.designation;
            document.getElementById("address").value =
                resumeData.address;
            document.getElementById("email").value =
                resumeData.email;
            document.getElementById("phoneno").value =
                resumeData.phoneno;
            document.getElementById("summary").value =
                resumeData.summary;
            document.getElementById("ach_title").value =
                resumeData.achievements.title;
            document.getElementById("ach_description").value =
                resumeData.achievements.description;
            document.getElementById("ex_title").value =
                resumeData.experiences.title;
            document.getElementById("ex_company").value =
                resumeData.experiences.company;
            document.getElementById("ex_location").value =
                resumeData.experiences.location;
            document.getElementById("ex_start_date").value =
                resumeData.experiences.startDate;
            document.getElementById("ex_end_date").value =
                resumeData.experiences.endDate;
            document.getElementById("ex_description").value =
                resumeData.experiences.description;
            document.getElementById("school").value =
                resumeData.education.school;
            document.getElementById("degree").value =
                resumeData.education.degree;
            document.getElementById("city").value =
                resumeData.education.city;
            document.getElementById("start_date").value =
                resumeData.education.startDate;
            document.getElementById("end_date").value =
                resumeData.education.endDate;
            document.getElementById("description").value =
                resumeData.education.description;
            document.getElementById("project").value =
                resumeData.project.title;
            document.getElementById("pro_link").value =
                resumeData.project.link;
            document.getElementById("pro_description").value =
                resumeData.project.description;
            document.getElementById("skills").value =
                resumeData.skills.join(", ");
            document.getElementById("skills").value = resumeData.yourimage;
            updatePreview();
            document.getElementById("preview-sc").style.display = "block";
            document.getElementById("edit-button").style.display = "none";
            document.getElementById("about-sc").style.display = "none";
            document.getElementById("generate-link-button").style.display = "none";
            document.getElementById("print-cv").style.display = "none";
        }
    }
}
window.onload = loadCVFromLink;
