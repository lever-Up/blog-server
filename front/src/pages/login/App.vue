<template>
    <div class="login">
        <img src="../../images/logo.png" alt="" class="logo">
        <input class="text" type="text" placeholder="用户名" v-model="username">
        <input class="text" type="password" placeholder="密码" v-model="password">
        <button class="btn" @click="onLogin()">登录</button>
    </div>
</template>

<script>
    import request from '../../utils/request';
    import utils from '../../utils';
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            onLogin() {
                let data = {
                    username: this.username,
                    password: this.password
                };
                console.log(data);
                request('/blog/admin/login', {
                    method: 'post',
                    data: data
                }).then( ret => {
                    if(ret.code === 0) {
                        utils.toHome();
                    } else {
                        this.$alert({msg: ret.msg})
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .login {
        border: solid 1px #c3c3c3;
        border-radius: 6px;
        padding: 15px 25px 40px;
        box-sizing: border-box;
        width: 320px;
        margin: 12px 25px;
        display: flex;
        flex-direction: column;
        .logo {
            width: 120px;
            margin: 10px auto;
        }
        .text {
            margin: 10px 0;
            height: 40px;
            border: solid 1px #ccc;
            border-radius: 3px;
            box-sizing: border-box;
            padding: 0 8px;
            &:focus {
                border-color: #01a2ff;
            }
        }
        .btn {
            border: solid 1px #ccc;
            background-color: #19bcff;
            color: #fff;
            height: 40px;
            border-radius: 4px;
            font-size: 16px;
            margin-top: 20px;
            cursor: pointer;
            &:active {
                background-color: #28b0ff;
            }
        }
    }
</style>
