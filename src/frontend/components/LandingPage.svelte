<script lang="ts">
  import { push } from 'svelte-spa-router'
  import Card, {
    Content,
    Actions,
  } from '@smui/card';
  import CircularProgress from '@smui/circular-progress';
  import Button, { Label } from '@smui/button';

  let loading = false;

  const handleClick = ()=> {
    loading = true;
    globalThis.api.project.send('makeNewProject', 'test');
    console.log('hitting');
  }

  globalThis.api.project.receive('madeNewProject', (data) => {
    if (data === 'project installed') {
      globalThis.api.project.send('updateProject')
      push('/new-project');
    }
  });

</script>

{#if !loading}
  <section id="landing-container">
    <div id="landing-header">
      <h1>Sylph</h1>
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
