document.addEventListener('DOMContentLoaded', () => {
    const desk = document.getElementById('desk');
    const cards = document.querySelectorAll('.card-note');
    let activeCard = null; //The card that I'm pulling
    let offset = { x: 0, y: 0 };
    let highestZ = 1; //Card that u pull will rise above the others
    let isMobile = window.innerWidth <= 767; // Detect mobile based on screen width

    // Retrieving Data from HTML
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        
        if (category && title && desc) {
            card.innerHTML = `
                <span class="category">${category}</span>
                <h3 class="big_title">${title}</h3>
                <p>${desc}</p>
            `;
        }

        // Start of mousedown
        card.addEventListener('mousedown', (e) => {
            activeCard = card;
            highestZ++;
            card.style.zIndex = highestZ;
            const rect = card.getBoundingClientRect();
            const deskRect = desk.getBoundingClientRect();
            // The card should remain directly under the mouse
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;
            // We stop the animation during the draw
            card.style.transition = 'none';
        });
    // Mouse movement
    document.addEventListener('mousemove', (e) => {
        if (activeCard) {
            const deskRect = desk.getBoundingClientRect();
            // We calculate the new card place inside the desk
            let x = e.clientX - deskRect.left - offset.x;
            let y = e.clientY - deskRect.top - offset.y;

            // Prevent the card from exiting the desk
            x = Math.max(0, Math.min(x, deskRect.width - activeCard.offsetWidth));
            y = Math.max(0, Math.min(y, deskRect.height - activeCard.offsetHeight));
            // Moving the card
            activeCard.style.left = x + 'px';
            activeCard.style.top = y + 'px';
        }
    });
    //End of the mouse-up
    document.addEventListener('mouseup', () => {
        if (activeCard) {
            activeCard.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
            activeCard = null;
        }
    });
        // Start of touchstart - mobile
        if (!isMobile) {
            card.addEventListener('touchstart', (e) => {
                activeCard = card;
                highestZ++;
                card.style.zIndex = highestZ;
                const rect = card.getBoundingClientRect();
                const deskRect = desk.getBoundingClientRect();
                // The card should remain directly under the touch
                offset.x = e.touches[0].clientX - rect.left;
                offset.y = e.touches[0].clientY - rect.top;
                // We stop the animation during the draw
                card.style.transition = 'none';
            });
        }
    });
    // Touch movement - mobile
    document.addEventListener('touchmove', (e) => {
        if (activeCard && !isMobile) {
            e.preventDefault();
            const deskRect = desk.getBoundingClientRect();
            // We calculate the new card place inside the desk
            let x = e.touches[0].clientX - deskRect.left - offset.x;
            let y = e.touches[0].clientY - deskRect.top - offset.y;

            // Prevent the card from exiting the desk
            x = Math.max(0, Math.min(x, deskRect.width - activeCard.offsetWidth));
            y = Math.max(0, Math.min(y, deskRect.height - activeCard.offsetHeight));
            // Moving the card
            activeCard.style.left = x + 'px';
            activeCard.style.top = y + 'px';
        }
    });
    //End of the touch-end - only handle if not mobile
    document.addEventListener('touchend', () => {
        if (activeCard && !isMobile) {
            activeCard.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
            activeCard = null;
        }
    });
 
    // put each card in a random place or arrange vertically on mobile
    function scatterCards() {
        isMobile = window.innerWidth <= 767;
        if (isMobile) {
            // Arrange cards vertically on mobile
            cards.forEach((card, index) => {
                card.style.left = '';
                card.style.top = '';
                card.style.transform = '';
                card.style.position = 'static';
                card.style.order = index; // Use CSS order for vertical arrangement
            });
        } else {
            const deskRect = desk.getBoundingClientRect();
            cards.forEach(card => {
                // Random position inside desk
                const randomX = Math.random() * (deskRect.width - 320) + 10;
                const randomY = Math.random() * (deskRect.height - 250) + 100;
                // Random rotation
                const randomRotate = Math.random() * 20 - 10;
                card.style.left = randomX + 'px';
                card.style.top = randomY + 'px';
                card.style.transform = `rotate(${randomRotate}deg)`;
                card.style.position = 'absolute';
            });
        }
    }
    //Scroll Spy: Menu active
    const sections = document.querySelectorAll('section');
    const navCards = document.querySelectorAll('.nav-card');
    // Every time scroll down or up on the page, this code is executed
    window.addEventListener('scroll', () => {
        let current = "";  // Here we will store: the ID of the currently active section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // See what section is currently on the screen.
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        // Activate link in the Navbar
        navCards.forEach(card => {
            card.classList.remove('active');
            if (card.getAttribute('href').includes(current)) {
                card.classList.add('active');
            }
        });
    });
    // When u open the page: the cards scatter
    scatterCards();
    window.addEventListener('resize', scatterCards);
});
