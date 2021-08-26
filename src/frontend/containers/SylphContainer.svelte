<script >
  localStorage.setItem("src/filename.html", "<h1>Hello World!</h1>")
  import { onMount } from 'svelte';
  import { HSplitPane, VSplitPane } from 'svelte-split-pane';

  import Sandbox from '../components/Sandbox.svelte';
  import ComponentMenu from '../components/ComponentMenu.svelte';
  import Preview from '../components/Preview.svelte';
  import ComponentCustomizer from '../components/ComponentCustomizer.svelte'
  import {nodeStore as nodes}  from '../stores/store'
  import { activeNode }  from '../stores/store'

  //code based on https://svelte.dev/repl/fe8c9eca04f9417a94a8b6041df77139?version=3.42.1
  //nesting depth
  let depth = 100;

  // let nodes = {
  //   //container for all nodes displayed in sandbox
	// 	node1: { 
  //     id: 'node1',
  //     name: 'HTML',
  //     items: []
  //   },
  //   //all component nodes are REQUIRED to be placed below this line
  //   //not shown on the page
  //   node2: { id: 'node2', name: 'div', items: [] },
  //   node3: { id: 'node3', name: 'h1', items: [] }, 
  //   node4: { id: 'node4', name: 'section', items: [] },
  //   node5: { id: 'node5', name: 'img' }
	// }

  console.log('NODESTORE IN APP ', $nodes);

  //all nodes in the component menu
  let components = [
    { id: 'node2', name: 'div', items: [], styles:{}, selected: false },
    { id: 'node3', name: 'h1', items: [], styles:{}, selected: false },
    { id: 'node4', name: 'section', items: [], styles:{}, selected: false },
    { id: 'node5', name: 'img', styles:{},  selected: false}
  ];
</script>

<main>
  <div class="wrapper">
    <HSplitPane leftPaneSize="80%" rightPaneSize="20%" minLeftPaneSize="50px" minRightPaneSize="50px">
      <left slot="left">
        <VSplitPane topPanelSize="50%" downPanelSize="50%" minTopPaneSize="50px" minDownPaneSize="50px">
          <top slot='top'>
            <h3>Sandbox</h3>
            <Sandbox 
              node={$nodes.node1}
              bind:nodes={$nodes} 
              bind:depth={depth}
            />
          </top>
          <down slot="down">
            <Preview />
          </down>
        </VSplitPane>
      </left>
      <right slot="right">
        <VSplitPane topPanelSize="40%" downPanelSize="60%" minTopPaneSize="50px" minDownPaneSize="50px">
          <top slot='top'>
            <h3>Component Menu</h3>
            <ComponentMenu 
              bind:nodes={$nodes}  
              items={components}
            />
          </top>
          <down slot="down" class= 'down'>
            <div class = 'active-element'>
			  <h3>{$activeNode?.name  || 'Select Element to Edit'}</h3>
			  <h6>{$activeNode?.id || ''}</h6>
        </div>
            <ComponentCustomizer />
          </down>
        </VSplitPane>
      </right>
    </HSplitPane> 
  </div>
</main>

<style>
	main { 
    box-sizing: border-box;
    margin: 0 auto;
    height: 100vh;
    width: 100vw;
		text-align: center;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

  div.wrapper {
    margin: auto;
    width: 100vw;
    height: 100vh;
  }

  left, right, top, down {
    width: 100%;
    height: 100%;
    display: block;
    text-align: center;
    background-color: white;
  }
  .down {
    overflow-y:auto;
  }
  .active-element {
    
    background-color: #4A2C40;
    padding: 10px;
    color: snow;

  }
</style>