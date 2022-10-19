<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 2级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <!-- 三级分类 -->
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//按需引入lodash
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      //存储用户鼠标移上哪一个分类
      currentIndex: -1,
      show: true,
    }
  },
  //组件挂载完毕，向服务器发送请求
  mounted() {
    //当组件挂载完毕，让show变为false
    if (this.$route.name != 'home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性时，右侧函数立即执行一次
      //注入一个参数state。其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    //节流
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    leaveIndex() {
      this.currentIndex = -1
      //鼠标移出隐藏在指定组件的菜单列表
      if (this.$route.name == 'search' || this.$route.name == 'detail') {
        this.show = false
      }
    },
    //鼠标移入显示在search组件的菜单列表
    enterShow() {
      this.show = true
    },
    goSearch(event) {
      //给a标签加上自定义属性:data-categoryName
      //获取当前触发事件的节点
      let element = event.target
      //获取自定义属性
      let { categoryname, category1id, category2id, category3id } =
        element.dataset
      //判断
      if (categoryname) {
        //整理路由跳转参数
        let location = { name: 'search', query: { categoryName: categoryname } }
        if (category1id) {
          location.query.category1Id = category1id
        } else if (category2id) {
          location.query.category2Id = category2id
        } else {
          location.query.category3Id = category3id
        }
        //判断是否有params参数
        if (this.$route.params.keyword) {
          location.params = this.$route.params
        }
        //目前商品分类这里携带参数只有query参数
        this.$router.push(location)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 475px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过度动画样式
    //进入开始状态
    .sort-enter {
      height: 0;
    }
    //过渡动画结束
    .sort-enter-to {
      height: 475px;
    }
    //定义动画事件、速率
    .sort-enter-active {
      transition: all 0.5s linear;
      overflow: hidden;
    }
    .sort-leave {
      height: 475px;
    }
    .sort-leave-to {
      height: 0;
    }
    .sort-leave-active {
      transition: all 0.2s linear;
      overflow: hidden;
    }
  }
}
</style>