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
                    <img class="delete" src="./assets/imgs/tab_delete.png"/>
                </span>
            </div>
        </div>
        <button class="trigger success" @click="toggleRolling()">{{!rolling ? '开始':'停止'}}</button>

        <div class="tool-bar" :class="{'hide': hideConfig}">
            <div class="config-trigger" @click="hideConfig = !hideConfig">{{hideConfig ? '展开':'收起'}}</div>

            <div class="bar">
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
                        <i class="delete"/>{{getMemberTitle(luckyGuy)}}
                    </li>
                </ul>
            </div>

            <button class="warning" @click="reset()">重置(危险)</button>



        </div>
    </div>
</template>

<script>
    import members from './config/members';
    import grades from './config/grades';
    import tagCanvasConfig from './config/tagCanvas';
    let machine = tagCanvasConfig.sphere; //sphere, hcylinder

    export default {
        name: "index",
        data: function () {
            return {
                hideConfig: false,
                members: members, //抽奖名单
                grades: grades, //奖次配置
                currentGrade: grades[0],
                luckyGuys: [], //获奖总名单
                currentLuckyGuys: [],
                absenteeList:[], //中奖缺席名单
                remainingList: [], //待抽取的名单
                roundSizes: [10, 5, 1],
                currentRoundSize: 10,
                rolling: false
            }
        },
        watch: {
            // "currentRoundSize": function (newValue, oldValue) {
            //     if(isNaN(newValue)){
            //         alert('请输入正整数')
            //     }
            // }
        },
        created(){
            //1.获取已经抽取的名单和未抽取的名单
            this.luckyGuys = JSON.parse(localStorage.getItem('总获奖名单')) || [];
            console.log('已抽取的获奖名单', this.luckyGuys);

            if(this.luckyGuys.length>0){
                let _self = this;
                this.remainingList = this.members.filter(function (v) {
                    return _self.luckyGuys.findIndex(function (guy) {
                        return guy.name == v.name && guy.jobNo == v.jobNo
                    }) == -1
                });
            }else{
                this.remainingList = JSON.parse(JSON.stringify(this.members));
            }
            console.log('未被抽到的名单', this.remainingList);

            this.markLuckyGuys(this.members, this.luckyGuys);


            //2.获取各等级奖项已经抽出的名单
            this.grades.map(function (value) {
                let luckyGuys = JSON.parse(localStorage.getItem(value.text));
                return value.list = luckyGuys || [];
            });

            //3.获取缺席的名单（被抽中但没来的）
            this.absenteeList = JSON.parse(localStorage.getItem('缺席名单')) || [];
        },
        methods: {
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

            validateGrade: function (grade) {
                if(grade && grade.list.length >= grade.limitedCount){
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

                    this.currentLuckyGuys.push(luckyGuy);
                    this.luckyGuys.push(luckyGuy);
                }

                grade.list = grade.list.concat(this.currentLuckyGuys);

                localStorage.setItem(grade.text, JSON.stringify(grade.list));
                localStorage.setItem('总获奖名单', JSON.stringify(this.luckyGuys));

                this.markLuckyGuys(this.members, grade.list);
                TagCanvas.Reload('myCanvas');
            },

            markLuckyGuys(memberList = [], luckGuys = []){
                memberList = memberList.map((item) => {

                    let index = luckGuys.findIndex((v)=>{
                        return item.jobNo == v.jobNo;
                    });

                    if(index != -1){
                        return item.selected = true;
                    }

                });
            },

            deleteAbsentee(guy){
                //1.从本轮名单中删除
                //2.从本次奖项名单中删除
                //3.从总的获奖名单中删除
                //4.存储到缺席名单中
            }

        },
        directives: {
            myTagCanvas: {
                inserted: function (el, binding) {
                    console.log('binding.value', binding.value);

                    el.width = document.body.offsetWidth -100;
                    el.height = document.body.offsetHeight -100;


                    let html = [ '<ul>' ];
                    binding.value.forEach(function(item){
                        html.push(`<li><a href="#" style="color: ${item.selected ? '#ff9a28': 'white'};">${item.department ? item.department + '-' : ''}${item.name}</a></li>`);
                    });
                    html.push('</ul>');
                    el.innerHTML = html.join('');

                    // el.appendChild(canvas);

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
    html, body{
        width: 100%;
        height: 100%;
    }

    #myCanvasContainer{
        text-align: center;
    }

    button{
        display: inline-block;
        margin: 5px;
        padding: 10px;
        text-align: center;
        min-width: 60px;
        border-radius: 2px;
        border: none;
        background-color: #E6E6E6;
        color: #fff;
        font-size: 14px;

        &:focus {
            outline: 0
        }

        &.success {
            background: rgb(28, 184, 65);
        }

        &.warning {
            background: #ff2419;
            position: fixed;
            right: 20px;
            bottom: 20px;
        }
    }

    .main{
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: #121936 url(./assets/imgs/bgk.jpg) no-repeat center;
        background-size: 100% 100% ;

        .lucky-guys{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            text-align: center;

            .list{
                width: 700px;
                margin: 0 auto;
                position: relative;
                top: 20%;
            }

            .guy{
                display: inline-block;
                font-size: 20px;
                min-width: 100px;
                background: #fff;
                line-height: 30px;
                color: #1cb841;
                margin: 5px;
                border-radius: 10px;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.8);
                padding: 10px;
                position: relative;

                .delete{
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 25px;
                    height: 25px;
                }
            }
        }

        .trigger{
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }




        .tool-bar{
            position: absolute;
            top: 0;
            right: 0;
            color: #FFF;
            padding: 20px 10px;
            height: 100%;
            background-color: rgba(230, 230, 230, 0.1);

            &.hide{
                transform: translateX(100%);
            }

            .config-trigger{
                display: inline-block;
                position: absolute;
                top: 0;
                right: 100%;
                color: #fff;
                padding: 10px;
                background-color: rgba(230, 230, 230, 0.1);
            }

            .bar{
                line-height: 2em;
            }

            .grade, .round-size{
                line-height: 2em;
                vertical-align: text-top;
            }

            label{
                font-size: 18px;
                margin-right: 10px;
                margin-left: 3px;
            }

            .lucky-list{
                margin-top: 20px;

                h2{
                    font-size: 24px;
                    text-align: center;

                    .counter{
                        color: #ff9a28;
                    }
                }

                ul{
                    width: 350px;

                    li {
                        width: 110px;
                        line-height: 1.6em;
                        word-wrap: break-word;
                        word-break: keep-all;
                        display: inline-block;
                        margin-right: 5px;

                        .delete{
                            display: inline-block;
                            width: 15px;
                            height: 15px;
                            background: #ff2419 url("./assets/imgs/item_delete.png") no-repeat center;
                            background-size: 60%;
                            border-radius: 50%;
                            vertical-align: text-top;
                            margin-right: 3px;
                        }
                    }
                }
            }
        }

    }
</style>