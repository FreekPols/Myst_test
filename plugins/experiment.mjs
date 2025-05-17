/* Custom experiment admonition, based on documentation (see https://next.jupyterbook.org/plugins/directives-and-roles#create-a-custom-admonition). 
*   css file (custom.css) included in style folder. 
*/

const experiment = {
  name: "experiment",
  doc: "A custom admonition that uses a specific color.",
  arg: { type: String, doc: "The title of the admonition." },
  options: {
    collapsed: { type: Boolean, doc: "Whether to collapse the admonition." },
  },
  body: { type: String, doc: "The body of the directive." },
  run(data, vfile, ctx) {
    
    let title = data.arg.trim();
    let body = data.body.trim();

    const admonition = {
        "type": "admonition",
        "kind": "error",
        "class": "admonition-experiment",  //Add class (custom.css)
        "icon": false,
        "children": [
          
          {
            "type": "admonitionTitle",
            "class": "admonition-title-experiment", // This does not work! note to self: not all dirs take their classes to the output. 
            // The first ["children"][0] removes the MyST "tree" top-level node.
            // The second ["children"] removes an unnecessary top-level paragraph node.
            "children": ctx.parseMyst(`${title}`)["children"][0]["children"]
            
          },
          
          {
            "type": "paragraph",
            "children": ctx.parseMyst(body)["children"][0]["children"]
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

