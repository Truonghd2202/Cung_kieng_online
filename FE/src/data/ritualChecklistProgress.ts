export interface ChecklistEntry {
  id: string;
  label: string;
}

function normalizedLabel(label: string) {
  return label.normalize("NFC").trim().replace(/\s+/g, " ").toLocaleLowerCase("vi");
}

function matchingCurrentItem(previous: ChecklistEntry, current: ChecklistEntry[]) {
  const matches = current.filter((item) => normalizedLabel(item.label) === normalizedLabel(previous.label));
  return matches.length === 1 ? matches[0] : undefined;
}

export function reconcileChecklistProgress(
  checkedIds: string[],
  previousChecklist: ChecklistEntry[],
  currentChecklist: ChecklistEntry[],
) {
  const currentIds = new Set(currentChecklist.map(({ id }) => id));
  const previousById = new Map(previousChecklist.map((item) => [item.id, item]));
  const checked = new Set<string>();
  const unmatchedIds: string[] = [];

  for (const id of checkedIds) {
    if (currentIds.has(id)) {
      checked.add(id);
      continue;
    }
    const previous = previousById.get(id);
    const match = previous && matchingCurrentItem(previous, currentChecklist);
    if (match) checked.add(match.id);
    else unmatchedIds.push(id);
  }

  return { checkedIds: [...checked], unmatchedIds: [...new Set(unmatchedIds)] };
}

export function updateChecklistProgress(
  checkedIds: string[],
  nextCurrentIds: string[],
  previousChecklist: ChecklistEntry[],
  currentChecklist: ChecklistEntry[],
) {
  const currentIds = new Set(currentChecklist.map(({ id }) => id));
  const previousById = new Map(previousChecklist.map((item) => [item.id, item]));
  const nextCurrent = new Set(nextCurrentIds.filter((id) => currentIds.has(id)));
  const retainedLegacy = checkedIds.filter((id) => {
    if (currentIds.has(id)) return false;
    const previous = previousById.get(id);
    const match = previous && matchingCurrentItem(previous, currentChecklist);
    return !match || nextCurrent.has(match.id);
  });
  return [...new Set([...retainedLegacy, ...nextCurrent])];
}
