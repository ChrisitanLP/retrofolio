// scripts/ui/transitions.js

export async function fadeOutIn(callback) {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  await fadeToBlack(ctx, canvas);
  await callback(); // Acción a realizar entre fundidos
  await fadeFromBlack(ctx, canvas);
}

function fadeToBlack(ctx, canvas) {
  return new Promise((resolve) => {
    let alpha = 0;
    const step = () => {
      alpha += 0.05;
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (alpha < 1) requestAnimationFrame(step);
      else resolve();
    };
    step();
  });
}

function fadeFromBlack(ctx, canvas) {
  return new Promise((resolve) => {
    let alpha = 1;
    const step = () => {
      alpha -= 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (alpha > 0) requestAnimationFrame(step);
      else resolve();
    };
    step();
  });
}
