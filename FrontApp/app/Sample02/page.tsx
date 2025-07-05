// app/schedule/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const rooms = [
  { id: "1", name: "診療台1" },
  { id: "2", name: "診療台2" },
  { id: "3", name: "診療台3" },
  { id: "4", name: "待合席" },
];

const initialAppointments = [
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

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

type Appointment = {
  id: string;
  patient_name: string;
  start: string;
  duration: number;
  room_id: string;
};

export default function Sample02() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [form, setForm] = useState({ start: "", duration: "", room_id: "" });
  const [error, setError] = useState("");
  const slotHeight = 40;

  const isLunchBreak = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const minutes = h * 60 + m;
    return minutes >= 780 && minutes < 860;
  };

  const handleSave = () => {
    setError("");
    const newStart = toMinutes(form.start);
    const newEnd = newStart + Number(form.duration) * 20;

    const hasOverlap = appointments.some((appt) => {
      if (!selectedAppt || appt.id === selectedAppt.id || appt.room_id !== form.room_id) return false;
      const apptStart = toMinutes(appt.start);
      const apptEnd = apptStart + appt.duration * 20;
      return newStart < apptEnd && newEnd > apptStart;
    });

    if (hasOverlap) {
      setError("他の予定と重なっています。");
      return;
    }

    setAppointments((prev) =>
      prev.map((appt) =>
        selectedAppt && appt.id === selectedAppt.id
          ? { ...appt, start: form.start, duration: Number(form.duration), room_id: form.room_id }
          : appt
      )
    );
    setSelectedAppt(null);
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
                    <Dialog key={appt.id} onOpenChange={(open) => !open && setSelectedAppt(null)}>
                      <DialogTrigger asChild>
                        <Card
                          className="absolute left-1 right-1 z-10 shadow cursor-pointer"
                          style={{ top, height }}
                          onClick={() => {
                            setSelectedAppt(appt);
                            setForm({ start: appt.start, duration: appt.duration.toString(), room_id: appt.room_id });
                            setError("");
                          }}
                        >
                          <CardContent className="p-2 text-sm">
                            {appt.patient_name}（{appt.duration}枠）
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle>{appt.patient_name} の編集</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="start">開始時間</Label>
                            <Input
                              id="start"
                              value={form.start}
                              onChange={(e) => setForm({ ...form, start: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="duration">枠数</Label>
                            <Input
                              id="duration"
                              type="number"
                              value={form.duration}
                              onChange={(e) => setForm({ ...form, duration: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="room">診療台</Label>
                            <Select
                              value={form.room_id}
                              onValueChange={(value) => setForm({ ...form, room_id: value })}
                            >
                              <SelectTrigger id="room">
                                <SelectValue placeholder="診療台を選択" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                {rooms.map((room) => (
                                  <SelectItem key={room.id} value={room.id}>
                                    {room.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {error && <p className="text-red-500 text-sm">{error}</p>}
                          <Button onClick={handleSave}>保存</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
