import { useEffect, useState } from "react";
import { mayNeedImmediateSupport } from "../data/supportSignal";
import { apiRequest } from "../lib/api";
interface Contact { name: string; phone: string; source: string }
export function SchoolSupportNotice({ text }: { text: string }) {
  const needed = mayNeedImmediateSupport(text);
  const [contact, setContact] = useState<Contact | null>(null);
  useEffect(() => {
    if (!needed) return;
    let active = true;
    apiRequest<{ contact: Contact | null }>("/content/support-contact").then((result) => { if (active) setContact(result.contact); }).catch(() => {});
    return () => { active = false; };
  }, [needed]);
  if (!needed) return null;
  return <aside role="status" className="my-4 rounded-xl border border-amber-500/40 bg-surface p-4">
    <p className="font-semibold">Bạn không cần trải qua lúc này một mình.</p>
    <p className="mt-2 text-sm">Nếu bạn cảm thấy không an toàn, hãy đến bên một người tin cậy và nói rõ rằng bạn cần họ ở cùng. Bạn cũng có thể tìm hỗ trợ trực tiếp tại cơ sở y tế gần nhất.</p>
    {contact ? <p className="mt-2 text-sm"><a className="underline" href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.name}: {contact.phone}</a> · <a className="underline" href={contact.source} target="_blank" rel="noreferrer">Thông tin từ nhà trường</a></p> : <p className="mt-2 text-sm">Bạn có thể liên hệ phòng công tác sinh viên hoặc bộ phận tham vấn tâm lý của trường để được kết nối người hỗ trợ.</p>}
  </aside>;
}
