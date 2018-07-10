/* http://vee-validate.logaretm.com/*/
import { Validator } from 'vee-validate'
/* 自义定表单校验规则可参考文档：http://vee-validate.logaretm.com/rules.html#custom-messages */
const dictionary = {
  my: {
    messages: {
      email: () => '您输入的邮件有误',
    },
    custom: {
      email: {
        required: '邮件必填'
      },
      contact: {
        required: '联系人必填',
        contact: '联系人名字为1至30个字符'
      },
      detail: {
        required: '请输入收货详细地址',
        detail: '收货详细地址为3至200个字符'
      },
      mobile: {
        required: '联系电话必填',
        mobile: '手机号码格式不正确'
      },
      district: {
        required: '所属区域必填',
        district: '区域信息含义非法字符‘|’'
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
