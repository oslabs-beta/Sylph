<!-- //loop through element.attributes to populate the editor input fields and 
svelte bind value to input, set to come state/store obj? -->
<!-- tabs for different types of attributes -->

<script>
import { DivElement, ImageElement } from "../classes/HTMLElements.ts";
import MenuTextField from "./MenuTextField.svelte";
import {nodeStore as nodes, activeNode}  from '../stores/store'
console.log('OBJECT ENTRIES NODES ', Object.entries($nodes))
    const testDiv = new DivElement
    const testImage = new ImageElement
    console.log('TESTDIV', testDiv)

    const toString = (node)=> {
		return `<${node.name} ${node.attributes ? Object.entries(node?.attributes)
			.map(([key, value]) => `${key}=${`"${value}"`}`)
			.join(' '): ''}
			${
				node.hasOwnProperty('items') // check if the node element is self closing tag
					? '>\n\t' +
					  node.items.map((child) => toString(child)).join('\n') +
					  `</${node.name}>`
					: '/>'
			}
		`;
  }

    </script>
    
    <style>
      .content {
        display: grid;
        /* grid-template-columns: 40% 60%; */
        width: 90%;
        height: 100%;
        justify-content: center;
      }




    </style>
    
    <!-- bind:value={}  -->
   
    <!-- <CollapseMenu entry ={attPair}/> -->
    <div class = 'content'>
      <div>
        <h3>active node</h3>
      {JSON.stringify($activeNode)}
        <!-- <h3>node 1 HTML</h3>
        { JSON.stringify($nodes.node1)} -->
        <h3>node tree</h3>
        { JSON.stringify($nodes)}
<br>
        <h3>toString </h3>
        {toString($nodes.node1)}
      

</div>   
    <MenuTextField /> 
</div>
      
     
   