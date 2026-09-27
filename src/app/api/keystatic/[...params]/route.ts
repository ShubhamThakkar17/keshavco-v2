import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { cmsConnected } from "@/lib/cmsConnected";

/**
 * Keystatic's GitHub sign-in and save endpoints (docs/cms/README.md). Until
 * the GitHub App is connected the handler is not created, so a deployment
 * without those variables still builds.
 */
const handler = cmsConnected() ? makeRouteHandler({ config }) : null;
const notConnected = () => Response.json({ error: "The editor is not connected yet." }, { status: 503 });

export async function GET(request: Request) {
  return handler ? handler.GET(request) : notConnected();
}

export async function POST(request: Request) {
  return handler ? handler.POST(request) : notConnected();
}
