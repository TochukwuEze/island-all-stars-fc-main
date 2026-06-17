import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tournaments = await prisma.tournamentHistory.findMany({
      orderBy: { year: "desc" },
    });
    return NextResponse.json(tournaments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tournaments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tournament = await prisma.tournamentHistory.create({
      data: {
        year: parseInt(body.year),
        winner: body.winner,
        sponsorName: body.sponsorName,
        sponsorLogo: body.sponsorLogo,
        details: body.details,
        images: body.images || [],
        videoUrl: body.videoUrl,
      },
    });
    return NextResponse.json(tournament, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "A tournament for this year already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create tournament" },
      { status: 500 }
    );
  }
}
