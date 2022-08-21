<template>
  <div>
    <div class="pro-table">
      <el-table :data="data">
        <el-table-column
          v-for="(c, i) in columns"
          :prop="c.prop"
          :label="c.label"
          :key="c.label"
        >
          <template slot-scope="{ row }">
            <template v-if="c.slot">
              <slot :name="c.prop" :row="row" />
            </template>
            <template v-else>
              {{ row[c.prop] }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss"></style>
