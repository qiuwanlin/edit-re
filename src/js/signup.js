Vue.component('signup', {
    data() {
        return {
            signup: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        onsignup() {
            const user = new AV.User();
            user.setUsername(this.signup.email);
            user.setPassword(this.signup.password);
            user.setEmail(this.signup.email);
            user.signUp().then((user) => {
                user = user.toJSON()
                this.$emit('signup',user)
                // this.currentUser.objectId = user.objectId
                // this.currentUser.email = user.email
                // this.signupvisible = false
            }, (error) => {
                alert(error.rawMessage)
            });
        },
        clicklogin(){
            this.$emit('gotologin')
        }
    },
    template: `
    <div class="signup" v-cloak>
            <form class="form" @submit.prevent="onsignup">
                <h2>注册</h2>
                <button type="button"  @click="$emit('close')">关闭</button>
                <div class="row">
                    <label>邮箱</label>
                    <input type="text" v-model="signup.email">
                </div>
                <div class="row">
                    <label>密码</label>
                    <input type="text" v-model="signup.password">
                </div>
                <div class="actions">
                    <button type="submit">提交</button>
                    <a href="#" @click="clicklogin">登录</a>
                </div>
            </form>
        </div>
    `
})