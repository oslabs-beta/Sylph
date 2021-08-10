<script lang="ts">
	export let name: string;
  localStorage.setItem("src/filename.html", "<h1>Hello World!</h1>")

  import { HSplitPane, VSplitPane } from 'svelte-split-pane';

  import Sandbox from './Sandbox.svelte';
  import ComponentMenu from './ComponentMenu.svelte';
  import Preview from './Preview.svelte';
  import ComponentCustomizer from './ComponentCustomizer.svelte'

  let sandboxItems = [];

  let components = [
    { id: 0, name: 'div'},
    { id: 1, name: 'h1'},
    { id: 2, name: 'section'},
  ];
</script>

<main>
  <div class="wrapper">
    <HSplitPane leftPaneSize="85vw" rightPaneSize="15vw" minLeftPaneSize="50px" minRightPaneSize="50px">
      <left slot="left">
        <VSplitPane topPanelSize="50vw" downPanelSize="50vw" minTopPaneSize="50px" minDownPaneSize="50px">
          <top slot='top'>
            <Sandbox 
                items={sandboxItems} 
              />
          </top>
          <down slot="down">
            <Preview />
          </down>
        </VSplitPane>
      </left>
      <right slot="right">
        <VSplitPane topPanelSize="40vw" downPanelSize="60vw" minTopPaneSize="50px" minDownPaneSize="50px">
          <top slot='top'>
            <ComponentMenu 
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