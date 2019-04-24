<template>
  <div class="ido-login" id="ido-login">
    <div class="video">
      <video
        :src="videoSrc"
        autoplay=""
        muted=""
        playsinline=""
        loop=""
        id="video"></video>
    </div>
    <div class="header">
      <slot name="title">
        <h1 v-if="title">
          {{ title }}
        </h1>
        <h2 v-if="subTitle">
          {{ subTitle }}
        </h2>
      </slot>
    </div>
    <div class="login">
      <!-- eslint-disable -->
      <input type="text" placeholder="用户名" v-model="user"><br>
			<input type="password" placeholder="密码" v-model="password"><br>
			<input type="button" value="登录" @click="handleLogin">
      <!-- eslint-enable -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    videoSrc: {
      type: String,
      default: 'http://www.goldwind.com.cn/images/video-banner-de59b60727.mp4'
    },
    title: {
      type: String,
      default: 'IDO'
    },
    subTitle: {
      type: String,
      default: '海上风机一体化设计平台'
    }
  },
  data: () => ({
    user: '',
    password: ''
  }),
  methods: {
    handleLogin () {
      console.log(this.user, this.password)
    }
  }
}
</script>

<style lang="less" scoped>

.ido-login {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.video {
  width: 100%;
  height: 100%;

  video {
    height: 100%;
  }
}

.header{
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 255px);
  z-index: 2;

  h1 {
    color: #5379fa !important;
    font-family: 'Exo', sans-serif;
    font-size: 35px;
    font-weight: bold;
  }

  h2 {
    font-size: 20px;
    color: #fff;
  }
}

.login{
  position: absolute;
  top: calc(50% - 75px);
  left: 50%;
  height: 150px;
  width: 350px;
  padding: 10px;
  z-index: 2;

  input[type=text]{
    width: 250px;
    height: 30px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.6);
    border-radius: 2px;
    color: #fff;
    font-family: 'Exo', sans-serif;
    font-size: 16px;
    font-weight: 400;
    padding: 4px;

    &:focus{
      outline: none;
      border: 1px solid rgba(255,255,255,0.9);
    }
  }

  input[type=password]{
    width: 250px;
    height: 30px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.6);
    border-radius: 2px;
    color: #fff;
    font-family: 'Exo', sans-serif;
    font-size: 16px;
    font-weight: 400;
    padding: 4px;
    margin-top: 10px;

    &:focus{
      outline: none;
      border: 1px solid rgba(255,255,255,0.9);
    }
  }

  input[type=button]{
    width: 250px;
    height: 35px;
    background: #fff;
    border: 1px solid #fff;
    cursor: pointer;
    border-radius: 2px;
    color: #a18d6c;
    font-family: 'Exo', sans-serif;
    font-size: 16px;
    font-weight: 400;
    padding: 6px;
    margin-top: 10px;

    &:hover{
      opacity: 0.8;
    }

    &:active{
      opacity: 0.6;
    }

    &:focus{
      outline: none;
    }
  }
}

::-webkit-input-placeholder{
   color: rgba(255,255,255,0.6);
}

::-moz-input-placeholder{
   color: rgba(255,255,255,0.6);
}
</style>
