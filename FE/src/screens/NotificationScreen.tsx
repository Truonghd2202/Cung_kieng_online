import React, { useMemo, useState } from "react";
import { ArrowLeft, Bell, BellRing, CalendarDays, Check, Clock3, Heart, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

interface NotificationScreenProps { onBack: () => void; }
interface NotificationItem { id: string; title: string; body: string; date: string; kind: "calendar" | "culture" | "mood" | "saved"; read: boolean; }

const SEED_NOTIFICATIONS: NotificationItem[] = [
  { id: "ram", title: "Rằm tháng 8", body: "Một ngày để dành chút thời gian hướng về gia đình.", date: "Hôm nay", kind: "calendar", read: false },
  { id: "memory", title: "Ngày tưởng niệm", body: "Ngày tưởng niệm bạn đã lưu còn 3 ngày.", date: "Hôm qua", kind: "saved", read: false },
  { id: "culture", title: "Một nét văn hóa đang chờ bạn", body: "Khám phá thêm câu chuyện về miền Trung và đời sống biển.", date: "2 ngày trước", kind: "culture", read: true },
  { id: "mood", title: "Đã đến lúc check-in", body: "Dành một phút lắng nghe tâm trạng hôm nay.", date: "Tuần này", kind: "mood", read: true },
];

const ICONS = { calendar: CalendarDays, culture: Sparkles, mood: Heart, saved: BellRing };

export const NotificationScreen: React.FC<NotificationScreenProps> = ({ onBack }) => {
  const [items, setItems] = useState(SEED_NOTIFICATIONS);
  const unread = useMemo(() => items.filter((item) => !item.read).length, [items]);
  const markAllRead = () => setItems((current) => current.map((item) => ({ ...item, read: true })));
  const remove = (id: string) => setItems((current) => current.filter((item) => item.id !== id));
  return <div className="screen-shell"><main className="page-container max-w-4xl">
    <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted"><button onClick={onBack} className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Góc của tôi</button><Badge variant="outline"><Bell className="w-3 h-3 mr-1" /> {unread} chưa đọc</Badge></div>
    <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"><div><span className="text-xs font-semibold uppercase tracking-widest text-accent">Nhắc nhẹ đúng lúc</span><h1 className="page-title mt-2 mb-3">Thông báo</h1><p className="text-sm text-muted leading-relaxed">Những lời nhắc nhỏ về ngày văn hóa, điều đã lưu và khoảng thời gian dành cho mình.</p></div>{unread > 0 && <Button variant="outline" onClick={markAllRead} className="gap-2"><Check className="w-4 h-4" /> Đánh dấu đã đọc</Button>}</header>
    {items.length ? <div className="space-y-3 mb-12">{items.map((item) => { const Icon = ICONS[item.kind]; return <Card key={item.id} className={`p-5 border-line ${item.read ? "opacity-75" : ""}`}><div className="flex gap-4"><div className="w-10 h-10 shrink-0 rounded-full bg-surface-soft border border-line flex items-center justify-center text-accent"><Icon className="w-4 h-4" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2 mb-1"><h2 className="font-display font-bold">{item.title}</h2>{!item.read && <span className="w-2 h-2 rounded-full bg-action" />}</div><p className="text-sm text-muted leading-relaxed">{item.body}</p><span className="inline-flex items-center gap-1.5 text-xs text-muted mt-3"><Clock3 className="w-3.5 h-3.5" /> {item.date}</span></div><button onClick={() => remove(item.id)} className="self-start p-2 rounded-full text-muted hover:text-danger hover:bg-danger-soft transition-colors" aria-label={`Xóa thông báo ${item.title}`}><Trash2 className="w-4 h-4" /></button></div></Card>; })}</div> : <Card className="p-10 text-center border-line mb-12"><Bell className="w-8 h-8 text-accent mx-auto mb-4" /><h2 className="font-display text-xl font-bold mb-2">Bạn đã xem hết rồi</h2><p className="text-sm text-muted">Khi có một lời nhắc phù hợp, nó sẽ xuất hiện ở đây.</p></Card>}
  </main></div>;
};
