Vue.component('share', {
    props:['sharelink'],
    template: `
    <div class="share" v-cloak>
    <h2>分享链接</h2>
    <div><textarea readonly>{{sharelink}}</textarea></div>
</div>
    `
})