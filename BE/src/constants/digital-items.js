const DIGITAL_ITEMS = Object.freeze({
  ROYAL_LANTERN: Object.freeze({
    code: "ROYAL_LANTERN",
    name: "Đèn hoa đăng trang trí",
    kind: "CONSUMABLE",
    description: "Một lượt sử dụng hoa đăng trang trí.",
    price: 9000,
    quantity: 1,
    saleEnabled: true,
  }),

  JADE_LOTUS: Object.freeze({
    code: "JADE_LOTUS",
    name: "Bình sen ngọc",
    kind: "PERMANENT",
    description: "Vật phẩm trang trí được tặng cùng gói năm.",
    price: null,
    quantity: 1,
    saleEnabled: false,
  }),

  GOLDEN_LOTUS: Object.freeze({
    code: "GOLDEN_LOTUS",
    name: "Bình sen vàng",
    kind: "PERMANENT",
    description: "Bình sen trang trí, không bị tiêu hao khi sử dụng.",
    price: 29000,
    quantity: 1,
    saleEnabled: false,
  }),

  INCENSE_BURNER: Object.freeze({
    code: "INCENSE_BURNER",
    name: "Lư trầm trang trí",
    kind: "PERMANENT",
    description: "Lư trầm trang trí trong cảnh, không bị tiêu hao.",
    price: 49000,
    quantity: 1,
    saleEnabled: false,
  }),
});

module.exports = { DIGITAL_ITEMS };
