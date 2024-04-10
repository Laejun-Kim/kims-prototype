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
      <br />

      <Link href="/login">로그인페이지</Link>
      <br />

      <Link href="/register">회원가입 페이지</Link>
      <br />

      <Link href="/tempmain">임시 메인 페이지</Link>
    </main>
  );
}
