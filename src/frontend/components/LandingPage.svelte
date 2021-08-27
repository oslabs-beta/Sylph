<script lang="ts">
  import { push } from 'svelte-spa-router'
  import Card, {
    Content,
    Actions,
  } from '@smui/card';
  import Button, { Label } from '@smui/button';

  const handleClick = ()=>{
    globalThis.api.project.send('makeNewProject', 'test');
    console.log('hitting')
    
  }
  globalThis.api.project.receive('madeNewProject', (data)=>{
    if(data==='project installed'){
      globalThis.api.project.send('updateProject')
      push('/new-project');
    }
  });

</script>

<section id="landing-container">
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
</section>

<style>
  #landing-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }
  .landing-card {
    margin: 1rem;
  }
</style>