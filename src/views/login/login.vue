<template>
    <div class="login-box">
        <svg-icon icon-class="login-background"
                  class="login-background" />
        <a-spin class="login-container"
                :spinning="spinning"
                size="large">
            <div class="login-title svg-font">
                <svg viewBox="0 0 800 600">
                    <symbol id="s-text">
                        <text text-anchor="middle"
                              x="50%"
                              y="50%"
                              class="text-line">系统</text>
                    </symbol>
                    <g class="g-ants">
                        <use xlink:href="#s-text"
                             class="text-copy" />
                        <use xlink:href="#s-text"
                             class="text-copy" />
                        <use xlink:href="#s-text"
                             class="text-copy" />
                        <use xlink:href="#s-text"
                             class="text-copy" />
                        <use xlink:href="#s-text"
                             class="text-copy" />
                    </g>
                </svg>
            </div>
            <!-- <div class="login-tip">@创腾</div> -->
            <a-tabs defaultActiveKey="1"
                    tabPosition="top"
                    :style="{ height: '200px',fontWeight:'bold'}">
                <a-tab-pane tab="账号密码登录"
                            key="1">
                    <a-form :form="form"
                            class="login-form"
                            @submit="handleSubmit">
                        <a-form-item>
                            <a-input v-decorator="['userName',{ rules: [{ required: true, message: '请输入您的账号' }] }]"
                                     placeholder="账户"
                                     size="large"
                                     style="width: 400px"
                                     autocomplete="off">
                                <a-icon slot="prefix"
                                        type="user"
                                        style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input v-decorator="['passWord',{ rules: [{ required: true, message: '请输入您的密码' }] }]"
                                     placeholder="密码"
                                     type="passWord"
                                     size="large"
                                     style="width: 400px">
                                <a-icon slot="prefix"
                                        type="lock"
                                        style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-checkbox v-decorator="['remember',{valuePropName: 'checked',initialValue: true,}]"
                                        @change="onChangeRemember">记住账号</a-checkbox>
                            <router-link class="login-form-forgot"
                                         :to="{name:'register'}">注册账号</router-link>
                            <a-button type="primary"
                                      html-type="submit"
                                      size="large"
                                      class="login-form-button"
                                      :disabled="$route.query.hasWait">登录</a-button>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>
                <!-- <a-tab-pane tab="手机号登录"
                            key="2"></a-tab-pane> -->
            </a-tabs>
        </a-spin>
    </div>
</template>

<script>
import { login } from '@/api/login'

export default {
    name: 'login',
    data() {
        return {
            form: this.$form.createForm(this),
            spinning: false
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()

            let This = this,
                self = this.handleSubmit
            if (self.onoff) return

            this.form.validateFields((err, values) => {
                if (err) return
                self.onoff = true
                this.spinning = true
                login({
                    username: values.userName,
                    password: values.passWord
                }).then(res => {
                    const { data } = res
                    This.$notification['success']({
                        message: '登录成功!',
                        duration: 1
                    })
                    // 先设置用户信息
                    this.$Cookies.set('token', data.token, {
                        expires: 7
                    })
                    let store = this.$store
                    delete data.token
                    store.commit('setUserLoginInformation', data)

                    // 写入缓存
                    window.localStorage.setItem('user_login_lnformation', JSON.stringify(data))
                    window.localStorage.setItem('remember_user_name', values.userName)
                    // 进入项目
                    This.$router.push({ path: '/' })
                })
                    .finally(() => {
                        self.onoff = false
                        This.spinning = false
                    })
            })
        },
        onChangeRemember(e) {
            if (!e.target.checked) {
                window.localStorage.setItem('remember_user_name', '')
            }
        }
    },
    mounted() {
        this.form.setFieldsValue({ userName: localStorage.remember_user_name })
    }
}
</script>

<style scoped lang="scss">
.login-box {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: auto;
}

.login-background {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #f0f2f5;
    z-index: -1;
}

.login-container {
    // height: 58rem;
    width: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 0 0;
    // border-radius: 4px;
    // background-color: #fff;
    // box-shadow: 0 4px 10px 4px rgba(88, 88, 88, 0.1);
    .login-title {
        margin-bottom: 1rem;
        text-align: center;
        position: relative;
        width: 100%;
        height: 8rem;
    }

    .login-tip {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        margin-bottom: 4rem;
        text-align: center;
    }

    .login-form-forgot {
        float: right;
    }

    .login-form-button {
        width: 100%;
        margin: 3rem 0;
        height: 5rem;
    }
}

/deep/ .ant-tabs {
    height: 80% !important;
}

/deep/ .ant-tabs-nav-scroll {
    text-align: center;
    margin-bottom: 1rem;
}

/deep/ .ant-tabs-bar {
    border: none;
}

/deep/ .ant-spin-container {
    height: 100%;
}

/deep/ .ant-spin-nested-loading > div > .ant-spin {
    width: 0;
}

.svg-font > svg {
    font: 4.5em "Montserrat";
    width: 100%;
    height: 10rem;
    transform: scale(3.3);
    fill: currentColor !important;
    display: block;
}
.text-copy {
    fill: none;
    stroke: white;
    stroke-dasharray: 6% 29%;
    stroke-width: 5px;
    stroke-dashoffset: 0%;
    animation: stroke-offset 5.5s infinite linear;
}
.text-copy:nth-child(1) {
    stroke: #a1eafb;
    animation-delay: -1;
}
.text-copy:nth-child(2) {
    stroke: #6eb6ff;
    animation-delay: -2s;
}
.text-copy:nth-child(3) {
    stroke: #ffcef3;
    animation-delay: -3s;
}
.text-copy:nth-child(4) {
    stroke: #cabbe9;
    animation-delay: -4s;
}
.text-copy:nth-child(5) {
    stroke: #9896f1;
    animation-delay: -5s;
}
@keyframes stroke-offset {
    100% {
        stroke-dashoffset: -35%;
    }
}
</style>
