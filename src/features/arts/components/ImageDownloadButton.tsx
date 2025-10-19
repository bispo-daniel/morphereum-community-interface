const ImageDownloadButton = ({
  downloadImage,
  placeholder = "download",
}: {
  downloadImage: () => void;
  placeholder?: string;
}) => (
  <button
    className="mt-auto flex h-8 min-h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 transition-all duration-300 [filter:drop-shadow(0px_0px_2px_var(--coin-pink))] hover:scale-105 hover:[filter:drop-shadow(0px_0px_4px_var(--coin-pink))]"
    onClick={downloadImage}
  >
    <span className="arts-text text-[var(--coin-pink)]">{placeholder}</span>
  </button>
);

export default ImageDownloadButton;
