export const GOOD_DAY_PURPOSES = [
  { id: "family", label: "Gặp mặt gia đình" },
  { id: "ritual", label: "Chuẩn bị nghi lễ" },
  { id: "construction", label: "Động thổ" },
] as const;

export type GoodDayPurpose =
  (typeof GOOD_DAY_PURPOSES)[number]["id"];

export interface GoodDayResult {
  id: string;
  date: string;
  purpose: GoodDayPurpose;
  title: string;
  explanation: string;
  sourceLabel: string;
  isDemo: boolean;
}

export interface GoodDayQuery {
  purpose: GoodDayPurpose;
  from: string;
  to: string;
}

export function parseDateInput(value: string): {
  year: number;
  month: number;
  day: number;
  ordinal: number;
} | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (year < 1900 || year > 2100) return null;

  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return {
    year,
    month,
    day,
    ordinal: date.getTime() / 86400000,
  };
}

export function validateGoodDayQuery(
  query: GoodDayQuery
): string | null {
  if (
    !GOOD_DAY_PURPOSES.some(
      (purpose) => purpose.id === query.purpose
    )
  ) {
    return "Mục đích tra cứu chưa hợp lệ.";
  }

  const from = parseDateInput(query.from);
  const to = parseDateInput(query.to);

  if (!from || !to) {
    return "Chọn ngày hợp lệ trong khoảng 1900–2100.";
  }

  if (to.ordinal < from.ordinal) {
    return "Ngày kết thúc phải từ ngày bắt đầu trở đi.";
  }

  if (to.ordinal - from.ordinal > 30) {
    return "Bản thử nghiệm hỗ trợ khoảng tra cứu tối đa 31 ngày.";
  }

  return null;
}

// Dữ liệu kiểm thử giao diện.
// Không chứa đánh giá ngày tốt/xấu hoặc quy tắc dân gian.
const DEMO_RESULTS: GoodDayResult[] = [
  {
    id: "demo-family-20261010",
    date: "2026-10-10",
    purpose: "family",
    title: "Ngày mẫu cho luồng gặp mặt gia đình",
    explanation:
      "Bản ghi dùng để thử xem kết quả và lưu lịch. Không đánh giá ngày này phù hợp hơn ngày khác.",
    sourceLabel: "Dữ liệu mô phỏng nội bộ",
    isDemo: true,
  },
  {
    id: "demo-ritual-20261015",
    date: "2026-10-15",
    purpose: "ritual",
    title: "Ngày mẫu cho luồng chuẩn bị nghi lễ",
    explanation:
      "Bản ghi dùng để thử phần giải thích và thao tác lưu lịch. Chưa có căn cứ chọn ngày nghi lễ.",
    sourceLabel: "Dữ liệu mô phỏng nội bộ",
    isDemo: true,
  },
  {
    id: "demo-construction-20261020",
    date: "2026-10-20",
    purpose: "construction",
    title: "Ngày mẫu cho luồng động thổ",
    explanation:
      "Bản ghi chỉ minh họa giao diện. Không sử dụng làm căn cứ quyết định ngày động thổ.",
    sourceLabel: "Dữ liệu mô phỏng nội bộ",
    isDemo: true,
  },
];

export function lookupGoodDays(
  query: GoodDayQuery
): GoodDayResult[] {
  const error = validateGoodDayQuery(query);

  if (error) throw new Error(error);

  return DEMO_RESULTS.filter(
    (result) =>
      result.purpose === query.purpose &&
      result.date >= query.from &&
      result.date <= query.to
  );
}
