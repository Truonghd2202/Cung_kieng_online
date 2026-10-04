import React from "react";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "./ui/button";

interface DetailNotFoundProps {
  title: string;
  backLabel: string;
  onBack: () => void;
}

export const DetailNotFound: React.FC<DetailNotFoundProps> = ({
  title,
  backLabel,
  onBack,
}) => {
  return (
    <div className="screen-shell">
      <main className="page-container max-w-2xl">
        <section className="rounded-card border border-line bg-surface p-6 sm:p-10 text-center">
          <SearchX
            aria-hidden="true"
            className="mx-auto mb-5 h-10 w-10 text-muted"
          />

          <h1 className="page-title mb-3">{title}</h1>

          <p className="text-base text-muted leading-relaxed mb-6">
            Nội dung này chưa có trong bản hiện tại.
            Bạn hãy quay lại danh sách để chọn nội dung khác.
          </p>

          <Button
            type="button"
            onClick={onBack}
            className="min-h-11 w-full sm:w-auto gap-2"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {backLabel}
          </Button>
        </section>
      </main>
    </div>
  );
};
