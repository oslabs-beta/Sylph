<!-- //loop through element.attributes to populate the editor input fields and 
svelte bind value to input, set to come state/store obj? -->
<!-- tabs for different types of attributes -->

<script>
import { DivElement, ImageElement } from "../classes/HTMLElements.ts";
import MenuTextField from "./MenuTextField.svelte";
import {nodeStore as nodes, activeNode}  from '../stores/store'
let nodeActive = $activeNode
// console.log('OBJECT ENTRIES NODES ', Object.entries($nodes))
    const testDiv = new DivElement
    const testImage = new ImageElement
    const updateCode=(node)=>{
      const newData = `<script>
	export let name;
  ${'<'}/script>

<main>
	${toString(node)}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
    padding: 5px;
		color: white;
    min-height: 25px;
    border: solid 1px green;
    background-color: purple;
	}

  div {
    padding: 5px;
		color: white;
    min-height: 25px;
    border: solid 1px blue;
    
    background-color: green;
	}

  section {
    padding: 5px;
		color: white;
    min-height: 25px;
    border: solid 1px orange;
    
    background-color: pink;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>`;

    globalThis.api.project.send('writeOver', {path: 'src/App.svelte', data: newData});
    globalThis.api.project.send('read', {path: 'src/App.svelte'});
    console.log('hitting read')
    }

    const toString = (node)=> {
		return `<${node.name} ${node.attributes ? Object.entries(node?.attributes)
			.map(([key, value]) => `${key}=${`"${value}"`}`)
			.join(' '): ''}
			${
				node.hasOwnProperty('items') // check if the node element is self closing tag
					? `>${node.innerText? node.innerText : ' '}\n\t` +
					  node.items.map((child) => toString(child)).join('\n') +
					  `</${node.name}>`
					: '/>'
			}
		`;
  }//end of toString
  
  const styleToString = (node) => {
	return `
			# ${
				node.items.map(child=>child.attributes.id + ':{'+Object.entries(child.styles).map(([key,value])=> key + '=' + value)  +'}')
			}, 
			${
				node.hasOwnProperty('items') // check if the node element is self closing tag
				? 
				  node.items.map((child) => styleToString(child)) 
				: ''
			}
	`; //end of return
}; //end of styleToString


</script>

<style>
  .content {
    display: grid;
    width: 100%;
    height: 100%;
    justify-content: center;
  }
</style>
    <div class = 'content'>
      <div style={{display:'grid', contain:'content', width:'100%',}}>
        <h3>active node</h3>
      {JSON.stringify($activeNode)}
        <!-- <h3>node 1 HTML</h3>
        { JSON.stringify($nodes.node1)} -->
        <h3>node tree</h3>
        { JSON.stringify($nodes)}
<br>
        <h3>toString </h3>
        {updateCode($nodes.node1)}
      

</div>   
    <MenuTextField /> 
</div>
      
     
   