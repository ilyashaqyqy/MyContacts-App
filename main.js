

fetch('https://randomuser.me/api/?results=20')
    .then(response => response.json())
    .then(data => {

        data.results.forEach(user => {

            const contactCard = createContactCard(user);


            contactCard.addEventListener('click', () => {


                displayContactInfo(user);
            });


            document.getElementById('contactsContainer').appendChild(contactCard);
        });
    })
    .catch(error => console.error('Error fetching data:', error));


function createContactCard(user) {
    const contactCard = document.createElement('div');
    contactCard.classList.add('contact', 'mb-3');
    contactCard.innerHTML = `
        <div class="row">
            <div class="col-2">
                <img src="${user.picture.thumbnail}" alt="Profile" class="rounded-circle" style="width: 70px; height: 70px;">
            </div>
            <div class="col-md-10 col-12 py-0">
                <h5 class="card-title  d-lg-block" style="max-width: 100%; margin-left: 20px; color: #2A2A2A ;">${user.name.title} ${user.name.first} ${user.name.last}</h5>
                <p class="card-text  d-lg-block" style="max-width: 100%; margin-left: 20px; color: #2A2A2A">${user.email}</p>
            </div>
        </div>
    `;
    return contactCard;
}

function displayContactInfo(user) {
    const contactInfoContainer = document.querySelector('.col-sm-7');
    contactInfoContainer.innerHTML = `
        <div class="contact-card mb-3">
            <div class="contact-img-container">
                <img src="${user.picture.large}" alt="Profile" class="rounded-circle contact-img" style="width: 150px; height: 150px;">
            </div>
            <div class="contact-info">
                <h5 class="card-title">${user.name.title} ${user.name.first} ${user.name.last}</h5>
                <p class="card-text">Email: ${user.email}</p>
                <p class="card-text">Phone: ${user.phone}</p>
                <p class="card-text">Company: ${user.location.country}</p>
            </div>
        </div>
    `;
}

document.querySelector('.Add-btn').addEventListener('click', function() {
    const formContainer = document.getElementById('addContactForm');
    formContainer.style.display = 'block';
});

document.getElementById('addContactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const pictureURL = document.getElementById('contactPictureURL').value.trim();

    if (saveContactLocally(name, phone, email, pictureURL)) {
        // Afficher un message de succès
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-2');
        successMessage.textContent = 'Contact ajouté avec succès !';
        document.getElementById('addContactForm').appendChild(successMessage);

       
        document.getElementById('addContactForm').reset();
        
        setTimeout(() => {
            formContainer.style.display = 'none';
            successMessage.remove();
        }, 2000);
    } else {
        
        alert('Une erreur');
    }
});




function saveContactLocally(name, phone, email, pictureURL) {
    // Récupérer les contacts existants du stockage local
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Créer un nouvel objet contact
    const newContact = {
        name: name,
        phone: phone,
        email: email,
        pictureURL: pictureURL
    };

  
    contacts.push(newContact);

  
    localStorage.setItem('contacts', JSON.stringify(contacts));

    return true; 
}

// Charger les contacts depuis le stockage local
function loadContactsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('contacts')) || [];
}