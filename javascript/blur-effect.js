const createBlurCanvas = () => {
    const heroContent = document.querySelector('.hero-content');
    const blurCanvas = document.createElement('canvas');
    const ctx = blurCanvas.getContext('2d');

    blurCanvas.style.position = 'absolute';
    blurCanvas.style.top = '0';
    blurCanvas.style.left = '0';
    blurCanvas.style.width = '100%';
    blurCanvas.style.height = '100%';
    blurCanvas.style.zIndex = '1';
    blurCanvas.style.pointerEvents = 'none';

    const updateCanvasSize = () => {
        const rect = heroContent.getBoundingClientRect();
        blurCanvas.width = rect.width;
        blurCanvas.height = rect.height;
    };

    const drawBlur = () => {
        ctx.clearRect(0, 0, blurCanvas.width, blurCanvas.height);
        ctx.filter = 'blur(10px)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, 0, blurCanvas.width, blurCanvas.height);
    };

    updateCanvasSize();
    drawBlur();

    window.addEventListener('resize', () => {
        updateCanvasSize();
        drawBlur();
    });

    heroContent.style.position = 'relative';
    heroContent.insertBefore(blurCanvas, heroContent.firstChild);
};

document.addEventListener('DOMContentLoaded', createBlurCanvas);