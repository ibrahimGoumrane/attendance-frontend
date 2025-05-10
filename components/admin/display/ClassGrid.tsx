"use client";

import ClassCard from "./ClassCard";
import { useClassContext } from "@/lib/contexts/ClassContext";

export default function ClassGrid({}) {
  const { items: classes } = useClassContext();
  console.log(classes);
  return (
    <div className="mt-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {classes && classes.length > 0 ? (
        classes?.map((cls) => <ClassCard key={cls.id} cls={cls} />)
      ) : (
        <div>Classes Not added yet</div>
      )}
    </div>
  );
}
