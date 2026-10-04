import React from "react";
import { ArrowLeft, ArrowRight, Edit2, Heart, Plus, UserRound } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

export interface MemorialRecord {
  name: string;
  relation: string;
  date: string;
  note?: string;
}

interface MemorialSpaceScreenProps {
  memorial: MemorialRecord | null;
  onBack: () => void;
  onCreate: () => void;
  onEdit: () => void;
  onGoToAltar: () => void;
}

const formatMemorialDate = (value: string): string => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) return value;

  return `${match[3]}/${match[2]}/${match[1]}`;
};

export const MemorialSpaceScreen: React.FC<MemorialSpaceScreenProps> = ({ memorial, onBack, onCreate, onEdit, onGoToAltar }) => {
  return (
    <div className="screen-shell">
      <main className="page-container max-w-5xl">
        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted">
          <button onClick={onBack} className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Không gian của tôi</button>
          <Badge variant="outline">Góc tưởng niệm</Badge>
        </div>

        <header className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Giữ một điều thân thương</span>
          <h1 className="page-title mt-2 mb-3">Góc tưởng niệm</h1>
          <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">Một nơi nhỏ để gọi tên người mình nhớ và lưu lại lời tri ân theo cách thật riêng.</p>
        </header>

        {!memorial ? (
          <Card className="p-8 sm:p-14 text-center border-line mb-12">
            <div className="w-16 h-16 rounded-full bg-surface-soft border border-line mx-auto mb-5 flex items-center justify-center text-accent"><Heart className="w-7 h-7" /></div>
            <h2 className="font-display text-2xl font-bold mb-3">Bạn chưa tạo góc tưởng niệm</h2>
            <p className="text-sm text-muted leading-relaxed max-w-lg mx-auto mb-7">Bạn có thể bắt đầu bằng một cái tên, một mối quan hệ và một ngày muốn giữ trong lòng.</p>
            <Button onClick={onCreate} className="gap-2"><Plus className="w-4 h-4" /> Tạo một góc tưởng niệm</Button>
          </Card>
        ) : (
          <>
            <Card className="p-6 sm:p-9 border-line mb-6">
              <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-surface-soft text-accent">
                    <UserRound
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Badge
                      variant="terracotta"
                      className="mb-2"
                    >
                      Góc riêng của bạn
                    </Badge>

                    <h2 className="font-display text-2xl font-bold [overflow-wrap:anywhere] sm:text-3xl">
                      {memorial.name}
                    </h2>

                    <p className="mt-1 text-sm leading-relaxed text-muted [overflow-wrap:anywhere]">
                      {memorial.relation}
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Ngày ghi nhớ:{" "}
                      {formatMemorialDate(memorial.date)}
                      {" "}(dương lịch)
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={onEdit}
                  className="w-full shrink-0 gap-2 sm:w-auto"
                >
                  <Edit2
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Chỉnh sửa
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-line grid sm:grid-cols-2 gap-5">
                <div>
                  <span className="text-xs text-muted uppercase tracking-wider">Lời tri ân</span>
                  <p className="mt-2 whitespace-pre-wrap font-display text-lg italic text-ink [overflow-wrap:anywhere]">
                    {memorial.note || "Bạn chưa viết lời tri ân nào."}
                  </p>
                </div>
                <div className="sm:border-l sm:border-line sm:pl-5">
                  <span className="text-xs text-muted uppercase tracking-wider">Một nhịp nhớ</span>
                  <p className="text-sm text-muted leading-relaxed mt-2">Bạn có thể trở lại bất cứ khi nào muốn thắp một nén nhang lòng.</p>
                </div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              <Card onClick={onGoToAltar} className="group p-5 cursor-pointer hover:bg-surface-soft border-line flex items-center justify-between"><span className="flex items-center gap-3 font-semibold"><Heart className="w-5 h-5 text-accent" /> Thắp nhang</span><ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" /></Card>
              <Card onClick={onEdit} className="group p-5 cursor-pointer hover:bg-surface-soft border-line flex items-center justify-between"><span className="flex items-center gap-3 font-semibold"><Edit2 className="w-5 h-5 text-accent" /> Viết một lời</span><ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" /></Card>
            </div>
          </>
        )}

        <p className="mb-8 text-sm text-muted leading-relaxed">
          Bản thử nghiệm hiện hỗ trợ một góc tưởng niệm cho mỗi
          tài khoản hoặc phiên khách trên trình duyệt này.
          Chưa có lịch nhắc tự động.
        </p>
      </main>
    </div>
  );
};
