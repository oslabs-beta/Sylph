<script lang="ts">
  import { push } from 'svelte-spa-router'

  const handleClick = ()=>{
    globalThis.api.project.send('makeNewProject', 'test');
    console.log('hitting')
    
  }
  globalThis.api.project.receive('madeNewProject', (data)=>{
    if(data==='project installed'){
      globalThis.api.project.send('updateProject')
      push('/sylph');
    }
  });

</script>

  <section>
    <button on:click={handleClick}>
      Start a new Svelte prototyping project
    </button>
    <p>[NOT FUNCTIONAL] EXAMPLE 2</p>
    <p>[NOT FUNCTIONAL] EXAMPLE 3</p>
  </section>
