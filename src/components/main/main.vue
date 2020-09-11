<template>
  <Layout
    style="height: 100%"
    class="main"
  >
    <Sider
      v-model="collapsed"
      hide-trigger
      collapsible
      :width="256"
      :collapsed-width="64"
      class="left-sider"
      :style="{overflow: 'hidden'}"
    >
      <SideMenu
        ref="sideMenu"
        accordion
        :active-name="$route.name"
        :collapsed="collapsed"
        :menu-list="menuList"
        @on-select="turnToPage"
      >
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div
          class="logo-con"
          @click="logOut"
        >
          <img
            v-show="!collapsed"
            key="max-logo"
            class="maxLogo"
            :src="maxLogo"
          >

          <Button size="small">Admin</Button>
        </div>
      </SideMenu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <HeaderBar
          :collapsed="collapsed"
          @on-coll-change="handleCollapsedChange"
        >
          <User
            :message-unread-count="unreadCount"
            :user-avatar="userAvatar"
          />
          <Language
            v-if="$config.useI18n"
            style="margin-right: 10px;"
            :lang="local"
            @on-lang-change="setLocal"
          />
        </HeaderBar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view />
            </keep-alive>
            <ABackTop
              :height="100"
              :bottom="80"
              :right="50"
              container=".content-wrapper"
            />
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getNewTagList } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/small.png'
import maxLogo from '@/assets/images/logo.png'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Language from './components/language'
import './main.less'

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    User,
    ABackTop
  },
  data() {
    return {
      collapsed: false,
      minLogo,
      maxLogo
    }
  },
  computed: {
    tagNavList() {
      return this.$store.state.app.tagNavList
    },
    tagRouter() {
      return this.$store.state.app.tagRouter
    },
    userAvatar() {
      return this.$store.state.user.avatarImgPath
    },
    cacheList() {
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    menuList() {
      return this.$store.getters.menuList
    },
    local() {
      return this.$store.state.app.local
    },
    unreadCount() {
      return this.$store.state.user.unreadCount
    }
  },
  watch: {
    $route(newRoute) {
      const {
        name, query, params, meta
      } = newRoute
      this.addTag({
        route: {
          name, query, params, meta
        },
        type: 'push'
      })
      // console.log(newRoute)
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted() {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers) // 设置首页路由
    const {
      name, params, query, meta
    } = this.$route
    this.addTag({
      route: {
        name, params, query, meta
      }
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    // 获取未读消息条数
    // this.getUnreadMessageCount();
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag'
    ]),
    ...mapActions([
      'handleLogin',
      'handleLogOut',
      'getUnreadMessageCount'
    ]),
    turnToPage(route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange(state) {
      this.collapsed = state
    },
    logOut() {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    }
  }
}
</script>
