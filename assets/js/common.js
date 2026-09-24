/*=============== Show Menu =============== */
const navMenu = document.getElementById('nav-menu');
    navToggle = document.getElementById('nav-toggle');
    navClose = document.getElementById('nav-close');

/*===== Menu Show =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    });
}

/*===== Hide Show =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    });
}

/*=============== Remove Menu Mobile =============== */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
  // When we click on each link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}

navLink.forEach((n) => {
    n.addEventListener('click', linkAction);
});


/*=============== Background Header =============== */
function scrollHeader() {
    const header = document.getElementById('header');

    // Check the scroll position
    if (this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
    }

window.addEventListener('scroll', scrollHeader);

/*=============== Contact Form =============== */
const contactForm = document.getElementById('contact-form');
    contactName = document.getElementById('contact-name');
    contactEmail = document.getElementById('contact-email');
    Message = document.getElementById('message');
    contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();

  //field values
if (
    contactName.value === '' || 
    contactEmail.value === '' || 
    Message.value === ''
    ) {

    //color
    contactMessage.classList.remove('color-light');
    contactMessage.classList.add('color-dark');
    
    //message
    contactMessage.textContent = 'Write all the input fields';
    } else {

    emailjs
        .sendForm(
            'service_aq07ojd', 
            'template_fjgxf0j',
            '#contact-form',
            'GhWi_CA14Lsatqb-7'
        )

        .then(
            () => {
            contactMessage.classList.add('color-light');
            contactMessage.textContent = 'Message Sent ✔️';

            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        },
        (error) => {
            alert('Oh Snap! Something Went Wrong...' , error);
        }
        );
        contactName.value = '';
        contactEmail.value = '';
        Message.value = '';
    }
};
contactForm.addEventListener('submit', sendEmail);

/*=============== Style Switcher =============== */
const styleSwitcherToggle = document.querySelector('.style__switcher-toggler'),
    styleSwitcher = document.querySelector('.style__switcher');

styleSwitcherToggle.addEventListener('click', () => {
    styleSwitcher.classList.toggle('open');
});

// Hide switcher on scroll
window.addEventListener('scroll', () => {
    if (styleSwitcher.classList.contains('open')) {
    styleSwitcher.classList.remove('open');
    }
});

const alternateStyles = document.querySelectorAll('.alternate-style');

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
    if (color === style.getAttribute('title')) {
    style.removeAttribute('disabled');
    } else {
    style.setAttribute('disabled', 'true');
    }
    });
}

//STAR CURSOR

window.addEventListener('mousemove', function(e) {
    var arr = [1, 0.9, 0.8, 0.5, 0.2];

    arr.forEach(function(i) {
      var x = (1 - i) * 75;
    var star = document.createElement('div');

    star.className = 'star';
      star.style.top = e.pageY + Math.round(Math.random() * x - x / 2) + 'px';
      star.style.left = e.pageX + Math.round(Math.random() * x - x / 2) + 'px';

    document.body.appendChild(star);

    window.setTimeout(function() {
        document.body.removeChild(star);
      }, Math.round(Math.random() * i * 600));
    });
}, false);


