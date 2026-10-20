import { ImageResponse } from "next/og";

export const alt = "Daniela Prado, ingeniera en sistemas computacionales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1c1519",
          color: "#f6efe9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 72, height: 8, background: "#e7b0bf" }} />
          <div
            style={{
              color: "#e7b0bf",
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Sistemas
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 0.9, letterSpacing: "-0.04em" }}>
            Daniela Prado
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#d4c6c2" }}>
            Ingeniera en Sistemas Computacionales
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 22, color: "#e7b0bf" }}>
          <span>React</span>
          <span style={{ color: "#6d5c60" }}>/</span>
          <span>Next.js</span>
          <span style={{ color: "#6d5c60" }}>/</span>
          <span>Node.js</span>
          <span style={{ color: "#6d5c60" }}>/</span>
          <span>SQL Server</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
