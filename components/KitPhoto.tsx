type KitPhotoProps = {
  label?: string;
  className?: string;
};

/**
 * Scott supplied a screenshot containing a product photograph and an old
 * "Filter Only" webpage heading. Use its original, public GitHub asset but
 * only display the photograph rectangle. This avoids duplicating a binary
 * asset and keeps the original visible while avoiding inaccurate screenshot text.
 *
 * Original screenshot: 1438 x 1510.
 * Photo crop: x=347..1144, y=28..1060.
 */
export function KitPhoto({
  label = 'Chimera glass carafe fitted with the black ceramic filter',
  className = '',
}: KitPhotoProps) {
  return (
    <svg
      className={'kit-photo ' + className}
      viewBox="347 28 797 1032"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        href="/images/PastedGraphic-1.png"
        x="0"
        y="0"
        width="1438"
        height="1510"
      />
    </svg>
  );
}
