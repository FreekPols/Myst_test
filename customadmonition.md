# Custom admonition

## Custom admonitions
It is possible to make [your own admonition](https://next.jupyterbook.org/plugins/directives-and-roles/#create-a-custom-admonition) and embed it through a [plugin](https://next.jupyterbook.org/tutorial/plugins/). The colors, icon and behaviour in dark/light mode can be specified through a customs css file. 

```{code} yml
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

    // console.log("[experiment plugin] ", data.arg, data.body);
    // console.log("[experiment plugin] ", ctx.parseMyst(body));
    // console.log("[experiment plugin] ", ctx.parseMyst(body)["children"]);
    // console.log("[experiment plugin] ", ctx.parseMyst(body)["children"][0]);



    const admonition = {
        "type": "admonition",
        "kind": "admonition",
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
            "children": ctx.parseMyst(body)["children"] 
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
```

```{code} css
/*Title color in dark mode*/
.dark aside.admonition-experiment .dark\:text-white {
   color: rgb(23 25 25); 
}

/* Parent */
aside.admonition-experiment {
  border-color: rgb(255, 0, 0) !important; /* Important zorgt ervoor dat we over de oude stijl heen schrijven */
  background-color: rgb(255, 255, 255); /* Change background color text part*/
} 

/* Title */
aside.admonition-experiment > div:first-child {
  background-color: rgb(251, 183, 183);  /* Change header background color */
}

/* Icon */
aside.admonition-experiment > div:first-child::before {
  content: "🧪";
  /* add padding left so it is not directly on the side*/
  padding-left: 0.2em;
  margin-left: 0.5em;
}

aside.admonition-experiment > div:first-child > div:first-child {
  background-color: rgb(251, 183, 183); /* changes header color of text part
  margin-left: 0 !important; /* voorkomt dubbele margin */
}

/* end of new code */

.admonition-experiment .admonition-title-experiment {
  background-color: black; /* Change header background color */
  color: #FFFFFF; /* Change header text color */
}

/* Custom icon using ::before pseudo-element */
.admonition-experiment .admonition-title-experiment::before {
  content: "🧪"; /* Use an emoji or */
  content: "\f0c3"; /* Use a FontAwesome icon code */
  font-family: "Font Awesome 5 Free"; /* If using FontAwesome */
  margin-right: 0.5em;
}

aside.admonition-experiment img {
display: block;
}

```



```{experiment} Make your own admonition
:class: dropdown

Using the description above, make your own custom admonition!
```
