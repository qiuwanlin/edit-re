var app = new Vue({
    el: '#app',
    data: {
        linkvisible:false,
        loginvisible: false,
        signupvisible: false,
        editingName: false,
        linkvisible: false,
        previewUser:{objectId: undefined},
        previewResume:{},
        currentUser: {
            objectId: undefined,
            email: undefined
        },
        resume: {
            name: 'chil',
            gender: 'girl',
            birthday: '97.1',
            job: '前端开发',
            phone: '15700000000',
            email: 'example@e.com',
            skills:[
                {name:'请写技能名称',description:'请描述技能'},
                {name:'请写技能名称',description:'请描述技能'},
                {name:'请写技能名称',description:'请描述技能'},
                {name:'请写技能名称',description:'请描述技能'},
            ],
            projects:[
                {name:'项目名称',link:'http://.',keywords:'关键词',description:'详细描述'},
                {name:'项目名称',link:'http://.',keywords:'关键词',description:'详细描述'}
            ]
        },
        login: {
            email: '',
            password: ''
        },
        signup: {
            email: '',
            password: ''
        },
        sharelink:'000',
        mode: 'edit'
    },
    computed:{
        displayRe(){
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
    watch:{
        'currentUser.objectId':function(newValue,oldValue){
            if(newValue){
                this.get(this.currentUser)
            }
        }

    },
    methods: {
        onedit(key, value) {
        //this.resume[key] = value
            let regex = /\[(\d+)\]/g
           key= key.replace(regex,(match,number)=>`.${number}`)
           keys = key.split('.')
           let result = this.resume
           for(let i=0;i<keys.length;i++){
               if(i===keys.length-1){
                   result[keys[i]]=value
               }else{
                result = result[keys[i]]
               }
           }
           result = value
        },
        haslogin() {
            return !!this.currentUser.objectId
        },
        onlogin() {
            AV.User.logIn(this.login.email, this.login.password).then((user) => {
                alert('登录成功')
                user = user.toJSON()
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                this.loginvisible = false
            }, function (error) {
                if (error.code === 211) {
                    alert('用户不存在')
                } else if (error.code === 210) { alert('用户名密码不匹配') }
            })
        },
        onlogout() {
            AV.User.logOut();
            alert('已退出当前用户')
            window.location.reload()
        },
        onsignup() {
            const user = new AV.User();
            user.setUsername(this.signup.email);
            user.setPassword(this.signup.password);
            user.setEmail(this.signup.email);
            user.signUp().then((user) => {
                alert('注册成功')
                user = user.toJSON()
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                this.signupvisible = false
            }, (error) => {
                alert(error.rawMessage)
            });
        },
        clicksave() {
            let currentUser = AV.User.current();
            if (!currentUser) {
                this.loginvisible = true
            } else {
                this.save()
            }

        },
        save() {
            let { objectId } = AV.User.current().toJSON()
            let user = AV.Object.createWithoutData('User', objectId);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save().then(() => {
                alert('保存成功')
            }, () => {
                alert('保存失败')
            })
        },
        get(user) {
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user)=> {
                let resume = user.toJSON().resume
                return resume
            }, (error)=> {
            });
        },
        addskill(){
            this.resume.skills.push({name:'请写技能名称',description:'请描述技能'})
        },
        removeskill(i){
            this.resume.skills.splice(i,1)
        },
        addpro(){
            this.resume.projects.push({name:'项目名称',link:'http://.',keywords:'关键词',description:'详细描述'})
        },
        removepro(i){
            this.resume.projects.splice(i,1)
        }
    },
})

let cur = AV.User.current()
if (cur) {
    app.currentUser = cur.toJSON()
    app.sharelink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    console.log('cur'+ app.currentUser.objectId)
    app.get(app.currentUser).then(resume=>{
        app.resume = resume
    })
}

let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
if(matches){
    app.previewUser.objectId = matches[1]
    app.mode = 'preview'
    console.log('pr' + app.previewUser.objectId);
    app.get(app.previewUser).then(resume =>{
        app.previewResume = resume
    })   
}
 //http://127.0.0.1:8080/src/?user_id=5b7963ea756571003be142f7


