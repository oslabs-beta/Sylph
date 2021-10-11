<script lang="ts">
  export let name: string;
  // import Router from 'svelte-spa-router'
  import SylphContainer from './containers/SylphContainer.svelte'
  import LandingPage from './components/LandingPage.svelte';

  // const pages = ["LandingPage", "SylphContainer"]
  let currentPage = 'LandingPage'

  globalThis.api.app.receive('goToMain',()=> currentPage = 'LandingPage')
  globalThis.api.app.receive('goToSlyph',()=> currentPage = 'SylphContainer')


  
  // const routes = {
  //   '/': LandingPage,
  //   '/new-project': SylphContainer
  // }
</script>


<body>
  {#if currentPage === 'LandingPage'} 
    <LandingPage/>
  {:else if  currentPage === 'SylphContainer'}
    <SylphContainer/>
  {/if}
</body>