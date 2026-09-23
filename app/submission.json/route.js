import submission from "../../submission.json";
export async function GET() {
  return Response.json(submission, { headers: { "Cache-Control": "public, max-age=0, must-revalidate" } });
}
