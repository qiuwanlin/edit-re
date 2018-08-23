var app = new Vue({
    el: '#app',
    data: {
        logoutvisible: true,
        skinvisible: false,
        loginvisible: false,
        signupvisible: false,
        editingName: false,
        linkvisible: false,
        previewUser: { objectId: undefined },
        previewResume: {},
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
            skills: [
                { name: '请写技能名称', description: '请描述技能' },
                { name: '请写技能名称', description: '请描述技能' },
                { name: '请写技能名称', description: '请描述技能' },
                { name: '请写技能名称', description: '请描述技能' },
            ],
            projects: [
                { name: '项目名称', link: 'http://.', keywords: '关键词', description: '详细描述' },
                { name: '项目名称', link: 'http://.', keywords: '关键词', description: '详细描述' }
            ]
        },
        sharelink: '000',
        mode: 'edit',
    },
    computed: {
        displayRe() {
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
    watch: {
        'currentUser.objectId': function (newValue, oldValue) {
            if (newValue) {
                this.get(this.currentUser).then((resume) => this.resume = resume)
            }
        }

    },
    methods: {
        changeskin() { this.skinvisible = !this.skinvisible },
        onshare() {
            if (this.haslogin()) {
                this.linkvisible = true
            } else { alert('请登录') }
        },
        login(user) {
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
            this.get(this.currentUser)
            this.loginvisible = false
            this.logoutvisible = true
        },
        onedit(key, value) {
            //this.resume[key] = value
            let regex = /\[(\d+)\]/g
            key = key.replace(regex, (match, number) => `.${number}`)
            keys = key.split('.')
            let result = this.resume
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    result[keys[i]] = value
                } else {
                    result = result[keys[i]]
                }
            }
            result = value
        },
        haslogin() {
            return !!this.currentUser.objectId
        },
        onlogout() {
            AV.User.logOut();
            alert('已退出当前用户')
            this.logoutvisible = false
            window.location.reload()
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
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                return resume
            }, (error) => {
            });
        },

        print() {
            window.print()
        },
    },
})

let cur = AV.User.current()
if (cur) {
    app.currentUser = cur.toJSON()
    app.sharelink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    console.log('cur' + app.currentUser.objectId)
    app.get(app.currentUser).then(resume => {
        app.resume = resume
    })
}

let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
if (matches) {
    app.previewUser.objectId = matches[1]
    app.mode = 'preview'
    app.get(app.previewUser).then(resume => {
        app.previewResume = resume
    })
}
 //http://127.0.0.1:8080/src/?user_id=5b7963ea756571003be142f7


