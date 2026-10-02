import { useEffect, useState } from "react";

// Movie ke paas youtubeId ho to YouTube player, warna videoUrl (mp4) ka player chalega.
export default function VideoModal({ movie, onClose }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>✕</button>
        <h3 className="modal-title">{movie.title}</h3>
        {movie.archiveId ? (
          <iframe
            src={`https://archive.org/embed/${movie.archiveId}`}
            title={movie.title}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : movie.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${movie.youtubeId}?autoplay=1`}
            title={movie.title}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        ) : (
          failed ? (
          <p className="video-error">Video load nahi ho payi. Link ya internet check karo, ya movie ka videoUrl / youtubeId badlo.</p>
        ) : (
          <video src={movie.videoUrl} controls autoPlay playsInline onError={() => setFailed(true)} />
        )
        )}
      </div>
    </div>
  );
}
