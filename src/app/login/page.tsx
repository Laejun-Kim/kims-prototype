"use client";
import Image from "next/image";
import React, { useState } from "react";
import nbcicon from "@/assets/image/scc-og.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("하이");
    console.log("아이디>>", id, "비밀번호>>", pw);
    router.push("/tempmain");
  };
  return (
    <div className="이거야이거 flex h-[100vh] items-center ">
      <div className="flex items-center">
        <div>
          <Image src={nbcicon} alt="nbc icon" width={800} height={400} />
        </div>
        <div>
          <form
            onSubmit={(e) => {
              loginHandler(e);
            }}
            className="flex flex-col gap-2"
          >
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => {
                setPw(e.target.value);
              }}
            />
            <div className="h-3" />
            <div className="flex gap-2 justify-between">
              <Button type="submit" className="bg-[#e83451]">
                로그인
              </Button>
              <Link href="/register">
                <Button>회원가입</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
