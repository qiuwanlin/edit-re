Vue.component('app-aside',{
    props:['logoutvisible'],
    template:`
    <aside>
    <div class="up">
        <ul class="actions">
            <li>
                <button class="button" @click="$emit('clicksave')">保存</button>
            </li>
            <li>
                <button @click="$emit('clickshare')">分享</button>
            </li>
            <li>
                <button @click="$emit('clickprint')">打印</button>
            </li>
            <li>
                <button @click="$emit('clickchangeskin')">换肤</button>
            </li>
        </ul>
    </div>
    <div class="down">
        <button class="button" @click="$emit('logout')" v-show="logoutvisible">登出</button>
    </div>
</aside>`
})