"use client";

import { CldImage } from "next-cloudinary";

interface ExpertImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
}

export default function ExpertImage(props: ExpertImageProps) {
  return <CldImage {...props} />;
}
