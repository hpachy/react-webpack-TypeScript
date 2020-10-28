import * as _ from 'lodash';
import { cube } from "./math";
import './styles.css';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

 function component() {
   const element = document.createElement('pre');

   element.innerHTML = [
     'Hello webpack!',
     '5 cubed is equal to ' + cube(5)
   ].join('\n\n');

   return element;
 }

 document.body.appendChild(component());


// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import * as React from "react";
// import { render } from "react-dom";
// import App from "./App";

// const root = document.createElement("div");
// document.body.appendChild(root);

// render(<App />, root);
