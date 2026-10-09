export function mayNeedImmediateSupport(text: string): boolean {
  const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  return /\b(tu tu|muon chet|khong muon song|ket thuc cuoc doi|tu lam hai|tu hai ban than|khong the song tiep)\b/.test(normalized);
}
