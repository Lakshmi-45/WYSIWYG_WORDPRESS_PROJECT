import React from "react";

export function Inspector({ element, onChange, onStyle, onDelete }) {
  const el = element;
  const updateStyle = (k, v) => onStyle({ [k]: v });
  const update = (k, v) => onChange({ [k]: v });

  const onPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ src: String(reader.result) });
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-4 rounded-2xl border bg-white shadow p-4 space-y-5">
      {/* Header */}
      <div className="text-lg font-bold text-slate-800">Inspector</div>
      <div className="text-xs text-slate-500 tracking-wide uppercase">
        Selected: {el.type.toUpperCase()}
      </div>

      {/* Position / Size */}
      <div className="grid grid-cols-2 gap-3">
        <Labeled label="X">
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={el.x}
            onChange={(e) =>
              update("x", snap(parseInt(e.target.value || "0")))
            }
          />
        </Labeled>
        <Labeled label="Y">
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={el.y}
            onChange={(e) =>
              update("y", snap(parseInt(e.target.value || "0")))
            }
          />
        </Labeled>
        <Labeled label="W">
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={el.w}
            onChange={(e) =>
              update("w", Math.max(40, parseInt(e.target.value || "0")))
            }
          />
        </Labeled>
        <Labeled label="H">
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={el.h}
            onChange={(e) =>
              update("h", Math.max(24, parseInt(e.target.value || "0")))
            }
          />
        </Labeled>
      </div>

      {/* Text / Button Content */}
      {el.type !== "image" && (
        <Labeled label={el.type === "button" ? "Label" : "Text"}>
          <input
            className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={el.content}
            onChange={(e) => update("content", e.target.value)}
            placeholder={el.type === "button" ? "Button label" : "Enter text"}
          />
        </Labeled>
      )}

      {/* Typography Controls */}
      {(el.type === "text" || el.type === "button") && (
        <div className="grid grid-cols-2 gap-3">
          <Labeled label="Font size">
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={el.styles?.fontSize || 16}
              onChange={(e) =>
                updateStyle("fontSize", parseInt(e.target.value || "16"))
              }
            />
          </Labeled>
          <Labeled label="Weight">
            <select
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={el.styles?.fontWeight || 400}
              onChange={(e) =>
                updateStyle("fontWeight", parseInt(e.target.value))
              }
            >
              <option value={400}>Normal</option>
              <option value={500}>Medium</option>
              <option value={600}>Semibold</option>
              <option value={700}>Bold</option>
            </select>
          </Labeled>
          <Labeled label="Italic">
            <Toggle
              value={(el.styles?.fontStyle || "normal") === "italic"}
              onChange={(v) =>
                updateStyle("fontStyle", v ? "italic" : "normal")
              }
            />
          </Labeled>
          <Labeled label="Text color">
            <input
              type="color"
              className="w-full h-9 border border-gray-300 rounded-lg cursor-pointer"
              value={el.styles?.color || "#111827"}
              onChange={(e) => updateStyle("color", e.target.value)}
            />
          </Labeled>
          <Labeled label="Align" full>
            <div className="flex gap-2">
              {["left", "center", "right"].map((a) => (
                <button
                  key={a}
                  onClick={() => updateStyle("textAlign", a)}
                  className={`flex-1 rounded-lg border px-2 py-1 text-sm font-medium transition-all duration-200
                    ${
                      (el.styles?.textAlign || "left") === a
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-gray-100 text-slate-700 border-gray-300 hover:bg-gray-200"
                    }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </Labeled>
        </div>
      )}

      {/* Image Controls */}
      {el.type === "image" && (
        <>
          <Labeled label="Upload image">
            <input type="file" accept="image/*" onChange={onPick} />
          </Labeled>
          <Labeled label="Radius">
            <input
              type="range"
              min={0}
              max={32}
              value={el.styles?.radius || 12}
              onChange={(e) => updateStyle("radius", parseInt(e.target.value))}
            />
          </Labeled>
          <Labeled label="Object fit">
            <select
              className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={el.styles?.objectFit || "cover"}
              onChange={(e) => updateStyle("objectFit", e.target.value)}
            >
              <option value="cover">cover</option>
              <option value="contain">contain</option>
              <option value="fill">fill</option>
            </select>
          </Labeled>
        </>
      )}

      {/* Background */}
      <Labeled label="Background">
        <input
          type="color"
          className="w-full h-9 border border-gray-300 rounded-lg cursor-pointer"
          value={el.styles?.bg || "#00000000"}
          onChange={(e) => updateStyle("bg", e.target.value)}
        />
      </Labeled>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="w-full rounded-lg py-2 font-semibold tracking-wide bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-rose-600 hover:to-red-700 shadow-md transition-all duration-200"
      >
        Delete element
      </button>
    </div>
  );
}

export function Labeled({ label, children, full }) {
  return (
    <label className={`text-sm ${full ? "col-span-2" : ""}`}>
      <div className="mb-1 text-slate-600 font-medium">{label}</div>
      {children}
    </label>
  );
}
export function Toggle({ value, onChange }) {
  return (
    <button
      type="button"
      className={`w-full rounded-lg border px-2 py-1 text-sm font-medium transition-all duration-200
        ${
          value
            ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
            : "bg-gray-100 text-slate-700 border-gray-300 hover:bg-gray-200"
        }`}
      onClick={() => onChange(!value)}
    >
      {value ? "On" : "Off"}
    </button>
  );
}

function snap(v, step = 8) {
  return Math.round(v / step) * step;
}
