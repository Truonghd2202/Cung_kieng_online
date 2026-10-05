export type RegionalTopicRegion =
  | "north"
  | "central"
  | "south";

interface RegionalTopic {
  id: string;
  label: string;
  articleId?: string;
}

export const REGIONAL_TOPICS: Record<
  RegionalTopicRegion,
  RegionalTopic[]
> = {
  north: [
    {
      id: "dao-mau",
      label: "Thờ Mẫu · Tam phủ",
      articleId: "tin-nguong-tho-mau-tam-phu",
    },
    {
      id: "hau-dong-chau-van",
      label: "Hầu đồng · Chầu văn",
      articleId: "hau-dong-chau-van",
    },
    {
      id: "phu-tay-ho",
      label: "Phủ Tây Hồ",
      articleId: "phu-tay-ho",
    },
    {
      id: "den-tran",
      label: "Đền Trần",
      articleId: "den-tran-nam-dinh",
    },
    {
      id: "dinh-lang",
      label: "Đình làng",
      articleId: "dinh-lang-bac-bo",
    },
  ],

  central: [
    {
      id: "hue",
      label: "Huế · Điện Hòn Chén",
      articleId: "dien-hon-chen",
    },
    {
      id: "quang-nam",
      label: "Quảng Nam · Bài chòi Hội An",
      articleId: "bai-choi-hoi-an",
    },
    {
      id: "ca-ong-cau-ngu",
      label: "Cá Ông · Lễ Cầu Ngư",
      articleId: "le-hoi-cau-ngu",
    },
  ],

  south: [
    {
      id: "ba-chua-xu",
      label: "Vía Bà Chúa Xứ",
      articleId: "mieu-ba-chua-xu",
    },
    {
      id: "ba-den",
      label: "Bà Đen · Linh Sơn Thánh Mẫu",
      articleId: "le-via-ba-linh-son-thanh-mau",
    },
    {
      id: "ong-ta",
      label: "Ông Tà · Néak Tà của người Khmer",
      articleId: "neak-ta-khmer-nam-bo",
    },
    {
      id: "hoa-dang",
      label: "Hoa đăng · Ninh Kiều",
      articleId: "hoa-dang-ninh-kieu",
    },
  ],
};
