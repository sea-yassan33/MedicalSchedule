import Link from 'next/link';
import { tv } from 'tailwind-variants';
import Image from "next/image";
import Footer from "./_components/Footer";
import NewPatients from './_components/NewPatients';

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
        <NewPatients />
      </main>
      <Footer />
    </>
  );
}
