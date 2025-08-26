// // // src/components/Canvas.jsx
// // import React, { useRef } from "react";
// // import { useDrop } from "react-dnd";
// // import { DND } from "../dnd";
// // import { ElementView } from "./ElementView";
// // export function Canvas({ elements, selectedId, setSelectedId, addElementAt,
// // moveElementTo, updateElement, bg, preview }) {
// // const [, drop] = useDrop(() => ({
// // accept: [DND.PALETTE, DND.ELEMENT],
// // drop(item, monitor) { if (item.type === DND.PALETTE)
// // addElementAt(item.elType, monitor); },
// // hover(item, monitor) { if (item.type === DND.ELEMENT)
// // moveElementTo(item.id, monitor, item); },
// // }), [addElementAt, moveElementTo]);
// // const rootRef = useRef(null);
// // const setRef = (node) => { rootRef.current = node; drop(node); };
// // return (
// // <main
// // ref={setRef}
// // className="relative flex-1 overflow-auto"
// // style={{
// // background: bg,
// // backgroundImage: "linear-gradient(rgba(17,24,39,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,.06) 1px, transparent 1px)",
// // backgroundSize: "24px 24px, 24px 24px",
// // }}
// // onMouseDown={(e) => { if (e.target === e.currentTarget)
// // setSelectedId(null); }}
// // >
// // {elements.map((el) => (
// // <ElementView key={el.id} el={el} selected={selectedId === el.id}
// // onSelect={() => setSelectedId(el.id)} updateElement={updateElement}
// // preview={preview} />
// // ))}
// // </main>
// // );
// // }



// // new code of text, image


// import React, { useRef, forwardRef } from "react";
// import { useDrop } from "react-dnd";
// import { DND } from "../dnd";
// import { ElementView } from "./ElementView";

// export const Canvas = forwardRef(function Canvas(
//   { elements, selectedId, setSelectedId, addElementAt, moveElementTo, updateElement, bg, preview },
//   ref
// ) {
//   const rootRef = useRef(null);

//   const [, drop] = useDrop(() => ({
//     accept: [DND.PALETTE, DND.ELEMENT],
//     drop(item, monitor) {
//       if (item.type === DND.PALETTE) addElementAt(item.elType, monitor);
//     },
//     hover(item, monitor) {
//       if (item.type === DND.ELEMENT) moveElementTo(item.id, monitor, item);
//     },
//   }), [addElementAt, moveElementTo]);

//   // merge forwarded ref and internal ref
//   const setRef = (node) => {
//     rootRef.current = node;
//     drop(node);
//     if (ref) {
//       if (typeof ref === "function") ref(node);
//       else ref.current = node;
//     }
//   };

//   return (
//     <main
//       ref={setRef}
//       className="relative flex-1 overflow-auto"
//       style={{
//         background: bg,
//         backgroundImage:
//           "linear-gradient(rgba(17,24,39,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,.06) 1px, transparent 1px)",
//         backgroundSize: "24px 24px, 24px 24px",
//       }}
//       onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}
//     >
//       {elements.map((el) => (
//         <ElementView
//           key={el.id}
//           el={el}
//           selected={selectedId === el.id}
//           onSelect={() => setSelectedId(el.id)}
//           updateElement={updateElement}
//           preview={preview}
//         />
//       ))}
//     </main>
//   );
// });



// for exaCT


import React, { useRef, forwardRef } from "react";
import { useDrop } from "react-dnd";
import { DND } from "../dnd";
import { ElementView } from "./ElementView";

export const Canvas = forwardRef(function Canvas(
  { elements, selectedId, setSelectedId, addElementAt, moveElementTo, updateElement, bg, preview },
  ref
) {
  const rootRef = useRef(null);

  const [, drop] = useDrop(() => ({
    accept: [DND.PALETTE, DND.ELEMENT],
    drop(item, monitor) {
      if (item.type === DND.PALETTE) addElementAt(item.elType, monitor);
    },
    hover(item, monitor) {
      if (item.type === DND.ELEMENT) moveElementTo(item.id, monitor, item);
    },
  }), [addElementAt, moveElementTo]);

  const setRef = (node) => {
    rootRef.current = node;
    drop(node);
    if (ref) {
      if (typeof ref === "function") ref(node);
      else ref.current = node;
    }
  };

  return (
    <main
      ref={setRef}
      className="relative flex-1 overflow-auto min-h-screen"
      style={{
        background: bg,
        backgroundImage:
          "linear-gradient(rgba(17,24,39,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px, 24px 24px",
      }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}
    >
      {elements.map((el) => (
        <ElementView
          key={el.id}
          el={el}
          selected={selectedId === el.id}
          onSelect={() => setSelectedId(el.id)}
          updateElement={updateElement}
          preview={preview}
        />
      ))}
    </main>
  );
});
