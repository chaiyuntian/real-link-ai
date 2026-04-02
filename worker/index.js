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
  const assetRequest = buildAssetRequest(request, url, tempoEntryPath(url));
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
      response = await env.ASSETS.fetch(buildAssetRequest(request, url, fallback.pathname));
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

function tempoEntryPath(url) {
  if (!isTempoHost(url)) return url.pathname;
  if (url.pathname === "/") return "/tempo/index.html";
  return tempoPathFor(url);
}

function tempoFallbackRoot(url) {
  return isTempoHost(url) ? "/tempo/index.html" : "/index.html";
}

function buildAssetRequest(request, url, pathname) {
  if (!isTempoHost(url) && pathname === url.pathname) return request;
  const rewritten = new URL(request.url);
  rewritten.pathname = pathname;
  return new Request(rewritten.toString(), request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (isTempoHost(url) && url.pathname === "/") {
      return Response.redirect(new URL("/tempo/", url), 302);
    }
    return serveAsset(request, env);
  }
};
