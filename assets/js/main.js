function initParallax() {
    jarallax(document.querySelectorAll('.has-parallax-feed .gh-card'), {
        speed: 0.8,
    });
}

(() => {
    if (!document.body.classList.contains('has-background-about')) return;

    const about = document.querySelector('.gh-about');
    if (!about) return;

    const image = about.querySelector('.gh-about-image');
    if (!image) return;

    const updateAboutHeight = () => {
        if (!image.naturalWidth || !image.naturalHeight) return;

        const width = about.clientWidth || image.clientWidth;
        if (!width) return;

        const height = width * image.naturalHeight / image.naturalWidth;
        about.style.setProperty('--about-height', `${height}px`);
        about.classList.add('initialized');
    };

    // Cas 1 : l’image est déjà chargée (fréquent avec fetchpriority=high)
    if (image.complete && image.naturalWidth) {
        updateAboutHeight();
    } else {
        // Cas 2 : on attend le chargement
        imagesLoaded(image, updateAboutHeight);
    }

    // Optionnel mais propre : recalcule si la fenêtre change (responsive)
    window.addEventListener('resize', () => {
        if (!image.naturalWidth) return; // sécurité
        updateAboutHeight();
    });
})();


(function () {
    initParallax();
})();

(function () {
    const toggle = document.querySelector('[data-toggle-comments]');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
        document.body.classList.toggle('comments-opened');
    });
})();

(function () {
    const element = document.querySelector('.gh-article-excerpt');
    if (!element) return;

    let text = element.textContent;
    const emojiRE = /\p{EPres}|\p{ExtPict}/gu;

    const emojis = text.match(emojiRE);
    if (!emojis) return;

    emojis.forEach(function (emoji) {
        text = text.replace(emoji, `<span class="emoji">${emoji}</span>`);
    });

    element.innerHTML = text;
})();

(function () {
    pagination(true, initParallax);
})();
