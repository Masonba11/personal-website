import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#090909",
          color: "#F6F6F4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
        }}
      >
        <div style={{ color: "#D6AD60", fontSize: 28, letterSpacing: 6 }}>MBALL MARKETING</div>
        <div style={{ fontSize: 68, lineHeight: 1.05, maxWidth: 920 }}>
          I&apos;ve built the businesses. I&apos;ve run the ads.
        </div>
        <div style={{ color: "#A3A3A3", fontSize: 28 }}>Home-service lead generation · masonball.com</div>
      </div>
    ),
    size,
  );
}
