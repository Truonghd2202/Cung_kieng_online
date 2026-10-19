export interface SePayCheckoutResponse {
  orderId: string;
  provider: "SEPAY";
  environment: "sandbox" | "production";
  checkout: {
    method: "POST";
    action: string;
    fields: Record<string, string | number>;
  };
}

export function submitSePayCheckout(
  response: SePayCheckoutResponse
) {
  const { checkout, environment, orderId } = response;

  if (
    response.provider !== "SEPAY" ||
    !["sandbox", "production"].includes(environment) ||
    checkout?.method !== "POST" ||
    !/^(?:[a-f0-9]{32}|DI[a-f0-9]{30})$/i.test(orderId)
  ) {
    throw new Error("Thông tin thanh toán không hợp lệ.");
  }

  const action = new URL(checkout.action);

  const expectedHost =
    environment === "sandbox"
      ? "pay-sandbox.sepay.vn"
      : "pay.sepay.vn";

  if (
    action.protocol !== "https:" ||
    action.hostname !== expectedHost ||
    action.port ||
    action.username ||
    action.password ||
    action.pathname !== "/v1/checkout/init" ||
    action.search ||
    action.hash
  ) {
    throw new Error("Địa chỉ thanh toán không hợp lệ.");
  }

  if (
    !checkout.fields ||
    typeof checkout.fields !== "object" ||
    Array.isArray(checkout.fields) ||
    checkout.fields.order_invoice_number !== orderId
  ) {
    throw new Error("Dữ liệu đơn thanh toán không khớp.");
  }

  const form = document.createElement("form");
  form.method = "POST";
  form.action = action.href;
  form.hidden = true;

  for (const [name, value] of Object.entries(checkout.fields)) {
    if (
      typeof value !== "string" &&
      typeof value !== "number"
    ) {
      throw new Error("Trường thanh toán không hợp lệ.");
    }

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = String(value);

    form.appendChild(input);
  }

  // Giữ mã đơn trong lịch sử để khi quay lại vẫn kiểm tra được.
  const currentUrl = new URL(window.location.href);

  for (const key of [...currentUrl.searchParams.keys()]) {
    if (key.startsWith("vnp_")) {
      currentUrl.searchParams.delete(key);
    }
  }

  currentUrl.searchParams.set("orderId", orderId);

  window.history.replaceState(
    window.history.state,
    "",
    `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`
  );

  document.body.appendChild(form);

  try {
    // Gọi từ prototype để trường form không che phương thức submit.
    HTMLFormElement.prototype.submit.call(form);
  } finally {
    form.remove();
  }
}
