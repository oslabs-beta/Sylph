<script lang="ts">
	export let name: string;
  localStorage.setItem("src/filename.html", "<h1>Hello World!</h1>")

  import { HSplitPane, VSplitPane } from 'svelte-split-pane';

  import Sandbox from './Sandbox.svelte';
  import ComponentMenu from './ComponentMenu.svelte';
  import Preview from './Preview.svelte';
  import ComponentCustomizer from './ComponentCustomizer.svelte'

  //code based on https://svelte.dev/repl/fe8c9eca04f9417a94a8b6041df77139?version=3.42.1
  //nesting depth
  let depth = 100;

  //all nodes that are displayed in the sandbox
  let nodes = {
		node1: { 
      id: 'node1',
      name: 'HTML',
      items: []
    },
    //all component nodes are REQUIRED to be placed below this line
    //not shown on the page
    node2: { id: 'node2', name: 'div', items: [] },
    node3: { id: 'node3', name: 'h1', items: [] },
    node4: { id: 'node4', name: 'section', items: [] },
	}

  //all nodes in the component menu
  let components = [
    { id: 'node2', name: 'div', items: [] },
    { id: 'node3', name: 'h1', items: [] },
    { id: 'node4', name: 'section', items: [] },
  ];
</script>

<main>
  <div class="wrapper">
    <HSplitPane leftPaneSize="85%" rightPaneSize="15%" minLeftPaneSize="50px" minRightPaneSize="50px">
      <left slot="left">
        <VSplitPane topPanelSize="50%" downPanelSize="50%" minTopPaneSize="50px" minDownPaneSize="50px">
          <top slot='top'>
            <h3>Sandbox</h3>
            <Sandbox 
                node={nodes.node1}
                bind:nodes={nodes} 
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
              bind:nodes={nodes} 
              items={components}
            />
          </top>
          <down slot="down">
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
  }
</style>