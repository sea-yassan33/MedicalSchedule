import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientsApiResponse } from "@/lib/patientsTypes";
import patientsConfig from "@/config/propaties";

const API_URL = `${patientsConfig.find}`;

export default async function PatientsPage() {
  // APIからデータ取得
  const res = await fetch(API_URL, { cache: "no-store" });
  const json: PatientsApiResponse = await res.json();

  const patients = json.data;

  return (
     <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full pr-10 pl-10">
        <CardHeader>
          <CardTitle>患者一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2 text-left">ID</th>
                <th className="px-2 py-2 text-left">名前</th>
                <th className="px-2 py-2 text-left">かな</th>
                <th className="px-2 py-2 text-left">年齢</th>
                <th className="px-2 py-2 text-left">性別</th>
                <th className="px-2 py-2 text-left">電話番号</th>
                <th className="px-2 py-2 text-left">メール</th>
                <th className="px-2 py-2 text-left">メモ</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t">
                  <td className="px-2 py-2">{patient.id}</td>
                  <td className="px-2 py-2">{patient.name}</td>
                  <td className="px-2 py-2">{patient.kana}</td>
                  <td className="px-2 py-2">{patient.age}</td>
                  <td className="px-2 py-2">
                    {patient.gender === "Men" ? "男性" : patient.gender === "Female" ? "女性" : "不明"}
                  </td>
                  <td className="px-2 py-2">{patient.phone_number}</td>
                  <td className="px-2 py-2">{patient.email ?? "-"}</td>
                  <td className="px-2 py-2 whitespace-pre-wrap">{patient.memo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}