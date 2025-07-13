// utils/nprogressOverlay.js
export const addOverlay = () => {
  if (!document.getElementById('nprogress-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'nprogress-overlay';
    document.body.appendChild(overlay);
  }
};

export const removeOverlay = () => {
  const overlay = document.getElementById('nprogress-overlay');
  if (overlay) {
    document.body.removeChild(overlay);
  }
};
