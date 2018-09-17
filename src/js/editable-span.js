Vue.component('editable-span',{
    props:['value','disabled'],
    template:`
    <span class="editspan">
    &nbsp;
     <span v-show="!editing">{{value}}</span>
     <input v-show="editing" type="text" v-bind:value="value" @input="triggerEdit">
     <svg v-if='!disabled' class="icon" aria-hidden="true" @click="editing=!editing">
                <use xlink:href="#icon-edit"></use>
     </svg>
    </span>
    `,
    data(){
        return{
            editing:false
        }
    },
    methods:{
        triggerEdit(e){
            this.$emit('edit',e.target.value)
        }
    }
})    