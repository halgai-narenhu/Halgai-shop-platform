<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          :label="$t('商品ID')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['id']" name="id" />
        </a-form-item>
        <a-form-item
          :label="$t('商品名称')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['name']" name="name" :placeholder="$t('请输入商品名称')" />
        </a-form-item>
        <a-form-item
          :label="$t('条形码')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['barCode']" name="barCode" :placeholder="$t('请输入条形码')" />
        </a-form-item>
        <a-form-item
          :label="$t('类别ID')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['categoryId']" name="categoryId" disabled />
        </a-form-item>
        <a-form-item
          :label="$t('门店域名')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['domain']" name="domain" :placeholder="$t('请输入门店域名')" />
        </a-form-item>
        <a-form-item
          :label="$t('商品特征')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['characteristic']" name="characteristic" :placeholder="$t('请输入商品特征')" />
        </a-form-item>
        <a-form-item
          :label="$t('佣金')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 3 }, sm: { span: 17 } }"
        >
          <a-input
            prefix="￥"
            suffix="RMB"
            v-decorator="['commission']"
            name="commission"
            :placeholder="$t('请输入佣金金额')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('佣金类型')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-select default-value="" style="width: 120px">
            <a-select-option value="分销佣金"> 分销佣金 </a-select-option>
            <a-select-option value="推荐佣金"> 推荐佣金 </a-select-option>
            <a-select-option value="拼团佣金"> 拼团佣金 </a-select-option>
            <a-select-option value="提货佣金"> 提货佣金 </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="$t('积分')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['gotScore']" name="gotScore" />
        </a-form-item>
        <a-form-item
          :label="$t('积分类型')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-select default-value="" style="width: 120px">
            <a-select-option value="固定积分"> 固定积分 </a-select-option>
            <a-select-option value="推荐积分"> 推荐积分 </a-select-option>
            <a-select-option value="分销积分"> 分销积分 </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="$t('砍价')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['kanjia']" name="kanjia" :placeholder="$t('')" />
        </a-form-item>
        <a-form-item
          :label="$t('砍价价格')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 3 }, sm: { span: 17 } }"
        >
          <a-input prefix="￥" suffix="RMB" v-decorator="['kanjiaPrice']" name="kanjiaPrice" :placeholder="$t('')" />
        </a-form-item>
        <a-form-item
          :label="$t('物流')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['logisticsId']" name="logisticsId" :placeholder="$t('京东物流')" />
        </a-form-item>
        <a-form-item
          :label="$t('最低价')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 3 }, sm: { span: 17 } }"
        >
          <a-input prefix="￥" suffix="RMB" v-decorator="['minPrice']" name="minPrice" :placeholder="$t('')" />
        </a-form-item>
        <a-form-item
          :label="$t('最低积分')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 3 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['minScore']" name="minScore" :placeholder="$t('')" />
        </a-form-item>
        <a-form-item
          :label="$t('numberFav')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['numberFav']" name="numberFav" :placeholder="$t('')" />
        </a-form-item>
        <a-form-item
          :label="$t('信誉度')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input type="number" v-decorator="['numberGoodReputation']" name="numberGoodReputation" :placeholder="$t('')" />
        </a-form-item>
        <a-form-item
          :label="$t('订单数量')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 3 }, sm: { span: 17 } }"
        >
          <a-input type="number" v-decorator="['numberOrders']" name="numberOrders" :placeholder="$t('')" />
        </a-form-item>
        <a-form-item
          :label="$t('售出数量')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input type="number" v-decorator="['numberSells']" name="numberSells" :placeholder="$t('自定义店铺类型，32个字符以内')" />
        </a-form-item>
        <a-form-item
          :label="$t('原价')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input type="number" v-decorator="['originalPrice']" name="originalPrice" :placeholder="$t('自定义店铺类型，32个字符以内')" />
        </a-form-item>
        <a-form-item
          :label="$t('排序')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input type="number" v-decorator="['paixu']" name="paixu" :placeholder="$t('')" />
        </a-form-item>
        <a-form-item
          :label="$t('商品图片')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['pic']" name="pic" :placeholder="$t('自定义店铺类型，32个字符以内')" />
        </a-form-item>
        <a-form-item
          :label="$t('拼团')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['pingtuan']" name="pingtuan" :placeholder="$t('')" />
        </a-form-item>
        <a-form-item
          :label="$t('拼团价')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 3 }, sm: { span: 17 } }"
        >
          <a-input prefix="￥" suffix="RMB" v-decorator="['pingtuanPrice']" name="pingtuanPrice"/>
        </a-form-item>
        <a-form-item
          :label="$t('推荐状态')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['recommendStatus']" name="recommendStatus" :placeholder="$t('推荐状态')" />
        </a-form-item>
        <a-form-item
          :label="$t('商品状态')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-radio-group v-decorator="['status']" >
            <a-radio-button :value="0">
              正常
            </a-radio-button>
            <a-radio-button :value="1">
              禁用
            </a-radio-button>
            <a-radio-button :value="2">
              待审核
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :label="$t('添加时间')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['dateAdd']" name="dateAdd" :placeholder="$t('添加时间')" />
        </a-form-item>
        <a-form-item
          :label="$t('开始时间')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['dateStart']" name="dateStart" :placeholder="$t('开始时间')" />
        </a-form-item>
        <a-form-item
          :label="$t('更新时间')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['dateUpdate']" name="dateUpdate" :placeholder="$t('更新时间')" />
        </a-form-item>
        <a-form-item
          :label="$t('描述')"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input v-decorator="['content']" name="content" :placeholder="$t('描述')" />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary">{{ $t('提交') }}</a-button>
          <a-button style="margin-left: 8px">{{ $t('返回') }}</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['name', 'id', 'domain', 'mallAdminUserId', 'status', 'lang', 'shopLevelID', 'vipPlanCd', 'isCompany', 'dataAdd', 'dataUpdate']

export default {
  name: 'ShopEdit',
  data () {
    return {
      param: this.$route.params,
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))
    // 当 model 发生改变时，为表单设置值
    this.$watch('param', () => {
      this.param && this.form.setFieldsValue(pick(this.param, fields))
    })
  },
  methods: {
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
