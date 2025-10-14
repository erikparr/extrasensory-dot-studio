// Simplified maze generation based on mazes library
class MazeGenerator {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.stack = [];

        this.initGrid();
    }

    initGrid() {
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col] = {
                    N: true,  // North wall
                    E: true,  // East wall
                    S: true,  // South wall
                    W: true,  // West wall
                    visited: false
                };
            }
        }
    }

    isValid(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    removeWall(row1, col1, row2, col2) {
        const dx = col2 - col1;
        const dy = row2 - row1;

        if (dx === 1) {
            this.grid[row1][col1].E = false;
            this.grid[row2][col2].W = false;
        } else if (dx === -1) {
            this.grid[row1][col1].W = false;
            this.grid[row2][col2].E = false;
        } else if (dy === 1) {
            this.grid[row1][col1].S = false;
            this.grid[row2][col2].N = false;
        } else if (dy === -1) {
            this.grid[row1][col1].N = false;
            this.grid[row2][col2].S = false;
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    generate() {
        const startRow = Math.floor(this.rows / 2);
        const startCol = Math.floor(this.cols / 2);

        this.stack.push([startRow, startCol]);
        this.grid[startRow][startCol].visited = true;

        while (this.stack.length > 0) {
            const [row, col] = this.stack[this.stack.length - 1];

            const neighbors = [];
            const directions = [
                [-1, 0], // North
                [0, 1],  // East
                [1, 0],  // South
                [0, -1]  // West
            ];

            for (const [dy, dx] of directions) {
                const newRow = row + dy;
                const newCol = col + dx;
                if (this.isValid(newRow, newCol) && !this.grid[newRow][newCol].visited) {
                    neighbors.push([newRow, newCol]);
                }
            }

            if (neighbors.length > 0) {
                const [nextRow, nextCol] = neighbors[Math.floor(Math.random() * neighbors.length)];
                this.removeWall(row, col, nextRow, nextCol);
                this.grid[nextRow][nextCol].visited = true;
                this.stack.push([nextRow, nextCol]);
            } else {
                this.stack.pop();
            }
        }
    }
}

class DubinsLogo {
    constructor(config = {}) {
        this.config = {
            circleRadius: config.circleRadius || 200,
            gridResolution: config.gridResolution || 16,
            seed: config.seed || null,
            strokeWidth: config.strokeWidth || 2,
            circleColor: config.circleColor || '#000000',
            pathColor: config.pathColor || '#ffffff'
        };

        this.canvasSize = this.config.circleRadius * 2 + 100;
        this.cellSize = this.canvasSize / this.config.gridResolution;
        this.maze = null;
        this.path = [];
    }

    cellToWorld(row, col) {
        const offsetX = (col - this.config.gridResolution / 2) * this.cellSize + this.cellSize / 2;
        const offsetY = (row - this.config.gridResolution / 2) * this.cellSize + this.cellSize / 2;
        return { x: offsetX, y: offsetY };
    }

    isInCircle(row, col) {
        const world = this.cellToWorld(row, col);
        const distance = Math.sqrt(world.x ** 2 + world.y ** 2);
        return distance <= this.config.circleRadius;
    }

    generateMaze() {
        this.maze = new MazeGenerator(
            this.config.gridResolution,
            this.config.gridResolution
        );

        this.maze.generate();
    }

    renderMaze() {
        this.path = [];

        for (let row = 0; row < this.config.gridResolution; row++) {
            for (let col = 0; col < this.config.gridResolution; col++) {
                if (!this.isInCircle(row, col)) continue;

                const cell = this.maze.grid[row][col];
                const world = this.cellToWorld(row, col);

                if (!cell.E && col < this.config.gridResolution - 1) {
                    if (this.isInCircle(row, col + 1)) {
                        const neighborWorld = this.cellToWorld(row, col + 1);
                        this.path.push({
                            type: 'line',
                            x1: world.x,
                            y1: world.y,
                            x2: neighborWorld.x,
                            y2: neighborWorld.y
                        });
                    }
                }

                if (!cell.S && row < this.config.gridResolution - 1) {
                    if (this.isInCircle(row + 1, col)) {
                        const neighborWorld = this.cellToWorld(row + 1, col);
                        this.path.push({
                            type: 'line',
                            x1: world.x,
                            y1: world.y,
                            x2: neighborWorld.x,
                            y2: neighborWorld.y
                        });
                    }
                }
            }
        }
    }

    generate() {
        this.generateMaze();
        this.renderMaze();
        return this.path;
    }

    toSVG(width = 500, height = 500) {
        const centerX = width / 2;
        const centerY = height / 2;

        let pathData = '';

        for (const segment of this.path) {
            const x1 = centerX + segment.x1;
            const y1 = centerY + segment.y1;
            const x2 = centerX + segment.x2;
            const y2 = centerY + segment.y2;

            pathData += `M ${x1} ${y1} L ${x2} ${y2} `;
        }

        const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <circle
        cx="${centerX}"
        cy="${centerY}"
        r="${this.config.circleRadius}"
        fill="${this.config.circleColor}"
        stroke="none"
    />
    <path
        d="${pathData.trim()}"
        fill="none"
        stroke="${this.config.pathColor}"
        stroke-width="${this.config.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>`.trim();

        return svg;
    }

    render(container, width = 500, height = 500) {
        this.generate();
        const svg = this.toSVG(width, height);

        if (typeof container === 'string') {
            container = document.querySelector(container);
        }

        if (container) {
            container.innerHTML = svg;
        }

        return svg;
    }
}
