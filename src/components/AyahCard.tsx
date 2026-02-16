"use client";

import { AyahData } from "@/lib/quran-data";
import { CardStyle } from "@/lib/card-styles";

interface AyahCardProps {
  ayah: AyahData;
  style: CardStyle;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  size?: "preview" | "export";
}

function CornersOrnament({ color, isExport }: { color: string; isExport: boolean }) {
  const size = isExport ? "60px" : "2.5rem";
  const offset = isExport ? "30px" : "1rem";
  const borderWidth = "2px";
  const borderColor = `${color}30`;

  return (
    <>
      <div style={{ position: "absolute", top: offset, left: offset, width: size, height: size, borderTop: `${borderWidth} solid ${borderColor}`, borderLeft: `${borderWidth} solid ${borderColor}`, borderRadius: "2px" }} />
      <div style={{ position: "absolute", top: offset, right: offset, width: size, height: size, borderTop: `${borderWidth} solid ${borderColor}`, borderRight: `${borderWidth} solid ${borderColor}`, borderRadius: "2px" }} />
      <div style={{ position: "absolute", bottom: offset, left: offset, width: size, height: size, borderBottom: `${borderWidth} solid ${borderColor}`, borderLeft: `${borderWidth} solid ${borderColor}`, borderRadius: "2px" }} />
      <div style={{ position: "absolute", bottom: offset, right: offset, width: size, height: size, borderBottom: `${borderWidth} solid ${borderColor}`, borderRight: `${borderWidth} solid ${borderColor}`, borderRadius: "2px" }} />
    </>
  );
}

function FrameOrnament({ color, isExport }: { color: string; isExport: boolean }) {
  const inset = isExport ? "24px" : "0.875rem";
  const borderColor = `${color}25`;

  return (
    <div style={{
      position: "absolute",
      top: inset,
      left: inset,
      right: inset,
      bottom: inset,
      border: `1px solid ${borderColor}`,
      borderRadius: isExport ? "16px" : "0.75rem",
      pointerEvents: "none",
    }}>
      {/* Inner double frame */}
      <div style={{
        position: "absolute",
        top: isExport ? "8px" : "0.375rem",
        left: isExport ? "8px" : "0.375rem",
        right: isExport ? "8px" : "0.375rem",
        bottom: isExport ? "8px" : "0.375rem",
        border: `1px solid ${borderColor}`,
        borderRadius: isExport ? "12px" : "0.5rem",
      }} />
    </div>
  );
}

function ArchOrnament({ color, isExport }: { color: string; isExport: boolean }) {
  const archColor = `${color}20`;
  const archWidth = isExport ? "200px" : "8rem";
  const archHeight = isExport ? "100px" : "4rem";

  return (
    <>
      {/* Top arch */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: archWidth,
        height: archHeight,
        borderBottom: `2px solid ${archColor}`,
        borderLeft: `2px solid ${archColor}`,
        borderRight: `2px solid ${archColor}`,
        borderRadius: `0 0 ${archWidth} ${archWidth}`,
        pointerEvents: "none",
      }} />
      {/* Bottom arch (inverted) */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: archWidth,
        height: archHeight,
        borderTop: `2px solid ${archColor}`,
        borderLeft: `2px solid ${archColor}`,
        borderRight: `2px solid ${archColor}`,
        borderRadius: `${archWidth} ${archWidth} 0 0`,
        pointerEvents: "none",
      }} />
    </>
  );
}

function MinimalOrnament({ color, isExport }: { color: string; isExport: boolean }) {
  const lineWidth = isExport ? "80px" : "3rem";
  const lineColor = `${color}30`;
  const offset = isExport ? "40px" : "1.5rem";

  return (
    <>
      {/* Top center line */}
      <div style={{
        position: "absolute",
        top: offset,
        left: "50%",
        transform: "translateX(-50%)",
        width: lineWidth,
        height: "1px",
        background: lineColor,
      }} />
      {/* Bottom center line */}
      <div style={{
        position: "absolute",
        bottom: offset,
        left: "50%",
        transform: "translateX(-50%)",
        width: lineWidth,
        height: "1px",
        background: lineColor,
      }} />
    </>
  );
}

export default function AyahCard({ ayah, style, cardRef, size = "preview" }: AyahCardProps) {
  const isExport = size === "export";
  const isLongText = ayah.arabic.length > 200;
  const width = isExport ? 1080 : "100%";
  const height = isExport ? 1080 : "auto";
  const padding = isExport ? "60px" : "2rem";
  const arabicFontSize = isExport 
    ? (isLongText ? "30px" : "42px") 
    : (isLongText ? "1.3rem" : style.arabicSize);
  const translationFontSize = isExport 
    ? (isLongText ? "18px" : "22px") 
    : (isLongText ? "0.85rem" : style.translationSize);
  const referenceFontSize = isExport ? "16px" : "0.8rem";
  const ornamentSize = isExport ? "32px" : "1.25rem";
  const brandSize = isExport ? "14px" : "0.7rem";
  const ornamentColor = style.ornamentColor || style.arabicColor;
  const ornamentStyle = style.ornamentStyle || "corners";

  return (
    <div
      ref={cardRef}
      className="card-export"
      style={{
        width,
        height: isExport ? height : undefined,
        minHeight: isExport ? undefined : "450px",
        background: style.bgGradient,
        padding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius: isExport ? 0 : "1rem",
      }}
    >
      {/* Ornament layer */}
      {ornamentStyle === "corners" && <CornersOrnament color={ornamentColor} isExport={isExport} />}
      {ornamentStyle === "frame" && <FrameOrnament color={ornamentColor} isExport={isExport} />}
      {ornamentStyle === "arch" && <ArchOrnament color={ornamentColor} isExport={isExport} />}
      {ornamentStyle === "minimal" && <MinimalOrnament color={ornamentColor} isExport={isExport} />}

      {/* Bismillah ornament */}
      <div style={{
        color: ornamentColor,
        fontSize: ornamentSize,
        marginBottom: isExport ? "32px" : "1.25rem",
        opacity: 0.6,
        letterSpacing: "0.5em",
      }}>
        ﷽
      </div>

      {/* Arabic text */}
      <div
        className="arabic-text"
        style={{
          color: style.arabicColor,
          fontSize: arabicFontSize,
          textAlign: "center",
          lineHeight: 2.2,
          marginBottom: isExport ? "36px" : "1.5rem",
          maxWidth: "90%",
          fontFamily: "'Amiri', 'Traditional Arabic', serif",
          direction: "rtl",
        }}
      >
        {ayah.arabic}
      </div>

      {/* Divider line */}
      <div style={{
        width: isExport ? "120px" : "4rem",
        height: "1px",
        background: `${ornamentColor}40`,
        marginBottom: isExport ? "28px" : "1.25rem",
      }} />

      {/* Translation */}
      <div style={{
        color: style.translationColor,
        fontSize: translationFontSize,
        textAlign: "center",
        lineHeight: 1.8,
        maxWidth: "85%",
        fontFamily: "'Playfair Display', 'Georgia', serif",
        fontStyle: "italic",
        marginBottom: isExport ? "36px" : "1.5rem",
      }}>
        &ldquo;{ayah.translation}&rdquo;
      </div>

      {/* Reference */}
      <div style={{
        color: style.referenceColor,
        fontSize: referenceFontSize,
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontWeight: 500,
      }}>
        {ayah.reference}
      </div>

      {/* Brand watermark */}
      <div style={{
        position: "absolute",
        bottom: isExport ? "14px" : "0.5rem",
        right: isExport ? "20px" : "0.75rem",
        color: `${style.referenceColor}60`,
        fontSize: brandSize,
        fontFamily: "'Inter', sans-serif",
        letterSpacing: "0.05em",
      }}>
        ayahdrop.com
      </div>
    </div>
  );
}
