Vue.component('login', {
    data() {
        return {
            login: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        onlogin() {
            AV.User.logIn(this.login.email, this.login.password).then((user) => {
                user = user.toJSON()
                this.$emit('login',user)
                // this.currentUser.objectId = user.objectId
                // this.currentUser.email = user.email
                // this.loginvisible = false
            }, function (error) {
                if (error.code === 211) {
                    alert('用户不存在')
                } else if (error.code === 210) { alert('用户名密码不匹配') }
            })
        },
        clicksignup(){
            this.$emit('gotosignup')
        }
    },
    template: `
    <div class="login" v-cloak>
      <div class="log">
            <form class="form" @submit.prevent="onlogin">
                <h2>登录</h2>
                <div class="row">
                    <label>邮箱</label>
                    <input type="text" v-model="login.email">
                </div>
                <div class="row">
                    <label>密码</label>
                    <input type="text" v-model="login.password">
                </div>
                <div class="actions">
                    <button type="submit">登录</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="#" @click="clicksignup">注册</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <svg class="remove l"  @click="$emit('close')"><use xlink:href="#icon-circle-remove"></use></svg>
                </div>    
            </form>
       </div>
    </div>
    `
})