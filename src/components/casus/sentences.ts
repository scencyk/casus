// Copy for the sequence. Wrap a word in *asterisks* to emphasise it (muted tone).
// The last sentence must contain the letters c-a-s-u-s in order — those
// letters are pulled out of it to form the word.

export const SENTENCES = [
  "Każda odpowiedź powinna mieć *źródło*.",
  "Nie przeglądasz. Przychodzisz z *konkretnym* przypadkiem.",
  "Szukamy za Ciebie, a *decyzja* zawsze zostaje u Ciebie, nie u nas.",
] as const;

export const TARGET = "casus";

export type Token = { text: string; italic: boolean };

/** Split a sentence into words, keeping the italic marker per word. */
export function tokenize(sentence: string): Token[] {
  return sentence.split(" ").map((raw) => {
    const italic = raw.includes("*");
    return { text: raw.replaceAll("*", ""), italic };
  });
}

/**
 * Pick one character index per letter of `target`, in order, spread across
 * the sentence so the letters fly in from different places.
 * Indices refer to the sentence with the asterisks removed.
 */
export function pickLetters(sentence: string, target: string): number[] {
  const plain = sentence.replaceAll("*", "").toLowerCase();
  const picks: number[] = [];
  let from = 0;

  for (let i = 0; i < target.length; i++) {
    const ideal = Math.round((plain.length * (i + 0.5)) / target.length);
    let best = -1;
    for (let j = from; j < plain.length; j++) {
      if (plain[j] !== target[i]) continue;
      // leave room for the remaining letters
      const rest = target.slice(i + 1);
      if (rest && !isSubsequence(rest, plain.slice(j + 1))) break;
      if (best === -1 || Math.abs(j - ideal) < Math.abs(best - ideal)) best = j;
    }
    if (best === -1) throw new Error(`"${target}" is not a subsequence of the last sentence`);
    picks.push(best);
    from = best + 1;
  }
  return picks;
}

function isSubsequence(needle: string, haystack: string) {
  let k = 0;
  for (const ch of haystack) if (ch === needle[k]) k++;
  return k === needle.length;
}
