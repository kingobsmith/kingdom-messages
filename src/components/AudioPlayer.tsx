"use client";

interface AudioPlayerProps {
  src: string;
  title: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <div className="card-royal">
      <p className="mb-3 text-sm text-gold-light">Now playing: {title}</p>
      <audio controls className="w-full" preload="metadata">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
