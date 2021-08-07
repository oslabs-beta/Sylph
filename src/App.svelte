<script lang="ts">
	export let name: string;

  import { HSplitPane } from 'svelte-split-pane';

  import Sandbox from './Sandbox.svelte';
  import ComponentMenu from './ComponentMenu.svelte';

  let sandboxItems = [];

  let components = [
    { id: 1, name: 'div'},
    { id: 2, name: 'h1'},
    { id: 3, name: 'section'}
  ];
</script>

<main>
	<h1>Sylph</h1>
  <div class="wrapper">
    <HSplitPane updateCallback={() => {
        console.log('HSplitPane Updated!');
    }}>
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
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
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
    height: 400px;
    margin: auto;
  }

  left, right, top, down {
      width: 100%;
      height: 100%;
      display: block;
      text-align: center;
  }
</style>