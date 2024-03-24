import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold">
        달력 라이브러리와 팀빌딩 ui 테스트 프로토타입
      </h1>
      <Link href="/calendar">캘린더</Link>
      <br />

      <Link href="/teambuilding">팀빌딩</Link>
    </main>
  );
}
