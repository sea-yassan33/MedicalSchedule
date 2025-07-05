// app/schedule/page.tsx
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const rooms = [
  { id: "1", name: "診療台1" },
  { id: "2", name: "診療台2" },
  { id: "3", name: "診療台3" },
  { id: "4", name: "待合席" },
];

const appointments = [
  { id: "a", patient_name: "患者A", start: "09:20", duration: 2, room_id: "1" },
  { id: "b", patient_name: "患者B", start: "10:00", duration: 2, room_id: "2" },
  { id: "c", patient_name: "患者C", start: "09:20", duration: 3, room_id: "4" },
  { id: "d", patient_name: "患者D", start: "10:00", duration: 5, room_id: "3" },
  { id: "e", patient_name: "新患E", start: "11:20", duration: 3, room_id: "4" },
];

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = 9 + Math.floor(i / 3);
  const minutes = (i % 3) * 20;
  return `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
});

export default function Sample01() {
  const slotHeight = 40;

  const isLunchBreak = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const minutes = h * 60 + m;
    return minutes >= 780 && minutes < 860; // 13:00 (780) to 14:20 (860)
  };

  return (
    <ScrollArea className="w-full h-screen p-4">
      <div className="flex">
        <div className="flex flex-col w-[80px] shrink-0">
          <div className="h-10 bg-gray-100 text-sm text-center border-b">時間</div>
          {timeSlots.map((time, i) => (
            <div
              key={i}
              className={`h-10 border-b text-xs text-right pr-2 ${isLunchBreak(time) ? "bg-gray-200" : "bg-white"}`}
              style={{ height: `${slotHeight}px` }}
            >
              {time}
            </div>
          ))}
        </div>

        {rooms.map((room) => (
          <div key={room.id} className="flex-1 border-l">
            <div className="h-10 bg-gray-100 text-sm text-center border-b">{room.name}</div>
            <div className="relative" style={{ height: `${timeSlots.length * slotHeight}px` }}>
              {timeSlots.map((time, i) => (
                <div
                  key={i}
                  className={isLunchBreak(time) ? "absolute left-0 right-0 h-10 bg-gray-200 z-0" : ""}
                  style={{ top: `${i * slotHeight}px` }}
                />
              ))}
              {appointments
                .filter((a) => a.room_id === room.id)
                .map((appt) => {
                  const index = timeSlots.findIndex((t) => t === appt.start);
                  const top = index * slotHeight;
                  const height = appt.duration * slotHeight;

                  return (
                    <Card
                      key={appt.id}
                      className="absolute left-1 right-1 z-10 shadow"
                      style={{ top, height }}
                    >
                      <CardContent className="p-2 text-sm">
                        <Link href={`/patients/${appt.id}`} className="hover:underline">
                          {appt.patient_name}（{appt.duration}枠）
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
