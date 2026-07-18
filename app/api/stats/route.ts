import { NextResponse } from "next/server";

// ISR-style caching: Vercel will cache this route's response for 1 hour
export const revalidate = 3600;

export async function GET() {
  const results: {
    leetcode: number | null;
    codeforces: number | null;
    gfg: number | null;
    atcoder: number | null;
  } = {
    leetcode: null,
    codeforces: null,
    gfg: null,
    atcoder: null,
  };

  try {
    const [lcRes, cfRes, gfgRes, acRes] = await Promise.allSettled([
      fetch("https://leetcode-stats-api.herokuapp.com/S_Deepakraj", {
        next: { revalidate: 3600 },
      }),
      fetch("https://codeforces.com/api/user.info?handles=deepakraj.s2024cse", {
        next: { revalidate: 3600 },
      }),
      fetch("https://geeks-for-geeks-api.vercel.app/deepakraj_s", {
        next: { revalidate: 3600 },
      }),
      fetch("https://kenkoooo.com/atcoder/atcoder-api/v3/user/info?user=Deepakraj_S", {
        next: { revalidate: 3600 },
      }),
    ]);

    if (lcRes.status === "fulfilled" && lcRes.value.ok) {
      try {
        const lcData = await lcRes.value.json();
        if (lcData?.totalSolved) {
          results.leetcode = lcData.totalSolved;
        }
      } catch (err) {
        console.error("Error parsing LeetCode response:", err);
      }
    }

    if (cfRes.status === "fulfilled" && cfRes.value.ok) {
      try {
        const cfData = await cfRes.value.json();
        if (cfData?.status === "OK" && cfData?.result?.[0]?.rating) {
          results.codeforces = cfData.result[0].rating;
        }
      } catch (err) {
        console.error("Error parsing Codeforces response:", err);
      }
    }

    if (gfgRes.status === "fulfilled" && gfgRes.value.ok) {
      try {
        const gfgData = await gfgRes.value.json();
        const solved =
          gfgData?.totalProblemsSolved ??
          gfgData?.total_problems_solved ??
          gfgData?.totalSolved ??
          null;
        if (solved) {
          results.gfg = Number(solved);
        }
      } catch (err) {
        console.error("Error parsing GeeksforGeeks response:", err);
      }
    }

    if (acRes.status === "fulfilled" && acRes.value.ok) {
      try {
        const acData = await acRes.value.json();
        if (acData?.accepted_count !== undefined) {
          results.atcoder = acData.accepted_count;
        }
      } catch (err) {
        console.error("Error parsing AtCoder response:", err);
      }
    }
  } catch (error) {
    console.error("Error fetching stats:", error);
  }

  // Cache-Control header for Vercel CDN edge caching
  return NextResponse.json(results, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
    },
  });
}
