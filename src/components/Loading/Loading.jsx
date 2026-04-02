import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-scene">
        {/* Arxa fon partikulları */}
        <div className="particles">
          {[...Array(6)].map((_, i) => (
            <span key={i} className={`particle p-${i + 1}`} />
          ))}
        </div>

        {/* 3D Fincan */}
        <div className="cup-wrapper">
          {/* Buxar */}
          <div className="steam-box">
            <div className="steam s1" />
            <div className="steam s2" />
            <div className="steam s3" />
          </div>

          <div className="cup-3d">
            {/* Fincanın gövdəsi */}
            <div className="cup-body">
              <div className="cup-shine" />
              {/* Qəhvə səthi */}
              <div className="coffee-surface">
                <div className="coffee-wave" />
                <div className="coffee-wave wave-2" />
                <div className="coffee-shine" />
              </div>
            </div>

            {/* Fincan qulpu */}
            <div className="cup-handle" />

            {/* Fincan dibi / nəlbəki */}
            <div className="saucer">
              <div className="saucer-inner" />
            </div>
          </div>

          {/* Kölgə */}
          <div className="cup-shadow" />
        </div>

        {/* Qəhvə dənələri */}
        <div className="beans">
          <div className="bean bean-1">☕</div>
          <div className="bean bean-2">☕</div>
          <div className="bean bean-3">☕</div>
        </div>

        {/* Yüklənmə mətni */}
        <div className="loading-text-wrapper">
          <span className="loading-brand">COFFEELAND</span>
          <div className="coffee-cups-loader">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="cup-icon" style={{ animationDelay: `${i * 0.3}s` }}>
                ☕
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

