<script>
  import { HSplitPane, VSplitPane } from 'svelte-split-pane';
  import { push } from 'svelte-spa-router';
  import Drawer, { Content, Header, Title, Scrim } from '@smui/drawer';
  import Button, { Label } from '@smui/button';

  import Sandbox from '../components/Sandbox.svelte';
  import ComponentMenu from '../components/ComponentMenu.svelte';
  import PortSnackbar from '../components/PortSnackbar.svelte';
  import ComponentCustomizer from '../components/ComponentCustomizer.svelte';

  import { nodeStore as nodes, globalClasses, globalStyles } from '../stores/store';

  import Directory from '../components/Directory.svelte';
  import PreviewEditorContainer from './PreviewEditorContainer.svelte';

  import {components} from '../components/utilities/components';
import { onDestroy } from 'svelte';

  //drawer functionality
  let open = false;

  $: {globalThis.api.project.send('updateStoreFile', JSON.stringify(
    {
      nodes: $nodes,
      globalStyles: $globalStyles, 
      globalClasses: $globalClasses 
    }
    ))
  }

  onDestroy(()=>{
    $nodes = {
      node1: {
        id: 'node1',
        name: 'body',
        items: [],
      }
    };
    
    $globalStyles = {
      elementStyles: {},
      classStyles: {},
    };

    $globalClasses = [];
  })
  //redirect to landing page logic (for @Randy)
  let redirect = false;
  if (redirect === true) {
    push('/');
  }

  //code based on https://svelte.dev/repl/fe8c9eca04f9417a94a8b6041df77139?version=3.42.1
  //nesting depth
  let depth = 100;

  //all nodes in the component menu to drag into sandbox
  
</script>

<main>
  <div class="wrapper">
    <div class="drawer-container">
      <Drawer variant="modal" bind:open>
        <Header>
          <Title>Components</Title>
        </Header>
        <Content>
          <ComponentMenu bind:nodes={$nodes} items={components} />
        </Content>
        <Button on:click={() => (open = !open)}>
          <Label>Close</Label>
        </Button>
      </Drawer>
      <Scrim />
      <HSplitPane
        leftPaneSize="80%"
        rightPaneSize="20%"
        minLeftPaneSize="50px"
        minRightPaneSize="400px"
      >
        <left slot="left">
          <VSplitPane
            topPanelSize="50%"
            downPanelSize="50%"
            minTopPaneSize="50px"
            minDownPaneSize="50px"
          >
            <top slot="top" style="display: flex; flex-direction:column;">
              <div class="pane-header" >
                <p>SANDBOX</p>
              </div>
              <Sandbox node={$nodes.node1} bind:nodes={$nodes} bind:depth />
              <div id="toggle-drawer">
                <Button on:click={() => (open = !open)} variant="raised">
                  <Label>Components</Label>
                </Button>
              </div>
              <!-- <h3>Sandbox</h3>
              <Sandbox node={$nodes.node1} bind:nodes={$nodes} bind:depth /> -->
            </top>
            <down slot="down">
              <PreviewEditorContainer />
            </down>
          </VSplitPane>
        </left>
        <right slot="right">
          <VSplitPane
            topPanelSize="30%"
            downPanelSize="70%"
            minTopPaneSize="50px"
            minDownPaneSize="50px"
          >
            <top slot="top">
              <div class="pane-header">
                <p>DIRECTORY</p>
              </div>
              <Directory />
            </top>
            <down slot="down" class="down">
              <ComponentCustomizer />
            </down>
          </VSplitPane>
        </right>
      </HSplitPane>
    </div>
  </div>
  <PortSnackbar />
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
  .down {
    overflow-x: hidden;
  }
  .pane-header {
    display: flex;
    padding: 7px;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    outline: 1px solid darkgray;
    font-size: 1.1em;
    font-weight: 800;
    width: 100%;
    background-color: #7d3780;
    color: whitesmoke;
  }
  .pane-header p {
    padding: 0;
    margin: 0;
  }

  left,
  right,
  top,
  down {
    width: 100%;
    height: 100%;
    display: block;
    background-color: white;
  }

  #toggle-drawer {
    position: absolute;
    top: 100px;
    left: -55px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: white;
    transform: rotate(90deg);
    --mdc-theme-primary: darkmagenta;
  }

  .drawer-container {
    height: 100%;
    position: relative;
    display: flex;
    overflow: hidden;
  }
</style>
