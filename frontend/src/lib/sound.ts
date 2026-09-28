/**
 * Optional sound design, synthesised with WebAudio — no audio files.
 * An ambient sea bed (filtered noise with a slow swell) and soft UI ticks.
 * Nothing plays until the visitor turns sound on (a user gesture).
 */
type Listener = (on: boolean) => void;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let bed: GainNode | null = null;
let enabled = false;
const listeners = new Set<Listener>();

function noiseBuffer(ac: AudioContext) {
  const len = ac.sampleRate * 4;
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      // brown noise: integrated white noise — deep, water-like
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      d[i] = last * 3.2;
    }
  }
  return buf;
}

function build() {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  bed = ctx.createGain();
  bed.gain.value = 0.55;
  bed.connect(master);

  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx);
  src.loop = true;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 520;
  lp.Q.value = 0.4;
  // the swell: a slow LFO sweeping the filter and the level
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.075;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 320;
  lfo.connect(lfoDepth).connect(lp.frequency);
  const swell = ctx.createGain();
  swell.gain.value = 0.7;
  const lfo2 = ctx.createOscillator();
  lfo2.frequency.value = 0.11;
  const lfo2Depth = ctx.createGain();
  lfo2Depth.gain.value = 0.3;
  lfo2.connect(lfo2Depth).connect(swell.gain);
  src.connect(lp).connect(swell).connect(bed);
  src.start();
  lfo.start();
  lfo2.start();
}

export const sound = {
  get on() { return enabled; },
  subscribe(fn: Listener) { listeners.add(fn); return () => { listeners.delete(fn); }; },
  toggle() {
    enabled = !enabled;
    if (enabled && !ctx) build();
    if (ctx && master) {
      if (enabled) void ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(enabled ? 0.22 : 0, ctx.currentTime, enabled ? 0.8 : 0.25);
    }
    listeners.forEach((l) => l(enabled));
  },
  /** A soft, short tick — used on slide changes and primary interactions. */
  tick(pitch = 1) {
    if (!enabled || !ctx || !master) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(1320 * pitch, t);
    o.frequency.exponentialRampToValueAtTime(660 * pitch, t + 0.09);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.14);
  },
  /** A low sonar ping — used for chapter arrivals. */
  ping() {
    if (!enabled || !ctx || !master) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(880, t);
    o.frequency.exponentialRampToValueAtTime(820, t + 1.2);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.25, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 1.7);
  },
};
