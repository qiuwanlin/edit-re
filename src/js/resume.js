Vue.component('resume',{
    props:['mode','displayRe'],
    data(){
        return{
        }
    },
    methods:{
        addskill(){
            this.displayRe.skills.push({name:'请写技能名称',description:'请描述技能'})
        },
        removeskill(i){
            this.displayRe.skills.splice(i,1)
        },
        addpro(){
            this.displayRe.projects.push({name:'项目名称',link:'http://.',keywords:'关键词',description:'详细描述'})
        },
        removepro(i){
            this.displayRe.projects.splice(i,1)
        },
        onedit(k,v){
            this.$emit('onedit',k,v)
        }
    },
    template:`
    <div class="resume">
    <section class="profile">
    <div class="xxx">
    <div class="man">
    <h1>
        <editable-span :disabled="mode==='preview'" v-bind:value="displayRe.name" v-on:edit="onedit('name',$event)"></editable-span>
    </h1>
    <p>应聘职位:
        <editable-span :disabled="mode==='preview'" :value="displayRe.job" @edit="onedit('job',$event)"></editable-span>
    </p>
    </div>
    <dl>
    <dt>生日</dt>
        <dd><editable-span :disabled="mode==='preview'" :value="displayRe.birthday" @edit="onedit('birthday',$event)"></editable-span></dd>
        <dt>性别</dt>
        <dd><editable-span :disabled="mode==='preview'" :value="displayRe.gender" @edit="onedit('gender',$event)"></editable-span></dd>
        <dt>邮箱</dt>
        <dd><editable-span :disabled="mode==='preview'" :value="displayRe.email" @edit="onedit('email',$event)"></editable-span></dd>
        <dt>电话</dt>
        <dd><editable-span :disabled="mode==='preview'" :value="displayRe.phone" @edit="onedit('phone',$event)"></editable-span></dd>
    </dl>
    </div>
    </section> 
     <section class="skills">
        <h2>技能</h2>
        <ul>
            <li class="ski" v-for="skill,i in displayRe.skills">
             <div>
                <editable-span :disabled="mode==='preview'" class="name" :value="skill.name" @edit="onedit('skills['+i+'].name',$event)"></editable-span>
                <div class="kuang"></div>
                <div class="description">
                    <editable-span :disabled="mode==='preview'" :value="skill.description" @edit="onedit('skills['+i+'].description',$event)"></editable-span>
                </div>
             </div>
             <svg class="remove s" v-if="i>=4 && mode==='edit'" @click="removeskill(i)"><use xlink:href="#icon-circle-remove"></use></svg>
            </li>
            <li v-if="mode==='edit'">
            <svg class="add" @click="addskill"><use xlink:href="#icon-add"></use></svg>
            </li>
        </ul>
     </section>
     <section class="projects">
        <h2>项目经历</h2>
        <ol>
            <li class="pro" v-for="pro,i in displayRe.projects">
                <header>
                    <div class="start">
                        <h3 class="name">
                            <editable-span :disabled="mode==='preview'" :value="pro.name" @edit="onedit('projects['+i+'].name',$event)"></editable-span>
                        </h3>
                        <span class="link">
                            <editable-span :disabled="mode==='preview'" :value="pro.link" @edit="onedit('projects['+i+'].link',$event)"></editable-span>
                        </span>
                    </div>
                    <div class="end">
                        <span class="keywords">
                            <editable-span :disabled="mode==='preview'" :value="pro.keywords" @edit="onedit('projects['+i+'].keywords',$event)"></editable-span>
                        </span>
                    </div>
                </header>
                <p class="description">
                    <editable-span :disabled="mode==='preview'" :value="pro.description" @edit="onedit('projects['+i+'].description',$event)"></editable-span>
                    <svg class="remove p" v-if="i>=2 && mode==='edit'" @click="removepro(i)"><use xlink:href="#icon-circle-remove"></use></svg>
                </p>
            </li>
            <li v-if="mode==='edit'">
                <svg class="add" @click="addpro"><use xlink:href="#icon-add"></use></svg>
            </li>
        </ol>
     </section>
    </div>`
})