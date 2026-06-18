import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 0,
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 13,
              fontWeight: 800,
              fontFamily: "sans-serif",
              letterSpacing: "-0.5px",
              lineHeight: 1,
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            DS
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 3,
            left: 4,
            right: 4,
            height: 2,
            borderRadius: 1,
            background: "rgba(255,255,255,0.4)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
