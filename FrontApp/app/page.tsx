import Link from 'next/link';
import { tv } from 'tailwind-variants';
import Image from "next/image";
import Footer from "./_components/Footer";

type Appointment = {
  time: string;
  room: string;
  patient: string;
  doctor: string;
};

const appointments: Appointment[] = [
  { time: "10:00", room: "診察台 1", patient: "キタムラ", doctor: "ケビン" },
  { time: "15:00", room: "診察台 2", patient: "カトリ", doctor: "キム" },
  { time: "16:00", room: "カウンセリング室", patient: "オグラ", doctor: "ジャスミン" },
];

export default function Home() {
  const twStayles = tv({
    variants: {
      style:{
        main01:'flex flex-col items-center p-6 bg-gray-50 min-h-screen',
        main02:'flex flex-col md:flex-row md:items-start gap-6 w-full max-w-5xl',
        button01:'border border-blue-400 rounded-full py-2 text-blue-500 hover:bg-blue-50 transition text-center font-bold',
      },
    },
  });

  return (
    <>
      <main className={twStayles({style:'main01'})}>
        {/* 上部: 画像 + ボタン */}
        <div className={twStayles({style:'main02'})}>
          {/* 左: 画像 */}
          <div className="flex-shrink-0">
            <Image src="/img/img01.png" alt="Dental Clinic" width={350} height={300} className="rounded-lg object-cover"/>
          </div>
          {/* 右: ボタン */}
          <div className="flex flex-col gap-4 w-full md:w-1/3 mt-4 md:mt-0">
            <Link href="/schedule" className={twStayles({style:'button01'})}>
              スケジュール一覧
            </Link>
            <Link href="/" className={twStayles({style:'button01'})}>
              患者一覧・登録
            </Link>
            <Link href="/" className={twStayles({style:'button01'})}>
              専門職一覧・登録
            </Link>
            <Link href="/" className={twStayles({style:'button01'})}>
              環境設定
            </Link>
          </div>
        </div>
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
                <th className="p-2 w-1/4">担当医師</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{a.time}</td>
                  <td className="p-2">{a.room}</td>
                  <td className="p-2">{a.patient}</td>
                  <td className="p-2">{a.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}
