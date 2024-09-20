import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const apiKey = "dcd46c7ed2a34f599d48b25cfc8af570";
  if (!apiKey) {
    console.error("API Key is not set");
    return NextResponse.json(
      { error: "API Key is not configured" },
      { status: 500 }
    );
  }

  const timestamp = new Date().getTime();
  const url = `https://api.apileague.com/retrieve-random-meme?api-key=${apiKey}&t=${timestamp}`;

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching meme:", error);
    return NextResponse.json(
      { error: "Failed to fetch meme" },
      { status: 500 }
    );
  }
}
