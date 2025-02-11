function rot47(str) {
    return str.replace(/[\x21-\x7E]/g, function(c) {
        return String.fromCharCode(33 + ((c.charCodeAt(0) + 14) % 94));
    });
}

function npbutton() {
    // Always return true
    const terminal = document.querySelector('.terminal');
    const style = document.createElement('style');
    style.textContent = `
        ::-webkit-scrollbar {
            width: 12px;
            height: 12px;
        }

        ::-webkit-scrollbar-track {
            background: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background: yellow;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #f39c12;
        }

        ::-webkit-scrollbar-button {
            display: none;
        }

        .scrollable-element {
            scrollbar-width: thin;
            scrollbar-color: yellow transparent;
        }

        .terminal a {
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .terminal a:hover {
            transform: scale(0.99); /* Less noticeable shrink effect */
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8); /* Darkens the edges */
        }

        .terminal a img {
            transition: filter 0.3s;
        }

        .terminal a:hover img {
            filter: brightness(0.8) contrast(1.1); /* Keeps the center bright while darkening edges */
        }

        .fade-out {
            opacity: 0;
            transition: opacity 1s ease;
        }

        .full-screen-iframe {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            border: none;
            z-index: 9999;
        }

        @keyframes iframeFade {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        .iframe-container {
            position: relative;
            width: 100%;
            height: 100vh;
            overflow: hidden;
        }

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            opacity: 0; /* Start with iframe hidden */
            animation: iframeFade 3s forwards; /* Apply the iframeFade animation */
        }

        #imageContainer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            overflow: hidden;
        }

        .image {
            position: absolute;
            transition: transform 0.0s;
            transform: scale(0); /* Start with images scaled down */
        }

        .image.show {
            transform: scale(1); /* Images pop in */
        }

        .image.hide {
            transform: scale(0); /* Images pop out */
        }
    `;
    document.head.appendChild(style);

    // Do not worry lol these images are all decalssified
    const imageUrls = [
        'https://femboy.beauty/Q54ki.png',
        'https://femboy.beauty/CsG5N.png',
        'https://femboy.beauty/zbVmJ.png',
        'https://femboy.beauty/y6lZs.png',
        'https://femboy.beauty/bx7gj.png',
        'https://femboy.beauty/ZY1Te.png',
        'https://femboy.beauty/Q8xmz.png',
        'https://femboy.beauty/JWJ7g.png',
        'https://femboy.beauty/9pGJs.png',
        'https://femboy.beauty/_eDDB.png',
        'https://femboy.beauty/g7zzI.png',
        'https://femboy.beauty/GZ7qL.png',
        'https://femboy.beauty/NSffk.png',
        'https://femboy.beauty/HphS3.png',
        'https://femboy.beauty/kFfQy.png',
        'https://femboy.beauty/ddDaB.png',
        'https://femboy.beauty/v5TW8.png',
        'https://femboy.beauty/t4YvQ.png',
        'https://femboy.beauty/Hr0Ga.png',
        'https://femboy.beauty/3e3JA.png',
        'https://femboy.beauty/SpntO.png',
        'https://femboy.beauty/j4Fjm.png',
        'https://femboy.beauty/h7X9c.png',
        'https://femboy.beauty/cbdeu.png',
        'https://femboy.beauty/JgunQ.png',
        'https://femboy.beauty/1gvyu.png',
        'https://femboy.beauty/ToQys.png',
        'https://femboy.beauty/T59lJ.png',
        'https://femboy.beauty/KfR-y.png',
        'https://femboy.beauty/-7XwY.png',
        'https://femboy.beauty/Q54ki.png',
        'https://femboy.beauty/CsG5N.png',
        'https://femboy.beauty/zbVmJ.png',
        'https://femboy.beauty/y6lZs.png',
        'https://femboy.beauty/bx7gj.png',
        'https://femboy.beauty/ZY1Te.png',
        'https://femboy.beauty/Q8xmz.png',
        'https://femboy.beauty/JWJ7g.png',
        'https://femboy.beauty/9pGJs.png',
        'https://femboy.beauty/_eDDB.png',
        'https://femboy.beauty/g7zzI.png',
        'https://femboy.beauty/GZ7qL.png',
        'https://femboy.beauty/NSffk.png',
        'https://femboy.beauty/HphS3.png',
        'https://femboy.beauty/kFfQy.png',
        'https://femboy.beauty/ddDaB.png',
        'https://femboy.beauty/v5TW8.png',
        'https://femboy.beauty/t4YvQ.png',
        'https://femboy.beauty/Hr0Ga.png',
        'https://femboy.beauty/3e3JA.png',
        'https://femboy.beauty/SpntO.png',
        'https://femboy.beauty/j4Fjm.png',
        'https://femboy.beauty/h7X9c.png',
        'https://femboy.beauty/cbdeu.png',
        'https://femboy.beauty/JgunQ.png',
        'https://femboy.beauty/1gvyu.png',
        'https://femboy.beauty/ToQys.png',
        'https://femboy.beauty/T59lJ.png',
        'https://femboy.beauty/KfR-y.png',
        'https://femboy.beauty/-7XwY.png'
    ];
    // Shuffle the image URLs to randomize their order
    const shuffledUrls = imageUrls.sort(() => 0.5 - Math.random());

    // Preload images in the hidden container
    const preloadContainer = document.getElementById('preloadContainer');
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        preloadContainer.appendChild(img);
    });

    const totalArea = window.innerWidth * window.innerHeight;
    const imageCount = 120;

    // Create container for images
    const container = document.createElement('div');
    container.id = 'imageContainer';
    document.body.appendChild(container);

    // Generate and append image elements
    for (let i = 0; i < imageCount; i++) {
        const img = document.createElement('img');
        img.src = shuffledUrls[i % shuffledUrls.length];
        img.classList.add('image');
        container.appendChild(img);
    }

    const images = document.querySelectorAll('.image');

    // Load all images first to get their natural size for aspect ratio
    images.forEach((img) => {
        img.onload = function() {
            const originalWidth = img.naturalWidth;
            const originalHeight = img.naturalHeight;
            const aspectRatio = originalWidth / originalHeight;

            // Scale images between 1.5 and 2.5 times their original size
            const scaleFactor = Math.random() * (1.1 - 1.7) + 1.3;
            const scaledWidth = originalWidth * scaleFactor;
            const scaledHeight = originalHeight * scaleFactor;

            img.style.width = `${scaledWidth}px`;
            img.style.height = `${scaledHeight}px`;

            const randomTop = Math.random() * (window.innerHeight - scaledHeight);
            const randomLeft = Math.random() * (window.innerWidth - scaledWidth);

            img.style.top = `${randomTop}px`;
            img.style.left = `${randomLeft}px`;
            img.style.position = 'absolute';
        };
    });

    // Pop up images in sequence with 0.1s delay between each (no fade)
    images.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add('show');
        }, index * 75); // 100ms delay between each image showing
    });

    // Wait until all images are visible, then start hiding in reverse order
    setTimeout(() => {
        images.forEach((img, index) => {
            setTimeout(() => {
                img.classList.add('hide');
            }, (images.length - index - 1) * 75); // Reverse order hiding
        });
    }, 2000); // Wait 3 seconds after all images have appeared

    terminal.classList.add('hidden');

    setTimeout(() => {
        terminal.innerHTML = `
            <img src="https://femboy.beauty/uWbPJ.png" width="100" height="100" alt="PryzumLogo">
            <h1><span class="np">NP<span/><span class="errorcode">.Pryzum.net</span></h1>
            <p class="output">Welcome NP.Pryzum.net</p>
            <p class="output">Go to The <a href="./NP/PryzumTerminal/"><span class="errorcode">Pryzum Terminal</span></a></p>
            <!-- <p class="output">Go to The <a href="./NP/ShitList/"><span class="errorcode">Pryzum ShitList</span></a></p> -->
            <p class="output">Go to <a href="https://files.np.pryzum.net/Downloads/"><span class="errorcode">Pryzum Data Downloads</span></a></p>
        `;
        terminal.classList.remove('hidden');

        // Add event listener for the "Open Internal Computer" link
        document.getElementById('open-internal-computer').addEventListener('click', function(e) {
            e.preventDefault();  // Prevent default link behavior
            terminal.classList.add('fade-out');

            setTimeout(() => {
                terminal.innerHTML = '';  // Clear terminal content
                const iframe = document.createElement('iframe');
                iframe.src = this.href;  // Load iframe with the link's href
                iframe.classList.add('full-screen-iframe');  // Make iframe fullscreen
                document.body.appendChild(iframe);  // Append iframe to body
            }, 1000);  // Wait for fade-out effect to complete
        });
    }, 1000);

    return true; // Always return true
}

