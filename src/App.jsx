// new one


import React, { useEffect, useMemo, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PaletteItem } from "./components/Palette";
import { Canvas } from "./components/Canvas";
import { Inspector } from "./components/Inspector";
import { clamp, createElement, runSmokeTests, snap } from "./utils";

export default function App() {
  const [elements, setElements] = useState(() => {
    try {
      const saved = localStorage.getItem("wb:elements");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedId, setSelectedId] = useState(null);
  const [canvasBg, setCanvasBg] = useState(
    () => localStorage.getItem("wb:bg") || "#ffffff"
  );
  const [preview, setPreview] = useState(false);
  const [keyboardDeleteEnabled, setKeyboardDeleteEnabled] = useState(() => {
    const v = localStorage.getItem("wb:keyboardDeleteEnabled");
    return v ? v === "1" : true; // default ON
  });

  const canvasRef = useRef(null);

  // Persist states
  useEffect(() => {
    localStorage.setItem("wb:elements", JSON.stringify(elements));
  }, [elements]);

  useEffect(() => {
    localStorage.setItem("wb:bg", canvasBg);
  }, [canvasBg]);

  useEffect(() => {
    localStorage.setItem("wb:keyboardDeleteEnabled", keyboardDeleteEnabled ? "1" : "0");
  }, [keyboardDeleteEnabled]);

  useEffect(() => {
    runSmokeTests();
  }, []);

  const selected = useMemo(
    () => elements.find((e) => e.id === selectedId) || null,
    [elements, selectedId]
  );

  // Keyboard: delete & arrows (guard when typing)
  useEffect(() => {
    const onKey = (e) => {
      const ae = document.activeElement;
      const isTyping =
        !!ae &&
        (ae.tagName === "INPUT" ||
          ae.tagName === "TEXTAREA" ||
          ae.isContentEditable);

      if (isTyping) return;
      if (!selected) return;

      const nudge = (dx, dy) =>
        setElements((els) =>
          els.map((el) =>
            el.id === selected.id
              ? {
                  ...el,
                  x: clamp(el.x + dx, 0, 8000),
                  y: clamp(el.y + dy, 0, 8000),
                }
              : el
          )
        );

      if ((e.key === "Delete" || e.key === "Backspace") && keyboardDeleteEnabled) {
        e.preventDefault();
        setElements((els) => els.filter((el) => el.id !== selected.id));
        setSelectedId(null);
      }
      if (e.key === "ArrowLeft") nudge(-8, 0);
      if (e.key === "ArrowRight") nudge(8, 0);
      if (e.key === "ArrowUp") nudge(0, -8);
      if (e.key === "ArrowDown") nudge(0, 8);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, keyboardDeleteEnabled]);

  // Add & move
  const addElementAt = (elType, monitor) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientOffset = monitor.getClientOffset();
    const x = snap(clientOffset.x - rect.left - 60);
    const y = snap(clientOffset.y - rect.top - 20);

    const el = createElement(elType, x, y);
    setElements((els) => [...els, el]);
    setSelectedId(el.id);
  };

  const moveElementTo = (id, monitor, item) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const delta = monitor.getDifferenceFromInitialOffset();
    if (!delta) return;

    setElements((els) =>
      els.map((el) =>
        el.id === id
          ? {
              ...el,
              x: snap(item.startX + delta.x),
              y: snap(item.startY + delta.y),
            }
          : el
      )
    );
  };

  const updateElement = (id, patch) =>
    setElements((els) => els.map((el) => (el.id === id ? { ...el, ...patch } : el)));

  const updateElementStyles = (id, styles) =>
    setElements((els) =>
      els.map((el) =>
        el.id === id
          ? { ...el, styles: { ...el.styles, ...styles } }
          : el
      )
    );

  return (
    <DndProvider backend={HTML5Backend}>
  <div className="h-screen w-screen flex bg-slate-100 text-slate-800">
    {/* Left Sidebar (Palette + Settings) */}
    <aside
      className={`w-64 border-r bg-white p-3 flex flex-col gap-3 ${
        preview ? "pointer-events-none opacity-40" : ""
      }`}
    >
      <h1 className="text-sm font-bold font-serif">Page Builder</h1>

      <PaletteItem elType="text" label="Text" />
      <PaletteItem elType="image" label="Image" />
      <PaletteItem elType="button" label="Button" />

      <div className="mt-4 space-y-2">
        <div className="text-base font-semibold tracking-wide uppercase text-sky-600">Canvas background</div>
        <input
          type="color"
          value={canvasBg}
          onChange={(e) => setCanvasBg(e.target.value)}
          className="h-10 w-full border rounded"
        />

        <div className="text-base font-semibold tracking-wide uppercase text-sky-600">Keyboard delete</div>
        {/* <button
          className={`w-full rounded-lg border px-2 py-1 ${
            keyboardDeleteEnabled ? "bg-slate-900 text-white" : "bg-white"
          }`}
          onClick={() => setKeyboardDeleteEnabled((v) => !v)}
        >
          {keyboardDeleteEnabled ? "On" : "Off"}
        </button>

        <button
          onClick={() => setElements([])}
          className="mt-2 w-full rounded-xl py-2 border hover:bg-slate-50"
        >
          Clear Canvas
        </button>

        <button
          onClick={() => setPreview((p) => !p)}
          className="w-full rounded-xl py-2 bg-slate-900 text-white"
        >
          {preview ? "Exit Preview" : "Preview"}
        </button> */}

        {/* Toggle Keyboard Delete */}
<button
  className={`w-full rounded-lg px-4 py-2 font-semibold tracking-wide transition-all duration-200 shadow-sm 
    ${keyboardDeleteEnabled
      ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:from-slate-700 hover:to-slate-800"
      : "bg-white text-slate-800 border border-gray-300 hover:bg-gray-100 hover:text-slate-900"
    }`}
  onClick={() => setKeyboardDeleteEnabled((v) => !v)}
>
  {keyboardDeleteEnabled ? "On" : "Off"}
</button>

{/* Clear Canvas */}
<button
  onClick={() => setElements([])}
  className="mt-3 w-full rounded-lg px-4 py-2 font-semibold tracking-wide bg-red-600 text-white 
             hover:bg-red-700 transition-all duration-200 shadow-md"
>
  Clear Canvas
</button>

{/* Preview */}
<button
  onClick={() => setPreview((p) => !p)}
  className="mt-3 w-full rounded-lg px-4 py-2 font-semibold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
             hover:from-indigo-500 hover:to-purple-500 shadow-md hover:shadow-lg transition-all duration-200"
>
  {preview ? "Exit Preview" : "Preview"}
</button>

      </div>
    </aside>

    {/* Canvas (center flex-grow) */}
    <div className="flex-1 relative">
      <Canvas
        elements={elements}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        addElementAt={addElementAt}
        moveElementTo={moveElementTo}
        updateElement={updateElement}
        bg={canvasBg}
        preview={preview}
        ref={canvasRef}
      />
    </div>

    {/* Right Sidebar (Inspector) */}
    {selected && !preview && (
      <aside className="w-72 border-l bg-white p-3 overflow-y-auto">
        <Inspector
          element={selected}
          onChange={(patch) => updateElement(selected.id, patch)}
          onStyle={(styles) => updateElementStyles(selected.id, styles)}
          onDelete={() => {
            setElements((els) => els.filter((el) => el.id !== selected.id));
            setSelectedId(null);
          }}
        />
      </aside>
    )}
  </div>
</DndProvider>

  );
}
