<template>
    <div>
        <input type="text" class='s-input autocomplate' :placeholder='placeholder'>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      loadData: {},
      value: {},
      placeholder: {
        type: String,
        default: '请搜索'
      }
    },
    data () {
      return {
        autocomplate: null
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.autocomplate = this.$f7.autocomplete({
          input: '.autocomplate',
          openIn: 'dropdown',
          preloader: true, // enable preloader
          valueProperty: 'id', // object's "value" property name
          textProperty: 'name', // object's "text" property name
          limit: 20, // limit to 20 results
          dropdownPlaceholderText: 'Try "JavaScript"',
          expandInput: true, // expand input
          source: (autocomplete, query, render) => {
            var results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Show Preloader
            autocomplete.showPreloader();
            // Do Ajax request to Autocomplete data
            if (this.loadData && Object.prototype.toString.call(this.loadData) === '[object Function]') {
              this.loadData().then((data) => {
                console.log('data ===', data)
                // render(data);
                autocomplete.hidePreloader();
                render(results);

              }).catch(() => {
                autocomplete.hidePreloader();
                render(results);
              })
            } else {
              autocomplete.hidePreloader();
              render(results);

            }
              /* $$.ajax({
               url: 'autocomplete-languages.json',
               method: 'GET',
               dataType: 'json',
               //send "query" to server. Useful in case you generate response dynamically
               data: {
               query: query
               },
               success: function (data) {
               // Find matched items
               for (var i = 0; i < data.length; i++) {
               if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
               }
               // Hide Preoloader
               autocomplete.hidePreloader();
               // Render items by passing array with result items
               render(results);
               }
               });*/
          }
        });
      })
    }
  }
</script>

<style lang="scss" scoped type="text/css">
</style>
