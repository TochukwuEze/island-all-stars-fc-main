import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const tournament = await prisma.tournamentHistory.update({
      where: { id },
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

    return NextResponse.json(tournament);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "A tournament for this year already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update tournament" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.tournamentHistory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete tournament" },
      { status: 500 }
    );
  }
}
