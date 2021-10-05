<script>
    import Select from 'svelte-select';
    import {activeNode} from '../stores/store';
  export let items
  export let value
    // let items = [
    //   {value: 'chocolate', label: 'Chocolate'},
    //   {value: 'pizza', label: 'Pizza'},
    //   {value: 'cake', label: 'Cake'},
    //   {value: 'chips', label: 'Chips'},
    //   {value: 'ice-cream', label: 'Ice Cream'},
    // ];
  
    
  
    function handleSelect(event) {
      console.log('selected item', event.detail, event.target);
      
    }
  </script>

    <Select 
      {items} 
      {value} 
      on:select={(e) => {
        $activeNode.styles.display = value;
      }}
    >
    </Select>



  <style>


  </style>