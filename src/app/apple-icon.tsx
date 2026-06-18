import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 40,
            background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 76,
              fontWeight: 900,
              fontFamily: "sans-serif",
              letterSpacing: "-3px",
              lineHeight: 1,
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            DS
          </span>
          <div
            style={{
              width: 80,
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.5)",
              marginTop: 8,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
