export const CULTURAL_TOPICS = [
  { id: "cadao", label: "Ca dao & tục ngữ" },
  { id: "xinxam", label: "Xin xăm văn hóa" },
  { id: "bamien", label: "Văn hóa ba miền" },
  { id: "nghile", label: "Phong tục & nghi lễ" },
  { id: "trian", label: "Biết ơn & tưởng niệm" },
] as const;

export const sanitizeCulturalTopics = (
  value: unknown
): string[] => {
  if (!Array.isArray(value)) return [];

  const validIds = new Set<string>(
    CULTURAL_TOPICS.map((topic) => topic.id)
  );

  return [
    ...new Set(
      value.filter(
        (id): id is string =>
          typeof id === "string" && validIds.has(id)
      )
    ),
  ];
};
