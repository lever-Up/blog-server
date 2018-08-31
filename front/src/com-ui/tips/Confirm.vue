<template>
    <div class="b-confirm">
        <div class="b-confirm-wrap">
            <span class="b-confirm-close" @click="btnClose()"></span>
            <div v-if="title" class="b-confirm-title">{{title}}</div>
            <div v-if="msg" class="b-confirm-msg" v-html="msg"></div>
            <div class="b-confirm-foot">
                <div class="btn btn-cancel" @click="btnClose()">取消</div>
                <div class="btn btn-ok" @click="btnOk()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "confirm",
        props: {
            title: {type: String},
            msg: {type: String},
            close: {type: Function},
            ok: {type: Function},
        },
        created() {
            $('body').css('overflow-y', 'hidden');
        },
        methods: {
            hide() {
                $('body').css('overflow-y', 'initial');
                document.body.removeChild(this.$el);
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
    @import (reference) "./tips.less";

    .b-confirm {
        .b-tips;
        &-wrap {
            .b-tips-wrap;
            background-color: #6a3ae7;
            box-shadow: 0 0 30*@base 0 #33185b;
            border-radius: 25*@base;
            border: solid 5*@base #8657ff;
            position: relative;
            font-size: 24*@base;
            color: #fff;
            padding: 38*@base 30*@base;
        }
        &-title {
            font-weight: 600;
        }
        &-msg {
            line-height: 36*@base;
        }
        &-foot {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 29*@base;
            .btn {
                width: 190*@base;
                text-align: center;
                border-radius: 30*@base;
                font-size: 24*@base;
                height: 60*@base;
                padding: 17*@base 0;
                box-sizing: border-box;
                &-ok {
                    background-color: #00ffff;
                    color: #422198;
                }
                &-cancel {
                    background-color: #422198;
                    margin: 0 20*@base 0 0;
                }
            }
        }
        &-close {
            position: absolute;
            top: 0;
            right: 0;
            background-color: #8657ff;
            background-image: url("../../images/icon-x.png");
            background-position: 70% 35%;
            background-size: 21*@base 21*@base;
            background-repeat: no-repeat;
            width: 50*@base;
            height: 50*@base;
            border-bottom-left-radius: 92%;
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