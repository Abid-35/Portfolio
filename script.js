
document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Navbar Links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent default anchor click behavior
            e.preventDefault();

            // Get the target section's ID from the href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll to the target section smoothly
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close the mobile menu if it's open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // --- Hero Section Fade-in Animation ---
    const heroElements = document.querySelectorAll('.hero-content h1, .hero-content .role, .hero-content .tagline, .hero-content .btn');
    // Use a small delay to ensure CSS is parsed before adding 'visible' class
    setTimeout(() => {
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);


    // --- Hamburger Menu Functionality ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Skills Progress Bar Animation (on scroll into view) ---
    const skillCards = document.querySelectorAll('.skill-card');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the item is visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    skillCards.forEach(card => {
        skillObserver.observe(card);
    });


    // --- Contact Form Validation and Submission ---
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');

    // Function to validate email format
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        let valid = true;

        // Clear previous errors
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        messageError.style.display = 'none';
        formStatus.style.display = 'none';
        formStatus.classList.remove('success', 'error');

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            nameError.style.display = 'block';
            valid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            emailError.style.display = 'block';
            valid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
            valid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required.';
            messageError.style.display = 'block';
            valid = false;
        }

        if (valid) {
            // If validation passes, attempt to submit the form
            formStatus.style.display = 'block';
            formStatus.textContent = 'Sending message...';

            // --- IMPORTANT: This is a placeholder for actual form submission ---
            // To make this form truly functional, you need to connect it to a backend service
            // like Formspree, Netlify Forms, EmailJS, or your own server-side script.
            //
            // Example using Formspree (replace YOUR_FORMSPREE_ENDPOINT with your actual endpoint):
            // const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT';
            // try {
            //     const response = await fetch(formspreeEndpoint, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Accept': 'application/json'
            //         },
            //         body: JSON.stringify({
            //             name: nameInput.value.trim(),
            //             email: emailInput.value.trim(),
            //             message: messageInput.value.trim()
            //         })
            //     });

            //     if (response.ok) {
            //         formStatus.textContent = 'Message sent successfully!';
            //         formStatus.classList.add('success');
            //         contactForm.reset(); // Clear the form
            //     } else {
            //         const data = await response.json();
            //         formStatus.textContent = data.error || 'Failed to send message. Please try again.';
            //         formStatus.classList.add('error');
            //     }
            // } catch (error) {
            //     console.error('Form submission error:', error);
            //     formStatus.textContent = 'An error occurred. Please try again later.';
            //     formStatus.classList.add('error');
            // }

            // --- For demo purposes without a backend, simulate success: ---
            setTimeout(() => {
                formStatus.textContent = 'Message sent successfully! (Demo)';
                formStatus.classList.add('success');
                contactForm.reset(); // Clear the form
            }, 1500);

        }
    });

    // --- Resume Download Action (already handled by HTML download attribute, but JS can trigger if needed) ---
    // The HTML `download` attribute on the anchor tag is the simplest and most reliable way.
    // If you needed to trigger it via JS for some reason (e.g., after an API call), you could do:
    // document.querySelector('.download-btn').addEventListener('click', function(e) {
    //     e.preventDefault(); // Prevent default link behavior
    //     const link = document.createElement('a');
    //     link.href = 'resume.pdf'; // Path to your resume PDF
    //     link.download = 'Abid_Shaik_Resume.pdf'; // Suggested filename
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // });
});
