<template>
    <div class="main">
        <div id="myCanvasContainer" v-my-canvas></div>
        <div class="lucky-guys" v-if="currentLuckyGuys.length > 0">
            <div class="list">
                <span class="guy" v-for="(guy, $index) in currentLuckyGuys" :key="$index">
                    {{guy.name}}<br/>
                    {{guy.jobNo}}
                </span>
            </div>
        </div>
        <button class="trigger" @click="toggleRolling()">{{!rolling ? '开始':'停止'}}</button>

        <div class="tool-bar">
            <div>
                <template v-for="grade in grades">
                    <input type="radio" :value="grade.key" v-model="currentGrade.key" @click="selectGrade(grade)"><label>{{grade.text}}</label>
                </template>
            </div>
            <div>
                <template v-for="roundSize in roundSizes">
                    <input type="radio" :value="roundSize" v-model="currentRoundSize" @click="selectRoundSize(roundSize)"><label>{{roundSize}}个</label>
                </template>
                <input v-model="currentRoundSize"/>
            </div>
            <button @click="reset()">重置</button>

            <div>
                <h2>{{currentGrade.text}}({{currentGrade.list.length}}/{{currentGrade.limitedCount}})</h2>
                <ul>
                    <li v-for="(luckyGuy,$index) in currentGrade.list" :key="$index">{{luckyGuy.name}}</li>
                </ul>
            </div>


        </div>
    </div>
</template>

<script>
    import members from './config/members';
    import grades from './config/grades';

    export default {
        name: "index",
        data: function () {
            return {
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


            //2.获取各等级奖项已经抽出的名单
            this.grades.map(function (value) {
                let luckyGuys = JSON.parse(localStorage.getItem(value.text));
                return value.list = luckyGuys || [];
            });

            //3.获取缺席的名单（被抽中但没来的）
            this.absenteeList = JSON.parse(localStorage.getItem('缺席名单')) || [];
        },
        methods: {
            selectGrade(grade){
                this.selectRoundSize(grade.roundSize);

                this.currentGrade = grade;

                this.currentGrade.list = JSON.parse(localStorage.getItem(grade.text)) || [];
            },

            selectRoundSize(size){
                this.currentRoundSize = size
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
                    TagCanvas.SetSpeed('myCanvas', [0.5, -0.25]);
                }else{
                    if(!this.validateGrade(this.currentGrade)){
                        return;
                    }

                    TagCanvas.SetSpeed('myCanvas', [5, 1]);
                }
                this.rolling = !this.rolling;
            },

            validateGrade: function (grade) {
                if(grade && grade.list.length >= grade.limitedCount){
                    return alert( '【警告⚠️】' + grade.text + '已经抽取' +  grade.limitedCount + '个! ' )
                }
                return true;
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
            },

            deleteAbsentee(guy){
                //1.从本轮名单中删除
                //2.从本次奖项名单中删除
                //3.从总的获奖名单中删除
            }

        },
        directives: {
            myCanvas: {
                // directive definition
                inserted: function (el) {
                    let canvas = document.createElement('canvas');
                    canvas.id = 'myCanvas';
                    // canvas.width = document.body.offsetWidth;
                    // canvas.height = document.body.offsetHeight;

                    canvas.width = 500;
                    canvas.height = 500;


                    let html = [ '<ul>' ];
                    members.forEach(function(item){
                        html.push(`<li><a href="#" style="color: red;">${item.department ? item.department + '-' : ''}${item.name}</a></li>`);
                    });
                    html.push('</ul>');
                    html.join('');

                    canvas.innerHTML = html;

                    el.appendChild(canvas);

                    TagCanvas.Start('myCanvas', '', {
                        shuffleTags: true
                    });
                }
            }
        }
    }
</script>

<style lang="less">
    @import "./assets/css/reset";

    button{
        display: inline-block;
        margin: 5px;
        padding: 10px 0;
        text-align: center;
        width: 50px;
        border-radius: 2px;
        border: none;
        background-color: #E6E6E6;
    }

    .main{
        width: 100%;
        height: 100%;
        background: url("./assets/imgs/bgk.jpg");

        .lucky-guys{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            background-color: rgba(149, 149, 149, .5);
            text-align: center;

            .list{
                width: 870px;
                margin: 0 auto;
                position: relative;
                top: 20%;
            }

            .guy{
                display: inline-block;
                font-size: 25px;
                width: 150px;
                background: #fff;
                line-height: 30px;
                color: #000;
                margin: 5px;
                border-radius: 10px;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.8);
                padding: 10px 0;
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
            background-color: #d5e7f3;

            button{
                /*position: absolute;*/
                /*bottom: 10px;*/
                /*margin-left: 50%;*/
            }
        }

    }
</style>