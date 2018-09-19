Vue.component('skin', {
    methods:{
        setTheme(name){
            document.body.className = name
        }
    },
    template: `
    <div  class="skin">
            <div @click="setTheme('white')" class="pinkskin"></div>
            <div @click="setTheme('green')" class="greenskin"></div>
            <svg class="stop"  @click="$emit('stop')" ><use xlink:href="#icon-circle-remove"></use></svg>
    </div>
    `
})