import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const surahNum = searchParams.get("s");
  const ayahNum = searchParams.get("a");
  const surahName = searchParams.get("name") || "";
  const translation = searchParams.get("t") || "";
  const arabic = searchParams.get("ar") || "";

  // Default OG image when no specific ayah
  if (!surahNum || !ayahNum) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
            padding: "60px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              color: "#C9A84C",
              marginBottom: "16px",
              display: "flex",
            }}
          >
            ﷽
          </div>
          <div
            style={{
              fontSize: "64px",
              color: "#FFFFFF",
              fontWeight: 700,
              marginBottom: "16px",
              display: "flex",
            }}
          >
            AyahDrop
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#C9A84C",
              marginBottom: "40px",
              display: "flex",
            }}
          >
            Beautiful Quran Verse Cards for Social Media
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#8B8B8B",
              display: "flex",
            }}
          >
            114 Surahs · 8 Styles · Instant PNG Download
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // Dynamic OG image for a specific ayah
  const displayTranslation =
    translation.length > 200 ? translation.substring(0, 197) + "..." : translation;
  const displayArabic =
    arabic.length > 150 ? arabic.substring(0, 147) + "..." : arabic;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Corner ornaments */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            width: "50px",
            height: "50px",
            borderTop: "2px solid rgba(201,168,76,0.3)",
            borderLeft: "2px solid rgba(201,168,76,0.3)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: "30px",
            width: "50px",
            height: "50px",
            borderTop: "2px solid rgba(201,168,76,0.3)",
            borderRight: "2px solid rgba(201,168,76,0.3)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "30px",
            width: "50px",
            height: "50px",
            borderBottom: "2px solid rgba(201,168,76,0.3)",
            borderLeft: "2px solid rgba(201,168,76,0.3)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "30px",
            width: "50px",
            height: "50px",
            borderBottom: "2px solid rgba(201,168,76,0.3)",
            borderRight: "2px solid rgba(201,168,76,0.3)",
            display: "flex",
          }}
        />

        {/* Bismillah */}
        <div
          style={{
            color: "#C9A84C",
            fontSize: "28px",
            marginBottom: "24px",
            opacity: 0.6,
            display: "flex",
          }}
        >
          ﷽
        </div>

        {/* Arabic text */}
        {displayArabic && (
          <div
            style={{
              color: "#C9A84C",
              fontSize: displayArabic.length > 100 ? "24px" : "32px",
              textAlign: "center",
              lineHeight: 2,
              marginBottom: "24px",
              maxWidth: "90%",
              direction: "rtl",
              display: "flex",
            }}
          >
            {displayArabic}
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            width: "100px",
            height: "1px",
            background: "rgba(201,168,76,0.4)",
            marginBottom: "24px",
            display: "flex",
          }}
        />

        {/* Translation */}
        {displayTranslation && (
          <div
            style={{
              color: "#E8E8E8",
              fontSize: displayTranslation.length > 120 ? "20px" : "24px",
              textAlign: "center",
              lineHeight: 1.6,
              maxWidth: "85%",
              fontStyle: "italic",
              marginBottom: "32px",
              display: "flex",
            }}
          >
            &ldquo;{displayTranslation}&rdquo;
          </div>
        )}

        {/* Reference */}
        <div
          style={{
            color: "#8B8B8B",
            fontSize: "18px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {surahName ? `Surah ${surahName} (${surahNum}:${ayahNum})` : `Surah ${surahNum}:${ayahNum}`}
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "20px",
            color: "rgba(139,139,139,0.6)",
            fontSize: "14px",
            display: "flex",
          }}
        >
          ayahdrop.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
