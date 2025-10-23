initalizeCertifications();
let currentId = 0;
function toggleCertificate(id) {
    const frame = document.getElementById(`certificateFrame-${id}`);
    const toggleIcon = document.getElementById(`toggleIcon-${id}`);
    const toggleText = document.getElementById(`toggleText-${id}`);

    const isHidden = frame.style.display === "none";
    frame.style.display = isHidden ? "block" : "none";

    // Change icon and text
    toggleIcon.setAttribute("name", isHidden ? "chevron-up-outline" : "chevron-down-outline");
    toggleText.childNodes[1].textContent = isHidden ? " Hide Certification" : " View Certification";
}

function showEditIcon(id) {
    const editIcon = document.getElementById(`edit-${id}`);
    editIcon.style.display = "block";
}

function hideEditIcon(id) {
    const editIcon = document.getElementById(`edit-${id}`);
    editIcon.style.display = "none";
}

function onEditClicked(id) {
    event.preventDefault();
    const modal = document.getElementById("myModalWrapper");
    modal.style.display = "flex";
    currentId = id;
    loadDataToForm();
}

function closeModal() {
    const modal = document.getElementById("myModalWrapper");
    modal.style.display = "none";
}

function getCertificationById(id) {
    const certifications = JSON.parse(localStorage.getItem("certifications")) || [];
    let certification = certifications.find(cert => cert.id === id);
    return certification;
}

validateForm = () => {
    const form = document.getElementById("certificationForm");
    if (form.checkValidity()) {
        document.getElementById("formError").style.display = "none";
        return true;
    } else {
        document.getElementById("formError").style.display = "block";
        return false
    }
}

function loadDataToForm() {
    const certifications = JSON.parse(localStorage.getItem("certifications")) || [];
    const cert = certifications.find(cert => cert.id === currentId);
    if (cert) {
        document.getElementById('certTitle').value = cert.certTitle;
        document.getElementById('certIssuer').value = cert.certIssuer;
        document.getElementById('certYear').value = cert.certYear;
        document.getElementById('certUrl').value = cert.certUrl;
    }
}

function initalizeCertifications() {
    const certifications = JSON.parse(localStorage.getItem("certifications")) || [];
    if (certifications.length > 0) {
        return;
    }
    certifications.push({
        id: '01',
        certTitle: 'AWS Certified Solutions Architect',
        certIssuer: 'Amazon Web Services',
        certYear: '2023',
        certUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
    });
    certifications.push({
        id: '02',
        certTitle: 'Google Cloud Professional Developer',
        certIssuer: 'Google Cloud',
        certYear: '2022',
        certUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
    });
    certifications.push({
        id: '03',
        certTitle: 'Certified Kubernetes Administrator',
        certIssuer: 'CNCF',
        certYear: '2023',
        certUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
    });
    certifications.push({
        id: '04',
        certTitle: 'Tech Innovations Inc.',
        certIssuer: 'CNCF',
        certYear: '2022',
        certUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
    });
    localStorage.setItem("certifications", JSON.stringify(certifications));

}

function onSaveChanges() {
    if (!validateForm())
        return
    const formData = {
        certTitle: document.getElementById('certTitle').value,
        certIssuer: document.getElementById('certIssuer').value,
        certYear: document.getElementById('certYear').value,
        certUrl: document.getElementById('certUrl').value,
    };
    const certifications = JSON.parse(localStorage.getItem("certifications")) || [];
    const index = certifications.findIndex(cert => cert.id === currentId);
    if (index !== -1) {
        certifications[index] = { id: currentId, ...formData };
        localStorage.setItem("certifications", JSON.stringify(certifications));
    }
    closeModal();
    location.reload();
}

function onFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        const videoPlayer = document.getElementById('videoPlayer');
        const fileURL = URL.createObjectURL(file);
        videoPlayer.src = fileURL;
        const videoContainer = document.getElementById('video-container');
        videoContainer.style.display = "none";
        const videoHeader = document.getElementById('video-header');
        videoHeader.style.display = "flex";
        const videoPlayerContainer = document.getElementById('video-player-container');
        videoPlayerContainer.style.display = "block";
        const replaceButton = document.getElementById('replace-button');
        replaceButton.style.display = "block";
        const videoName = document.getElementById('video-name');
        videoName.innerHTML = file.name;
    }
}

function removeVideo() {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = "";
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.display = "flex";
    const videoHeader = document.getElementById('video-header');
    videoHeader.style.display = "none";
    const videoPlayerContainer = document.getElementById('video-player-container');
    videoPlayerContainer.style.display = "none";
    const replaceButton = document.getElementById('replace-button');
    replaceButton.style.display = "none";
    const fileInput = document.getElementById('video-upload');
    fileInput.value = "";
}   

// Close when clicking outside the modal content
window.addEventListener("click", (e) => {
    const modal = document.getElementById("myModalWrapper");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});