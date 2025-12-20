/*
 * FoamLogo3D Component
 * 3D FOAM logo with iridescent soap bubble shader
 * Uses custom GLSL thin-film interference for realistic bubble effect
 */

'use client'

import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'
import './FoamLogo3D.css'

// Thin-film interference vertex shader
const iridescenceVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vec4 mvPosition = viewMatrix * worldPosition;
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

// Thin-film interference fragment shader
const iridescenceFragmentShader = `
  uniform float uTime;
  uniform float uThickness;
  uniform float uFresnelPower;
  uniform vec3 uBaseColor;
  uniform vec3 uEnvColor1;
  uniform vec3 uEnvColor2;
  uniform vec3 uEnvColor3;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  // IOR for soap film (water-based)
  const float IOR = 1.33;
  const float PI = 3.14159265359;

  // Spectral color from wavelength (approximate visible spectrum)
  vec3 wavelengthToRGB(float wavelength) {
    // Wavelength in nm (380-780)
    float w = clamp(wavelength, 380.0, 780.0);
    vec3 rgb;

    if (w < 440.0) {
      rgb = vec3(-(w - 440.0) / 60.0, 0.0, 1.0);
    } else if (w < 490.0) {
      rgb = vec3(0.0, (w - 440.0) / 50.0, 1.0);
    } else if (w < 510.0) {
      rgb = vec3(0.0, 1.0, -(w - 510.0) / 20.0);
    } else if (w < 580.0) {
      rgb = vec3((w - 510.0) / 70.0, 1.0, 0.0);
    } else if (w < 645.0) {
      rgb = vec3(1.0, -(w - 645.0) / 65.0, 0.0);
    } else {
      rgb = vec3(1.0, 0.0, 0.0);
    }

    // Intensity falloff at spectrum edges
    float factor;
    if (w < 420.0) {
      factor = 0.3 + 0.7 * (w - 380.0) / 40.0;
    } else if (w > 700.0) {
      factor = 0.3 + 0.7 * (780.0 - w) / 80.0;
    } else {
      factor = 1.0;
    }

    return rgb * factor;
  }

  // Thin-film interference calculation
  vec3 thinFilmInterference(float cosTheta, float thickness) {
    vec3 color = vec3(0.0);

    // Sample multiple wavelengths for accurate color
    for (float w = 400.0; w <= 700.0; w += 20.0) {
      // Optical path difference
      float delta = 2.0 * IOR * thickness * cosTheta;

      // Phase difference
      float phase = 2.0 * PI * delta / w;

      // Interference intensity (constructive/destructive)
      float intensity = 0.5 + 0.5 * cos(phase + PI);

      color += wavelengthToRGB(w) * intensity;
    }

    // Normalize
    color /= 16.0;
    return color;
  }

  // Fresnel reflectance (Schlick approximation)
  float fresnel(vec3 viewDir, vec3 normal, float power) {
    float NdotV = max(dot(normal, viewDir), 0.0);
    return pow(1.0 - NdotV, power);
  }

  // Simple environment mapping (procedural gradient)
  vec3 sampleEnvironment(vec3 reflectDir) {
    float y = reflectDir.y * 0.5 + 0.5;
    float x = atan(reflectDir.z, reflectDir.x) / (2.0 * PI) + 0.5;

    // Blend between environment colors based on direction
    vec3 topColor = uEnvColor1;
    vec3 midColor = uEnvColor2;
    vec3 bottomColor = uEnvColor3;

    // Add some noise/variation
    float noise = sin(x * 20.0 + uTime * 0.5) * 0.1 + sin(y * 15.0 - uTime * 0.3) * 0.1;

    vec3 envColor;
    if (y > 0.5) {
      envColor = mix(midColor, topColor, (y - 0.5) * 2.0);
    } else {
      envColor = mix(bottomColor, midColor, y * 2.0);
    }

    return envColor * (1.0 + noise);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Calculate viewing angle
    float cosTheta = abs(dot(normal, viewDir));

    // Animated thickness variation (soap bubble breathing effect)
    float thicknessVariation = sin(vUv.x * 10.0 + uTime) * 0.1
                            + sin(vUv.y * 8.0 - uTime * 0.7) * 0.1
                            + sin(length(vWorldPosition) * 5.0 + uTime * 0.5) * 0.05;
    float thickness = uThickness * (1.0 + thicknessVariation);

    // Thin-film interference color - boosted
    vec3 interferenceColor = thinFilmInterference(cosTheta, thickness) * 1.5;

    // Fresnel factor (more reflection at glancing angles)
    float fresnelFactor = fresnel(viewDir, normal, uFresnelPower);

    // Environment reflection - boosted
    vec3 reflectDir = reflect(-viewDir, normal);
    vec3 envReflection = sampleEnvironment(reflectDir) * 1.3;

    // Combine: base color + interference + environment reflection (boosted contributions)
    vec3 baseContrib = uBaseColor * (1.0 - fresnelFactor) * 0.4;
    vec3 iridContrib = interferenceColor * (0.7 + fresnelFactor * 0.5);
    vec3 envContrib = envReflection * fresnelFactor * 0.8;

    vec3 finalColor = baseContrib + iridContrib + envContrib;

    // Emissive inner glow - makes it look lit from within
    vec3 emissive = vec3(0.15, 0.2, 0.25) + interferenceColor * 0.2;
    finalColor += emissive;

    // Stronger edge glow
    float edgeGlow = pow(1.0 - cosTheta, 2.5) * 0.5;
    finalColor += vec3(0.9, 0.95, 1.0) * edgeGlow;

    // Soft tone mapping (preserves more brightness)
    finalColor = finalColor / (finalColor * 0.5 + vec3(1.0));

    // Slight transparency based on fresnel (bubbles are more transparent head-on)
    float alpha = 0.9 + fresnelFactor * 0.1;

    gl_FragColor = vec4(finalColor, alpha);
  }
`

export default function FoamLogo3D({
  className = '',
  width = 400,
  height = 200,
  autoRotate = true,
  showStats = false
}) {
  const containerRef = useRef(null)
  const [stats, setStats] = useState({ fps: 0, triangles: 0, drawCalls: 0 })
  const sceneRef = useRef(null)

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    // Background handled by CSS container

    // Camera - closer for more detail
    const camera = new THREE.PerspectiveCamera(
      35,
      width / height,
      0.1,
      1000
    )
    camera.position.z = 6

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // Lighting - enhanced for bubble shine
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    // Key light - warm white from top right
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    // Fill light - cool from left
    const fillLight = new THREE.DirectionalLight(0x88ccff, 0.6)
    fillLight.position.set(-5, 2, 3)
    scene.add(fillLight)

    // Rim light - magenta from behind
    const rimLight = new THREE.DirectionalLight(0xff00ff, 0.8)
    rimLight.position.set(0, -3, -5)
    scene.add(rimLight)

    // Accent point lights for specular highlights
    const pointLight1 = new THREE.PointLight(0x00ffff, 1.0, 20)
    pointLight1.position.set(3, 2, 4)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xff88ff, 0.8, 20)
    pointLight2.position.set(-3, -1, 4)
    scene.add(pointLight2)

    // Clock for animation
    const clock = new THREE.Clock()

    // Track time manually to avoid clock.getDelta/getElapsedTime conflict
    let lastTime = performance.now()

    // Create iridescent material - tuned for bubble shine
    const createIridescentMaterial = () => {
      return new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uThickness: { value: 300.0 }, // nm - thinner film = more vibrant colors
          uFresnelPower: { value: 2.5 }, // stronger edge glow
          uBaseColor: { value: new THREE.Color(0.05, 0.05, 0.1) }, // darker base
          // Vibrant environment colors
          uEnvColor1: { value: new THREE.Color(1.0, 0.3, 0.9) },  // Hot pink top
          uEnvColor2: { value: new THREE.Color(0.3, 1.0, 0.8) },  // Bright cyan mid
          uEnvColor3: { value: new THREE.Color(0.3, 0.4, 1.0) },  // Bright blue bottom
        },
        vertexShader: iridescenceVertexShader,
        fragmentShader: iridescenceFragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
      })
    }

    // === FLOATING BUBBLES ===
    const BUBBLE_COUNT = 20
    const bubbleGeometry = new THREE.SphereGeometry(1, 12, 8)

    const bubbles = []

    const resetBubble = (bubble, randomY) => {
      bubble.baseX = (Math.random() - 0.5) * 8
      bubble.mesh.position.x = bubble.baseX
      bubble.mesh.position.y = randomY ? (Math.random() - 0.5) * 5 : -3.5 - Math.random()
      bubble.mesh.position.z = 1 + Math.random() * 1.5
      bubble.speed = 0.3 + Math.random() * 0.4
      bubble.wobblePhase = Math.random() * Math.PI * 2
      bubble.wobbleSpeed = 1 + Math.random() * 1.5
      const size = 0.015 + Math.random() * 0.04
      bubble.mesh.scale.setScalar(size)
    }

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const mesh = new THREE.Mesh(bubbleGeometry, createIridescentMaterial())
      const bubble = {
        mesh,
        speed: 0,
        wobblePhase: 0,
        wobbleSpeed: 0,
        baseX: 0,
      }
      resetBubble(bubble, true)
      bubbles.push(bubble)
      scene.add(mesh)
    }

    // Load GLB models with Draco and Meshopt compression support
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)
    loader.setMeshoptDecoder(MeshoptDecoder)

    const letterMeshes = []
    const letters = ['F', 'O', 'A', 'M']
    const letterSpacing = 2.5
    const startX = -((letters.length - 1) * letterSpacing) / 2

    // Track loaded models
    let loadedCount = 0

    letters.forEach((letter, index) => {
      // Use optimized hi-res models (welded + Draco compressed)
      const modelPath = `/foam-logo-3d/optimized/${letter}.glb`

      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene

          // Find meshes and apply iridescent material
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = createIridescentMaterial()
              letterMeshes.push(child)
            }
          })

          // Rotate to face camera (models are oriented along Y-up)
          model.rotation.x = Math.PI / 2

          // Position letter
          model.position.x = startX + index * letterSpacing
          model.position.y = 0

          // Scale to fit
          const box = new THREE.Box3().setFromObject(model)
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          const scale = 2.0 / maxDim
          model.scale.setScalar(scale)

          // Center vertically
          box.setFromObject(model)
          const center = box.getCenter(new THREE.Vector3())
          model.position.y -= center.y

          scene.add(model)
          loadedCount++

          // Adjust camera after all models loaded - keep it close
          if (loadedCount === letters.length) {
            const sceneBounds = new THREE.Box3()
            letterMeshes.forEach(mesh => {
              sceneBounds.expandByObject(mesh)
            })
            const sceneSize = sceneBounds.getSize(new THREE.Vector3())
            camera.position.z = (Math.max(sceneSize.x, sceneSize.y) * 0.8 + 3) * 0.56
            camera.position.y = 1
          }
        },
        undefined,
        (error) => {
          console.warn(`Failed to load ${letter}.glb:`, error)
          // Create fallback geometry
          const geometry = new THREE.BoxGeometry(1.5, 2, 0.5)
          const material = createIridescentMaterial()
          const mesh = new THREE.Mesh(geometry, material)
          mesh.position.x = startX + index * letterSpacing
          scene.add(mesh)
          letterMeshes.push(mesh)
        }
      )
    })

    // Animation loop with stats tracking
    let animationId = 0
    let frameCount = 0
    let lastStatsUpdate = performance.now()

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const elapsed = clock.getElapsedTime()

      // Calculate delta time manually (avoids clock.getDelta conflict)
      const now = performance.now()
      const deltaTime = (now - lastTime) / 1000
      lastTime = now

      // Update stats every 500ms
      if (showStats) {
        frameCount++
        if (now - lastStatsUpdate >= 500) {
          const fps = Math.round((frameCount * 1000) / (now - lastStatsUpdate))
          const info = renderer.info
          setStats({
            fps,
            triangles: info.render.triangles,
            drawCalls: info.render.calls
          })
          frameCount = 0
          lastStatsUpdate = now
        }
      }

      // Update shader uniforms
      letterMeshes.forEach((mesh, index) => {
        if (mesh.material instanceof THREE.ShaderMaterial) {
          mesh.material.uniforms.uTime.value = elapsed
        }

        // Subtle float animation (different phase per letter)
        const floatOffset = Math.sin(elapsed * 0.8 + index * 0.5) * 0.1
        const floatY = Math.sin(elapsed * 0.6 + index * 0.7) * 0.05

        if (mesh.parent) {
          mesh.parent.position.y = floatOffset
          mesh.parent.rotation.z = floatY * 0.1
        }

        // Auto rotation
        if (autoRotate) {
          mesh.rotation.y = Math.sin(elapsed * 0.3 + index * 0.2) * 0.15
        }
      })

      // Update floating bubbles
      bubbles.forEach((bubble) => {
        // Rise upward
        bubble.mesh.position.y += bubble.speed * deltaTime

        // Horizontal wobble
        const wobble = Math.sin(elapsed * bubble.wobbleSpeed + bubble.wobblePhase) * 0.15
        bubble.mesh.position.x = bubble.baseX + wobble

        // Reset when above view
        if (bubble.mesh.position.y > 3.5) {
          resetBubble(bubble, false)
        }

        // Update material time
        const mat = bubble.mesh.material
        if (mat.uniforms) {
          mat.uniforms.uTime.value = elapsed
        }
      })

      // Camera oscillation
      camera.position.x = Math.sin(elapsed * 0.3) * 0.4
      camera.lookAt(0.5, 1, 0)

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    sceneRef.current = {
      scene,
      camera,
      renderer,
      letterMeshes,
      animationId,
      clock,
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      dracoLoader.dispose()
      bubbleGeometry.dispose()
      bubbles.forEach((b) => {
        b.mesh.material.dispose()
        scene.remove(b.mesh)
      })
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      sceneRef.current = null
    }
  }, [width, height, autoRotate, showStats])

  return (
    <div
      ref={containerRef}
      className={`foam-logo-3d ${className}`}
      style={{ width, height, position: 'relative', background: 'var(--bg-secondary, #0a0a0a)' }}
    >
      {showStats && (
        <div className="foam-logo-stats">
          <div>FPS: {stats.fps}</div>
          <div>Triangles: {stats.triangles.toLocaleString()}</div>
          <div>Draw Calls: {stats.drawCalls}</div>
        </div>
      )}
    </div>
  )
}
