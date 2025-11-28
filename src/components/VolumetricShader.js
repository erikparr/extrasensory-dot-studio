'use client'

import { useEffect, useRef } from 'react'

// Shadertoy uniform bridge
const SHADERTOY_HEADER = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform int iFrame;
uniform vec4 iMouse;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform vec4 iDate;

// Tunable parameters
uniform float uTimeSpeed;
uniform float uDistortion;
uniform float uFbmScale;
uniform float uDensityThreshold;
uniform vec3 uSpatialFreq;
`

// Common code from the shader
const COMMON_CODE = `
#define PI 3.141592653589793
#define TWOPI 6.283185307179586
#define HALFPI 1.570796326794896
#define INV_SQRT_2 0.7071067811865476

#define POLAR(theta) vec3(cos(theta), 0.0, sin(theta))
#define SPHERICAL(theta, phi) (sin(phi)*POLAR(theta) + vec3(0.0, cos(phi), 0.0))

float len2Inf(vec2 v) {
    vec2 d = abs(v);
    return max(d.x, d.y);
}

void boxClip(
    in vec3 boxMin, in vec3 boxMax,
    in vec3 p, in vec3 v,
    out vec2 tRange, out float didHit
){
    vec3 tb0 = (boxMin - p) / v;
    vec3 tb1 = (boxMax - p) / v;
    vec3 tmin = min(tb0, tb1);
    vec3 tmax = max(tb0, tb1);

    tRange = vec2(
        max(max(tmin.x, tmin.y), tmin.z),
        min(min(tmax.x, tmax.y), tmax.z)
    );

    didHit = step(tRange.s, tRange.t);
}

float hash12(vec2 p) {
    vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

float hash13(vec3 p3) {
    p3  = fract(p3 * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

vec3 colormap(float t) {
    vec3 accent = vec3(0.8, 1.0, 0.0);
    float grey = 0.5 + 0.5*cos(TWOPI * t);
    return mix(vec3(grey), accent, smoothstep(0.3, 0.7, t));
}

vec4 blendOnto(vec4 cFront, vec4 cBehind) {
    return cFront + (1.0 - cFront.a)*cBehind;
}

#define BOX_MIN vec3(-2.0, -1.5, -0.25)
#define BOX_MAX vec3(2.0, 1.5, 0.25)
#define BOX_N 128.0

vec3 lmnFromWorldPos(vec3 p) {
    vec3 uvw = (p - BOX_MIN) / (BOX_MAX - BOX_MIN);
    return uvw * vec3(BOX_N-1.0);
}

#define MAX_ALPHA_PER_UNIT_DIST 10.0
#define QUIT_ALPHA 0.99
#define QUIT_ALPHA_L 0.95
#define RAY_STEP 0.025
#define RAY_STEP_L 0.025

#define CAM_THETA (0.2*iTime)
#define LIGHT_POS (0.9*POLAR(CAM_THETA+PI*0.15) + vec3(0.0, 2.0, 0.0))

float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    vec2 uv = (i.xy+vec2(37.0,17.0)*i.z) + f.xy;
    vec2 rg = texture2D( iChannel1, (uv+0.5)/256.0).yx;
    return mix( rg.x, rg.y, f.z );
}

float fbm(vec3 p) {
    p *= uFbmScale;
    float v = noise(p);
    p *= 0.3;
    v = mix(v, noise(p), 0.7);
    p *= 0.3;
    v = mix(v, noise(p), 0.7);
    return v;
}

float fDensity(vec3 lmn, float t) {
    t += 32.0;
    vec3 uvw = (lmn - vec3(63.5))/63.5;

    float d2 = fbm(
        uSpatialFreq * lmn +
        vec3(0.0, uTimeSpeed*2.0*t, 0.0)
    );

    float d1 = fbm(
        uSpatialFreq * 0.5 * lmn +
        vec3(0.0, uTimeSpeed*t, 0.0) +
        uDistortion*vec3( cos(d2*TWOPI), 2.0*d2, sin(d2*TWOPI) )
    );
    d1 = pow(d1, mix( 4.0, 12.0, smoothstep(0.6,1.0,len2Inf(uvw.xz)) ));

    float a = 0.02 * uDensityThreshold;
    float b = 0.08 * uDensityThreshold;
    return 0.02 + 0.2*smoothstep(0.0, a, d1) + 0.5*smoothstep(a, b, d1) + 0.18*smoothstep(b, 1.0, d1);
}
`

const IMAGE_SHADER = `
${COMMON_CODE}

float marchLight(vec3 p, vec3 nv) {
    float lightAmount = 1.0;
    vec2 tRange;
    float didHitBox;
    boxClip(BOX_MIN, BOX_MAX, p, nv, tRange, didHitBox);
    tRange.s = max(0.0, tRange.s);

    if (didHitBox < 0.5) {
        return 0.0;
    }

    float t = tRange.s + min(tRange.t-tRange.s, RAY_STEP_L)*hash13(100.0*p);
    for (int i=0; i<80; i++) {
        if (t > tRange.t || lightAmount < 1.0-QUIT_ALPHA_L) { break; }
        vec3 rayPos = p + t*nv;
        vec3 lmn = lmnFromWorldPos(rayPos);
        float density = fDensity(lmn, iTime);
        float calpha = clamp(density * MAX_ALPHA_PER_UNIT_DIST * RAY_STEP_L, 0.0, 1.0);
        lightAmount *= 1.0 - calpha;
        t += RAY_STEP_L;
    }
    return lightAmount;
}

vec4 march(vec3 p, vec3 nv, vec2 fragCoord) {
    vec2 tRange;
    float didHitBox;
    boxClip(BOX_MIN, BOX_MAX, p, nv, tRange, didHitBox);
    tRange.s = max(0.0, tRange.s);

    vec4 color = vec4(0.0);
    if (didHitBox < 0.5) {
        return color;
    }

    float t = tRange.s + min(tRange.t-tRange.s, RAY_STEP)*hash12(fragCoord);
    for (int i=0; i<100; i++) {
        if (t > tRange.t || color.a > QUIT_ALPHA) { break; }
        vec3 rayPos = p + t*nv;
        vec3 lmn = lmnFromWorldPos(rayPos);
        float density = fDensity(lmn, iTime);
        vec3 toLight = normalize(LIGHT_POS - rayPos);
        float lightAmount = marchLight(rayPos, toLight);
        lightAmount = mix(lightAmount, 1.0, 0.025);
        vec3 cfrag = colormap(0.7*density+0.8);
        float calpha = density * MAX_ALPHA_PER_UNIT_DIST * RAY_STEP;
        vec4 ci = clamp( vec4(cfrag * lightAmount, 1.0)*calpha, 0.0, 1.0);
        color = blendOnto(color, ci);
        t += RAY_STEP;
    }

    float finalA = clamp(color.a/QUIT_ALPHA, 0.0, 1.0);
    color *= (finalA / (color.a + 1e-5));
    return color;
}

#define RES iResolution
#define TAN_HALF_FOVY 0.5773502691896257
#define VIGNETTE_INTENSITY 0.25

vec3 nvCamDirFromClip(vec3 nvFw, vec2 clip) {
    vec3 nvRt = normalize(cross(nvFw, vec3(0.,1.,0.)));
    vec3 nvUp = cross(nvRt, nvFw);
    return normalize(TAN_HALF_FOVY*(clip.x*(RES.x/RES.y)*nvRt + clip.y*nvUp) + nvFw);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    vec3 camPos = vec3(0.0, 0.0, 1.5);
    vec3 nvCamFw = vec3(0.0, 0.0, -1.0);
    vec3 nvCamDir = nvCamDirFromClip(nvCamFw, uv*2. - 1.);

    vec4 fgColor = march(camPos, nvCamDir, fragCoord);
    vec3 finalColor = blendOnto(fgColor, vec4(0.0, 0.0, 0.0, 1.0)).rgb;

    vec2 radv = vec2(0.5, 0.5) - uv;
    float dCorner = length(radv) / INV_SQRT_2;
    float vignetteFactor = 1.0 - mix(0.0, VIGNETTE_INTENSITY, smoothstep(0.4, 0.9, dCorner));

    fragColor = vec4(vignetteFactor * finalColor, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error('Shader compile error: ' + error)
  }
  return shader
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error('Program link error: ' + gl.getProgramInfoLog(program))
  }
  return program
}

function createNoiseTexture(gl) {
  const size = 256
  const data = new Uint8Array(size * size * 4)
  for (let i = 0; i < size * size; i++) {
    data[i * 4 + 0] = Math.random() * 255
    data[i * 4 + 1] = Math.random() * 255
    data[i * 4 + 2] = Math.random() * 255
    data[i * 4 + 3] = 255
  }
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, data)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
  return texture
}

const PRESETS = [
  { timeSpeed: 2.7, freqX: 2.0, freqY: 0.05, freqZ: 2.0, distortion: 10.0, fbmScale: 1.15, densityThreshold: 2.45 },
  { timeSpeed: 2.0, freqX: 0.9, freqY: 0.25, freqZ: 0.05, distortion: 1.2, fbmScale: 1.6, densityThreshold: 3.0 },
]

export default function VolumetricShader({ className = '', style = {} }) {
  const canvasRef = useRef(null)
  const paramsRef = useRef(PRESETS[Math.floor(Math.random() * PRESETS.length)])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      preserveDrawingBuffer: true,
      antialias: false
    })

    if (!gl) return

    let program
    try {
      const fragmentSource = SHADERTOY_HEADER + IMAGE_SHADER
      program = createProgram(gl, VERTEX_SHADER, fragmentSource)
    } catch (e) {
      console.error(e)
      return
    }

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const positionLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const uniforms = {
      iResolution: gl.getUniformLocation(program, 'iResolution'),
      iTime: gl.getUniformLocation(program, 'iTime'),
      iTimeDelta: gl.getUniformLocation(program, 'iTimeDelta'),
      iFrame: gl.getUniformLocation(program, 'iFrame'),
      iMouse: gl.getUniformLocation(program, 'iMouse'),
      iChannel1: gl.getUniformLocation(program, 'iChannel1'),
      uTimeSpeed: gl.getUniformLocation(program, 'uTimeSpeed'),
      uSpatialFreq: gl.getUniformLocation(program, 'uSpatialFreq'),
      uDistortion: gl.getUniformLocation(program, 'uDistortion'),
      uFbmScale: gl.getUniformLocation(program, 'uFbmScale'),
      uDensityThreshold: gl.getUniformLocation(program, 'uDensityThreshold'),
    }

    const noiseTexture = createNoiseTexture(gl)

    let frame = 0
    let startTime = performance.now()
    let lastTime = startTime
    let animationId
    let running = true

    const render = (currentTime) => {
      if (!running) return

      const time = (currentTime - startTime) / 1000
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      const displayWidth = canvas.clientWidth
      const displayHeight = canvas.clientHeight
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
        gl.viewport(0, 0, displayWidth, displayHeight)
      }

      gl.useProgram(program)

      gl.uniform3f(uniforms.iResolution, canvas.width, canvas.height, 1)
      gl.uniform1f(uniforms.iTime, time)
      gl.uniform1f(uniforms.iTimeDelta, deltaTime)
      gl.uniform1i(uniforms.iFrame, frame)
      gl.uniform4f(uniforms.iMouse, 0, 0, 0, 0)

      gl.uniform1f(uniforms.uTimeSpeed, paramsRef.current.timeSpeed)
      gl.uniform3f(uniforms.uSpatialFreq, paramsRef.current.freqX, paramsRef.current.freqY, paramsRef.current.freqZ)
      gl.uniform1f(uniforms.uDistortion, paramsRef.current.distortion)
      gl.uniform1f(uniforms.uFbmScale, paramsRef.current.fbmScale)
      gl.uniform1f(uniforms.uDensityThreshold, paramsRef.current.densityThreshold)

      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, noiseTexture)
      gl.uniform1i(uniforms.iChannel1, 1)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      frame++
      animationId = requestAnimationFrame(render)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      running = false
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
    />
  )
}
