module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep viewBox for proper scaling
          removeViewBox: false,
          // Don't merge paths that might break the design
          mergePaths: true,
        },
      },
    },
    // Optimize path data (merge adjacent segments, remove redundant commands)
    {
      name: 'convertPathData',
      params: {
        // More aggressive path optimization
        floatPrecision: 2,
        transformPrecision: 3,
        makeArcs: {
          threshold: 2.5, // Angle threshold for converting to arcs
          tolerance: 0.5
        },
        straightCurves: true,
        lineShorthands: true,
        curveSmoothShorthands: true,
        applyTransforms: true,
        applyTransformsStroked: true,
        makeArcs: true,
        utilizeAbsolute: false
      }
    },
    // Merge multiple paths into one where possible
    'mergePaths',
    // Remove useless stroke and fill attributes
    'removeUselessStrokeAndFill',
    // Clean up numeric values
    {
      name: 'cleanupNumericValues',
      params: {
        floatPrecision: 2
      }
    },
    // Remove unnecessary path commands
    'removeEmptyContainers',
    'cleanupIds'
  ]
};
