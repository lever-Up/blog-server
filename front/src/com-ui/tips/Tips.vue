<template>
    <div class="b-tips" @click="hide($event)">
        <div class="b-tips-wrap">
            <div v-if="title" class="b-tips-title">{{title}}</div>
            <div v-if="msg" class="b-tips-msg">{{msg}}</div>
            <div class="b-tips-foot">
                <div class="btn btn-cancel" @click="btnClose()">关闭</div>
                <div v-if="type==='confirm'" class="btn btn-ok" @click="btnOk()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tips",
        props: {
            type: {type: String, default: ()=>'alert'}, // alert / confirm
            title: {type: String},
            msg: {type: String},
            close: {type: Function},
            ok: {type: Function},
        },
        created() {
            $('body').css('overflow', 'hidden');
        },
        methods: {
            hide(event) {
                if( (event && event.target.className === 'b-tips') || !event ) {
                    $('body').css('overflow', 'initial');
                    document.body.removeChild(this.$el);
                }
            },
            btnClose() {
                if(this.close) {
                    this.close(this)
                }else{
                    this.hide()
                }
            },
            btnOk() {
                if(this.ok) {
                    this.ok(this)
                }else{
                    this.hide()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import (reference) "../../css/mixin.less";

    .b-tips {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.2);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fade-in 0.5s;
        &-wrap {
            border-radius: 3px;
            box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
            background-color: #fff;
            min-width: 50%;
            max-width: 90%;
            min-height: 100*@base;
            max-height: 90%;
            position: relative;
            padding: 25*@base 10*@base 20*@base;
            overflow: auto;
            animation: show-alert 0.5s;
            text-align: center;
        }
        &-title {
            font-weight: 600;
        }
        &-msg {
            margin: 30*@base 0;
        }
        &-foot {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .btn {
                width: 40%;
                padding: 6*@base 0;
                text-align: center;
                border: solid 1px #999;
                border-radius: 4px;
                &:active {
                    opacity: 0.8;
                }
            }
        }
    }
    @keyframes show-alert {
        0% {
            transform: scale(0.7);
        }
        100% {
            transform: scale(1);
        }
    }
</style>