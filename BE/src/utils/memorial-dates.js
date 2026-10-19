const ApiError = require("./api-error");

function assertMemorialDates(input, existing = {}) {
  const birthDate =
    input.birthDate !== undefined
      ? input.birthDate
      : existing.birth_date;

  const deathDate =
    input.deathDate !== undefined
      ? input.deathDate
      : existing.death_date;

  // Cho phép bỏ trống hoặc chủ động xóa ngày.
  if (!birthDate || !deathDate) return;

  const birth = new Date(birthDate);
  const death = new Date(deathDate);

  if (
    Number.isNaN(birth.getTime()) ||
    Number.isNaN(death.getTime())
  ) {
    throw new ApiError(422, "Ngày sinh hoặc ngày mất không hợp lệ.");
  }

  if (death.getTime() < birth.getTime()) {
    throw new ApiError(
      422,
      "Ngày mất không được trước ngày sinh."
    );
  }
}

module.exports = { assertMemorialDates };
