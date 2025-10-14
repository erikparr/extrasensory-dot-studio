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
            pathColor: config.pathColor || '#ffffff',
            cornerRadius: config.cornerRadius !== undefined ? config.cornerRadius : 0.35,
            useCurves: config.useCurves !== undefined ? config.useCurves : true
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

    getCellConnections(row, col) {
        if (!this.maze || !this.maze.grid[row] || !this.maze.grid[row][col]) {
            return { N: false, E: false, S: false, W: false };
        }

        const cell = this.maze.grid[row][col];
        return {
            N: !cell.N,
            E: !cell.E,
            S: !cell.S,
            W: !cell.W
        };
    }

    calculateArcCenter(corner, dir1, dir2, radius) {
        // dir1 and dir2 are direction vectors, e.g., {x: 0, y: -1} for North
        return {
            x: corner.x + dir1.x * radius + dir2.x * radius,
            y: corner.y + dir1.y * radius + dir2.y * radius
        };
    }

    calculateTangentPoint(corner, direction, radius) {
        return {
            x: corner.x + direction.x * radius,
            y: corner.y + direction.y * radius
        };
    }

    generateMaze() {
        this.maze = new MazeGenerator(
            this.config.gridResolution,
            this.config.gridResolution
        );

        this.maze.generate();
    }

    renderMaze() {
        if (!this.config.useCurves) {
            this.renderMazeStraight();
            return;
        }

        this.path = [];
        const radius = this.cellSize * this.config.cornerRadius;

        // Pass 1: Add corner arcs for each cell (once per cell)
        for (let row = 0; row < this.config.gridResolution; row++) {
            for (let col = 0; col < this.config.gridResolution; col++) {
                if (!this.isInCircle(row, col)) continue;

                const connections = this.getCellConnections(row, col);
                const world = this.cellToWorld(row, col);

                this.addCornerArcsForCell(world, connections, radius);
            }
        }

        // Pass 2: Add connecting lines between cells
        for (let row = 0; row < this.config.gridResolution; row++) {
            for (let col = 0; col < this.config.gridResolution; col++) {
                if (!this.isInCircle(row, col)) continue;

                const cell = this.maze.grid[row][col];
                const world = this.cellToWorld(row, col);
                const conn = this.getCellConnections(row, col);

                // Draw East connection
                if (!cell.E && col < this.config.gridResolution - 1 && this.isInCircle(row, col + 1)) {
                    const neighborWorld = this.cellToWorld(row, col + 1);
                    const neighborConn = this.getCellConnections(row, col + 1);

                    let x1 = world.x;
                    let x2 = neighborWorld.x;

                    // Adjust for corners at source cell
                    if (this.hasCurveInDirection(conn, 'E')) {
                        x1 += radius;
                    }
                    // Adjust for corners at destination cell
                    if (this.hasCurveInDirection(neighborConn, 'W')) {
                        x2 -= radius;
                    }

                    this.path.push({
                        type: 'line',
                        x1: x1,
                        y1: world.y,
                        x2: x2,
                        y2: neighborWorld.y
                    });
                }

                // Draw South connection
                if (!cell.S && row < this.config.gridResolution - 1 && this.isInCircle(row + 1, col)) {
                    const neighborWorld = this.cellToWorld(row + 1, col);
                    const neighborConn = this.getCellConnections(row + 1, col);

                    let y1 = world.y;
                    let y2 = neighborWorld.y;

                    // Adjust for corners at source cell
                    if (this.hasCurveInDirection(conn, 'S')) {
                        y1 += radius;
                    }
                    // Adjust for corners at destination cell
                    if (this.hasCurveInDirection(neighborConn, 'N')) {
                        y2 -= radius;
                    }

                    this.path.push({
                        type: 'line',
                        x1: world.x,
                        y1: y1,
                        x2: neighborWorld.x,
                        y2: y2
                    });
                }
            }
        }
    }

    hasCurveInDirection(connections, direction) {
        // Check if there's a curve when exiting in this direction
        const count = Object.values(connections).filter(Boolean).length;

        // No curve for dead ends or straight corridors
        if (count < 2) return false;
        if (count === 2 && this.isOppositeConnections(connections)) return false;

        // Check if the direction is connected (has an opening)
        if (!connections[direction]) return false;

        // There's a curve if we have this direction plus at least one perpendicular
        const perpendicular = {
            'N': ['E', 'W'],
            'S': ['E', 'W'],
            'E': ['N', 'S'],
            'W': ['N', 'S']
        };

        return perpendicular[direction].some(dir => connections[dir]);
    }

    addCornerArcsForCell(center, connections, radius) {
        const count = Object.values(connections).filter(Boolean).length;
        if (count < 2) return;
        if (count === 2 && this.isOppositeConnections(connections)) return;

        const dirVectors = {
            N: { x: 0, y: -1 },
            E: { x: 1, y: 0 },
            S: { x: 0, y: 1 },
            W: { x: -1, y: 0 }
        };

        // Find all corner combinations and add arcs
        if (connections.N && connections.E) {
            this.addCornerArc(center, 'N', 'E', radius, dirVectors);
        }
        if (connections.E && connections.S) {
            this.addCornerArc(center, 'E', 'S', radius, dirVectors);
        }
        if (connections.S && connections.W) {
            this.addCornerArc(center, 'S', 'W', radius, dirVectors);
        }
        if (connections.W && connections.N) {
            this.addCornerArc(center, 'W', 'N', radius, dirVectors);
        }
    }

    renderMazeStraight() {
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

    isOppositeConnections(connections) {
        return (connections.N && connections.S && !connections.E && !connections.W) ||
               (connections.E && connections.W && !connections.N && !connections.S);
    }

    addCornerArc(center, dir1, dir2, radius, dirVectors) {
        const v1 = dirVectors[dir1];
        const v2 = dirVectors[dir2];

        // For convex corners, tangent points are on the incoming/outgoing paths
        // They are offset FROM the center in each direction by the radius
        const tangent1 = this.calculateTangentPoint(center, v1, radius);
        const tangent2 = this.calculateTangentPoint(center, v2, radius);

        // For convex (outward) corners, we need to reverse the sweep direction
        // The arc should bulge away from the cell center
        // Counter-clockwise transitions for outward curves:
        const clockwiseTransitions = {
            'N': { 'E': 0, 'W': 1 },  // N->E is counter-clockwise (outer curve)
            'E': { 'S': 0, 'N': 1 },  // E->S is counter-clockwise (outer curve)
            'S': { 'W': 0, 'E': 1 },  // S->W is counter-clockwise (outer curve)
            'W': { 'N': 0, 'S': 1 }   // W->N is counter-clockwise (outer curve)
        };

        const sweep = clockwiseTransitions[dir1]?.[dir2] ?? 0;

        this.path.push({
            type: 'arc',
            x1: tangent1.x,
            y1: tangent1.y,
            x2: tangent2.x,
            y2: tangent2.y,
            radius: radius,
            sweep: sweep
        });
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
        let currentPos = null;

        for (const segment of this.path) {
            const x1 = centerX + segment.x1;
            const y1 = centerY + segment.y1;
            const x2 = centerX + segment.x2;
            const y2 = centerY + segment.y2;

            if (segment.type === 'line') {
                // Move to start if needed, then line to end
                if (!currentPos || currentPos.x !== x1 || currentPos.y !== y1) {
                    pathData += `M ${x1} ${y1} `;
                }
                pathData += `L ${x2} ${y2} `;
                currentPos = { x: x2, y: y2 };
            } else if (segment.type === 'arc') {
                // Move to start if needed
                if (!currentPos || currentPos.x !== x1 || currentPos.y !== y1) {
                    pathData += `M ${x1} ${y1} `;
                }
                // SVG arc: A rx ry rotation large-arc-flag sweep-flag x y
                // For 90-degree arcs, large-arc-flag = 0
                const sweep = segment.sweep !== undefined ? segment.sweep : 1;
                pathData += `A ${segment.radius} ${segment.radius} 0 0 ${sweep} ${x2} ${y2} `;
                currentPos = { x: x2, y: y2 };
            }
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
