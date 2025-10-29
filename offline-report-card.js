// QR Code Generation
function generateQRCode() {
    const qrDiv = document.getElementById('qrcode');
    if (qrDiv && typeof QRCode !== 'undefined') {
        qrDiv.innerHTML = ''; // Clear existing QR code
        new QRCode(qrDiv, {
            text: 'https://lifepassport.uienc.org/verify/LP-IN-KA-2025-7492-Q2',
            width: 80,
            height: 80,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// Language Translation System
const translations = {
    en: {}, // English is default, no translation needed
    hi: {}, // Hindi translations (already in data attributes)
    as: {}, // Assamese translations (already in data attributes)
    ka: {}  // Karbi translations (already in data attributes)
};

let currentLanguage = 'en';

function changeLanguage() {
    const select = document.getElementById('languageSelect');
    currentLanguage = select.value;
    
    // Get all elements with translate class
    const elements = document.querySelectorAll('.translate');
    
    elements.forEach(element => {
        const translatedText = element.getAttribute(`data-${currentLanguage}`);
        if (translatedText) {
            element.textContent = translatedText;
        }
    });
    
    // Save preference
    localStorage.setItem('preferredLanguage', currentLanguage);
    
    // Show notification
    showLanguageNotification(currentLanguage);
}

function showLanguageNotification(lang) {
    const langNames = {
        en: 'English',
        hi: 'हिन्दी',
        as: 'অসমীয়া',
        ka: 'কার্বি'
    };
    
    const notification = document.createElement('div');
    notification.className = 'update-status no-print';
    notification.innerHTML = `✓ Language changed to ${langNames[lang]}`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 2000);
}

// View Toggle System
function toggleView(view) {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const summaryBtn = document.getElementById('summaryBtn');
    const detailedBtn = document.getElementById('detailedBtn');
    
    if (view === 'summary') {
        page1.classList.remove('hidden');
        page2.classList.add('hidden');
        summaryBtn.classList.add('active');
        detailedBtn.classList.remove('active');
    } else {
        page1.classList.add('hidden');
        page2.classList.remove('hidden');
        summaryBtn.classList.remove('active');
        detailedBtn.classList.add('active');
    }
}

// Download Card as PDF
function downloadCard() {
    // Show both pages for printing
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    
    page1.classList.remove('hidden');
    page2.classList.remove('hidden');
    
    // Trigger print
    setTimeout(() => {
        window.print();
    }, 100);
}

// Auto-update notification system
function autoUpdate() {
    const updateStatus = document.createElement('div');
    updateStatus.className = 'update-status no-print';
    
    const now = new Date();
    const formattedDate = now.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    updateStatus.innerHTML = `✓ Report Card Updated Successfully | Last sync: ${formattedDate}`;
    document.body.appendChild(updateStatus);
    
    setTimeout(() => updateStatus.remove(), 3000);
}

// Photo Upload System (for customization)
function uploadProjectPhoto(inputElement, photoIndex) {
    const file = inputElement.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.querySelector(`.project-photo:nth-child(${photoIndex}) img`);
            if (img) {
                img.src = e.target.result;
                // Save to local storage
                localStorage.setItem(`projectPhoto${photoIndex}`, e.target.result);
            }
        };
        reader.readAsDataURL(file);
    }
}

// Load saved photos from local storage
function loadSavedPhotos() {
    for (let i = 1; i <= 6; i++) {
        const savedPhoto = localStorage.getItem(`projectPhoto${i}`);
        if (savedPhoto) {
            const img = document.querySelector(`.project-photo:nth-child(${i}) img`);
            if (img) {
                img.src = savedPhoto;
            }
        }
    }
}

// Save card data to local storage
function saveCardData() {
    const cardData = {
        studentName: document.querySelector('.info-value').textContent,
        lastUpdated: new Date().toISOString(),
        language: currentLanguage
    };
    localStorage.setItem('reportCard', JSON.stringify(cardData));
}

// Load card data from local storage
function loadCardData() {
    const savedData = localStorage.getItem('reportCard');
    if (savedData) {
        const cardData = JSON.parse(savedData);
        
        // Restore language preference
        if (cardData.language) {
            document.getElementById('languageSelect').value = cardData.language;
            changeLanguage();
        }
        
        return cardData;
    }
    return null;
}

// Print event listeners
window.addEventListener('beforeprint', () => {
    console.log('Preparing document for printing...');
    // Show all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('hidden');
    });
});

window.addEventListener('afterprint', () => {
    console.log('Print dialog closed');
    // Restore view state
    const summaryBtn = document.getElementById('summaryBtn');
    if (summaryBtn.classList.contains('active')) {
        toggleView('summary');
    } else {
        toggleView('detailed');
    }
});

// Initialize on page load
window.addEventListener('load', () => {
    // Generate QR Code
    setTimeout(generateQRCode, 500);
    
    // Load saved data
    loadCardData();
    loadSavedPhotos();
    
    // Show update notification
    setTimeout(autoUpdate, 1000);
    
    // Auto-update every 5 minutes
    setInterval(autoUpdate, 300000);
});

// Export functions for external use
window.reportCard = {
    changeLanguage,
    toggleView,
    downloadCard,
    uploadProjectPhoto,
    saveCardData,
    loadCardData,
    generateQRCode
};

