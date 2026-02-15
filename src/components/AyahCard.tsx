"use client";

import { AyahData } from "@/lib/quran-data";
import { CardStyle } from "@/lib/card-styles";

interface AyahCardProps {
  ayah: AyahData;
  style: CardStyle;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  size?: "preview" | "export";
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
        aspectRatio: isExport ? undefined : undefined,
      }}
    >
      {/* Geometric corner ornaments */}
      <div style={{
        position: "absolute",
        top: isExport ? "30px" : "1rem",
        left: isExport ? "30px" : "1rem",
        width: isExport ? "60px" : "2.5rem",
        height: isExport ? "60px" : "2.5rem",
        borderTop: `2px solid ${style.ornamentColor || style.arabicColor}30`,
        borderLeft: `2px solid ${style.ornamentColor || style.arabicColor}30`,
        borderRadius: "2px",
      }} />
      <div style={{
        position: "absolute",
        top: isExport ? "30px" : "1rem",
        right: isExport ? "30px" : "1rem",
        width: isExport ? "60px" : "2.5rem",
        height: isExport ? "60px" : "2.5rem",
        borderTop: `2px solid ${style.ornamentColor || style.arabicColor}30`,
        borderRight: `2px solid ${style.ornamentColor || style.arabicColor}30`,
        borderRadius: "2px",
      }} />
      <div style={{
        position: "absolute",
        bottom: isExport ? "30px" : "1rem",
        left: isExport ? "30px" : "1rem",
        width: isExport ? "60px" : "2.5rem",
        height: isExport ? "60px" : "2.5rem",
        borderBottom: `2px solid ${style.ornamentColor || style.arabicColor}30`,
        borderLeft: `2px solid ${style.ornamentColor || style.arabicColor}30`,
        borderRadius: "2px",
      }} />
      <div style={{
        position: "absolute",
        bottom: isExport ? "30px" : "1rem",
        right: isExport ? "30px" : "1rem",
        width: isExport ? "60px" : "2.5rem",
        height: isExport ? "60px" : "2.5rem",
        borderBottom: `2px solid ${style.ornamentColor || style.arabicColor}30`,
        borderRight: `2px solid ${style.ornamentColor || style.arabicColor}30`,
        borderRadius: "2px",
      }} />

      {/* Bismillah ornament */}
      <div style={{
        color: style.ornamentColor || style.arabicColor,
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
        background: `${style.ornamentColor || style.arabicColor}40`,
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
