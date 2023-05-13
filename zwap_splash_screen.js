
class ZwapSplashScreen{

    constructor() {
        this.basePath = "https://zwapin.github.io/zwap_splash_screen";
    }

    loadSplash() {
        let originalHtml = document.body.innerHTML;
        document.body.innerHTML = '';
        fetch(`${this.basePath}/splash.html`)
            .then(response => response.text())
            .then(html => {
                const splashElement = document.createElement('div');
                splashElement.innerHTML = html;
                document.body.appendChild(splashElement);
                fetch(`${this.basePath}/zwap_loader.gif`)
                    .then(response => response.blob())
                    .then(blob => {
                        const imageUrl = URL.createObjectURL(blob);
                        const logoImage = splashElement.querySelector('.logo-image');
                        logoImage.src = imageUrl;
                        window.addEventListener('app_loaded', function () {
                            const originalElement = document.createElement('div');
                            originalElement.innerHTML = originalHtml;
                            document.body.innerHTML = originalElement.innerHTML;
                            splashElement.classList.add('hide');
                        });
                    });
            });
    }
    hideSplash() {
        window.dispatchEvent(new Event('app_loaded'));
    }
}
