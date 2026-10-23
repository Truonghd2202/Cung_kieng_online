import records from "./heritageSites.json";
import { VIETNAM_CENTRAL_PATHS, VIETNAM_NORTH_PATHS, VIETNAM_SOUTH_PATHS } from "./vietnamMapData";

export interface HeritageSite {
  id: string;
  region: "Bắc Bộ" | "Trung Bộ" | "Nam Bộ";
  province_legacy: string;
  name: string;
  category: string;
  spiritual_relevance: string;
  source_name: string;
  source_url: string;
  source_row_number: number;
  verification: string;
  administrative_note: string;
  province_current: string;
}

// The supplied source keeps the province names used when each heritage item
// was recorded. Preserve that key for the 63-province map geometry and expose
// the current province name for readers after the 2025 administrative merger.
const CURRENT_PROVINCE_BY_LEGACY: Record<string, string> = {
  "An Giang": "An Giang",
  "Bình Phước": "Đồng Nai",
  "Bắc Giang": "Bắc Ninh",
  "Bắc Kạn": "Thái Nguyên",
  "Bắc Ninh": "Bắc Ninh",
  "Bến Tre": "Vĩnh Long",
  "Cao Bằng": "Cao Bằng",
  "Cà Mau": "Cà Mau",
  "Gia Lai": "Gia Lai",
  "Hà Giang": "Tuyên Quang",
  "Hà Nam": "Ninh Bình",
  "Hà Nội": "Hà Nội",
  "Hà Tĩnh": "Hà Tĩnh",
  "Hưng Yên": "Hưng Yên",
  "Hải Dương": "Hải Phòng",
  "Hải Phòng": "Hải Phòng",
  "Khánh Hòa": "Khánh Hòa",
  "Lai Châu": "Lai Châu",
  "Long An": "Tây Ninh",
  "Lào Cai": "Lào Cai",
  "Lạng Sơn": "Lạng Sơn",
  "Nam Định": "Ninh Bình",
  "Nghệ An": "Nghệ An",
  "Ninh Bình": "Ninh Bình",
  "Ninh Thuận": "Khánh Hòa",
  "Phú Thọ": "Phú Thọ",
  "Quảng Bình": "Quảng Trị",
  "Quảng Nam": "Đà Nẵng",
  "Quảng Ngãi": "Quảng Ngãi",
  "Quảng Ninh": "Quảng Ninh",
  "Sóc Trăng": "Cần Thơ",
  "Sơn La": "Sơn La",
  "TP. Hồ Chí Minh": "TP. Hồ Chí Minh",
  "Thanh Hóa": "Thanh Hóa",
  "Thái Bình": "Hưng Yên",
  "Thái Nguyên": "Thái Nguyên",
  "Tiền Giang": "Đồng Tháp",
  "Trà Vinh": "Vĩnh Long",
  "Tuyên Quang": "Tuyên Quang",
  "Tây Ninh": "Tây Ninh",
  "Vĩnh Phúc": "Phú Thọ",
  "Yên Bái": "Lào Cai",
  "Điện Biên": "Điện Biên",
  "Đà Nẵng": "Đà Nẵng",
};

const sourceRecords = records as Array<Omit<HeritageSite, "province_current">>;

export const HERITAGE_SITES: HeritageSite[] = sourceRecords.map((record) => ({
  ...record,
  province_current: CURRENT_PROVINCE_BY_LEGACY[record.province_legacy] ?? record.province_legacy,
}));

const normalizeProvince = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[Đđ]/g, "d")
  .replace(/[^a-z0-9]/gi, "")
  .toLowerCase();

const MAP_NAME_ALIASES: Record<string, string> = {
  "TP. Hồ Chí Minh": "Hồ Chí Minh city",
};

const mapProvinceNames = [
  ...VIETNAM_NORTH_PATHS,
  ...VIETNAM_CENTRAL_PATHS,
  ...VIETNAM_SOUTH_PATHS,
].map((province) => province.name);

export function getMapProvinceName(legacyName: string): string | undefined {
  const alias = MAP_NAME_ALIASES[legacyName];
  if (alias && mapProvinceNames.includes(alias)) return alias;
  return mapProvinceNames.find((name) => normalizeProvince(name) === normalizeProvince(legacyName));
}
