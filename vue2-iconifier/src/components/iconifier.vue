<template>
  <div>
  <link href = "https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <v-dialog  scrollable persistent max-width="600px" v-model="dialog">  
      <!-- <template v-if="noButton === 'false' || !noButton" v-slot:activator="{on,attrs}">      -->
      <template v-if="typeof toggle === 'undefined'" v-slot:activator="{on,attrs}">     
  
        <v-btn icon color="primary" dark v-bind="attrs" v-on="on"> <v-icon>add</v-icon></v-btn>

      </template>
      <v-card height="320px" class="d-flex flex-column" overflow-y:auto >
        <v-card-title>
          <span class="text-h5"> {{cardTitle}} </span>
          <v-spacer></v-spacer>
            <v-btn icon @click="close">
              <v-icon>close</v-icon>
            </v-btn>
         </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field clearable @click:clear="clear" type ="text" v-model="searchText"  @keyup="filterIcons(searchText)" :placeholder="searchPlaceholder"/>
              
            <div class="iconPicker__icons">
                <a href="#" @click.stop.prevent="getIcon(icon.value,icon.name)"
                :class="`item ${selected === icon.name ? 'selected' : ''}`"
                v-for="icon in icons" :key="icon.name">
               
                <span class="material-icons">{{icon.name}}</span>
                <!-- <v-icon>{{icon.name}}</v-icon> -->
                </a>
            </div>
          </v-container>
          </v-card-text>
         
         
      
       <v-divider/>
      <v-card-actions class="mt-auto">
        <v-spacer></v-spacer>
        <span class="material-icons">{{selected}}</span>
        <v-btn color="primary" text @click="save()" > {{buttonName}} </v-btn>
      </v-card-actions>
      
          
      </v-card>
    </v-dialog>
  </div>
</template>

<script>


import all_icons from "../assets/allIconsList"
import priority_icons from "../assets/priorityIcons"


 const icons = [];
  

  export default {
    name: 'iconifier',
    props:['lang','title','searchBox','button',"toggle"],
    watch:{
      toggle: function(newVal,oldVal){
        console.log('Prop Changed ' , newVal, " it was ", oldVal);
        console.log(typeof this.toggle)
        if(typeof this.toggle !== 'undefined'){
          this.dialog = newVal;
          this.$emit('toggle',newVal);
        }
        
      
      }
    },
    data: () => ({
      selected: '',
			icons,
      searchText:'',
      dialog:false,
    }),
    mounted() {
    this.icons = [];
    console.log(this.toggle)
    },
    computed:{
      cardTitle(){ 
        if(!this.title){
          if(this.lang){
            if(this.lang === "tr_TR"){
            return "İkon Seçiniz";
          }
          else if(this.lang === "en_US"){
            return  "Select Icon";
          }
          else{
            return "Hmm Else'e dustu";
          }
          }
          else{
            return "Select Icon";
          }
          }else{
            return this.title;
          }   
      },
      searchPlaceholder(){
        if(!this.searchBox){
          if(this.lang){
            if(this.lang === "tr_TR"){
            return "İkon Ara";
          }
          else if(this.lang === "en_US"){
            return  "Search Icons";
          }
          else{
            return "Hmm Else'e dustu";
          }
          }
          else{
            return "Search Icons";
          } 
        }else{
          return this.searchBox;
        }
      },
      buttonName(){ 
        if(!this.button){
          if(this.lang){
            if(this.lang === "tr_TR"){
            return "Seç";
          }
          else if(this.lang === "en_US"){
            return  "Select";
          }
          else{
            return "Hmm Else'e dustu";
          }
          }
          else{
            return "Select";
          } 
        }else{
          return this.button;
        }        
    }},
    methods: {
      getIcon(icon,key){
        this.selected = key;
        //this.selectIcon(icon.toUpperCase());
      },
      save(){
        if(!(this.selected === "")){
          this.dialog = false;
          this.selectIcon(this.selected);
          this.$emit('toggle',false);
        }
        
      },
      close(){
        this.dialog=false; this.$emit('toggle',false);
      },
      clear(){
        this.searchText='';
        this.filterIcons(this.searchText);
      },
      convert(value){
        const newValue = value
        .charCodeAt(1)
        .toString(10)
        .replace(/\D/g,'');
        let hexValue = Number(newValue).toString(16);
        while(hexValue.length < 4){
          hexValue = '0${hexValue}';
        }
      },
      selectIcon(value){
        this.$emit('selectIcon',value);
      },
    filterIcons (searchText) {
      const search =searchText;
      
      let filter1 = [];
      let filter2 = [];

			if (search.length > 1) {
        
          filter1 = all_icons.filter((item2) => {
					const regex2 = new RegExp(search, 'gi');
          const str2 = item2.name;
          return str2.match(regex2)
				});

          filter2 = all_icons.filter((item1) => {
          const regex1 = new RegExp(search, 'gi');
          const str1 = item1.tr;
          
          return str1.match(regex1);
				});
          
          
 
			} else if (search.length === 0) {
				this.icons = priority_icons;
      }
      
      let filter = filter1.concat(filter2);

      const result = [...new Map(filter.map(item => [ item['name'], item])).values()]

      //console.log(filter);

      if(filter.length > 0)
        this.icons = result;
      
      if (search.length === 0) {
				this.icons = [];
			}

      if(filter.length === 0 && search.length > 0){
        this.icons = [];
      }
      
		},
      copy(){
        this.$refs.clone.focus();
        document.execCommand('copy');
      }
      
    },
  };
</script>


<style scoped>
  .iconPicker__icons{
    display: table;
  }
  .iconPicker__icons .item{
    float: left;
    width: 25px;
    height: 25px;
    margin: 0 12px 12px 0;
    text-align:  center;
    border-radius: 3px;
    font-size:14px;
    box-shadow: 0 0 0 1px;
    color: inherit;

  }
  .iconPicker__icons .item.selected{
    background: #ccc
  }
  .iconPicker__icons .item i {
    box-sizing: content-box;
  }
</style>