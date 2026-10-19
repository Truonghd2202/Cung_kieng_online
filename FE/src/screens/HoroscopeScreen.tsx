import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { YearlyReading } from "../components/YearlyReading";
import { apiRequest } from "../lib/api";

interface HoroscopeScreenProps {
  onBackToExperience: () => void;
  onGoToCulture?: () => void;
  onGoToHome?: () => void;
  currentUserEmail?: string;
  onGoToLogin: () => void;
  onGoToMembership: () => void;
}

interface MembershipStatus {
  subscription: {
    id: string;
    expires_at: string;
  } | null;
  aiUsage: { successfulUsed: number; inProgress: number; successfulRemaining: number; successfulLimit: number; attemptsUsed: number; attemptsRemaining: number; providerAttemptLimit: number; nextUsableAt: string | null };
}

export const HoroscopeScreen = ({
  onBackToExperience,
  currentUserEmail,
  onGoToLogin,
  onGoToMembership,
}: HoroscopeScreenProps) => {
  const [status, setStatus] =
    useState<MembershipStatus | null>(null);

  const [loading, setLoading] = useState(
    Boolean(currentUserEmail)
  );

  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;

    setStatus(null);
    setError("");

    if (!currentUserEmail) {
      setLoading(false);
      return;
    }

    setLoading(true);

    void apiRequest<MembershipStatus>("/membership/status")
      .then((result) => {
        if (active) setStatus(result);
      })
      .catch(() => {
        if (active) {
          setError(
            "Chưa kiểm tra được quyền hội viên. Bạn hãy thử tải lại."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [currentUserEmail, reload]);

  const canGenerate = Boolean(status?.subscription);

  return (
    <div className="screen-shell">
      <main className="page-container max-w-4xl">
        <Button
          type="button"
          variant="outline"
          onClick={onBackToExperience}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Về Trải nghiệm
        </Button>

        <Card className="border-line bg-surface p-6 sm:p-10">
          <h1 className="font-display text-2xl font-bold text-ink">
            Chiêm nghiệm theo năm
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            AI gợi ý để bạn tự suy ngẫm và lập kế hoạch.
            Tính năng này không tính lá số hoặc dự báo tương lai.
          </p>

          {!currentUserEmail && (
            <div className="mt-5">
              <p className="text-sm text-muted">
                Đăng nhập để kiểm tra hội viên và đọc lại
                diễn giải đã lưu.
              </p>

              <Button
                type="button"
                className="mt-3"
                onClick={onGoToLogin}
              >
                Đăng nhập
              </Button>
            </div>
          )}

          {currentUserEmail && loading && (
            <p role="status" className="mt-5 text-sm text-muted">
              Đang kiểm tra quyền hội viên…
            </p>
          )}

          {currentUserEmail && !loading && error && (
            <div role="alert" className="mt-5">
              <p className="text-sm text-danger">{error}</p>

              <Button
                type="button"
                variant="outline"
                className="mt-3"
                onClick={() => setReload((value) => value + 1)}
              >
                Thử tải lại
              </Button>
            </div>
          )}

          {currentUserEmail && !loading && !error && status && (
            <>
              {!canGenerate && (
                <div className="mt-5">
                  <p className="text-sm text-muted">
                    Tài khoản chưa có hội viên đang hoạt động.
                    Bạn vẫn có thể đọc lại diễn giải đã lưu.
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3"
                    onClick={onGoToMembership}
                  >
                    Xem trạng thái và thông tin hội viên
                  </Button>
                </div>
              )}

              <YearlyReading
                key={currentUserEmail}
                canGenerate={canGenerate}
                usage={status.aiUsage}
              />
            </>
          )}
        </Card>
      </main>
    </div>
  );
};
