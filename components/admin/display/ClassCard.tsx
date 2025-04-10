import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassCardProps } from "@/lib/types/classProps";

export default function ClassCard({ cls } : ClassCardProps) {
  return (
    <Card 
      className="gap-2 py-4 cursor-pointer hover:bg-muted/50" 
      key={cls.id}
    >
      <CardHeader className="pb-2 flex items-center gap-2">
        <CardTitle className="text-xl ml-2 text-center w-full">
          {cls.name}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}