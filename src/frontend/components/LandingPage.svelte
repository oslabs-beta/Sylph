<script lang="ts">
  import { push } from 'svelte-spa-router';
  import Card, {
    Content,
    PrimaryAction,
    Actions,
    ActionButtons,
    ActionIcons,
  } from '@smui/card';
  import Button, { Label } from '@smui/button';
</script>

<section>
  <Card>
    <Content>
      Create a new Svelte prototyping project.
    </Content>
    <Actions>
      <Button on:click={() => {
        push('/sylph');
      }}>
        <Label>Create New</Label>
      </Button>
    </Actions>
  </Card>
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
</section>

