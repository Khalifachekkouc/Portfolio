
        const desk = document.getElementById('desk');
        let activeCard = null;
        let offset = { x: 0, y: 0 };
        let highestZ = 1;

        function initCards() {
            const cards = document.querySelectorAll('.card-note');
            cards.forEach(card => {
                card.addEventListener('mousedown', (e) => {
                    activeCard = card;
                    highestZ++;
                    card.style.zIndex = highestZ;
                    const rect = card.getBoundingClientRect();
                    offset.x = e.clientX - rect.left;
                    offset.y = e.clientY - rect.top;
                    card.style.transition = 'none';
                });
            });
        }

        document.addEventListener('mousemove', (e) => {
            if (activeCard) {
                const deskRect = desk.getBoundingClientRect();
                activeCard.style.left = (e.clientX - deskRect.left - offset.x) + 'px';
                activeCard.style.top = (e.clientY - deskRect.top - offset.y) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            if (activeCard) {
                activeCard.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
                activeCard = null;
            }
        });

        function scatterCards() {
            const cards = document.querySelectorAll('.card-note');
            const deskRect = desk.getBoundingClientRect();
            cards.forEach(card => {
                const randomX = Math.random() * (deskRect.width - 350) + 50;
                const randomY = Math.random() * (deskRect.height - 350) + 100;
                const randomRotate = Math.random() * 20 - 10;
                card.style.left = randomX + 'px';
                card.style.top = randomY + 'px';
                card.style.transform = `rotate(${randomRotate}deg)`;
            });
        }

        initCards();
        window.onload = scatterCards;
        window.onresize = scatterCards;



         // Navigation Card Logic
        const navCards = document.querySelectorAll('.nav-card');
        const sections = document.querySelectorAll('section');

        navCards.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        window.addEventListener('scroll', () => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navCards.forEach(card => {
                card.classList.remove('active');
                if (card.getAttribute('href').includes(current)) {
                    card.classList.add('active');
                }
            });
        });