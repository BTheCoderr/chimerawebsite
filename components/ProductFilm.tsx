const VIDEO_SRC = '/media/07_Clean_Widescreen_Footage_42s.mp4';

export function ProductFilm() {
  return (
    <div className="film-container film-container--self-hosted">
      <video
        controls
        playsInline
        preload="metadata"
        poster="/images/Water_Image-02.jpg"
        aria-label="Chimera reusable water filter and coffee carafe, 42-second product demonstration"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Your browser does not support this video.
        <a href={VIDEO_SRC}>Open the Chimera product film</a>.
      </video>
    </div>
  );
}
