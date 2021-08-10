<script >
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
    <HSplitPane leftPaneSize="85%" rightPaneSize="15%" minLeftPaneSize="50px" minRightPaneSize="50px">
      <left slot="left">
        <VSplitPane topPanelSize="50%" downPanelSize="50%" minTopPaneSize="50px" minDownPaneSize="50px">
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
        <VSplitPane topPanelSize="40%" downPanelSize="60%" minTopPaneSize="50px" minDownPaneSize="50px">
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

    <!-- <VSplitPane topPanelSize="50%" downPanelSize="50%" minTopPaneSize="50px" minDownPaneSize="50px">
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
    </VSplitPane> -->
  </div>
</main>

<style>
  
	main {
		text-align: center;
		
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
    width: 100vw;
    height: 100vh;
    margin: auto;
  }

  left, right, top, down {
      width: 100%;
      height: 100%;
      display: block;
      text-align: center;
  }
</style>