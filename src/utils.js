export const uid = () => Math.random().toString(36).slice(2, 9);
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const snap = (v, step = 8) => Math.round(v / step) * step;
export const DEFAULTS = {
text: {
w: 280,
h: 100,
content: "Click to edit text",
styles: { color: "#111827", fontSize: 18, fontWeight: 500, fontStyle:
"normal", textAlign: "left", bg: "#00000000" },
},
image: {
w: 320,
h: 200,
src: "https://images.unsplash.com/photo-1520975922291-6c614afc04aa?w=900&q=80",
styles: { bg: "#00000000", radius: 12, objectFit: "cover" },
},
button: {
w: 160,
h: 48,
content: "Click Me",
styles: { color: "#ffffff", bg: "#3b82f6", fontSize: 16, fontWeight: 600,
radius: 12 },
},
};
export function createElement(type, x, y) {
const d = DEFAULTS[type];
return {
id: uid(),
type,
x: snap(x ?? 40),
y: snap(y ?? 40),
w: d.w,
h: d.h,
z: 1,
rotation: 0,
content: d.content || "",
src: d.src || "",
styles: { ...(d.styles || {}) },
};
}
export function runSmokeTests() {
try {
console.assert(snap(9, 8) === 8, "snap() should snap to grid");
console.assert(clamp(5, 0, 4) === 4, "clamp() should bound to max");
const el = createElement("button", 15, 15);
console.assert(el.type === "button" && typeof el.id === "string" &&
el.id.length > 0, "createElement() basic");
} catch (error) {
console.error("Smoke test failed:", error);
}
}
