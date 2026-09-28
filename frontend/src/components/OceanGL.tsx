import { useEffect, useRef, useState } from "react";
import { useReducedMotion, type MotionValue } from "motion/react";
import { useOnScreen } from "@/components/kit";

/**
 * A real-time procedural ocean in a single fragment shader (raw WebGL, no deps).
 * `tod` (0 → 1) moves the light from pre-dawn to golden hour.
 * Renders at reduced resolution, pauses off-screen and in background tabs,
 * and falls back to a CSS gradient when WebGL or motion is unavailable.
 */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uTod;
uniform vec2 uMouse;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Sum of directional peaked waves: exp(sin) gives sharp crests and broad troughs.
float sea(vec2 p, float detail){
  float h = 0.0, fr = 0.55, amp = 0.34, sp = 0.9;
  for (int i = 0; i < 7; i++) {
    float ang = float(i) * 2.39996;
    vec2 d = vec2(cos(ang), sin(ang));
    float x = dot(p, d) * fr + uTime * sp + noise(p * 0.12 * fr + float(i)) * 1.6;
    float w = amp * (exp(sin(x) - 1.0));
    h += w * (i < 3 ? 1.0 : detail);
    fr *= 1.62; amp *= 0.52; sp *= 1.18;
  }
  return h;
}

vec3 sunDir(){ return normalize(vec3(0.12, mix(-0.03, 0.11, uTod), 1.0)); }
vec3 horizonCol(){ return mix(vec3(0.06, 0.1, 0.16), vec3(0.88, 0.42, 0.15), smoothstep(0.15, 1.0, uTod)); }

vec3 sky(vec3 rd){
  float y = max(rd.y, 0.0);
  vec3 zenith = mix(vec3(0.008, 0.016, 0.04), vec3(0.05, 0.09, 0.17), uTod);
  vec3 col = mix(horizonCol(), zenith, pow(y, 0.38));
  float s = max(dot(rd, sunDir()), 0.0);
  col += vec3(1.0, 0.62, 0.3) * pow(s, 900.0) * 6.0 * uTod;
  col += vec3(1.0, 0.45, 0.18) * pow(s, 14.0) * 0.32 * uTod;
  // a thin band of cloud at the horizon
  float band = exp(-abs(rd.y - 0.04) * 60.0) * noise(vec2(rd.x * 14.0, 3.0)) ;
  col = mix(col, horizonCol() * 0.7, band * 0.35);
  return col;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(uMouse.x * 0.8, 2.4 + uMouse.y * 0.25, uTime * 1.1);
  vec3 ta = ro + vec3(uMouse.x * 0.15, -0.075 + uMouse.y * 0.02, 1.0);
  vec3 cw = normalize(ta - ro);
  vec3 cu = normalize(cross(cw, vec3(0.0, 1.0, 0.0)));
  vec3 cv = cross(cu, cw);
  vec3 rd = normalize(uv.x * cu + uv.y * cv + 1.7 * cw);

  vec3 col;
  if (rd.y > -0.002) {
    col = sky(rd);
  } else {
    float t = -ro.y / rd.y;
    vec3 p = ro + rd * t;
    float detail = clamp(1.0 - t / 70.0, 0.0, 1.0);
    float eps = 0.03 + t * 0.006;
    float h = sea(p.xz, detail);
    vec3 n = normalize(vec3(
      sea(p.xz - vec2(eps, 0.0), detail) - sea(p.xz + vec2(eps, 0.0), detail),
      2.0 * eps,
      sea(p.xz - vec2(0.0, eps), detail) - sea(p.xz + vec2(0.0, eps), detail)));
    n = normalize(mix(n, vec3(0.0, 1.0, 0.0), clamp(t / 140.0, 0.0, 0.85)));
    float fres = pow(clamp(1.0 - dot(n, -rd), 0.0, 1.0), 4.0) * 0.85 + 0.03;
    vec3 refl = sky(reflect(rd, n));
    vec3 deep = vec3(0.002, 0.012, 0.022);
    vec3 body = deep + vec3(0.01, 0.05, 0.075) * h * (0.7 + uTod * 0.6);
    col = mix(body, refl, fres);
    float spec = pow(max(dot(reflect(rd, n), sunDir()), 0.0), 220.0);
    col += vec3(1.0, 0.7, 0.4) * spec * 2.2 * uTod;
    float fog = 1.0 - exp(-t * 0.018);
    col = mix(col, horizonCol() * 0.62, fog * 0.92);
  }
  vec2 q = gl_FragCoord.xy / uRes;
  col *= 0.35 + 0.65 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.18);
  col = pow(col, vec3(0.4545));
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}

export default function OceanGL({ tod, className = "", scale = 0.6 }: { tod: MotionValue<number> | number; className?: string; scale?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const visible = useOnScreen(canvas, "100px");
  const [failed, setFailed] = useState(false);
  const todRef = useRef(tod);
  todRef.current = tod;

  useEffect(() => {
    if (reduce || !visible || failed || !canvas.current) return;
    const el = canvas.current;
    const gl = el.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) { setFailed(true); return; }
    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
    } catch {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uTod = gl.getUniformLocation(prog, "uTod");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    const mobile = window.matchMedia("(max-width: 899px)").matches;
    const k = Math.min(window.devicePixelRatio || 1, 1.5) * (mobile ? scale * 0.75 : scale);
    const resize = () => {
      el.width = Math.max(2, Math.round(el.clientWidth * k));
      el.height = Math.max(2, Math.round(el.clientHeight * k));
      gl.viewport(0, 0, el.width, el.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => { mouse.tx = e.clientX / window.innerWidth - 0.5; mouse.ty = 0.5 - e.clientY / window.innerHeight; };
    window.addEventListener("pointermove", onMove, { passive: true });

    let frame = 0;
    const start = performance.now();
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (document.hidden) return;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      const t = todRef.current;
      gl.uniform2f(uRes, el.width, el.height);
      gl.uniform1f(uTime, Math.max(0, now - start) / 1000);
      gl.uniform1f(uTod, typeof t === "number" ? t : t.get());
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [reduce, visible, failed, scale]);

  return <canvas ref={canvas} className={`v-oceangl ${failed || reduce ? "is-fallback" : ""} ${className}`} aria-hidden />;
}
