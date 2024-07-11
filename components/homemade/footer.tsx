import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="w-full flex justify-center text-muted-foreground text-sm mb-5 mt-5">
      <p>
        powered by{" "}
        <Link href="https://www.samueltomaselli.com.br/" className="font-bold">
          SHT
        </Link>
      </p>
    </div>
  );
}

export default Footer;
