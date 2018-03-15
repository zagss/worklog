// 各页面表格显示数据
export default {
  'organize.dealer': {  // 经销商集团管理
    name: {
      label: '集团名称',
      width: 180
    },
    owner_name: {
      label: '负责人姓名',
      width: 120
    },
    owner_contact: {
      label: '联系电话',
      width: 150
    },
    credit_line: {
      label: '授信额度 ／ 剩余额度（万）',
      width: 220
    },
    create_time: {
      label: '客户录入日期'
    }
  },
  'organize.dealer.attachment': {  // 经销商集团附属门店
    name: {
      label: '门店名称',
      width: 180
    },
    owner_name: {
      label: '负责人姓名',
      width: 120
    },
    owner_contact: {
      label: '联系电话',
      width: 180
    },
    credit_line: {
      label: '授信额度 / 剩余额度（万）',
      width: 220
    },
    create_time: {
      label: '客户录入日期'
    }
  },
  'organize.store': {  // 门店管理
    name: {
      label: '门店名称',
      width: 180
    },
    owner_name: {
      label: '负责人姓名',
      width: 120
    },
    owner_contact: {
      label: '联系电话',
      width: 180
    },
    credit_line: {
      label: '授信额度 / 剩余额度（万）',
      width: 220
    },
    create_time: {
      label: '客户录入日期'
    }
  },
  'organize.store.staff': {  // 门店 / 员工管理
    user: {
      name: {
        label: '姓名',
        width: 100
      },
      id_number: {
        label: '身份证号',
        width: 180
      },
      mobile: {
        label: '联系电话',
        width: 180
      },
      role_id: {
        label: '角色',
        width: 100
      },
      is_push: {
        label: '推送初始密码'
      }
    }
  },
  'organize.store.licensee': {  // 门店 / 持牌人管理
    name: {
      label: '姓名',
      width: 180
    },
    id_number: {
      label: '身份证号',
      width: 180
    },
    mobile: {
      label: '联系电话',
      width: 180
    },
    create_time: {
      label: '录入日期'
    }
  },
  'organize.car.carlicensee': {  // 门店 / 持牌人管理
    name: {
      label: '姓名',
      width: 180
    },
    id_number: {
      label: '身份证号',
      width: 180
    },
    mobile: {
      label: '联系电话',
      width: 180
    },
    create_time: {
      label: '录入日期'
    }
  },
  'organize.car': {  // 中小型车商管理
    name: {
      label: '中小型车商名称',
      width: 180
    },
    owner_name: {
      label: '负责人姓名',
      width: 120
    },
    owner_contact: {
      label: '联系电话',
      width: 180
    },
    credit_line: {
      label: '授信额度 / 剩余额度（万）',
      width: 220
    },
    create_time: {
      label: '客户录入日期'
    }
  },
  'organize.car.staff': {  // 门店 / 员工管理
    name: {
      label: '姓名',
      width: 100
    },
    id_number: {
      label: '身份证号',
      width: 180
    },
    mobile: {
      label: '联系电话',
      width: 180
    },
    create_time: {
      label: '录入日期'
    },
    username: {
      label: '帐号',
      width: 180
    },
    role_id: {
      label: '角色',
      width: 100
    }
  },
  'organize.staff': {  // 资金方管理
    name: {
      label: '资金方名称',
      width: 150
    },
    // owner_name: {
    //   label: '商务总监',
    //   width: 180
    // },
    // owner_contact: {
    //   label: '商务总监联系电话',
    //   width: 180
    // },
    // account: {
    //   label: '帐号'
    // },
    create_time: {
      label: '客户录入日期'
    }
  },
  'organize.order': {  // 订单管理
    sn: {
      label: '订单号'
    },
    // city: {
    //   label: '所在城市'
    // },
    type_name: {
      label: '品牌车型'
    },
    // creator_name: {
    //   label: '提报人姓名'
    // },
    loan_money: {
      label: '贷款金额（万）'
    },
    dealer_name: {
      label: '所属中小型车商/门店'
    },
    create_time: {
      label: '创建时间'
    },
    status_name: {
      label: '订单状态',
      width: 110
    }
  },
  'organize.staff.finance': {
    name: {
      label: '产品名称',
      width: 180
    },
    min_limit: {
      label: '最低额度/万',
      width: 130
    },
    max_limit: {
      label: '最高额度/万',
      width: 130
    },
    loan_cycle: {
      label: '借款周期/天',
      width: 130
    },
    loan_interest: {
      label: '借款利率 %',
      width: 130
    },
    create_time: {
      label: '创建时间'
    }
  },
  'system.user': {
    username: {
      label: '用户名'
    },
    name: {
      label: '真实姓名'
    },
    mobile: {
      label: '手机号'
    },
    email: {
      label: '邮箱'
    },
    role_name: {
      label: '角色'
    },
    create_time: {
      label: '添加时间'
    }
  },
  'system.role': {
    role: {
      label: '角色',
      width: 150
    },
    status: {
      label: '状态',
      width: 100
    },
    remarks: {
      label: '备注'
    }
  },
  'system.log': {
    name: {
      label: '用户名'
    },
    role_name: {
      label: '角色'
    },
    action: {
      label: '操作详情'
    },
    content: {
      label: '操作内容'
    },
    create_time: {
      label: '操作时间'
    }
  }
}
