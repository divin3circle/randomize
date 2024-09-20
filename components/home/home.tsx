"use client";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { BackgroundLines } from "../ui/background-lines";
import { MemeCard } from "./meme";

function Hero() {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="font-bold md:text-2xl mx-2 text-xl">Randomize😂</h1>
        <a
          href="https://github.com/divin3circle/randomize"
          target="_blank"
          className="flex items-center gap-2 shadow-md md:p-4 p-2 rounded-md"
        >
          <span>Github</span>
          <FaGithub />
        </a>
      </div>

      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <MemeCard />
      </BackgroundLines>
    </div>
  );
}

export default Hero;
