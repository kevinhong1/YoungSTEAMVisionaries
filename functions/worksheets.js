export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;
  const idMatch = url.pathname.match(/\/api\/worksheets\/?(\d+)?$/);
  const id = idMatch && idMatch[1];

  const sendJSON = (obj, status = 200) =>
    new Response(JSON.stringify(obj), {
      status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  // Helper to load & save the worksheet list stored under a single key
  const LIST_KEY = "worksheets_list";
  const loadList = async () => {
    const raw = await env.WORKSHEETS.get(LIST_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const saveList = async (list) => {
    await env.WORKSHEETS.put(LIST_KEY, JSON.stringify(list));
  };

  if (method === "OPTIONS") {
    return new Response("", {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (method === "GET") {
    const list = await loadList();
    if (id) {
      const item = list.find((w) => String(w.id) === id);
      return item ? sendJSON(item) : sendJSON({ error: "Not found" }, 404);
    }
    return sendJSON(list);
  }

  if (method === "POST") {
    const data = await request.json();
    if (!data) return sendJSON({ error: "Bad JSON" }, 400);

    // Simple id if not provided
    data.id = data.id || Date.now();

    const list = await loadList();
    list.push(data);
    await saveList(list);

    return sendJSON(data, 201);
  }

  if (method === "DELETE" && id) {
    const list = await loadList();
    const newList = list.filter((w) => String(w.id) !== id);
    if (newList.length === list.length)
      return sendJSON({ error: "Not found" }, 404);
    await saveList(newList);
    return sendJSON({ success: true });
  }

  return sendJSON({ error: "Method Not Allowed" }, 405);
}
