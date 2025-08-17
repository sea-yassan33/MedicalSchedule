"use client"
import { useState, useEffect } from "react"
import { Appointment } from "@/lib/types"
import { format } from "date-fns";
export default function NewPatients(){
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true)
  // 予約データの取得
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/appoints/2025-07-04/new");
      if (!res.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const json = await res.json();
      const data: Appointment[] = json.data;
      setAppointments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return(
    <>
      {/* 下部: テーブル */}
      <div className="mt-10 w-full max-w-5xl">
        {/* ヘッダー */}
        <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg font-bold">
          本日（2025/8/1）の新患
        </div>
        {/* テーブル本体 */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-100 text-left">
              <th className="p-2 w-1/6">時間</th>
              <th className="p-2 w-1/4">診察台</th>
              <th className="p-2 w-1/4">患者名</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{format(new Date(a.start_time), "HH:mm")}</td>
                <td className="p-2">{a.room_name}</td>
                <td className="p-2">{a.customer_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}