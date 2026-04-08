import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { secret, slug } = body;

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    revalidateTag("blogs");

    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    revalidatePath("/blog");
    revalidatePath("/rss.xml");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
