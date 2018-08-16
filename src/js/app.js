var app = new Vue({
    el: '#app',
    data: {
      editingName:false,  
      resume:{
          name:'chil',
          gender: 'girl',
          birthday: '97.1',
          job: '前端开发',
          phone: '15700000000',
          email: 'example@e.com'
      }
    },
    methods:{
       onedit(key,value){
           this.resume[key] = value
       }
    }
  })