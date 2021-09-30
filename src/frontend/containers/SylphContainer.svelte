<script>
  localStorage.setItem("src/filename.html", "<h1>Hello World!</h1>")

  import { HSplitPane, VSplitPane } from 'svelte-split-pane';
  import Drawer, {
    Content,
    Header,
    Title,
    Scrim
  } from '@smui/drawer';
  import Paper from '@smui/paper';
  import Button, { Label } from '@smui/button';

  import Sandbox from '../components/Sandbox.svelte';
  import ComponentMenu from '../components/ComponentMenu.svelte';
  import PortSnackbar from '../components/PortSnackbar.svelte';
  import ComponentCustomizer from '../components/ComponentCustomizer.svelte'
  
  import {nodeStore as nodes}  from '../stores/store'
  import { activeNode }  from '../stores/store'

  import Directory from '../components/Directory.svelte';
  import PreviewEditorContainer from './PreviewEditorContainer.svelte';

  //drawer functionality
  let open = false;

  //code based on https://svelte.dev/repl/fe8c9eca04f9417a94a8b6041df77139?version=3.42.1
  //nesting depth
  let depth = 100;

  //all nodes in the component menu to drag into sandbox
  let components = [
    { id: 'node_a', name: 'a', items: [], attributes:{}, styles:{},  selected: false},
    { id: 'node_button', name: 'button', items: [], attributes:{}, styles:{},  selected: false},
    { id: 'node_div', name: 'div', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node_footer', name: 'footer', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node_form', name: 'form', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node_h1', name: 'h1', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node_h2', name: 'h2', items: [],attributes:{}, styles:{}, selected: false },
    { id: 'node_h3', name: 'h3', items: [],attributes:{}, styles:{}, selected: false },
    { id: 'node_h4', name: 'h4', items: [],attributes:{}, styles:{}, selected: false },
    { id: 'node_h5', name: 'h5', items: [],attributes:{}, styles:{}, selected: false },
    { id: 'node_header', name: 'header', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node_hr', name: 'hr', attributes:{}, styles:{},  selected: false},
    { id: 'node_img', name: 'img', attributes:{}, styles:{},  selected: false},
    { id: 'node_input', name: 'input', attributes:{}, styles:{},  selected: false},
    { id: 'node_li', name: 'li', items: [],attributes:{}, styles:{},  selected: false},
    { id: 'node_main', name: 'main', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node_nav', name: 'nav', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node_ol', name: 'ol', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node_p', name: 'p', items: [],attributes:{}, styles:{},  selected: false},
    { id: 'node_section', name: 'section', items: [], attributes:{}, styles:{}, selected: false },
    { id: 'node_span', name: 'span', attributes:{}, styles:{},  selected: false,},
    { id: 'node_ul', name: 'ul', items: [], attributes:{}, styles:{}, selected: false },
  ];

  // const killDev = ()=>{
  //   globalThis.api.project.send('killDev');
  // }
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
          <ComponentMenu 
            bind:nodes={$nodes}  
            items={components}
          />
        </Content>
        <Button on:click={() => (open = !open)}>
          <Label>Close</Label>
        </Button>
      </Drawer>
      <Scrim />
      <HSplitPane leftPaneSize="80%" rightPaneSize="20%" minLeftPaneSize="50px" minRightPaneSize="400px">
          <left slot="left">
            <VSplitPane topPanelSize="50%" downPanelSize="50%" minTopPaneSize="50px" minDownPaneSize="50px">
              <top slot='top'>
                <h3>Sandbox</h3>
                <Sandbox 
                  node={$nodes.node1}
                  bind:nodes={$nodes} 
                  bind:depth={depth}
                />
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
                <PreviewEditorContainer />
              </down>
            </VSplitPane>
          </left>
        <right slot="right">
          <VSplitPane topPanelSize="40%" downPanelSize="60%" minTopPaneSize="50px" minDownPaneSize="50px">
            <top slot='top'>
              <h3>Directory</h3>
              <Directory/>
            </top>
            <down slot="down">
          <!-- <div class="active-element">
            <Paper color="primary">
              <Title>
                Element Editor
              </Title>
              <br />
              <Content>
                <p>{$activeNode ? `Element Name: ${$activeNode?.name}` : 'Edit global attributes'+'\n'+'or select element to edit.'}</p>
                <p>{$activeNode ? `Element ID: ${$activeNode?.id}` : ''}</p>
              </Content>
            </Paper>
          </div> -->
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

  left, right, top, down {
    width: 100%;
    height: 100%;
    display: block;
    /* text-align: center; */
    background-color: white;
  }
  
  down {
    overflow-y: hidden;
  }

  .active-element {
    /* margin: 0 auto; */
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
  }
</style>