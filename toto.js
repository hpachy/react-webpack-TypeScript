import*as _ from"lodash";import{cube}from"./math";function component(){const e=document.createElement("pre");return e.innerHTML=["Hello webpack!","5 cubed is equal to "+cube(5)].join("\n\n"),e}"production"!==process.env.NODE_ENV&&console.log("Looks like we are in development mode!"),document.body.appendChild(component());
