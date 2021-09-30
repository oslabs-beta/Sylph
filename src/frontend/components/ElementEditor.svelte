<!-- //loop through element.attributes to populate the editor input fields and 
svelte bind value to input, set to come state/store obj? -->
<!-- tabs for different types of attributes -->

<script lang="ts">
  import { DivElement, ImageElement } from "../classes/HTMLElements";
  import MenuTextField from "./MenuTextField.svelte";
  import {nodeStore as nodes, activeNode}  from '../stores/store'
  let readyToUpdate :Boolean =true;

  globalThis.api.project.receive('overwritten', (state)=>{
    console.log('overwritten')
    readyToUpdate=true;
  })
    const updateCode=(node)=>{
      
      const newData = 
`<script>
  export let name;
${'<'}/script>

<main>
${toString(node)}
</main>

<style>
${styleToString(node)}
</style>`;
  if(readyToUpdate){
    globalThis.api.project.send('writeOver', {path: 'src/App.svelte', data: newData});
    globalThis.api.project.send('read', {path: 'src/App.svelte'});
    // readyToUpdate = false;
  }
    }

    const toString = (node, lvl=1)=> {
		return `${'\t'.repeat(lvl)}<${node.name}${node.attributes ? Object.entries(node?.attributes)
			.map(([key, value]) => key==='innerText?'? '':` ${key}=${`"${value}"`}`)
      .join(' '):''}>
			${
				node.hasOwnProperty('items') // check if the node element is self closing tag
					? `${node.attributes?.innerText? node.attributes.innerText : ' '}\n${'\t'.repeat(lvl)}` +
					  node.items.map((child) => toString(child, lvl+1)).join('') +
					  `</${node.name}>`
					: `/>`
			}
		`;
  }//end of toString
  
  const styleToString = (node) => {
	return `${node.items.filter(child=>child.attributes.id && Object.entries(child.styles).length).map(child=>`#${child.attributes.id} {\n\t${Object.entries(child.styles).map(([key,value])=> `${key}: ${value}`).join(';\n\t')}\n  }`).join('\n\n')}\n\n${node.items.map(child=>styleToString(child)).join('')}`; //end of return
}; //end of styleToString


</script>

<style>
  .content {
    display: grid;
    width: 100%;
    height: 100%;
    justify-content: center;
  }

  .update-code {
    display: none;
  }
</style>

<!-- <div class="content"> -->
  <div class="update-code">
    <!-- <h3>active node</h3>
    {JSON.stringify($activeNode)}
    <h3>node tree</h3>
    {JSON.stringify($nodes)}
    <br />
    <h3>toString </h3> -->
    {updateCode($nodes.node1)} 
  </div>   
  <MenuTextField /> 
<!-- </div> -->
      
     
   