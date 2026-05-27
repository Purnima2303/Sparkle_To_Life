'use client';

import { useEffect, useRef } from 'react';

export default function Visualizer({ audioRef, active = true, color = '181,214,120' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const audio = audioRef?.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    const ctx = canvas.getContext('2d');
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let rafId;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      rafId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const barWidth = Math.max(2, width / (bufferLength / 4));
      let x = 0;
      for (let i = 0; i < bufferLength; i += 4) {
        const v = dataArray[i] / 255;
        const h = v * height;
        ctx.fillStyle = `rgba(${color},0.95)`;
        ctx.fillRect(x, height - h, barWidth, h);
        x += barWidth + 1;
      }
    }

    resize();
    window.addEventListener('resize', resize);
    audioCtx.resume().catch(() => {});
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      try {
        source.disconnect();
        analyser.disconnect();
        audioCtx.close();
      } catch (e) {}
    };
  }, [audioRef, active]);

  return (
    <div className="music-visualizer mt-3 px-3">
      <canvas ref={canvasRef} className="w-full h-12 rounded-md" />
    </div>
  );
}
