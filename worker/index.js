const HTML_HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "public, max-age=60"
};

function withHeaders(response, headers) {
  const updated = new Headers(response.headers);
  Object.entries(headers).forEach(([key, value]) => updated.set(key, value));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: updated
  });
}

async function serveAsset(request, env) {
  let response = await env.ASSETS.fetch(request);
  if (response.status !== 404) {
    const pathname = new URL(request.url).pathname;
    if (pathname.endsWith(".html") || pathname === "/") {
      return withHeaders(response, HTML_HEADERS);
    }
    return response;
  }

  const url = new URL(request.url);
  if (!url.pathname.includes(".")) {
    const candidates = [
      new URL(`${url.pathname.replace(/\/?$/, "/")}index.html`, url),
      new URL("/index.html", url)
    ];

    for (const fallback of candidates) {
      response = await env.ASSETS.fetch(new Request(fallback.toString(), request));
      if (response.status !== 404) {
        return withHeaders(response, HTML_HEADERS);
      }
    }
  }

  return response;
}

export default {
  async fetch(request, env) {
    return serveAsset(request, env);
  }
};
