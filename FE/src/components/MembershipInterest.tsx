import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  loadMembershipInterest,
  registerMembershipInterest,
  removeMembershipInterest,
  type MembershipInterestStatus,
} from "../data/membershipService";
import { trackProductEvent } from "../data/productAnalytics";

interface MembershipInterestProps {
  email?: string;
  onLogin: () => void;
}

export function MembershipInterest({
  email,
  onLogin,
}: MembershipInterestProps) {
  const [status, setStatus] =
    useState<MembershipInterestStatus | null>(null);

  const [loading, setLoading] = useState(Boolean(email));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [reload, setReload] = useState(0);

  const version = useRef(0);
  const mutationLock = useRef(false);

  useEffect(() => {
    const currentVersion = ++version.current;

    setStatus(null);
    setError("");
    setMessage("");
    setLoading(Boolean(email));

    if (!email) return;

    void loadMembershipInterest()
      .then((result) => {
        if (currentVersion !== version.current) return;
        setStatus(result);
      })
      .catch(() => {
        if (currentVersion !== version.current) return;

        setError(
          "Chưa kiểm tra được đăng ký của bạn. Hãy thử tải lại.",
        );
      })
      .finally(() => {
        if (currentVersion === version.current) {
          setLoading(false);
        }
      });

    return () => {
      version.current += 1;
    };
  }, [email, reload]);

  const updateInterest = async () => {
    if (
      !email ||
      !status ||
      loading ||
      mutationLock.current
    ) {
      return;
    }

    const currentVersion = version.current;
    const wasRegistered = status.registered;

    mutationLock.current = true;
    setBusy(true);
    setError("");
    setMessage("");

    try {
      if (wasRegistered) {
        await removeMembershipInterest();

        if (currentVersion !== version.current) return;

        setStatus({
          ...status,
          registered: false,
          registeredAt: null,
        });

        setMessage("Đã hủy đăng ký quan tâm.");
      } else {
        const result = await registerMembershipInterest();

        if (currentVersion !== version.current) return;

        setStatus({
          registered: true,
          email: result.email,
          registeredAt: result.registeredAt,
        });

        setMessage(
          "Đã ghi nhận đăng ký quan tâm. Bạn chưa mua hoặc kích hoạt hội viên.",
        );

        trackProductEvent("membership_interest_registered");
      }
    } catch {
      if (currentVersion !== version.current) return;

      setError(
        "Máy chủ chưa xác nhận thao tác. Hãy tải lại trạng thái trước khi thử tiếp.",
      );

      // Không tiếp tục thao tác dựa trên trạng thái có thể đã cũ.
      setStatus(null);
    } finally {
      mutationLock.current = false;

      if (currentVersion === version.current) {
        setBusy(false);
      }
    }
  };

  return (
    <section
      className="pt-4 border-t border-line"
      aria-labelledby="membership-interest-title"
    >
      <h3
        id="membership-interest-title"
        className="font-semibold text-ink"
      >
        Quan tâm gói hội viên?
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted">
        Đăng ký để nhóm ghi nhận nhu cầu bằng email tài khoản
        của bạn. Đây không phải giao dịch mua hàng và không
        kích hoạt hội viên.
      </p>

      {!email ? (
        <Button
          type="button"
          className="mt-4"
          onClick={onLogin}
        >
          Đăng nhập để đăng ký quan tâm
        </Button>
      ) : loading ? (
        <p role="status" className="mt-4 text-sm text-muted">
          Đang kiểm tra đăng ký…
        </p>
      ) : status ? (
        <div className="mt-4 space-y-3">
          <p className="break-words text-sm text-ink">
            Email tài khoản: {status.email}
          </p>

          <p className="text-sm text-muted">
            {status.registered
              ? "Bạn đã đăng ký quan tâm."
              : "Bạn chưa đăng ký quan tâm."}
          </p>

          <Button
            type="button"
            variant={status.registered ? "outline" : "default"}
            disabled={busy}
            onClick={() => void updateInterest()}
          >
            {busy
              ? "Đang xử lý…"
              : status.registered
                ? "Hủy đăng ký quan tâm"
                : "Đăng ký quan tâm"}
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          disabled={busy}
          onClick={() => setReload((value) => value + 1)}
        >
          Tải lại trạng thái
        </Button>
      )}

      {message && (
        <p role="status" className="mt-3 text-sm text-muted">
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      )}
    </section>
  );
}
