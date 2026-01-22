import imageCompression from "browser-image-compression";

export async function compressImage(file: File): Promise<File> {
  const compressedBlob = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
  });

  return new File([compressedBlob], file.name, {
    type: compressedBlob.type,
    lastModified: Date.now(),
  });
}
