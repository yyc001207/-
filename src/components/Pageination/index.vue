<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startAndEnd.start > 1" @click="$emit('getPageNo', 1)">
      1
    </button>
    <button
      v-if="startAndEnd.start > 2"
      @click="$emit('getPageNo', pageNo - pageOmit)"
    >
      ···
    </button>

    <button
      v-for="(page, index) in startAndEnd.end"
      :key="index"
      v-show="page >= startAndEnd.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button
      v-if="startAndEnd.end < totalPages - 1"
      @click="$emit('getPageNo', pageNo + pageOmit)"
    >
      ···
    </button>
    <button
      v-if="startAndEnd.end < totalPages"
      @click="$emit('getPageNo', totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="pageNo == totalPages"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>
    <input
      type="text"
      v-model="value"
      oninput="value=value.replace(/[^\d]/g,'')"
      @focus="value = ''"
    />
    <button @click="$emit('getPageNo', parseInt(value))">跳转</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pageination',
  data() {
    return {
      value: '',
    }
  },
  props: ['pageNo', 'pageSize', 'total', 'continues', 'totalPages', 'pageOmit'],
  //pageNo 当前页，pageSize 每一页数据，total 数据条数，continues：连续数，pageOmit：快速跳转三页，totalPages：总页数
  computed: {
    //计算连续数字起始与结束 continues：连续数, pageNo：当前页, totalPages：总页数
    startAndEnd() {
      const { continues, pageNo, totalPages } = this
      let start = 0
      let end = 0
      if (continues > totalPages) {
        start = 1
        end = totalPages
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPages) {
          start = totalPages - continues + 1
          end = totalPages
        }
      }
      return { start, end }
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
input {
  width: 20px;
  margin: 5px 5px;
}
.active {
  background-color: skyblue;
}
</style>