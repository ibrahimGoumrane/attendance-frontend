'use client'

import { useStudentImageContext } from "@/lib/contexts/StudentImageContext";
import { storageUrl } from "@/lib/utils";
import Image from "next/image";

export default function StudentImageGrid() {
  const { items: studentImages } = useStudentImageContext();
  return (
    <>
      {studentImages.map((image) => (
        <Image
          width={300}
          height={300}
          className="w-48 shadow-xs rounded-md object-center object-cover"
          src={storageUrl(image.image)}
          key={image.id}
          alt=""
        />
      ))}
    </>
  );
}
