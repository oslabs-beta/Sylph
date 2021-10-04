<script>
  localStorage.setItem('src/filename.html', '<h1>Hello World!</h1>');

  import { HSplitPane, VSplitPane } from 'svelte-split-pane';
  import Drawer, { Content, Header, Title, Scrim } from '@smui/drawer';
  import Button, { Label } from '@smui/button';

  import Sandbox from '../components/Sandbox.svelte';
  import ComponentMenu from '../components/ComponentMenu.svelte';
  import PortSnackbar from '../components/PortSnackbar.svelte';
  import ComponentCustomizer from '../components/ComponentCustomizer.svelte';

  import { nodeStore as nodes } from '../stores/store';
  import { components } from '../components/utilities/components';

  import Directory from '../components/Directory.svelte';
  import PreviewEditorContainer from './PreviewEditorContainer.svelte';

  //drawer functionality
  let open = false;

  //code based on https://svelte.dev/repl/fe8c9eca04f9417a94a8b6041df77139?version=3.42.1
  //nesting depth
  let depth = 100;
</script>

<main>
  <!-- <button on:click={killDev}>kill dev</button> -->
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
            <top slot="top">
              <h3>Sandbox</h3>
              <Sandbox node={$nodes.node1} bind:nodes={$nodes} bind:depth />
              <div id="toggle-drawer">
                <Button on:click={() => (open = !open)} variant="raised">
                  <Label>Components</Label>
                </Button>
              </div>
              <h3>Sandbox</h3>
              <Sandbox node={$nodes.node1} bind:nodes={$nodes} bind:depth />
            </top>
            <down slot="down">
              <PreviewEditorContainer />
            </down>
          </VSplitPane>
        </left>
        <right slot="right">
          <VSplitPane
            topPanelSize="40%"
            downPanelSize="60%"
            minTopPaneSize="50px"
            minDownPaneSize="50px"
          >
            <top slot="top">
              <h3>Placeholder</h3>
              <Directory />
            </top>
            <down slot="down">
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
  down {
    overflow-y: hidden;
  }
  .drawer-container {
    height: 100%;
    position: relative;
    display: flex;
    overflow: hidden;
  }

  left,
  right,
  top,
  down {
    width: 100%;
    height: 100%;
    display: block;
    /* text-align: center; */
    background-color: white;
  }
  main {
    box-sizing: border-box;
    margin: 0 auto;
    height: 100vh;
    width: 100vw;
    text-align: center;
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
</style>
