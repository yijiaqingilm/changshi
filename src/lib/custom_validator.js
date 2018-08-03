/* http://vee-validate.logaretm.com/*/
import { Validator } from 'vee-validate'
/* 自义定表单校验规则可参考文档：http://vee-validate.logaretm.com/rules.html#custom-messages */
const dictionary = {
  my: {
    messages: {
      email: () => '您输入的邮件有误',
    },
    custom: {
      workBase: {
        required: '作业点必填'
      },
      workSort: {
        required: '作业类别必填',
      },
      content: {
        required: '作业内容必填',
      },
      startDate: {
        required: '开始时间必选',
      },
      endDate: {
        required: '结束时间必选',
      },
      fee: {
        required: '劳务费必填',
      }
    }
  }
}

/**
 *  自定义规则
 */

Validator.extend('mobile', {
  getMessage: (field) => '手机值正确',
  validate: (value) => /^1[34578]\d{9}$/.test(value)
})
Validator.extend('contact', {
  getMessage: (field) => '联系人信息正确',
  validate: (value) => value.length >= 1 && value.length <= 30
})
Validator.extend('detail', {
  getMessage: (field) => '收货详情地址正确',
  validate: (value) => value.length >= 3 && value.length <= 200
})
Validator.extend('district', {
  getMessage: (field) => '区域信息正确',
  validate: (value) => value.indexOf('|') === -1
})

Validator.updateDictionary(dictionary)
Validator.setLocale('my')
export { Validator }
