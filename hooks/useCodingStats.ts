"use client";

import { useState, useEffect } from "react";

interface CodingStats {
  leetCodeSolved: number;
  gfgSolved: number;
  isLoading: boolean;
}

/**
 * Fetches live coding-profile stats from the `/api/stats` proxy route.
 * Falls back to sensible defaults when the API is unreachable.
 */
export function useCodingStats(
  defaultLeetCode = 219,
  defaultGfg = 100,
): CodingStats {
  const [leetCodeSolved, setLeetCodeSolved] = useState(defaultLeetCode);
  const [gfgSolved, setGfgSolved] = useState(defaultGfg);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok && !cancelled) {
          const data = await res.json();
          if (data.leetcode) setLeetCodeSolved(data.leetcode);
          if (data.gfg) setGfgSolved(data.gfg);
        }
      } catch {
        // Fallback values already set as defaults
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return { leetCodeSolved, gfgSolved, isLoading };
}
