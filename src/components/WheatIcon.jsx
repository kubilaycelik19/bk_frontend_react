// src/components/WheatIcon.jsx
// Modern başak ikonu component'i

import React from 'react';

function WheatIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Başak ikonu"
    >
      {/* Ana sap */}
      <path 
        d="M12 3L12 20" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Sol dal - Üst */}
      <path 
        d="M9 7L12 3L15 7" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Sol dal - Orta */}
      <path 
        d="M10 11L12 8L14 11" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Sol dal - Alt */}
      <path 
        d="M10.5 15L12 13L13.5 15" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Sağ dal - Üst */}
      <path 
        d="M7 9L12 3L17 9" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Sağ dal - Orta */}
      <path 
        d="M8 13L12 8L16 13" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Sağ dal - Alt */}
      <path 
        d="M9 17L12 13L15 17" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Başak taneleri - Üst */}
      <circle 
        cx="12" 
        cy="4" 
        r="1.2" 
        fill={color}
      />
      <circle 
        cx="9.5" 
        cy="6.5" 
        r="0.9" 
        fill={color}
      />
      <circle 
        cx="14.5" 
        cy="6.5" 
        r="0.9" 
        fill={color}
      />
      
      {/* Başak taneleri - Orta */}
      <circle 
        cx="10.5" 
        cy="10" 
        r="0.8" 
        fill={color}
      />
      <circle 
        cx="13.5" 
        cy="10" 
        r="0.8" 
        fill={color}
      />
      
      {/* Başak taneleri - Alt */}
      <circle 
        cx="11" 
        cy="14" 
        r="0.7" 
        fill={color}
      />
      <circle 
        cx="13" 
        cy="14" 
        r="0.7" 
        fill={color}
      />
    </svg>
  );
}

export default WheatIcon;

