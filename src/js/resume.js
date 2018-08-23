Vue.component('resume',{
    props:['mode','displayRe'],
    data(){
        return{
        }
    },
    methods:{
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
        },
        onedit(){
            this.$emit('onedit',)
        }
    },
    template:`<div class="resume">
    <section class="profile">
        <h1>
            <editable-span :disabled="mode==='preview'" v-bind:value="displayRe.name" v-on:edit="onedit('name',$event)"></editable-span>
        </h1>
        <p>应聘职位:
            <editable-span :disabled="mode==='preview'" :value="displayRe.job" @edit="onedit('job',$event)"></editable-span>
        </p>
        <p class="profile">
            <editable-span :disabled="mode==='preview'" :value="displayRe.birthday" @edit="onedit('birthday',$event)"></editable-span>|
            <editable-span :disabled="mode==='preview'" :value="displayRe.gender" @edit="onedit('gender',$event)"></editable-span>|
            <editable-span :disabled="mode==='preview'" :value="displayRe.email" @edit="onedit('email',$event)"></editable-span>|
            <editable-span :disabled="mode==='preview'" :value="displayRe.phone" @edit="onedit('phone',$event)"></editable-span>
        </p>
    </section>
    <section class="skills">
        <h2>技能</h2>
        <ul>
            <li v-for="skill,i in displayRe.skills">
                <editable-span :disabled="mode==='preview'" class="name" :value="skill.name" @edit="onedit('skills['+i+'].name',$event)"></editable-span>
                <div class="description">
                    <editable-span :disabled="mode==='preview'" :value="skill.description" @edit="onedit('skills['+i+'].description',$event)"></editable-span>
                </div>
                <span class="remove" v-if="i>=4 && mode==='edit'" @click="removeskill(i)">X</span>
            </li>
            <li v-if="mode==='edit'">
                <span @click="addskill">ADD</span>
            </li>
        </ul>
    </section>
    <section class="projects">
        <h2>项目经历</h2>
        <ol>
            <li v-for="pro,i in displayRe.projects">
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
                </p>
                <span class="remove" v-if="i>=2 && mode==='edit'" @click="removepro(i)">X</span>
            </li>
            <li v-if="mode==='edit'">
                <span @click="addpro">ADD</span>
            </li>
        </ol>
    </section>
</div>`
})