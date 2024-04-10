import Image from "next/image";
import React from "react";
import nbcicon from "@/assets/image/scc-og.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <>
      <div className="flex items-center">
        <div>
          <Image src={nbcicon} alt="nbc icon" width={800} height={400} />
        </div>
        <div>
          <Input type="email" placeholder="이메일을 입력하세요" />
          <Input type="password" placeholder="비밀번호를 입력하세요" />
          <div className="flex">
            <Button />
            <Button />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
