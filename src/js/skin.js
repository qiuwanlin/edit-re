Vue.component('skin', {
    methods:{
        setTheme(name){
            document.body.className = name
        }
    },
    template: `
    <div  class="skin">
            <button @click="setTheme('white')">白</button>
            <button @click="setTheme('dark')">夜</button>
    </div>
    `
})