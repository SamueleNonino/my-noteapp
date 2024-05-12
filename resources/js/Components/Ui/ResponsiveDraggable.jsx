import React, { useState, useRef, useEffect } from 'react';

const ResponsiveDraggable = ({ children, style = {} }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const initialX = useRef(0);
  const initialY = useRef(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    initialX.current = event.clientX - offsetX;
    initialY.current = event.clientY - offsetY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - initialX.current;
    const deltaY = event.clientY - initialY.current;
    setOffsetX(offsetX + deltaX);
    setOffsetY(offsetY + deltaY);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  return (
    <div
      ref={null} // Remove ref for this implementation
      style={{
        ...style,
        border: '1px solid black',
        position: 'absolute',
        top: offsetY,
        left: offsetX,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      MOVE ME
    </div>
  );
};

export default ResponsiveDraggable;
