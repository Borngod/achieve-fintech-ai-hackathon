import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request, { params }: { params: { accountId: string } }) {
  const { accountId } = params;

  if (!accountId) {
    return NextResponse.json({ error: "No account ID provided" }, { status: 400 });
  }

  try {
    const response = await axios.get(
      `https://api.withmono.com/accounts/${accountId}/transactions`,
      {
        headers: {
          "mono-sec-key": process.env.MONO_SECRET_KEY!,
          "accept": "application/json",
        },
      }
    );

    return NextResponse.json(response.data.data);
  } catch (error: any) {
    console.error("Error fetching transactions:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}