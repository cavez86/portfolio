/** Consecutive jobs at the same employer share one zone on the line. */
export const groupByEmployer = <T extends { company: string }>(experience: T[]) =>
  experience.reduce<T[][]>((groups, exp) => {
    const last = groups.at(-1);
    if (last && last[0].company === exp.company) last.push(exp);
    else groups.push([exp]);
    return groups;
  }, []);
