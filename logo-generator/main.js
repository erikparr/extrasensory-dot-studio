let logo;
let currentConfig = {};

function updateConfig() {
    currentConfig = {
        circleRadius: parseFloat(document.getElementById('radius').value),
        gridResolution: parseInt(document.getElementById('gridResolution').value),
        cornerRadius: parseFloat(document.getElementById('cornerRadius').value),
        strokeWidth: parseFloat(document.getElementById('strokeWidth').value),
        useCurves: document.getElementById('useCurves').checked,
        branchStrategy: 'random',
        seed: document.getElementById('seed').value ? parseInt(document.getElementById('seed').value) : null,
        circleColor: document.getElementById('circleColor').value,
        pathColor: document.getElementById('pathColor').value
    };
}

function updateValueDisplays() {
    document.getElementById('radius-val').textContent = document.getElementById('radius').value;
    document.getElementById('grid-val').textContent = document.getElementById('gridResolution').value;
    document.getElementById('corner-val').textContent = document.getElementById('cornerRadius').value;
    document.getElementById('stroke-val').textContent = document.getElementById('strokeWidth').value;
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
    const controls = ['radius', 'gridResolution', 'cornerRadius', 'strokeWidth'];
    controls.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', () => {
            updateValueDisplays();
            generateLogo();
        });
    });

    const colorControls = ['circleColor', 'pathColor'];
    colorControls.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', () => {
            generateLogo();
        });
    });

    document.getElementById('useCurves').addEventListener('change', () => {
        generateLogo();
    });

    document.getElementById('generate').addEventListener('click', () => {
        document.getElementById('seed').value = '';
        generateLogo();
    });

    document.getElementById('download').addEventListener('click', downloadSVG);

    updateValueDisplays();
    generateLogo();
});
