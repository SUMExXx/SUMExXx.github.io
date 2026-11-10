'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { motionState } from './motionState';

/*
 * One GPU particle system, one draw call. Every section names a shape (data-scene on the
 * element); each particle stores its position in all 8 shapes as attributes, and the vertex
 * shader blends between the two the scroll is between. Mid-transition the particles scatter
 * through noise and re-form, so sections dissolve into each other rather than cut.
 */

export const SHAPES = 8;
// Where each shape sits on screen (x, in view-height units) so content always has a clear side.
const OFFSET_X = [0.55, 0.62, 0.6, 0, -0.55, 0.6, 0, 0];
// Per-shape hue blend: 0 = green-led, 1 = purple-led.
const HUE = [0.25, 0.8, 0.3, 0.6, 0.85, 0.2, 0.7, 0.4];

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function buildShapes(n: number) {
	const shapes = Array.from({ length: SHAPES }, () => new Float32Array(n * 3));
	const golden = Math.PI * (3 - Math.sqrt(5));
	for (let i = 0; i < n; i++) {
		const u = i / n;
		const set = (s: number, x: number, y: number, z: number) => shapes[s].set([x, y, z], i * 3);

		// 0 · core: fibonacci sphere with a jittered skin.
		{
			const y = 1 - u * 2;
			const r = Math.sqrt(1 - y * y);
			const t = i * golden;
			const R = 1.6 + (Math.random() < 0.15 ? rand(0.2, 0.9) : rand(-0.04, 0.04));
			set(0, Math.cos(t) * r * R, y * R, Math.sin(t) * r * R);
		}
		// 1 · torus knot (2,3): "systems that loop".
		{
			const t = u * Math.PI * 2 * 1;
			const p = 2,
				q = 3;
			const r = 1.1 + 0.45 * Math.cos(q * t);
			const tube = rand(0, Math.PI * 2);
			const tr = rand(0, 0.18);
			set(
				1,
				r * Math.cos(p * t) + Math.cos(tube) * tr,
				r * Math.sin(p * t) + Math.sin(tube) * tr,
				0.55 * Math.sin(q * t) + Math.sin(tube) * tr,
			);
		}
		// 2 · double helix with rungs: a career strand.
		{
			const t = u * Math.PI * 9;
			const y = (u - 0.5) * 5.5;
			const strand = i % 3;
			if (strand < 2) {
				const a = t + strand * Math.PI;
				set(2, Math.cos(a) * 0.9 + rand(-0.04, 0.04), y, Math.sin(a) * 0.9 + rand(-0.04, 0.04));
			} else {
				const k = Math.random() * 2 - 1;
				set(2, Math.cos(t) * 0.9 * k, y, Math.sin(t) * 0.9 * k);
			}
		}
		// 3 · wave field: a grid the shader keeps rippling.
		{
			const side = Math.ceil(Math.sqrt(n));
			const gx = (i % side) / side - 0.5;
			const gz = Math.floor(i / side) / side - 0.5;
			set(3, gx * 7, 0, gz * 7);
		}
		// 4 · spiral galaxy.
		{
			const arm = i % 3;
			const d = Math.pow(Math.random(), 1.6) * 3;
			const a = arm * ((Math.PI * 2) / 3) + d * 1.6 + rand(-0.35, 0.35) / (d + 0.4);
			set(4, Math.cos(a) * d, rand(-0.12, 0.12) * (3 - d) * 0.5, Math.sin(a) * d);
		}
		// 5 · atom: nucleus and three tilted orbits.
		{
			const o = i % 4;
			if (o === 0) {
				const v = new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize().multiplyScalar(rand(0, 0.45));
				set(5, v.x, v.y, v.z);
			} else {
				const a = Math.random() * Math.PI * 2;
				const v = new THREE.Vector3(Math.cos(a) * 1.9, Math.sin(a) * 0.65, rand(-0.03, 0.03));
				v.applyAxisAngle(new THREE.Vector3(0, 0, 1), (o - 1) * (Math.PI / 3));
				set(5, v.x, v.y, v.z);
			}
		}
		// 6 · vortex tunnel the camera looks down.
		{
			const z = u * 14 - 11;
			const a = i * 2.39996 + z * 0.6;
			const r = 1.4 + rand(-0.12, 0.12) + Math.max(0, -z) * 0.05;
			set(6, Math.cos(a) * r, Math.sin(a) * r, z);
		}
		// 7 · portal ring.
		{
			const a = Math.random() * Math.PI * 2;
			const r = 1.8 + (Math.random() < 0.7 ? rand(-0.06, 0.06) : rand(-0.6, 0.35));
			set(7, Math.cos(a) * r, Math.sin(a) * r, rand(-0.08, 0.08));
		}
	}
	return shapes;
}

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
${NOISE}
attribute vec3 s1; attribute vec3 s2; attribute vec3 s3; attribute vec3 s4;
attribute vec3 s5; attribute vec3 s6; attribute vec3 s7;
attribute float aSeed;
uniform vec4 uWa; uniform vec4 uWb;
uniform float uTime; uniform float uScatter; uniform float uSpeed; uniform float uPx;
uniform vec2 uPointer; uniform float uAspect; uniform float uHue;
varying vec3 vColor; varying float vAlpha;

void main(){
  vec3 p = position*uWa.x + s1*uWa.y + s2*uWa.z + s3*uWa.w + s4*uWb.x + s5*uWb.y + s6*uWb.z + s7*uWb.w;
  // Wave field ripples; it is the only shape that moves on its own.
  p.y += uWa.w * (sin(p.x*1.3 + uTime*1.2) * 0.28 + cos(p.z*1.1 + uTime*0.9) * 0.22);
  // Scatter: strongest exactly between two shapes, plus a little from scroll speed.
  float s = uScatter + uSpeed * 0.35;
  if (s > 0.001) {
    vec3 q = p * 0.45 + aSeed * 3.0;
    p += vec3(snoise(q + uTime*0.25), snoise(q + 17.0), snoise(q - 31.0 + uTime*0.2)) * s * (1.2 + aSeed);
  }
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  // Pointer pushes particles aside in screen space: cheap, and works for every shape.
  vec2 ndc = gl_Position.xy / gl_Position.w;
  vec2 d = (ndc - uPointer) * vec2(uAspect, 1.0);
  float f = smoothstep(0.32, 0.0, length(d));
  gl_Position.xy += normalize(d + 1e-5) / vec2(uAspect, 1.0) * f * 0.12 * gl_Position.w;

  float twinkle = 0.65 + 0.35 * sin(uTime * (1.5 + aSeed * 2.0) + aSeed * 40.0);
  // Capped: particles near the camera would otherwise balloon and eat fill rate on weak GPUs.
  gl_PointSize = min((1.5 + aSeed * 2.6) * uPx * (6.5 / -mv.z) * (1.0 + f * 1.6), 14.0 * uPx);
  vec3 green = vec3(0.216, 0.969, 0.075);
  vec3 purple = vec3(0.608, 0.173, 0.941);
  vec3 violet = vec3(0.686, 0.545, 1.0);
  vec3 base = mix(green, purple, step(uHue, fract(aSeed * 7.13)));
  vColor = mix(base, violet, step(0.93, aSeed)) * (1.0 + f);
  vAlpha = twinkle * (0.55 + 0.45 * smoothstep(-14.0, -3.0, mv.z));
}`;

const fragmentShader = /* glsl */ `
varying vec3 vColor; varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor * a * a * 2.0, a * vAlpha);
}`;

const smooth = (a: number, b: number, t: number) => a + (b - a) * t;

function Particles({ count }: { count: number }) {
	const points = useRef<THREE.Points>(null);
	const geometry = useMemo(() => {
		const g = new THREE.BufferGeometry();
		const shapes = buildShapes(count);
		g.setAttribute('position', new THREE.BufferAttribute(shapes[0], 3));
		for (let s = 1; s < SHAPES; s++) g.setAttribute(`s${s}`, new THREE.BufferAttribute(shapes[s], 3));
		g.setAttribute('aSeed', new THREE.BufferAttribute(Float32Array.from({ length: count }, Math.random), 1));
		// Shapes move in the shader, so the CPU-side bounds are meaningless; never cull.
		g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e4);
		return g;
	}, [count]);

	const uniforms = useMemo(
		() => ({
			uWa: { value: new THREE.Vector4(1, 0, 0, 0) },
			uWb: { value: new THREE.Vector4() },
			uTime: { value: 0 },
			uScatter: { value: 0 },
			uSpeed: { value: 0 },
			uPx: { value: 1 },
			uPointer: { value: new THREE.Vector2(9, 9) },
			uAspect: { value: 1 },
			uHue: { value: 0.3 },
		}),
		[],
	);
	const weights = useMemo(() => new Float32Array(SHAPES), []);
	const scene = useRef(0);
	const perf = useRef({ t: 0, n: 0, degraded: false });

	useFrame((state, dt) => {
		// Weak GPU guard: if frames average over ~22ms for 2s, drop to native resolution once.
		const pf = perf.current;
		if (!pf.degraded) {
			pf.t += dt;
			pf.n++;
			if (pf.t > 2) {
				if (pf.t / pf.n > 0.022) {
					state.setDpr(1);
					pf.degraded = true;
				}
				pf.t = pf.n = 0;
			}
		}
		const { scene: target, velocity, pointerX, pointerY } = motionState;
		// Chase the scroll position with a little lag so morphs feel physical, not stepped.
		scene.current = smooth(scene.current, target, Math.min(dt * 4, 1));
		const sc = Math.min(Math.max(scene.current, 0), SHAPES - 1);
		const from = Math.floor(sc);
		const to = Math.min(from + 1, SHAPES - 1);
		const f = sc - from;
		const t = f * f * (3 - 2 * f);
		weights.fill(0);
		weights[from] += 1 - t;
		weights[to] += t;
		uniforms.uWa.value.set(weights[0], weights[1], weights[2], weights[3]);
		uniforms.uWb.value.set(weights[4], weights[5], weights[6], weights[7]);
		uniforms.uScatter.value = Math.sin(t * Math.PI) * 1.1;
		uniforms.uSpeed.value = smooth(uniforms.uSpeed.value, Math.min(Math.abs(velocity) / 40, 1), 0.1);
		uniforms.uTime.value += dt;
		uniforms.uPx.value = state.gl.getPixelRatio();
		uniforms.uAspect.value = state.size.width / state.size.height;
		uniforms.uPointer.value.set(pointerX, pointerY);
		uniforms.uHue.value = smooth(HUE[from], HUE[to], t);

		const p = points.current!;
		const vw = state.viewport.height * (state.size.width / state.size.height);
		const mobile = state.size.width < 768;
		const ox = mobile ? 0 : smooth(OFFSET_X[from], OFFSET_X[to], t) * Math.min(vw * 0.5, 4.2);
		p.position.x = smooth(p.position.x, ox, 0.08);
		p.position.y = smooth(p.position.y, mobile ? 0.6 : 0, 0.08);
		p.scale.setScalar(mobile ? 0.62 : 1);
		// Each shape gets its own idle motion; the wave field and tunnel face the camera differently.
		const tilt = smooth(0.25, 0.25, t) + weights[3] * 0.35 - weights[6] * 0.25 + weights[4] * 0.55;
		p.rotation.x = smooth(p.rotation.x, tilt + pointerY * 0.15, 0.05);
		p.rotation.y += dt * (0.12 + weights[4] * 0.1 - weights[6] * 0.12) + velocity * 0.0006;
		p.rotation.z = smooth(p.rotation.z, pointerX * 0.1 + weights[5] * 0.3, 0.05);
	});

	return (
		<points ref={points} geometry={geometry}>
			<shaderMaterial
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				transparent
				depthWrite={false}
				blending={THREE.AdditiveBlending}
			/>
		</points>
	);
}

export default function Scene() {
	const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
	return (
		<Canvas
			className="sd3-canvas"
			dpr={[1, 1.5]}
			camera={{ position: [0, 0, 6.5], fov: 50, near: 0.1, far: 60 }}
			gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false, depth: false }}
		>
			<Particles count={mobile ? 7000 : 16000} />
		</Canvas>
	);
}
