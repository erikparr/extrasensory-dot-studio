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

// Responsive FOV calculation - keeps horizontal content visible on narrow screens
const BASE_ASPECT = 16 / 9
const BASE_FOV = 35
const MAX_FOV = 65

function calculateResponsiveFOV(width, height) {
  const aspect = width / height
  let fov = BASE_FOV
  if (aspect < BASE_ASPECT) {
    fov = BASE_FOV * (BASE_ASPECT / aspect)
    fov = Math.min(fov, MAX_FOV)
  }
  return fov
}

// Calculate camera Z to fit content width within view
function calculateCameraZ(contentWidth, fov, aspect) {
  const vFovRad = (fov * Math.PI) / 180
  const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * aspect)
  const padding = 1.15 // 15% breathing room
  const z = (contentWidth * padding) / (2 * Math.tan(hFovRad / 2))
  return z
}

export default function FoamLogo3D({
  className = '',
  autoRotate = true,
  showStats = false
}) {
  const containerRef = useRef(null)
  const [stats, setStats] = useState({ fps: 0, triangles: 0, drawCalls: 0 })
  const sceneRef = useRef(null)

  // Initialize Three.js scene - deferred until container has dimensions
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene state - initialized lazily
    let initialized = false
    let scene, camera, renderer, clock, dracoLoader, bubbleGeometry
    let sceneContentWidth = 0 // Store scene width for responsive camera positioning
    let animationId = 0
    let lastTime = performance.now()
    let frameCount = 0
    let lastStatsUpdate = performance.now()
    const letterMeshes = []
    const bubbles = []

    // Create iridescent material - tuned for bubble shine
    const createIridescentMaterial = () => {
      return new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uThickness: { value: 300.0 },
          uFresnelPower: { value: 2.5 },
          uBaseColor: { value: new THREE.Color(0.05, 0.05, 0.1) },
          uEnvColor1: { value: new THREE.Color(1.0, 0.3, 0.9) },
          uEnvColor2: { value: new THREE.Color(0.3, 1.0, 0.8) },
          uEnvColor3: { value: new THREE.Color(0.3, 0.4, 1.0) },
        },
        vertexShader: iridescenceVertexShader,
        fragmentShader: iridescenceFragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
      })
    }

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

    // Initialize the Three.js scene with known dimensions
    const initScene = (width, height) => {
      if (initialized) return
      initialized = true

      // Scene setup
      scene = new THREE.Scene()

      // Camera - with responsive FOV for narrow screens
      const initialFOV = calculateResponsiveFOV(width, height)
      camera = new THREE.PerspectiveCamera(initialFOV, width / height, 0.1, 1000)
      camera.position.z = 6

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      container.appendChild(renderer.domElement)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
      keyLight.position.set(5, 5, 5)
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0x88ccff, 0.6)
      fillLight.position.set(-5, 2, 3)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(0xff00ff, 0.8)
      rimLight.position.set(0, -3, -5)
      scene.add(rimLight)

      const pointLight1 = new THREE.PointLight(0x00ffff, 1.0, 20)
      pointLight1.position.set(3, 2, 4)
      scene.add(pointLight1)

      const pointLight2 = new THREE.PointLight(0xff88ff, 0.8, 20)
      pointLight2.position.set(-3, -1, 4)
      scene.add(pointLight2)

      // Clock for animation
      clock = new THREE.Clock()

      // Floating bubbles
      const BUBBLE_COUNT = 20
      bubbleGeometry = new THREE.SphereGeometry(1, 12, 8)

      for (let i = 0; i < BUBBLE_COUNT; i++) {
        const mesh = new THREE.Mesh(bubbleGeometry, createIridescentMaterial())
        const bubble = { mesh, speed: 0, wobblePhase: 0, wobbleSpeed: 0, baseX: 0 }
        resetBubble(bubble, true)
        bubbles.push(bubble)
        scene.add(mesh)
      }

      // Load GLB models
      dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

      const loader = new GLTFLoader()
      loader.setDRACOLoader(dracoLoader)
      loader.setMeshoptDecoder(MeshoptDecoder)

      const letters = ['F', 'O', 'A', 'M']
      const letterSpacing = 2.5
      const startX = -((letters.length - 1) * letterSpacing) / 2
      let loadedCount = 0

      letters.forEach((letter, index) => {
        const modelPath = `/foam-logo-3d/optimized/${letter}.glb`

        loader.load(
          modelPath,
          (gltf) => {
            const model = gltf.scene

            model.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material = createIridescentMaterial()
                letterMeshes.push(child)
              }
            })

            model.rotation.x = Math.PI / 2
            model.position.x = startX + index * letterSpacing
            model.position.y = 0

            const box = new THREE.Box3().setFromObject(model)
            const size = box.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = 2.0 / maxDim
            model.scale.setScalar(scale)

            box.setFromObject(model)
            const center = box.getCenter(new THREE.Vector3())
            model.position.y -= center.y

            scene.add(model)
            loadedCount++

            if (loadedCount === letters.length) {
              const sceneBounds = new THREE.Box3()
              letterMeshes.forEach(mesh => sceneBounds.expandByObject(mesh))
              const sceneSize = sceneBounds.getSize(new THREE.Vector3())

              // Store scene width and calculate camera Z to fit content
              sceneContentWidth = sceneSize.x
              camera.position.z = calculateCameraZ(sceneContentWidth, camera.fov, camera.aspect)
              camera.position.y = 1
            }
          },
          undefined,
          (error) => {
            console.warn(`Failed to load ${letter}.glb:`, error)
            const geometry = new THREE.BoxGeometry(1.5, 2, 0.5)
            const material = createIridescentMaterial()
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.x = startX + index * letterSpacing
            scene.add(mesh)
            letterMeshes.push(mesh)
          }
        )
      })

      // Animation loop
      const animate = () => {
        animationId = requestAnimationFrame(animate)

        const elapsed = clock.getElapsedTime()
        const now = performance.now()
        const deltaTime = (now - lastTime) / 1000
        lastTime = now

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

        letterMeshes.forEach((mesh, index) => {
          if (mesh.material instanceof THREE.ShaderMaterial) {
            mesh.material.uniforms.uTime.value = elapsed
          }

          const floatOffset = Math.sin(elapsed * 0.8 + index * 0.5) * 0.1
          const floatY = Math.sin(elapsed * 0.6 + index * 0.7) * 0.05

          if (mesh.parent) {
            mesh.parent.position.y = floatOffset
            mesh.parent.rotation.z = floatY * 0.1
          }

          if (autoRotate) {
            mesh.rotation.y = Math.sin(elapsed * 0.3 + index * 0.2) * 0.15
          }
        })

        bubbles.forEach((bubble) => {
          bubble.mesh.position.y += bubble.speed * deltaTime
          const wobble = Math.sin(elapsed * bubble.wobbleSpeed + bubble.wobblePhase) * 0.15
          bubble.mesh.position.x = bubble.baseX + wobble

          if (bubble.mesh.position.y > 3.5) {
            resetBubble(bubble, false)
          }

          const mat = bubble.mesh.material
          if (mat.uniforms) {
            mat.uniforms.uTime.value = elapsed
          }
        })

        camera.position.x = Math.sin(elapsed * 0.3) * 0.4
        camera.lookAt(0.5, 1, 0)

        renderer.render(scene, camera)
      }
      animate()

      sceneRef.current = { scene, camera, renderer, letterMeshes, animationId, clock }
    }

    // Handle resize - also triggers initialization on first valid dimensions
    const handleResize = (entries) => {
      const { width, height } = entries[0].contentRect
      if (width === 0 || height === 0) return

      if (!initialized) {
        initScene(width, height)
        return
      }

      // Update existing scene with responsive FOV and camera Z
      camera.aspect = width / height
      camera.fov = calculateResponsiveFOV(width, height)

      // Recalculate camera Z if we know the scene width
      if (sceneContentWidth > 0) {
        camera.position.z = calculateCameraZ(sceneContentWidth, camera.fov, camera.aspect)
      }

      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    // Use ResizeObserver to wait for valid dimensions before initializing
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      if (animationId) cancelAnimationFrame(animationId)
      if (dracoLoader) dracoLoader.dispose()
      if (bubbleGeometry) bubbleGeometry.dispose()
      bubbles.forEach((b) => {
        b.mesh.material.dispose()
        if (scene) scene.remove(b.mesh)
      })
      if (renderer) {
        renderer.dispose()
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
      sceneRef.current = null
    }
  }, [autoRotate, showStats])

  return (
    <div
      ref={containerRef}
      className={`foam-logo-3d ${className}`}
      style={{ width: '100%', height: '100%', background: 'var(--bg-secondary, #0a0a0a)' }}
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
