<script lang="ts">
	export let name: string;
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
	<Sandbox items={sandboxItems} />
  <ComponentMenu items={components} />
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
</style>