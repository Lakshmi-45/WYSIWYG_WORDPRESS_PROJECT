// src/components/ElementView.jsx
import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { DND } from "../dnd";
import { TextBlock } from "./TextBlock";
export function ElementView({ el, selected, onSelect, updateElement, preview })
{
const handleRef = useRef(null);
const [, drag] = useDrag(() => ({
type: DND.ELEMENT,
canDrag: !preview,
item: () => ({ type: DND.ELEMENT, id: el.id, startX: el.x, startY: el.y }),
}), [el, preview]);
useEffect(() => { if (handleRef.current) drag(handleRef.current); }, [drag]);
const base = {
position: "absolute",
left: el.x,
top: el.y,
width: el.w,
height: el.h,
transform: `rotate(${el.rotation || 0}deg)`,
zIndex: el.z || 1,
borderRadius: el.styles?.radius ? `${el.styles.radius}px` : undefined,
background: el.styles?.bg,
outline: selected && !preview ? "2px solid #2563eb" : "none",
boxShadow: selected ? "0 0 0 4px rgba(37,99,235,0.15)" : "none",
cursor: preview ? "default" : "grab",
userSelect: preview ? "text" : "auto",
};
const fileRef = useRef(null);
const openPicker = () => fileRef.current?.click();
const onPick = (e) => {
const file = e.target.files?.[0]; if (!file) return; const reader = new
FileReader();
reader.onload = () => updateElement(el.id, { src: String(reader.result) });
reader.readAsDataURL(file);
};
return (
<div style={base} onMouseDown={onSelect}>
{!preview && (
<div ref={handleRef} title="Drag to move" className="absolute -top-2 -
left-2 h-5 w-5 rounded-full bg-slate-900 text-white text-[10px] leading-5 textcenter cursor-grab select-none">⇕</div>
)}
{el.type === "text" && (
<TextBlock el={el} selected={selected} preview={preview}
onCommit={(txt) => updateElement(el.id, { content: txt })} />
)}
{el.type === "image" && (
<div className="w-full h-full">
<img src={el.src} alt="" draggable={false} className="w-full h-full"
style={{ objectFit: el.styles?.objectFit || "cover", borderRadius:
el.styles?.radius }} onClick={() => !preview && openPicker()} />
{!preview && <input ref={fileRef} type="file" accept="image/*"
className="hidden" onChange={onPick} />}
</div>
)}
{el.type === "button" && (
<button
className="w-full h-full px-4"
style={{ background: el.styles?.bg || "#3b82f6", color:
el.styles?.color || "#fff", fontWeight: el.styles?.fontWeight || 600, fontSize:
(el.styles?.fontSize || 16) + "px", borderRadius: el.styles?.radius }}
onDoubleClick={() => { if (preview) return; const next =
window.prompt("Button label", el.content || ""); if (typeof next === "string")
updateElement(el.id, { content: next }); }}
onClick={() => { if (preview) alert(`Button clicked: ${el.content ||
"(no label)"}`); }}
>
{el.content || "Button"}
</button>
)}
</div>
);
}
