"use client";
import React, { useEffect, useState, useCallback } from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import { TfiReload } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";

type TMeme = {
  description: string;
  url: string;
  type: string;
};

export function MemeCard() {
  const [meme, setMeme] = useState<TMeme | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMeme = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/meme", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMeme(data);
    } catch (error) {
      console.error("Error fetching meme:", error);
      setError("Failed to fetch meme. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeme();
  }, [fetchMeme]);

  const handleRefresh = () => {
    alert("Refreshing...");
    fetchMeme();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-center w-full mb-8">
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="bg-gray-300 rounded-full p-2"
        >
          <TfiReload size={24} />
        </button>
      </div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        {isLoading ? (
          <div>Loading...</div>
        ) : meme ? (
          <>
            <Image
              src={meme.url}
              alt={meme.description || "Meme"}
              width={400}
              height={400}
              layout="responsive"
              objectFit="contain"
            />
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              {meme.description}
            </p>
          </>
        ) : null}
        <a
          href="https://github.com/divin3circle"
          className="rounded-full pl-4 pr-1 py-1 text-white flex items-center justify-between space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
        >
          {" "}
          <span>Follow Me </span>{" "}
          <span className="bg-zinc-700 rounded-full h-8 w-8 flex items-center justify-center px-2 py-0 text-white">
            {" "}
            <FaGithub size={24} />{" "}
          </span>{" "}
        </a>
      </BackgroundGradient>
    </div>
  );
}
