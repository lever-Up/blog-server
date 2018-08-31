<template>
    <div class="b-alert" @click="hide($event)">
        <div class="b-alert-wrap">
            <span class="b-alert-btn" @click="btnClose()"></span>
            <div v-if="msg" class="b-alert-msg">{{msg}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            msg: {type: String},
            close: {type: Function}
        },
        created() {
            $('body').css('overflow-y', 'hidden');
        },
        methods: {
            hide(event) {
                if( (event && event.target.className === 'b-tips') || !event ) {
                    $('body').css('overflow-y', 'initial');
                    document.body.removeChild(this.$el);
                }
            },
            btnClose() {
                if(this.close) {
                    this.close(this)
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

    .b-alert {
        .b-tips;
        &-wrap {
            .b-tips-wrap;
            background-color: #fff;
            box-shadow: 0 0 15px 0 #444;
            border-radius: 8px;
            /*border: solid 5*@base #8657ff;*/
            position: relative;
        }
        &-msg {
            color: #333;
            margin: 22px 0;
            font-size: 16px;
            padding: 0 30px;
        }
        &-btn {
            position: absolute;
            top: 0;
            right: 0;
            background-color: #666;
            background-image: url("../../images/icon-x.png");
            background-position: 65% 38%;
            background-size: 10px 10px;
            background-repeat: no-repeat;
            width: 30px;
            height: 28px;
            border-bottom-left-radius: 100%;
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