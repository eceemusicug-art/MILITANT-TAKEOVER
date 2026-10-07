import { useEffect, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

export function useCountdown(targetISO: string): Countdown {
  const target = new Date(targetISO).getTime();

  const calc = (): Countdown => {
    const diff = Math.max(0, target - Date.now());
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor(diff / 3_600_000) % 24,
      minutes: Math.floor(diff / 60_000) % 60,
      seconds: Math.floor(diff / 1_000) % 60,
      done: diff === 0,
    };
  };

  const [time, setTime] = useState<Countdown>(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO]);

  return time;
}
