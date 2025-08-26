// src/components/TextBlock.jsx
import React, { useEffect, useRef, useState } from "react";
export function TextBlock({ el, selected, preview, onCommit }) {
const [editing, setEditing] = useState(false);
const ref = useRef(null);
useEffect(() => { if (!selected) setEditing(false); }, [selected]);
const stop = (e) => e.stopPropagation();
const finish = () => { setEditing(false); const txt =
ref.current?.innerText ?? ""; onCommit(txt); };
return (
<div
className={`w-full h-full p-2 ${editing ? "cursor-text" : ""}`}
style={{
color: el.styles?.color,
fontWeight: el.styles?.fontWeight,
fontStyle: el.styles?.fontStyle,
fontSize: (el.styles?.fontSize || 18) + "px",
textAlign: el.styles?.textAlign || "left",
}}
onClick={(e) => {
  if (preview) return;
  e.stopPropagation();
  setEditing(true);

  setTimeout(() => {
    const range = document.createRange();
    const sel = window.getSelection();
    if (!ref.current || !sel) return;
    range.selectNodeContents(ref.current);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }, 0);
}}

onBlur={finish}
ref={ref}
contentEditable={!preview && editing}
suppressContentEditableWarning
onMouseDown={stop}
onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault();
e.currentTarget.blur(); } }}
>
{el.content}
</div>
);
}