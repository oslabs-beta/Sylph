<script lang="ts">
  import Router from 'svelte-spa-router'
  import SylphContainer from '../containers/SylphContainer.svelte'

  const routes = {
    '/sylph': SylphContainer
  }

  const handleClick = ()=>{
    globalThis.api.project.send('makeNewProject', 'test');
    console.log('hitting')
  }
  globalThis.api.project.receive('madeNewProject', (data)=>{
    if(data==='project installed'){
      globalThis.api.project.send('updateProject')
    }
  });

</script>

<section>
  <Router {routes} />

  <a href="#/sylph" on:click={handleClick}>Start a new Svelte prototyping project</a>
  <p>[NOT FUNCTIONAL] EXAMPLE 2</p>
  <p>[NOT FUNCTIONAL] EXAMPLE 3</p>
</section>