// This module does not choose recipients. The server must enforce the approved
// school addresses and validate every field and uploaded file independently.
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const FILE_TYPES: Record<string, string[]> = {
  pdf: ["application/pdf"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
};

type Submission = {
  endpoint: string;
  kind?: "application" | "contact";
  pageUrl: string;
  values: Record<string, string | boolean | undefined>;
  files: Record<string, File | undefined>;
};

export async function submitApplication(
  submission: Submission,
  send: typeof fetch = fetch,
): Promise<void> {
  if (!submission.endpoint) {
    throw new Error("Online form delivery is not available yet. Please contact the school. Your entries have not been cleared.");
  }
  const page = new URL(submission.pageUrl);
  const endpoint = new URL(submission.endpoint, page);
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(page.hostname);
  if (endpoint.origin !== page.origin || (!local && endpoint.protocol !== "https:")) {
    throw new Error("Secure application delivery is not available. Your entries have not been cleared.");
  }
  const body = new FormData();
  body.append("kind", submission.kind || "application");
  body.append("website", "");
  for (const [key, value] of Object.entries(submission.values)) {
    if (value !== undefined) body.append(key, String(value));
  }
  for (const [key, file] of Object.entries(submission.files)) {
    if (!file) continue;
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!FILE_TYPES[extension]?.includes(file.type) || file.size === 0 || file.size > MAX_FILE_SIZE) {
      throw new Error("Each document must be a non-empty PDF, JPG or PNG, no larger than 5MB. Your entries have not been cleared.");
    }
    body.append(key, file);
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const challenge = await send(endpoint.href, { method: "GET", credentials: "same-origin", signal: controller.signal, cache: "no-store" });
    const session = await challenge.json().catch(() => null);
    if (!challenge.ok || typeof session?.token !== "string" || !/^[a-f0-9]{64}$/.test(session.token)) {
      throw new Error("Secure form delivery is not available. Your entries have not been cleared.");
    }
    const response = await send(endpoint.href, {
      headers: { "X-CSRF-Token": session.token },
      method: "POST", body, signal: controller.signal, credentials: "same-origin",
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.accepted !== true) {
      throw new Error("The school has not accepted this submission for delivery. Your entries have not been cleared. Please try again later.");
    }
  } catch (error) {
    if (error instanceof TypeError || (error instanceof Error && error.name === "AbortError")) {
      throw new Error("We could not confirm delivery. Your entries have not been cleared. Please contact the school before resubmitting to avoid a duplicate.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
