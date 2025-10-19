import Image from "./Image";

const FullscreenCarrousel = ({
  src,
  creator,
  xLink,
  description,
  closeFullscreen,
}: {
  src: string;
  creator: string;
  xLink: string;
  description: string;
  closeFullscreen: () => void;
}) => {
  return (
    <div className="fixed left-0 top-0 z-[1001] flex h-screen w-screen items-center justify-center bg-black/80">
      <div
        className="fixed right-0 top-0 z-[1000] h-screen w-screen"
        onClick={closeFullscreen}
      />

      <div className="relative z-[1002] flex max-h-[90vh] max-w-[90vw] items-center justify-center">
        <Image
          url={src}
          creator={creator}
          xProfile={xLink}
          isFullscreen={true}
          description={description}
          closeFullscreen={closeFullscreen}
          setImageData={() => {}}
        />
      </div>
    </div>
  );
};

export default FullscreenCarrousel;
