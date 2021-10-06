<script lang="ts">
  import { push } from 'svelte-spa-router'
  import Card, {
    Content,
    Actions,
  } from '@smui/card';
  import CircularProgress from '@smui/circular-progress';
  import Button, { Label } from '@smui/button';

  let loading = false;
  let projects: [string] = JSON.parse(localStorage.getItem('Projects'));

  const handleClick = ()=> {
    
    globalThis.api.project.send('getParentDir');
  }

  globalThis.api.project.receive('parentDir', (dir)=>{
    console.log('dir: ', dir);
    if(dir === undefined) return;
    console.log(projects);
    if(projects){
      projects.push(dir);
    }else{
      projects= [dir];
    }
    localStorage.setItem('Projects', JSON.stringify(projects))
    loading = true;
    globalThis.api.project.send('makeNewProject', dir)
  })

  globalThis.api.project.receive('madeNewProject', (data) => {
    if (data === 'project installed') {
      globalThis.api.project.send('updateProject')
      push('/new-project');
    }
  });


</script>

{#if !loading}
  <button on:click={()=>{localStorage.clear(); projects = JSON.parse(localStorage.getItem('Projects'))} }>clear localStorage</button>
  {#if projects}
    <ul>
      {#each projects as project}
        <li>{project}</li>
      {/each}
    </ul>  
  {/if}
  <section id="landing-container">
    <div id="landing-header">
      <h1 >Sylph</h1>
    </div>
    <div id="landing-cards-container">
      <div class="landing-card">
        <Card>
          <Content>
            Create a new Svelte prototyping project.
          </Content>
          <Actions>
            <Button on:click={handleClick}>
              <Label>Create New</Label>
            </Button>
          </Actions>
        </Card>
      </div>
      <div class="landing-card">
        <Card>
          <Content>
            [NOT FUNCTIONAL]
          </Content>
          <Actions>
            <Button>
              <Label>Example</Label>
            </Button>
          </Actions>
        </Card>
      </div>
      <div class="landing-card">
        <Card>
          <Content>
            [NOT FUNCTIONAL]
          </Content>
          <Actions>
            <Button>
              <Label>Example</Label>
            </Button>
          </Actions>
        </Card>
      </div>
    </div>
  </section>
{:else}
  <div id="landing-loading">
    <CircularProgress style="height: 100px; width: 100px;" indeterminate />
  </div>
{/if}

<style>

  h1{
    font-size: 44px;
  }
  #landing-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    text-align: center;
    box-sizing: border-box;
  }

  #landing-cards-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .landing-card {
    margin: 1rem;
  }

  #landing-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }
</style>
