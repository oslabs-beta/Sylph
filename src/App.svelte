<script lang="ts">
	export let name: string;

  import { HSplitPane, VSplitPane } from 'svelte-split-pane';

  import Sandbox from './Sandbox.svelte';
  import ComponentMenu from './ComponentMenu.svelte';
  import Preview from './Preview.svelte';
  import ComponentCustomizer from './ComponentCustomizer.svelte'

  let sandboxItems = [];

  let components = [
    { id: 1, name: 'div',
      items: []
    },
    { id: 2, name: 'h1'},
    { id: 3, name: 'section'},
  ];
</script>

<main>
	<h1>Sylph</h1>
  <div class="wrapper">
    <VSplitPane topPanelSize="50%" downPanelSize="50%" minTopPaneSize="50px" minDownPaneSize="50px">
        <top slot="top">
          <HSplitPane>
            <left slot="left">
              <Sandbox 
                items={sandboxItems} 
              />
            </left>
            <right slot="right">
              <ComponentMenu 
                items={components} 
              />
            </right>
          </HSplitPane>
        </top>
        <down slot="down">
          <HSplitPane>
            <left slot="left">
              <Preview />
            </left>
            <right slot="right">
              <ComponentCustomizer />
            </right>
          </HSplitPane>
        </down>
    </VSplitPane>
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

  div.wrapper {
    width: 95%;
    height: 80vh;
    margin: auto;
  }

  left, right, top, down {
      width: 100%;
      height: 100%;
      display: block;
      text-align: center;
  }
</style>