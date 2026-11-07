const VIDEO_SRC = '/media/08_Chimera_Product_Film_With_Sound_58s.mp4';

export function ProductFilm() {
  return (
    <div className="film-container film-container--self-hosted">
      <video
        controls
        playsInline
        preload="metadata"
        poster="/images/Water_Image-02.jpg"
        aria-label="Chimera reusable water filter and coffee carafe, 58-second product demonstration"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Your browser does not support this video.
        <a href={VIDEO_SRC}>Open the Chimera product film</a>.
      </video>
    </div>
  );
}
