import { filesUpload } from '@/actions/upload';
import { useEffect, useState } from 'react';

export const useFileUpload = (selectedFiles?: FileList) => {
  const [imageUrls, setImageUrls] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const saveImageUrls = (url: string) => {
    setImageUrls((prev: any) => [...prev, url]);
  };
  useEffect(() => {
    const files = selectedFiles && Array.from(selectedFiles);
    if (files?.length) {
      setLoading(true);
      files.map((file: any) => {
        const uploadImages = async () => {
          const body = new FormData();
          console.log(file);

          body.set('image', file);
          const image = await filesUpload(body);
          console.log(image);
          if (image?.success) {
            setLoading(true);
            saveImageUrls(image?.data.url);
          }
          setLoading(false);
        };
        uploadImages();
      });
    }
  }, [selectedFiles]);
  return [imageUrls, loading, saveImageUrls];
};
