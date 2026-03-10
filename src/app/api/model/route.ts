import { NextResponse } from "next/server";

const MODEL_URL =
  "https://github.com/Levonmov1/Levon-portfolio-website/releases/download/v1.0/jrterrier_fbx.glb";

export async function GET() {
  const res = await fetch(MODEL_URL);

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch model" }, { status: 502 });
  }

  const data = await res.arrayBuffer();

  return new NextResponse(data, {
    headers: {
      "Content-Type": "model/gltf-binary",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
