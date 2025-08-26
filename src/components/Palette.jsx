// // // src/components/Palette.jsx
// // import React from "react";
// // import { useDrag } from "react-dnd";
// // import { DND } from "../dnd";
// // export function PaletteItem({ elType, label }) {
// // const [{ isDragging }, drag] = useDrag(() => ({
// // type: DND.PALETTE,
// // item: { type: DND.PALETTE, elType },
// // collect: (m) => ({ isDragging: m.isDragging() }),
// // }));
// // return (
// // <div
// // ref={drag}
// // className={`flex items-center gap-2 rounded-xl border px-3 py-2 cursorgrab active:cursor-grabbing select-none ${isDragging ? "opacity-50" : ""}`}
// // title={`Drag to canvas to add ${label}`}
// // >
// // <span className="inline-flex h-6 w-6 items-center justify-center roundedlg bg-slate-900 text-white text-xs">{label[0]}</span>
// // <span className="text-sm">{label}</span>
// // </div>
// // );
// // }


// // new css changes


// // src/components/Palette.jsx
// import React from "react";
// import { useDrag } from "react-dnd";
// import { DND } from "../dnd";

// export function PaletteItem({ elType, label }) {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: DND.PALETTE,
//     item: { type: DND.PALETTE, elType },
//     collect: (m) => ({ isDragging: m.isDragging() }),
//   }));

//   return (
//     <div
//       ref={drag}
//       className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-grab active:cursor-grabbing select-none shadow-sm transition-all duration-200
//         ${isDragging ? "opacity-50 scale-95" : "hover:shadow-md hover:border-slate-400"}`}
//       title={`Drag to canvas to add ${label}`}
//     >
//       {/* Icon-like circle */}
//       <span
//         className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold shadow-md
//           ${elType === "text" ? "bg-blue-600" : ""}
//           ${elType === "image" ? "bg-green-600" : ""}
//           ${elType === "button" ? "bg-purple-600" : ""}`}
//       >
//         {label[0]}
//       </span>

//       {/* Label */}
//       <span className="text-base font-medium text-slate-800 tracking-wide">
//         {label}
//       </span>
//     </div>
//   );
// }




import React from "react";
import { useDrag } from "react-dnd";
import { DND } from "../dnd";

export function PaletteItem({ elType, label }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND.PALETTE,
    item: { type: DND.PALETTE, elType },
    collect: (m) => ({ isDragging: m.isDragging() }),
  }));

  // Define gradient colors for variety
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
      {/* Icon-like circle with gradient and soft shadow */}
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-white text-lg font-extrabold shadow-lg ${bgColor}`}
      >
        {label[0]}
      </span>

      {/* Label with modern font and subtle gradient */}
      <span className="text-lg font-semibold text-gray-800 tracking-wide hover:text-gray-900 transition-colors duration-200">
        {label}
      </span>
    </div>
  );
}
