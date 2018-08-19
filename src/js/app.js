var app = new Vue({
    el: '#app',
    data: {
        loginvisible: false,
        signupvisible: false,
        editingName: false,
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
            email: 'example@e.com'
        },
        login: {
            email: '',
            password: ''
        },
        signup: {
            email: '',
            password: ''
        }
    },
    methods: {
        onedit(key, value) {
            this.resume[key] = value
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
        get() {
            var query = new AV.Query('User');
            query.get(this.currentUser.objectId).then((user)=> {
                let resume = user.toJSON().resume
                this.resume = resume
            }, (error)=> {

            });
        }
    },
})
let cur = AV.User.current()
if (cur) {
    app.currentUser = cur.toJSON()
    app.get()
    //console.log(app.currentUser)
}