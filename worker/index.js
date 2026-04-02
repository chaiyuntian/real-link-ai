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
  const url = new URL(request.url);
  const assetRequest = rewriteTempoRequest(request, url);
  let response = await env.ASSETS.fetch(assetRequest);
  if (response.status !== 404) {
    const pathname = url.pathname;
    if (pathname.endsWith(".html") || pathname === "/") {
      return withHeaders(response, HTML_HEADERS);
    }
    return response;
  }

  if (!url.pathname.includes(".")) {
    const candidates = [
      new URL(`${tempoPathFor(url).replace(/\/?$/, "/")}index.html`, url),
      new URL(tempoFallbackRoot(url), url)
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

function isTempoHost(url) {
  return url.hostname === "tempo.real-link.ai";
}

function tempoPathFor(url) {
  if (!isTempoHost(url)) return url.pathname;
  if (url.pathname === "/") return "/tempo/";
  if (url.pathname.startsWith("/tempo/")) return url.pathname;
  return `/tempo${url.pathname}`;
}

function tempoFallbackRoot(url) {
  return isTempoHost(url) ? "/tempo/index.html" : "/index.html";
}

function rewriteTempoRequest(request, url) {
  if (!isTempoHost(url)) return request;
  const rewritten = new URL(request.url);
  rewritten.pathname = tempoPathFor(url);
  return new Request(rewritten.toString(), request);
}

export default {
  async fetch(request, env) {
    return serveAsset(request, env);
  }
};
