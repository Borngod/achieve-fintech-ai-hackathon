import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const { code } = await request.json();

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const response = await axios.post(
      "https://api.withmono.com/account/auth",
      { code },
      {
        headers: {
          "mono-sec-key": process.env.MONO_SECRET_KEY!,
          "Content-Type": "application/json",
        },
      }
    );

    const accountId = response.data.id;
    return NextResponse.json({ accountId });
  } catch (error: any) {
    console.error("Error exchanging code:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to link account" }, { status: 500 });
  }
}