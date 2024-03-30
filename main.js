
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
                <h5 class="card-title d-none d-lg-block" style="max-width: 100%; margin-left: 20px; color: #2A2A2A">${user.name.title} ${user.name.first} ${user.name.last}</h5>
                <p class="card-text d-none d-lg-block" style="max-width: 100%; margin-left: 20px; color: #2A2A2A">${user.email}</p>
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