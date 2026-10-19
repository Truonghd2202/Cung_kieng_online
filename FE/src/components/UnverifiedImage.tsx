import React, { useEffect, useState } from "react";
import { Maximize2 } from "lucide-react";
import { ImageLightboxModal, LightboxImageInfo } from "./ImageLightboxModal";
import { findApprovedImage } from "../lib/approvedImage";

export interface UnverifiedImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  fetchPriority?: "high" | "low" | "auto";
  loading?: "eager" | "lazy";
  decoding?: "async" | "sync" | "auto";
  allowExpand?: boolean;
  title?: string;
  description?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

/**
 * Hiển thị ảnh có hồ sơ duyệt khớp chính xác đường dẫn.
 * Ảnh thiếu hồ sơ hoặc tải lỗi dùng bố cục không ảnh.
 */
export function UnverifiedImage({
  src,
  alt = "",
  className = "",
  style,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  allowExpand = false,
  title,
  description,
  onClick,
}: UnverifiedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const approvedImage = findApprovedImage(src);

  useEffect(() => {
    setHasError(false);
    setIsModalOpen(false);
  }, [src]);

  if (!src || hasError || !approvedImage) {
    return (
      <div
        className={`unverified-image ${className}`}
        style={style}
        role={alt ? "img" : undefined}
        aria-label={alt || "Hình ảnh minh họa"}
        aria-hidden={alt ? undefined : true}
      >
        {alt && <span>{alt}</span>}
      </div>
    );
  }

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (allowExpand) {
      e.stopPropagation();
      setIsModalOpen(true);
    }
  };

  const imageInfo: LightboxImageInfo = {
    src,
    alt,
    title: title || alt,
    description,
  };

  if (!allowExpand) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onError={() => setHasError(true)}
        onClick={onClick}
      />
    );
  }

  return (
    <>
      <div
        className="relative inline-block w-full h-full"
        onClick={handleImageClick}
      >
        <img
          src={src}
          alt={alt}
          className={className}
          style={style}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          onError={() => setHasError(true)}
        />
      </div>

      {isModalOpen && (
        <ImageLightboxModal
          image={imageInfo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
