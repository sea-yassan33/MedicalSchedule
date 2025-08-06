import Link from 'next/link';
import { tv } from 'tailwind-variants';
import { Button } from "@/components/ui/button";

export default function Home() {
  const twStayles = tv({
    variants: {
      style:{
        main01:'flex flex-col items-center justify-center min-h-screen bg-gray-50',
      },
    },
  });

  return (
    <div className={twStayles({style:'main01'})}>
      <h1 className="text-2xl font-bold mb-8">スケジュール登録システム</h1>
      <div className="space-y-4 w-full max-w-sm">
        <Link href="/schedule" passHref>
          <Button className="w-full">スケジュール確認・登録</Button>
        </Link>
        <Link href="/patients" passHref>
          <Button className="w-full">患者一覧・登録</Button>
        </Link>
        <Link href="/professionals" passHref>
          <Button className="w-full">専門職一覧・登録</Button>
        </Link>
        <Link href="/setting" passHref>
          <Button className="w-full">環境設定</Button>
        </Link>
      </div>
    </div>
  );
}
