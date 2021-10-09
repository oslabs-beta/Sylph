<script lang="ts">
  import { push } from 'svelte-spa-router'
  import Card, {
    Content,
    Actions,
  } from '@smui/card';
  import CircularProgress from '@smui/circular-progress';
  import Button, { Label } from '@smui/button';
  import Select, { Option } from '@smui/select';
import Textfield from '@smui/textfield';
import HelperText from '@smui/select/helper-text/HelperText.svelte';


  //state to trigger loading screen
  let loading = false;
  let newProjectName=''

  //array of saved projects the user can open
  let savedProjectArr = ['example1'];
  //currently selected saved project
  let selectedSavedProject = '';
 
  let projects: [string] = JSON.parse(localStorage.getItem('Projects'));
  // let projects: [string] = JSON.parse(localStorage.getItem('Projects'));
  savedProjectArr = projects;
  const newProject = ()=> {    
    globalThis.api.project.send('getParentDir');
  }
  
  const reopenProject = (dirpath)=>{
    console.log('reopenProject:', dirpath)
    loading = true;
    globalThis.api.project.send('reopenProject', dirpath);
  }


  globalThis.api.project.receive('reopen', (dir)=>{
    console.log(dir)
    globalThis.api.project.send('updateProject')
      push('/new-project');
  })
  
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
  <!-- {#if projects}
    <ul>
      {#each projects as project}
        <li><button on:click={()=>reopenProject(project)}>{project}</button></li>
      {/each}
    </ul>  
  {/if} -->
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
          <div>
            <Textfield variant='filled' bind:value={newProjectName} label="Project Name">
              <!-- <HelperText slot='helper'>Give your new project a name</HelperText> -->
            </Textfield>
          </div>
          <Actions>
            <Button disabled={newProjectName===''} on:click={newProject}>
              <Label>Create New</Label>
            </Button>
          </Actions>
        </Card>
      </div>
      <div class="landing-card">
        <Card>
          <Content>
            <p>
              Open a previous Svelte prototyping project.
            </p>
            <!-- renders dropdown of saved projects from array -->
            <div id="saved-projects">
            {#if savedProjectArr?.length > 0 }
              <Select bind:selectedSavedProject label="Saved Project">
                <Option selectedSavedProject="" />
                {#each savedProjectArr as savedProject}
                  <Option  value={savedProject} on:click={()=>selectedSavedProject = savedProject}>{savedProject}</Option>
                  
                {/each}
              </Select>
            {:else}
              <em>
                No saved projects found.
              </em>
            {/if}
            </div>
          </Content>
          {#if savedProjectArr?.length > 0}
            <Actions>
              <Button disabled={selectedSavedProject===''} on:click={()=>reopenProject(selectedSavedProject)}>
                <Label>Open</Label>
              </Button>
            </Actions>
          {/if}
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
    height: 500px;
  }

  #landing-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  #saved-projects {
    text-align: left;
  }
</style>
