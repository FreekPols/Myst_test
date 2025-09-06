// Export a MyST plugin module
export default {
  name: "myst-thebe-lite",

  // 1) Inject CSS/JS into every page
  assets: [
    { url: "/_static/thebe.css", kind: "css" },
    { url: "/_static/thebe.min.js", kind: "script" },
    { url: "/_static/thebe-lite.min.js", kind: "script", defer: true }
  ],

  // 2) Inject a <script type="text/x-thebe-config"> and a bootstrapper
  head: [
    {
      tag: "script",
      attrs: { type: "text/x-thebe-config" },
      // Keep this stringified JSON small; you can parameterize via plugin options if needed
      children: JSON.stringify({
        selector: "pre[data-executable]",
        selector_input: "pre",
        selector_output: ".cell_output",
        kernelOptions: { name: "pyodide" }
      })
    }
  ],
  scripts: [
    {
      tag: "script",
      children: `
        if (document.readyState !== 'loading') bootstrapThebe();
        else document.addEventListener('DOMContentLoaded', bootstrapThebe);
        async function bootstrapThebe() { try { await thebelab.bootstrap(); } catch(e){ console.error(e); } }
      `
    }
  ],

  // 3) Optionally transform rendered code blocks to opt-in to execution/editing
  //    Here we add data-executable to Python code blocks by default.
  transform: {
    page: async (page) => {
      const cheerio = await import("cheerio"); // MyST provides Node; bundlers may inline this
      const $ = cheerio.load(page.html, null, false);
      $("pre code.language-python").each((_, el) => {
        const pre = $(el).parent("pre");
        pre.attr("data-executable", "true");
        pre.attr("data-language", "python");
        // You can also wrap an output container if you like:
        if (!pre.next().hasClass("cell_output")) {
          pre.after('<div class="cell_output"></div>');
        }
      });
      page.html = $.html();
      return page;
    }
  }
};
