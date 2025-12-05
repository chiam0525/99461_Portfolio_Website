document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('page_transition_overlay');
    const animationDuration = 500;

    const menuButton = document.getElementById('menu_button');
    const navBar = document.getElementById('nav_bar');
    const buttonText = document.getElementById('button_text');

    const backTopBtn = document.getElementById('back_top_btn');
    const scrollThreshold = 200;

    const projectCards = document.querySelectorAll('.project_card');

    let imageIndex = 1;

    if (overlay && overlay.classList.contains('is_active')) {
        overlay.classList.remove('is_active');
    }

    const handleTransitionOut = (e) => {
        const href = e.currentTarget.href;
        if (!href || href.startsWith('#') || href.indexOf(window.location.host) === -1) {
            return;
        }

        e.preventDefault();
        overlay.classList.add('is_active');

        setTimeout(() => {
            window.location.href = href;
        }, animationDuration);
    }

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', handleTransitionOut);
    });

    const toggleMenu = () => {
        navBar.classList.toggle('toggle');
        buttonText.style.opacity = 0;

        setTimeout(() => {
            if (navBar.classList.contains('toggle')) {
                buttonText.textContent = 'Close';
            } else {
                buttonText.textContent = 'Menu';
            }
            buttonText.style.opacity = 1;
        }, 200);
    }

    if (menuButton) {
        menuButton.onclick = toggleMenu;
    }

    window.imageValue = (n) => {
        showImages(imageIndex += n);
    }

    function showImages(n) {
        let i;
        const images = document.getElementsByClassName("gallery_images");
        if (images.length === 0) return;

        if (n > images.length) {
            imageIndex = 1;
        }
        if (n < 1) {
            imageIndex = images.length;
        }

        for (i = 0; i < images.length; i++) {
            images[i].style.display = "none"; 
            images[i].classList.remove('fade_in');
        }
        const currentImage = images[imageIndex - 1];
        currentImage.style.display = "block";

        setTimeout(() => {
            currentImage.classList.add('fade_in');
        }, 10);
    }
    showImages(imageIndex);

    window.onscroll = function () {
        if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
            backTopBtn.style.display = "block";
            backTopBtn.style.opacity = 1;
        } else {
            backTopBtn.style.display = "none";
            backTopBtn.style.opacity = 0;
        }
    };

    window.scrollToTop = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    if (backTopBtn) {
        backTopBtn.onclick = window.scrollToTop;
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-expanded');

            projectCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('is-expanded')) {
                    otherCard.classList.remove('is-expanded');
                }
            });
        });
    });
})




