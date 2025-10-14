let logo;
let currentConfig = {};

function updateConfig() {
    currentConfig = {
        circleRadius: parseFloat(document.getElementById('radius').value),
        gridResolution: parseInt(document.getElementById('gridResolution').value),
        branchStrategy: 'random',
        seed: document.getElementById('seed').value ? parseInt(document.getElementById('seed').value) : null,
        strokeWidth: 2,
        circleColor: '#000000',
        pathColor: '#ffffff'
    };
}

function updateValueDisplays() {
    document.getElementById('radius-val').textContent = document.getElementById('radius').value;
    document.getElementById('grid-val').textContent = document.getElementById('gridResolution').value;
}

function generateLogo() {
    updateConfig();
    logo = new DubinsLogo(currentConfig);

    const size = currentConfig.circleRadius * 2 + 100;
    logo.render('#svg-container', size, size);
}

function downloadSVG() {
    if (!logo) return;

    updateConfig();
    const size = currentConfig.circleRadius * 2 + 100;
    const svgContent = logo.toSVG(size, size);

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dubins-logo-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
    const controls = ['radius', 'gridResolution'];
    controls.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', () => {
            updateValueDisplays();
            generateLogo();
        });
    });

    document.getElementById('generate').addEventListener('click', () => {
        document.getElementById('seed').value = '';
        generateLogo();
    });

    document.getElementById('download').addEventListener('click', downloadSVG);

    updateValueDisplays();
    generateLogo();
});
