<script>
  localStorage.setItem("src/filename.html", "<h1>Hello World!</h1>")

  import { HSplitPane, VSplitPane } from 'svelte-split-pane';
  import Drawer, {
    Content,
    Header,
    Title,
  } from '@smui/drawer';
  import Button, { Label } from '@smui/button';

  import Sandbox from '../components/Sandbox.svelte';
  import ComponentMenu from '../components/ComponentMenu.svelte';
  import Preview from '../components/Preview.svelte';
  import ComponentCustomizer from '../components/ComponentCustomizer.svelte'
  import {nodeStore as nodes}  from '../stores/store'
  import { activeNode }  from '../stores/store'

  //drawer functionality
  let open = false;

  //code based on https://svelte.dev/repl/fe8c9eca04f9417a94a8b6041df77139?version=3.42.1
  //nesting depth
  let depth = 100;

  console.log('NODESTORE IN APP ', $nodes);

  //all nodes in the component menu
  let components = [
    { id: 'node2', name: 'div', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node3', name: 'h1', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node4', name: 'section', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node5', name: 'img', attributes:{}, styles:{},  selected: false}
  ];
</script>

<main>
  <div class="wrapper">
    <div class="drawer-container">
      <Drawer variant="dismissible" bind:open>
        <Header>
          <Title>Components</Title>
        </Header>
        <Content>
          <ComponentMenu 
            bind:nodes={$nodes}  
            items={components}
          />
        </Content>
        <Button on:click={() => (open = !open)}>
          <Label>Close</Label>
        </Button>
      </Drawer>
      <HSplitPane leftPaneSize="80%" rightPaneSize="20%" minLeftPaneSize="50px" minRightPaneSize="50px">
          <left slot="left">
            <VSplitPane topPanelSize="50%" downPanelSize="50%" minTopPaneSize="50px" minDownPaneSize="50px">
              <top slot='top'>
                <div id="toggle-drawer">
                  <Button
                    on:click={() => (open = !open)}
                    variant="raised"
                  >
                    <Label>
                      Components
                    </Label>
                  </Button>
                </div>
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
              <h3>Placeholder</h3>
            </top>
            <down slot="down">
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
  
  down {
    overflow-y: hidden;
  }

  .active-element {
    background-color: #4A2C40;
    padding: 10px;
    color: snow;
  }

  #toggle-drawer {
    position: absolute;
    top: 100px;
    left: -55px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: white;
    transform: rotate(90deg);
  }

  .drawer-container {
    height: 100%;
    position: relative;
    display: flex;
    overflow: hidden;
    z-index: 0;
  }
</style>