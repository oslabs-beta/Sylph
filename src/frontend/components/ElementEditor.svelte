<script lang="ts">
  import { DivElement, ImageElement } from "../classes/HTMLElements";
  import MenuTextField from "./MenuTextField.svelte";
  import {nodeStore as nodes, globalStyles}  from '../stores/store'
 

  globalThis.api.project.receive('overwritten', (state)=>{
    
  })
    const updateCode=(node, globalStyles)=>{
<<<<<<< HEAD
=======

>>>>>>> 8da631f0df2b67385031feb23260da60e345bc18
      
      const newData = 
        `<script>
          export let name;
        ${'<'}/script>

        <main>
        ${toString(node)}
        </main>

        ${'<'}style>
        ${styleToString(node, globalStyles)}
        ${'<'}/style>`;
      globalThis.api.project.send('writeOver', {path: 'src/App.svelte', data: newData});
      globalThis.api.project.send('read', {path: 'src/App.svelte'});
  
    }

    const toString = (node, lvl=1)=> {
		return `<${node.name}${node.attributes ? Object.entries(node?.attributes)
			.map(([key, value]) => key==='innerText'? '':` ${key}=${`"${value}"`}`)
      .join(' '):''}>
			${
				node.hasOwnProperty('items') // check if the node element is self closing tag
					? `${node.attributes?.innerText? node.attributes.innerText : ' '}\n${'\t'.repeat(lvl)}` +
					  node.items.map((child) => toString(child, lvl+1)).join('') +
					  `</${node.name}>`
					: `/>`
			}
		`;
  }; //end of toString

  const idStylesToString = (node)=>{
    return `${node.items.filter(child=>child.attributes.id && Object.entries(child.styles).length).map(child=>`#${child.attributes.id} {\n\t${Object.entries(child.styles).map(([key,value])=> `${key}: ${value}`).join(';\n\t')}\n  }`).join('\n\n')}\n\n${node.items.map(child=>idStylesToString(child)).join('')}`;
  }

  const styleToString = (node, globalStyles) => {
	return `
    ${Object.entries(globalStyles.elementStyles)
    .filter(child=>Object.keys(child[1]).length)
    .map(([element, styles])=>`${element} { 
      ${Object.entries(styles)
        .map(([styleAttribute, attributeValue])=>`${styleAttribute}: ${attributeValue};`)
        .join('')}
    }`)
    .join('')}
    ${Object.entries(globalStyles.classStyles).map(([className, styles])=> `.${className} {${Object.entries(styles).map(([styleAttribute, attributeValue])=>`${styleAttribute}: ${attributeValue};`).join('')}}`).join('')}
    ${idStylesToString(node)}
   `
  
}; 


<<<<<<< HEAD
=======

>>>>>>> 8da631f0df2b67385031feb23260da60e345bc18
</script>

<!-- //loop through element.attributes to populate the editor input fields and 
svelte bind value to input, set to come state/store obj? -->

<!-- <div class="content"> -->
<div class="update-code">
  <!-- <h3>active node</h3>
    {JSON.stringify($activeNode)}
    <h3>node tree</h3>
    {JSON.stringify($nodes)}
    <br />
    <h3>toString </h3> -->
  {updateCode($nodes.node1, $globalStyles)}
</div>
<MenuTextField />

<<<<<<< HEAD
=======

>>>>>>> 8da631f0df2b67385031feb23260da60e345bc18
<!-- </div> -->
<style>
  .update-code {
    display: none;
  }
</style>
