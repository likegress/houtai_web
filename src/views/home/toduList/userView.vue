<template>
  <div class="box-card">
    <div class="card-body">
      <div class="overImg">
        <img
          v-lazy="
            'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png'
          "
          alt=""
        />
      </div>

      <div class="gifImg">
        
        <img
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          alt=""
        />
      </div>
    </div>
    <div class="progress">
      <div v-for="(item, index) in progress" :key="index" class="progress-item">
        <article>{{ item.name }}</article>
        <el-progress
          :percentage="item.percentage"
          :color="item.color"
        ></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: [
        {
          name: "Vue",
          percentage: 75,
          color: "yellowgreen",
        },
        {
          name: "Uniapp",
          percentage: 100,
          color: "#f56c6c",
        },
        {
          name: "微信小程序",
          percentage: 55,
          color: "#6f7ad3",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  height: 400px;
  margin-top: 20px;
  background: #fff;

  .card-body {
    position: relative;
    .overImg {
      height: 220px;
      overflow: hidden;
      img {
        width: 100%;
        height: inherit;
        transition: all 0.4s;
      }
      img:hover {
        filter: brightness(1.2);
        transform: scale(1.2);
      }
    }

    .body-img {
      width: 100%;
    }
    .gifImg {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 5px solid #fff;
      position: absolute;
      bottom: 0;
      left: 25px;
      transform: translateY(50%);
      background: #fff;
      img {
        width: inherit;
        height: inherit;
        border-radius: 50%;
        transition: all 0.4s;
        transform-origin: right;
        position: relative;
        z-index: 2;
      }
      &:hover img {
        transform: rotate(-180deg);
      }
    }
  }
  .progress {
    position: relative;
    z-index: 1;
    padding: 0 20px;
    .progress-item {
      margin-top: 20px;
    }
  }
}
</style>
