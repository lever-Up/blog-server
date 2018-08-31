<template>
    <div class="b-modal" v-if="visible" @click="hide($event)">
        <div class="b-modal-wrap">
            <div class="b-modal-title t-default" v-if="title">{{title}}</div>
            <div class="b-modal-body">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            title: { type: String },
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            show() {
                this.visible = true;
                $('body').css('overflow', 'hidden');
            },
            hide(event) {
                if( (event && event.target.className === 'b-modal') || !event ) {
                    $('body').css('overflow', 'initial');
                    this.visible = false;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import (reference) "../css/mixin.less";
    .bm-box {
        background-color: #fff;
        border-radius: 20*@base;
    }
    .b-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(76, 76, 76, 0.5);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fade-in 0.5s;
        overflow-y: auto;
        -webkit-transform: translateZ(0);
        &-wrap {
            min-width: 100px;
            max-width: 90%;
            min-height: 100px;
            max-height: 95%;
            position: relative;
            animation: show-modal 0.5s;

            .b-modal-title {
                text-align: center;
                padding: 15*@base 0 5*@base;
                font-size: 40*@base;
                color: #fefefe;
            }
            .b-modal-body {
                .bm-box;
            }
        }
        &-body {
            color: #333;
            padding: 15px;
        }
    }
    @keyframes show-modal {
        0% {
            opacity: 0;
            transform: translate(0,-10px);
        }
        100% {
            opacity: 1;
            transform: translate(0);
        }
    }
</style>