"use client";

import { useState, useEffect } from "react";

interface CodingStats {
  leetCodeSolved: number | string;
  codeforcesRating: number | string;
  gfgSolved: number | string;
  atcoderSolved: number;
  hackerrankSolved: number;
  codechefSolved: number;
  hackerearthSolved: number;
  skillrackSolved: number | string;
  isLoading: boolean;
}

/**
 * Fetches live coding-profile stats from the `/api/stats` proxy route.
 * Falls back to sensible defaults when the API is unreachable.
 */
export function useCodingStats(
  defaultLeetCode: number | string = "250+",
  defaultCodeforces = 348,
  defaultGfg = "100+",
  defaultAtcoder = 15,
  defaultHackerrank = 50,
  defaultCodechef = 15,
  defaultHackerearth = 5,
  defaultSkillrack = "1200+",
): CodingStats {
  const [leetCodeSolved, setLeetCodeSolved] = useState<number | string>(defaultLeetCode);
  const [codeforcesRating, setCodeforcesRating] = useState<number | string>(defaultCodeforces);
  const [gfgSolved, setGfgSolved] = useState<number | string>(defaultGfg);
  const [atcoderSolved, setAtcoderSolved] = useState<number>(defaultAtcoder);
  
  // Static state values for platforms that strictly block CORS
  const [hackerrankSolved] = useState<number>(defaultHackerrank);
  const [codechefSolved] = useState<number>(defaultCodechef);
  const [hackerearthSolved] = useState<number>(defaultHackerearth);
  const [skillrackSolved] = useState<number | string>(defaultSkillrack);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok && !cancelled) {
          const data = await res.json();
          if (data.leetcode !== null && data.leetcode !== undefined) {
            // setLeetCodeSolved(data.leetcode); // Using static "250+"
          }
          if (data.codeforces !== null && data.codeforces !== undefined) {
            setCodeforcesRating(data.codeforces);
          }
          if (data.gfg !== null && data.gfg !== undefined) {
            setGfgSolved(data.gfg);
          }
          if (data.atcoder !== null && data.atcoder !== undefined) {
            setAtcoderSolved(data.atcoder);
          }
        }
      } catch (e) {
        console.error("Error fetching proxy stats on client:", e);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    leetCodeSolved,
    codeforcesRating,
    gfgSolved,
    atcoderSolved,
    hackerrankSolved,
    codechefSolved,
    hackerearthSolved,
    skillrackSolved,
    isLoading,
  };
}
