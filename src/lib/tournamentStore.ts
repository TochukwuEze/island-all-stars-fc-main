export interface TournamentHistory {
  id: string;
  year: number;
  winner: string;
  sponsorName: string | null;
  sponsorLogo: string | null;
  details: string;
  images: string[];
  videoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export const getTournaments = async (): Promise<TournamentHistory[]> => {
  try {
    const res = await fetch("/api/tournaments", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch tournaments");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addTournament = async (
  data: Omit<TournamentHistory, "id" | "createdAt" | "updatedAt">
): Promise<boolean> => {
  try {
    const res = await fetch("/api/tournaments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateTournament = async (
  id: string,
  data: Partial<TournamentHistory>
): Promise<boolean> => {
  try {
    const res = await fetch(`/api/tournaments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteTournament = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`/api/tournaments/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
