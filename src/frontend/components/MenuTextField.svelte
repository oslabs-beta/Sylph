<script >
  import {
    activeNode,
    nodeStore as nodes,
    globalStyles,
    globalClasses,
  } from '../stores/store';
  import Textfield from '@smui/textfield';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import Button from '@smui/button';
  import { Row, Col, Select, MaterialApp } from 'svelte-materialify';
<<<<<<< HEAD
=======

>>>>>>> 8da631f0df2b67385031feb23260da60e345bc18

  import { Attributes } from './utilities/Attributes';
  import { Styles } from './utilities/Styles';
  import { elements } from './utilities/elements';

  let active = 'ELEMENTS';
  let activeID = '';
  let attributeForm;
  let styleForm;
  let IDField;
  let fieldDisabled = true;
  let value = '';
  let elementValue = '';
  let globalElFieldDisabled = true;
  let classValue = '';
  let addedClass = '';
  let classForm;
  let globalClassFieldDisabled = true;

  //dynamically adds element specific attributes to editor list
  const attributeList = () => {
    switch ($activeNode?.name) {
      case 'a':
        return Attributes.general.concat(Attributes.a).sort();

      case 'blockquote':
        return Attributes.general.concat(Attributes.blockquote).sort();

      case 'button':
        return Attributes.general.concat(Attributes.button).sort();

      case 'form':
        return Attributes.general.concat(Attributes.form).sort();

      case 'img':
        return Attributes.general.concat(Attributes.img).sort();

      case 'li':
        return Attributes.general.concat(Attributes.li).sort();

      case 'ol':
        return Attributes.general.concat(Attributes.ol).sort();

      case 'textarea':
        return Attributes.general.concat(Attributes.textarea).sort();

      default:
        return Attributes.general;
    }
    return;
  };
  //array iterated to build editor list
  let attributes = [];
  //works like useEffect passing activenode.name into the dependency array
  $: $activeNode?.name
    ? (attributes = attributeList())
    : (attributes = Attributes.general);
  $: $activeNode?.attributes.id
    ? (fieldDisabled = false)
    : (fieldDisabled = true);
  $: $activeNode?.attributes?.id
    ? (activeID = `Element ID: ${$activeNode?.attributes?.id}`)
    : (activeID = `Assign ID to Edit Styles`);
  $: elementValue
    ? (globalElFieldDisabled = false)
    : (globalElFieldDisabled = true);
  $: classValue
    ? (globalClassFieldDisabled = false)
    : (globalClassFieldDisabled = true);

  const handleSubmit = () => {
    $activeNode?.attributes.id
      ? (fieldDisabled = false)
      : (fieldDisabled = true);
    $nodes = { ...$nodes };
  };
  const handleElementSubmit = () => {
    console.log('GLOBAL STYLES', $globalStyles.elementStyles);
    console.log('class styles:', $globalStyles.classStyles)
    $globalStyles = { ...$globalStyles };
    // $globalClasses = { ...$globalClasses };
  };
</script>

<container class="main-container">
  <form
    on:submit|preventDefault={handleSubmit}
    on:keydown={(e) => {
      if (e.key === 'Enter') handleSubmit();
    }}
    bind:this={attributeForm}
    class="attribute-form"
  >
    <!-- static always on top of the list attributes -->
    {#if $activeNode?.name}
      <div class="table-header">
        <p>ELEMENT ATTRIUBUTES</p>
        <p>
          {`Currently Editing: ${$activeNode?.name}`}
          <br />
          {$activeNode?.attributes.id
            ? `Element ID: ${$activeNode?.attributes.id}`
            : 'Assign ID to Edit Styles'}
        </p>
      </div>
<<<<<<< HEAD
=======

>>>>>>> 8da631f0df2b67385031feb23260da60e345bc18

      <div class="attribute-row">
        <Textfield
          bind:this={IDField}
          variant="filled"
          type="text"
          label="ID"
          value={$activeNode?.attributes?.id || ''}
          on:input={(e) => {
            $activeNode.attributes.id = e.target.value;
            handleSubmit();
          }}
          placeholder="***assign id to edit styles***"
        />
      </div>

      <div class="attribute-row">
        <Textfield
          variant="filled"
          type="text"
          label="class"
          value={$activeNode?.attributes?.class || ''}
          on:input={(e) => {
            $activeNode.attributes.class = e.target.value;
            handleSubmit();
          }}
          placeholder="***assign id to edit styles***"
        />
      </div>

      <div class="attribute-row">
        <Textfield
          variant="filled"
          type="text"
          label="innerText"
          value={$activeNode?.attributes.innerText || ''}
          on:input={(e) => {
            $activeNode.attributes.innerText = e.target.value;
            handleSubmit();
          }}
        />
      </div>
      <!-- element attribute input fields -->
      {#each attributes as attribute}
        <div class="attribute-row">
          <Textfield
            variant="filled"
            type="text"
            label={attribute}
            value={$activeNode?.attributes[attribute] || ''}
            on:input={(e) => {
              $activeNode.attributes[attribute] = e.target.value;
              handleSubmit();
            }}
          />
        </div>
      {/each}
      <form
        on:submit|preventDefault={handleSubmit}
        bind:this={styleForm}
        class="style-form"
      >
        <div class="table-header">Styles</div>
        <!-- element style input fields -->
        {#each Styles as style}
          <div class="attribute-row">
            <Textfield
              disabled={fieldDisabled}
              variant="filled"
              type="text"
              label={style}
              value={$activeNode?.styles[style] || ''}
              on:input={(e) => {
                $activeNode.styles[style] = e.target.value;
                handleSubmit();
              }}
            />
          </div>
        {/each}
      </form>
    {:else}
      <div class="table-header">{`GLOBAL ${active}`}</div>
      <div class="element-editor-tabs">
        <TabBar tabs={['ELEMENTS', 'CLASSES']} let:tab bind:active>
          <!-- Note: the `tab` property is required! -->
          <Tab {tab}>
            <Label>{tab}</Label>
          </Tab>
        </TabBar>
      </div>

      {#if active === 'ELEMENTS'}
        <MaterialApp>
          <Row>
            <Col>
              <Select
                filled
                items={elements}
                bind:value={elementValue}
                placeholder="Select Element To Edit"
              />
            </Col>
          </Row>
        </MaterialApp>

        <form on:submit|preventDefault={handleElementSubmit} class="style-form">
          <!-- global element input fields -->
          {#each Styles as style}
            <div class="attribute-row">
              <Textfield
                disabled={globalElFieldDisabled}
                id={value}
                variant="filled"
                type="text"
                label={style}
                value={$globalStyles.elementStyles?.[elementValue]?.[style] ||
                  ''}
                on:change={(e) => {
                  $globalStyles.elementStyles[elementValue][style] =
                    e.target.value;
                  handleElementSubmit();
                }}
              />
            </div>
          {/each}
        </form>
      {:else}
        <form
          class="class-form"
          bind:this={classForm}
          on:submit={(e) => {
            $globalClasses.push(addedClass);
            $globalStyles.classStyles[addedClass] = {};
            classValue = addedClass;
            addedClass = null;
          }}
        >
          <div class="attribute-row">
            <Textfield
              variant="filled"
              type="text"
              label="Add Class"
              bind:value={addedClass}
            />
          </div>

          <Button variant="raised" type="submit" color="secondary">
            <Label>Add Class</Label>
          </Button>
        </form>
        <MaterialApp>
          <Row>
            <Col>
              <Select
                filled
                items={$globalClasses}
                bind:value={classValue}
                placeholder={$globalClasses.length > 0
                  ? 'Select Class To Edit'
                  : 'Add Classes Above'}
              />
            </Col>
          </Row>
        </MaterialApp>
        <Button
          variant="raised"
          color="error"
          on:click={() => {
            $globalClasses = $globalClasses.filter((el) => {
              return el !== classValue;
            });
            classValue = null;
          }}
        >
          <Label>Delete Class</Label>
        </Button>
        <!-- global classes input fields -->
        {#each Styles as style}
          <div class="attribute-row">
            <Textfield
              disabled={globalClassFieldDisabled}
              variant="filled"
              type="text"
              label={style}
              value={$globalStyles.classStyles?.[classValue]?.[style] || ''}
              on:change={(e) => {
                $globalStyles.classStyles[classValue][style] = e.target.value;
                handleElementSubmit();
              }}
            />
          </div>
        {/each}
      {/if}
    {/if}
  </form>
</container>
<div style="height: 150px" />

<style>
  .attribute-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .attribute-row {
    display: grid;
    grid-template-columns: 1fr;
    width: '100%';
    margin: 2px;
  }
  .class-form {
    display: grid;
    width: 100%;
    margin: 0 -5px 0 -5px;
  }
  .current-edit {
    margin: 0;
  }
  .main-container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .table-header {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-bottom: 10px;
    justify-content: center;
    align-content: center;
    outline: 1px solid darkgray;
    font-weight: 800;
    width: 100%;
    /* background-color: darkmagenta; */
    background-color: #7d3780;
    color: whitesmoke;
  }

  .element-editor-tabs {
    --mdc-theme-primary: darkmagenta;
  }
</style>
