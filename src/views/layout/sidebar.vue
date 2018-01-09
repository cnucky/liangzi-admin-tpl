<template>
  
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" :router="true" background-color="#304156" text-color="#fff" active-text-color="#409EFF" class="menu-wrapper"> 
      <template v-for="item in routes" v-if="!item.hidden&&item.children">   
        <el-menu-item v-if="item.children.length===1 && !item.children[0].children" :index="item.path+'/'+item.children[0].path" :key="item.children[0].name" class='submenu-title-noDropdown'>
            <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
            <span slot="title" v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
        <el-submenu v-else :index="item.name||item.path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta&&item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
          </template>
          <template v-for="child in item.children" v-if="!child.hidden">       
              <el-menu-item :index="item.path+'/'+child.path" :key="child.name">
                <i v-if="child.meta&&child.meta.icon" :class="child.meta.icon"></i>
                <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
              </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>

</template>

<script>
import { mapGetters } from 'vuex'



export default {
 
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
