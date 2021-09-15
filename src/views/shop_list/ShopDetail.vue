<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-descriptions title="订单详情">
      <a-descriptions-item label="商品ID">{{ param.id }}
      </a-descriptions-item>
      <a-descriptions-item label="商品名称">{{ param.name }}
      </a-descriptions-item>
      <a-descriptions-item label="条形码">{{ param.barCode }}
      </a-descriptions-item>
      <a-descriptions-item label="类别ID">{{ param.categoryId }}
      </a-descriptions-item>
      <a-descriptions-item label="门店域名">{{ param.domain }}
      </a-descriptions-item>
      <a-descriptions-item label="商品特征">{{ param.characteristic }}
      </a-descriptions-item>
      <a-descriptions-item label="佣金">{{ param.commission }}
      </a-descriptions-item>
      <a-descriptions-item label="佣金类型">{{ param.commissionType }}
      </a-descriptions-item>
      <a-descriptions-item label="积分">{{ param.gotScore }}
      </a-descriptions-item>
      <a-descriptions-item label="积分类型">{{ param.gotScoreType }}
      </a-descriptions-item>
      <a-descriptions-item label="砍价">{{ param.kanjia }}
      </a-descriptions-item>
      <a-descriptions-item label="砍价价格">{{ param.kanjiaPrice }}
      </a-descriptions-item>
      <a-descriptions-item label="物流">{{ param.logisticsId }}
      </a-descriptions-item>
      <a-descriptions-item label="最低价">{{ param.minPrice }}
      </a-descriptions-item>
      <a-descriptions-item label="最低积分">{{ param.minScore }}
      </a-descriptions-item>
      <a-descriptions-item label="numberFav">{{ param.numberFav }}
      </a-descriptions-item>
      <a-descriptions-item label="信誉度">{{ param.numberGoodReputation }}
      </a-descriptions-item>
      <a-descriptions-item label="订单数量">{{ param.numberOrders }}
      </a-descriptions-item>
      <a-descriptions-item label="售出数量">{{ param.numberSells }}
      </a-descriptions-item>
      <a-descriptions-item label="原价">{{ param.originalPrice }}
      </a-descriptions-item>
      <a-descriptions-item label="排序">{{ param.paixu }}
      </a-descriptions-item>
      <a-descriptions-item label="商品图片">{{ param.pic }}
      </a-descriptions-item>
      <a-descriptions-item label="拼团">{{ param.pingtuan }}
      </a-descriptions-item>
      <a-descriptions-item label="拼团价">{{ param.pingtuanPrice }}
      </a-descriptions-item>
      <a-descriptions-item label="推荐状态">{{ param.recommendStatus }}
      </a-descriptions-item>
      <a-descriptions-item label="门店ID">{{ param.shopId }}
      </a-descriptions-item>
      <a-descriptions-item label="状态">{{ param.status }}
      </a-descriptions-item>
      <a-descriptions-item label="库存">{{ param.stores }}
      </a-descriptions-item>
      <a-descriptions-item label="用户ID">{{ param.userId }}
      </a-descriptions-item>
      <a-descriptions-item label="浏览数">{{ param.views }}
      </a-descriptions-item>
      <a-descriptions-item label="重量">{{ param.weight }}
      </a-descriptions-item>
      <a-descriptions-item label="视频ID">{{ param.videoId }}
      </a-descriptions-item>
      <a-descriptions-item label="标签">{{ param.tags }}
      </a-descriptions-item>
      <a-descriptions-item label="propertyIds">{{ param.propertyIds }}
      </a-descriptions-item>
      <a-descriptions-item label="推荐状态">{{ param.recommendStatusStr }}
      </a-descriptions-item>
      <a-descriptions-item label="商品状态">{{ param.statusStr }}
      </a-descriptions-item>
      <a-descriptions-item label="添加时间">{{ param.dateAdd }}
      </a-descriptions-item>
      <a-descriptions-item label="开始时间">{{ param.dateStart }}
      </a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ param.dateUpdate }}
      </a-descriptions-item>
      <a-descriptions-item label="描述">{{ param.content }}
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script>
export default {
  name: 'AddMall',
  data () {
    return {
      param: this.$route.params,
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-2',
          name: 'yyy.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ],
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>
<style scoped>
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
</style>
