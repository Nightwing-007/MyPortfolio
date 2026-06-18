import { NextResponse } from "next/server";

export async function GET() {
  const results: {
    leetcode: number | null;
    gfg: number | null;
  } = {
    leetcode: null,
    gfg: null,
  };

  try {
    const [lcRes, gfgRes] = await Promise.allSettled([
      fetch("https://leetcode-stats-api.herokuapp.com/S_Deepakraj", {
        next: { revalidate: 3600 }, // cache for 1 hour
      }),
      fetch("https://geeks-for-geeks-api.vercel.app/deepakraj_s", {
        next: { revalidate: 3600 },
      }),
    ]);

    if (lcRes.status === "fulfilled" && lcRes.value.ok) {
      const lcData = await lcRes.value.json();
      if (lcData?.totalSolved) {
        results.leetcode = lcData.totalSolved;
      }
    }

    if (gfgRes.status === "fulfilled" && gfgRes.value.ok) {
      const gfgData = await gfgRes.value.json();
      const solved =
        gfgData?.totalProblemsSolved ??
        gfgData?.total_problems_solved ??
        gfgData?.totalSolved ??
        null;
      if (solved) {
        results.gfg = Number(solved);
      }
    }
  } catch {
    // Return whatever we have — client handles nulls as fallback
  }

  return NextResponse.json(results);
}
