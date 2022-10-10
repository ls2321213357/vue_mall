<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a
                style="border-right: 0"
                :class="{ current: isAuto }"
                @click="autoLogin"
              >
                扫码登录
              </a>
            </li>
            <li>
              <a :class="{ current: isUser }" @click="userLogin">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form v-show="way == 1">
              <div class="input-text clearFix">
                <span></span>
                <input
                  placeholder="请输入你的手机号"
                  v-model="phone"
                  name="phone"
                  v-validate="{
                    required: true,
                    regex:
                      /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
                  }"
                  :class="{ invalid: errors.has('phone') }"
                />
                <i class="error-msg hint">{{ errors.first('phone') }}</i>
              </div>
              <div class="input-text clearFix">
                <span class="pwd"></span>
                <input
                  placeholder="请输入密码"
                  v-model="password"
                  name="password"
                  v-validate="{
                    required: true,
                    regex: /^[0-9A-Za-z]{6,15}$/,
                  }"
                  :class="{ invalid: errors.has('password') }"
                />
                <i class="error-msg hint">
                  {{ errors.first('password') }}
                </i>
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="" />
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>

              <button class="btn" @click.prevent="login">
                登&nbsp;&nbsp;录
              </button>
            </form>
            <form v-show="way == 0">
              <div class="input-text clearFix">
                <div class="autoLogin">
                  <i>接口出现问题暂不可用</i>
                  <img src="@/assets/images/1.gif" alt="" />
                </div>
              </div>
            </form>
            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt="" /></li>
                <li><img src="./images/sina.png" alt="" /></li>
                <li><img src="./images/ali.png" alt="" /></li>
                <li><img src="./images/weixin.png" alt="" /></li>
              </ul>
              <router-link class="register" to="/register">
                立即注册
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    return {
      phone: '',
      password: '',
      way: 1, //登录方式
    };
  },
  methods: {
    async login() {
      const { phone, password } = this;
      //必须表单都验证成功才能进行下一步
      const success = await this.$validator.validateAll();
      if (success) {
        try {
          await this.$store.dispatch('getUserLogin', { phone, password });
          let toPath = this.$route.query.redirect || '/home';
          this.$router.push(toPath);
        } catch (error) {
          alert(error.message);
        }
      }
    },
    //账号密码登录
    userLogin() {
      this.way = 1;
    },
    //自动登录
    autoLogin() {
      this.way = 0;
    },
  },
  computed: {
    ...mapState({
      token: (state) => state.userInfo.token,
    }),
    isAuto() {
      return this.way == 0 ? true : false;
    },
    isUser() {
      return this.way == 1 ? true : false;
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    height: 487px;
    background-color: #e93854;

    .login {
      width: 1200px;
      height: 487px;
      margin: 0 auto;
      background: url(./images/loginbg.png) no-repeat;
    }

    .loginform {
      width: 420px;
      height: 406px;
      box-sizing: border-box;
      background: #fff;
      float: right;
      top: 45px;
      position: relative;
      padding: 20px;

      .tab {
        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
          }

          .current {
            border-bottom: none;
            border-top-color: #28a3ef;
            color: #e1251b;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-top: none;
        padding: 18px;

        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            margin-bottom: 16px;
            .autoLogin {
              position: relative;
              i {
                position: absolute;
                top: 30%;
                left: 30%;
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 5px;
                color: #fff;
              }
              img {
                width: 320px;
                height: 200px;
              }
            }
            span {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              background: url(~@/assets/images/icons.png) no-repeat -10px -201px;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
            }
            hint {
              color: #e1251b;
            }

            .pwd {
              background-position: -72px -201px;
            }

            input {
              width: 302px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;

              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background-color: #e1251b;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #e1251b;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            outline: none;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
