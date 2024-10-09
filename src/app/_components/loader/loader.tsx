import React from 'react';
import './loaderStyle.css'; // or wherever you added the custom CSS

const Loader = () => {
  return (
    <div className="dice-container p-4">
      <div className="dice">
        {/* Face 1 */}
        <div className="dice-face dice-face-1">
          <div></div>
        </div>
        {/* Face 2 */}
        <div className="dice-face dice-face-2">
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* Face 3 */}
        <div className="dice-face dice-face-3">
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* Face 4 */}
        <div className="dice-face dice-face-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* Face 5 */}
        <div className="dice-face dice-face-5">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* Face 6 */}
        <div className="dice-face dice-face-6">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
