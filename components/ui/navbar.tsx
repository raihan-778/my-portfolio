"use client";

import Link from "next/link";
import { Button } from "./button";
function Navbar() {
  return (
    <nav className="p-2 md:p-4 shadow-md">
      <div className="container flex flex-col md:flex-row mx-auto justify-between items-center p-3">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Suggest Message Ai
        </a>

        <Button className="w-full md:w-auto">
          <Link
            href={`/message-input
            `}
          >
            Chat With Your AI Assistant{" "}
          </Link>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
