var app = new Vue({
    el: '#app',
    data: {
        loginvisible: false,
        signupvisible: false,
        editingName: false,
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
        onlogin() {
            AV.User.logIn(this.login.email, this.login.password).then(function (loggedInUser) {
                console.log(loggedInUser);
            }, function (error) {
                if (error.code === 211) {
                    alert('用户不存在')
                } else if (error.code === 210) { alert('用户名密码不匹配') }
            })
        },
        onlogout(){
            AV.User.logOut();
            alert('已退出当前用户')
            window.location.reload()
        },
        onsignup() {
            console.log(this.signup)
            const user = new AV.User();
            user.setUsername(this.signup.email);
            user.setPassword(this.signup.password);
            user.setEmail(this.signup.email);
            user.signUp().then(function (user) {
                console.log(user);
            }, function (error) {
            });
        },
        clicksave() {
            var currentUser = AV.User.current();
            console.log(currentUser)
            if (!currentUser) {
                this.loginvisible = true
            } else {
                this.save()
            }

        },
        save() {
            let {id} = AV.User.current()
            var user = AV.Object.createWithoutData('User', id);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save();
        }
    },
})