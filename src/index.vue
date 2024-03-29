<template>
    <div class="main">
        <div id="myCanvasContainer">
            <canvas id="myCanvas" v-my-tag-canvas="members"></canvas>
        </div>
        <div class="lucky-guys" v-if="currentLuckyGuys.length > 0">
            <div class="list">
                <span class="guy" v-for="(guy, $index) in currentLuckyGuys" :key="$index">
                    {{getMemberTitle(guy)}}<br/>
                    {{guy.jobNo}}
                    <img class="delete" src="./assets/imgs/tab_delete.png" @click="deleteAbsentee(guy)"/>
                </span>
            </div>
        </div>
        <button class="trigger success" @click="toggleRolling()">{{!rolling ? '开始':'停止'}}</button>

        <div class="tool-bar">
            <div class="config-trigger" @click="toggleConfigView()">{{hideConfig ? '展开':'收起'}}</div>
            <div class="content" v-show="!hideConfig">
                <div class="bar">
                    <h2 class="label">奖项：</h2>
                    <template v-for="grade in grades">
                        <input
                                :id="grade.key"
                                class="grade"
                                type="radio"
                                :value="grade.key"
                                v-model="currentGrade.key"
                                @click="selectGrade(grade)"><label :for="grade.key">{{grade.text}}</label>
                    </template>
                </div>
                <div class="bar">
                    <h2 class="label">每次抽取：</h2>
                    <template v-for="roundSize in roundSizes">
                        <input
                                :id="roundSize"
                                class="round-size"
                                type="radio"
                                :value="roundSize"
                                v-model="currentRoundSize"
                        ><label :for="roundSize">{{roundSize}}个</label>
                    </template>
                    <input class="customer" placeholder="输入正整数" @blur="validateRoundSize()" v-model="currentRoundSize"/>
                </div>

                <div class="lucky-list">
                    <h2>{{currentGrade.text}}(<span class="counter">{{currentGrade.list.length}}/{{currentGrade.limitedCount}}</span>)</h2>
                    <ul>
                        <li v-for="(luckyGuy,$index) in currentGrade.list" :key="$index">
                            <i class="delete" @click="deleteAbsentee(luckyGuy)"/>{{getMemberTitle(luckyGuy)}}
                        </li>
                    </ul>
                </div>

                <button class="warning" @click="reset()">重置(危险)</button>
            </div>
        </div>
    </div>
</template>

<script>
    import members from './configs/members';
    import grades from './configs/grades';
    import tagCanvasConfig from './configs/tagCanvas';
    let machine = tagCanvasConfig.sphere; //球体-sphere, 滚筒-hcylinder

    function renderTagList (el, dataList){
        let html = [ '<ul>' ];
        dataList.forEach(function(item){
            html.push(`<li><a href="#" style="color: ${item.selected ? '#1cb841': 'white'};">${item.department ? item.department + '-' : ''}${item.name}</a></li>`);
        });
        html.push('</ul>');
        el.innerHTML = html.join('');
    }


    export default {
        name: "index",
        data: function () {
            return {
                hideConfig: true,
                members: members, //抽奖名单
                grades: grades, //奖次配置
                currentGrade: grades[0],
                luckyGuys: {
                    key: '总获奖名单',
                    list: []
                }, //获奖总名单
                currentLuckyGuys: [],
                absenteeList:{
                    key: '缺席名单',
                    list: []
                }, //中奖缺席名单
                remainingList: [], //待抽取的名单
                roundSizes: [10, 5, 1],
                currentRoundSize: 10,
                rolling: false
            }
        },
        created(){
            //1.获奖名单
            this.luckyGuys.list = JSON.parse(localStorage.getItem(this.luckyGuys.key)) || [];
            this.validateRepetition(this.luckyGuys.list);

            //2.缺席名单
            this.absenteeList.list = JSON.parse(localStorage.getItem(this.absenteeList.key)) || [];

            //3.未被抽到的名单
            if(this.luckyGuys.list.length>0){
                let _self = this;
                this.remainingList = this.members.filter(function (v) {
                    let isLuckyGuy = _self.luckyGuys.list.findIndex(function (guy) {
                        return guy.name == v.name && guy.jobNo == v.jobNo
                    }) != -1;

                    let isAbsentee = _self.absenteeList.list.findIndex(function (guy) {
                        return guy.name == v.name && guy.jobNo == v.jobNo
                    }) != -1;

                    return !(isLuckyGuy || isAbsentee)
                });
            }else{
                this.remainingList = JSON.parse(JSON.stringify(this.members));
            }

            this.markLuckyGuys(this.members, this.luckyGuys.list.concat(this.absenteeList.list));

            //4.获取各等级奖项已经抽出的名单
            this.grades.map(function (value) {
                let luckyGuys = JSON.parse(localStorage.getItem(value.text));
                return value.list = luckyGuys || [];
            });
        },
        methods: {
            validateRepetition(list){
                let repetition = list.filter(function(o,i,arr){
                    return arr.findIndex(function (v) {
                        return o.jobNo == v.jobNo
                    }) != i;
                });
                if(repetition.length) {
                    console.error(repetition);
                    alert('有重复，快排查！');
                }
            },

            getMemberTitle(member){
                return member.department ? member.department + '-' + member.name : member.name;
            },

            selectGrade(grade){
                this.currentLuckyGuys = [];

                this.currentRoundSize = grade.roundSize;

                this.currentGrade = grade;

                this.currentGrade.list = JSON.parse(localStorage.getItem(grade.text)) || [];
            },

            reset(){
                if(confirm('确定要重置么？所有之前的抽奖历史将被清除！')){
                    localStorage.clear();
                    location.reload(true);
                }
            },

            toggleRolling(){
                if (this.remainingList.length == 0){
                    alert('所有的人都被抽过了！');
                    return
                }

                //隐藏右侧配置区域
                this.hideConfig = true;

                this.currentLuckyGuys = [];

                if(this.rolling){
                    this.chooseLuckyGuysRandomly(this.currentRoundSize, this.currentGrade);
                    TagCanvas.SetSpeed('myCanvas', machine.normalSpeed);
                }else{
                    if(!this.validateGrade(this.currentGrade)){
                        return;
                    }

                    TagCanvas.SetSpeed('myCanvas', machine.quickSpeed);
                }
                this.rolling = !this.rolling;
            },

            toggleConfigView(){
                this.hideConfig = !this.hideConfig;

                //隐藏最近一次的抽奖结果
                this.currentLuckyGuys = [];
            },

            validateGrade: function (grade) {
                if(grade && grade.list.length >= grade.limitedCount && grade.key != 0){
                    return alert( '【警告⚠️】' + grade.text + '已经抽取' +  grade.limitedCount + '个! ' )
                }
                return true;
            },

            validateRoundSize(){
                if(isNaN(this.currentRoundSize) || !this.currentRoundSize){
                    alert('请输入正整数');
                    this.currentRoundSize = this.currentGrade.roundSize;
                }
            },

            chooseLuckyGuysRandomly(roundSize, grade){
                roundSize = (Number(roundSize) + Number(grade.list.length) > grade.limitedCount) ? (Number(grade.limitedCount) - Number(grade.list.length)) : roundSize;

                for (let i = 0; i < roundSize; i++){
                    let index = Math.floor(Math.random() * this.remainingList.length);
                    let luckyGuy = this.remainingList[index];
                    luckyGuy.garde = grade.text;

                    this.currentLuckyGuys.push(luckyGuy);
                    this.luckyGuys.list.push(luckyGuy);
                    this.remainingList.splice(index, 1);
                }
                this.validateRepetition(this.luckyGuys.list);

                grade.list = grade.list.concat(this.currentLuckyGuys);

                localStorage.setItem(grade.text, JSON.stringify(grade.list));
                localStorage.setItem(this.luckyGuys.key, JSON.stringify(this.luckyGuys.list));

                this.markLuckyGuys(this.members, grade.list);

                renderTagList(document.getElementById('myCanvas'), this.members);
                TagCanvas.Reload('myCanvas');
            },

            markLuckyGuys(memberList = [], luckGuys = []){
                memberList = memberList.map((item, i) => {
                    let index = luckGuys.findIndex((v)=>{
                        return item.jobNo == v.jobNo;
                    });

                    if(index != -1){
                        return item.selected = true;
                    }
                });
            },

            deleteAbsentee(guy){
                if(confirm(`是否要删除【${guy.name}】`)){
                    //1.从本轮名单中删除
                    this.currentLuckyGuys.splice(this.currentLuckyGuys.findIndex(function (v) {
                        return v.name == guy.name && v.jobNo == guy.jobNo;
                    }),1);

                    //2.从本次奖项名单中删除
                    this.currentGrade.list.splice(this.currentGrade.list.findIndex(function (v) {
                        return v.name == guy.name && v.jobNo == guy.jobNo;
                    }),1);
                    localStorage.setItem(this.currentGrade.text, JSON.stringify(this.currentGrade.list));

                    //3.从总的获奖名单中删除
                    this.luckyGuys.list.splice(this.luckyGuys.list.findIndex(function (v) {
                        return v.name == guy.name && v.jobNo == guy.jobNo;
                    }),1);
                    localStorage.setItem(this.luckyGuys.key, JSON.stringify(this.luckyGuys.list));


                    //4.存储到缺席名单中
                    this.absenteeList.list.push(guy);
                    localStorage.setItem(this.absenteeList.key, JSON.stringify(this.absenteeList.list));
                }
            }

        },
        directives: {
            myTagCanvas: {
                inserted: function (el, binding) {
                    el.width = document.body.offsetWidth -100;
                    el.height = document.body.offsetHeight -100;

                    renderTagList(el, binding.value);

                    TagCanvas.Start('myCanvas', '', {
                        shape: machine.shape,
                        initial: machine.normalSpeed,
                        dragControl: 1,
                        shuffleTags: true,
                        textColour: '',
                        noMouse: true,
                    });
                }
            }
        }
    }
</script>

<style lang="less">
    @import "./assets/css/reset";
    @import "./assets/css/index";
</style>
