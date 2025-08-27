import React from "react";
import { useDrag } from "react-dnd";
import { DND } from "../dnd";

export function PaletteItem({ elType, label }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND.PALETTE,
    item: { type: DND.PALETTE, elType },
    collect: (m) => ({ isDragging: m.isDragging() }),
  }));

  const bgColor =
    elType === "text"
      ? "bg-gradient-to-br from-blue-500 to-indigo-600"
      : elType === "image"
      ? "bg-gradient-to-br from-green-400 to-emerald-600"
      : "bg-gradient-to-br from-purple-500 to-pink-600";

  return (
    <div
      ref={drag}
      className={`flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 cursor-grab active:cursor-grabbing select-none shadow-sm transition-all duration-200
        ${isDragging ? "opacity-50 scale-95" : "hover:shadow-lg hover:scale-[1.02] hover:border-gray-300"}`}
      title={`Drag to canvas to add ${label}`}
    >
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-white text-lg font-extrabold shadow-lg ${bgColor}`}
      >
        {label[0]}
      </span>
      <span className="text-lg font-semibold text-gray-800 tracking-wide hover:text-gray-900 transition-colors duration-200">
        {label}
      </span>
    </div>
  );
}
