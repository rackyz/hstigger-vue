
<template>
  <div class="page page-debug">
    <Carousel
      autoplay
      :autoplay-speed="8000"
      radius-dot
      loop
      class='absolute-full'
    >
      <CarouselItem
        v-for="p in settings.carouselItems"
        :key='p'
      >
        <div
          class='carousel-item'
          :style='`background:no-repeat url(${p})`'
        ></div>
      </CarouselItem>
    </Carousel>

    <div class="login">
      <div class='flex-wrap login-wrap'>
        <div>
          <BaseLoginHeader />
          <BaseLogin
            style="margin-top:20px;width:380px;"
            :routeTo="'/core'"
          />
        </div>
      </div>
    </div>
    <div
      class='footer'
    >
      <div>Copyright © 2019-2022
        <Icon custom='gzicon gzi-nbgz' /> {{companyName}}
      </div>
      <div><a
          href="https://beian.miit.gov.cn/"
          style='color:#aaa;'
        >浙ICP备18011212号-3</a></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  metaInfo: { title: '用户登录' },
  computed: {
    ...mapGetters('ctx', ['device', 'settings']),
    companyName() {
      if (this.device.width <= 400) {
        return "宁波高专"
      } else {
        return "宁波高专建设监理有限公司"
      }
    }
  },
}
</script>
<style lang="less" scoped>
.login {
  backdrop-filter: blur(15px) brightness(0.4);
  width: 100%;
  height: calc(100%);

  margin: 0 !important;
  max-width: 100% !important;
  padding: 0 !important;
  padding-bottom: 150px;
}
</style>