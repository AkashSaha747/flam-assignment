// // src/components/BottomSheet.js
// import React, { useState } from 'react';
// import './BottomSheet.css';

// const BottomSheet = () => {
//   const [sheetPosition, setSheetPosition] = useState('closed');

//   const handleSheetSnap = (position) => {
//     setSheetPosition(position);
//   };

//   return (
//     <div className={`bottom-sheet ${sheetPosition}`} style={{ borderRadius:"15px 15px 0 0 ",border:"2px solid red",background:"pink",width:"40%",margin:"auto"}}>
//       <div className="handle" />
//       <div className="snap-buttons">
//         <button onClick={() => handleSheetSnap('closed')}>Close</button>
//         <button onClick={() => handleSheetSnap('half-open')}>Half Open</button>
//         <button onClick={() => handleSheetSnap('fully-open')}>Fully Open</button>
//       </div>
//       <div className="content">
//         <p className='text'>Spring</p>
//         <p className='text'>Bottom</p>
//         <p className='text'>Sheet</p>
//       </div>
 
//     </div>
//   );
// };

// export default BottomSheet;



import React, { useState, useRef } from 'react';
import './BottomSheet.css';

const BottomSheet = () => {
  const [sheetPosition, setSheetPosition] = useState('closed');
  const [startY, setStartY] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const sheetRef = useRef(null);

  const handleTouchStart = (event) => {
    setStartY(event.touches[0].clientY);
  };

  const handleTouchMove = (event) => {
    const currentY = event.touches[0].clientY;
    const distance = currentY - startY;
    setDragDistance(distance);

    if (distance > 0) {
      if (distance < 100) {
        setSheetPosition('half-open');
      } else {
        setSheetPosition('fully-open');
      }
    } else {
      setSheetPosition('closed');
    }
  };

  const handleTouchEnd = () => {
    setDragDistance(0);
  };

  return (
    <div
      className={`bottom-sheet ${sheetPosition}`}
      style={{ borderRadius: "15px 15px 0 0",  background: "pink", width: "40%", margin: "auto" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sheetRef}
    >
      <div className="handle" />
      <div className="snap-buttons">
        <button onClick={() => setSheetPosition('closed')}>Close</button>
        <button onClick={() => setSheetPosition('half-open')}>Half Open</button>
        <button onClick={() => setSheetPosition('fully-open')}>Fully Open</button>
      </div>
      <div className="content">
        <p className='text'>Spring</p>
        <p className='text'>Bottom</p>
        <p className='text'>Sheet</p>
      </div>
    </div>
  );
};

export default BottomSheet;
