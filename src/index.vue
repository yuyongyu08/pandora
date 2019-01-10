<template>
    <div class="main">
        <div id="myCanvasContainer">
            <canvas width="500" height="500" id="myCanvas" ref="myCanvas">
                <ul>
                    <li class="member" v-for="member in members">
                        <a href="#" >{{member.department}}-{{member.name}}</a>
                    </li>
                </ul>
            </canvas>
        </div>
        <div>
            <button v-if="rolling" @click="start()">开始</button>
            <button v-else @click="stop()">停止</button>
        </div>
    </div>
</template>

<script>
    import members from './config/members';
    import grades from './config/grades';

    window.onload = function() {
        try {
            TagCanvas.Start('myCanvas');
        } catch(e) {
            // something went wrong, hide the canvas container
            document.getElementById('myCanvasContainer').style.display = 'none';
        }
    };

    export default {
        name: "index",
        data: function () {
            return {
                members: members,
                grades: grades,
                rolling: false
            }
        },
        created(){
            // TagCanvas.Start('myCanvas');
            // console.log(this.$refs);
            // this.$refs.myCanvas.width = document.body.offsetWidth;
            // this.$refs.myCanvas.height = document.body.offsetHeight;
        },
        methods: {
            start(){
                TagCanvas.SetSpeed('myCanvas', [0.5, -0.25]);
            },


            stop(){
                TagCanvas
            }
        }
    }
</script>

<style lang="less">
    .main{
        color: red;

        .member{
            color: #000;
        }
    }
</style>