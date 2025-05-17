
const experiment = {
  name: "experiment",
  doc: "A custom admonition that uses a specific color.",
  arg: { type: String, doc: "The title of the admonition." },
  options: {
    collapsed: { type: Boolean, doc: "Whether to collapse the admonition." },
  },
  body: { type: String, doc: "The body of the directive." },
  run(data, vfile, ctx) {
      const admonition = {
        "type": "admonition",
        "kind": "error",
        "icon": false,
        "children": [
          // { 
          //   "type": "text",
          //   "value": "🧪",    
          // },

          {
            "type": "admonitionTitle",
            
            // The first ["children"][0] removes the MyST "tree" top-level node.
            // The second ["children"] removes an unnecessary top-level paragraph node.
            "children": ctx.parseMyst(`🧪 ${data.arg.trim()}`)["children"][0]["children"]
            
          },
          
          {
            "type": "paragraph",
            "children": ctx.parseMyst(data.body.trim())["children"][0]["children"]
          }
        ]
    }
    return [admonition];
  }
};

const plugin = {
  name: "experiment",
  directives: [experiment],
};



export default plugin;

