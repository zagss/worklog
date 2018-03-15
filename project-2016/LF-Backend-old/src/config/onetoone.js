export default {
  'organize.dealer': { // 经销商集团
    basic: { // 基本信息
      type: 1, // 0为不存在，1为正常显示，2为表格显示
      label: {
        name: '集团名称',
        registered_capital: '注册资金（万）',
        license_number: '营业执照',
        owner_name: '负责人姓名',
        owner_contact: '负责人手机号',
        owner_id: '负责人身份证号',
        credit_line: '授信额度（万）',
        available_limit: '剩余额度（万）',
        address: '集团地址'
      }
    },
    bank: { // 银行卡信息
      type: 1,
      label: {
        payee_name: '收款方名称',
        card_number: '银行账号',
        card_bank: '开户行（支行）'
      }
    },
    photo: { // 照片信息
      type: 1,
      label: {
        license_files: '营业执照',
        opening_permit_files: '开户许可证',
        owner_id_files: '负责人身份证',
        area_files: '场地照片',
        business_proof_files: '经营场所证明'
      }
    },
    attachment: { // 附件信息
      type: 1,
      label: {
        credit_inv_file_ids: '征信信息',
        agreement_file_ids: '合作协议',
        debt_file_ids: '资产负债',
        licensees_file_ids: '门店 / 持牌人清单'
      }
    },
    product: {
      type: 0
    }
  },
  'organize.detail.attachment': { // 经销商集团附属门店
    basic: { // 基本信息
      type: 1, // 0为不存在，1为正常显示，2为表格显示
      label: {
        name: '门店名称',
        license_number: '营业执照',
        owner_name: '负责人姓名',
        owner_contact: '负责人手机号',
        owner_id: '负责人身份证号',
        parking_space_count: '二手车展位数',
        car_sale_avg_monthly: '新车平均月销量',
        credit_line: '授信额度（万）',
        car_loan_limit: '单车授信额度（万）',
        available_limit: '剩余额度（万）',
        incar_dealer_id: '评估设备',
        address: '门店地址'
      }
    },
    bank: { // 银行卡信息
      type: 2,
      label: {
        type: '银行卡类型',
        payee_name: '收款方名称',
        card_number: '银行账号',
        card_bank: '开户行（支行）'
      }
    },
    photo: { // 照片信息
      type: 1,
      label: {
        license_files: '营业执照',
        opening_permit_files: '开户许可证',
        owner_id_files: '负责人身份证',
        marriage_certificate_files: '负责人结婚证',
        area_files: '场地照片',
        rent_contract_files: '场地租赁合同'
      }
    },
    attachment: { // 附件信息
      type: 1,
      label: {
        credit_inv_file_ids: '征信信息',
        agreement_file_ids: '合作协议',
        debt_file_ids: '资产负债',
        licensees_file_ids: '门店 / 持牌人清单'
      }
    },
    product: {
      type: 1,
      label: {
        dealer_id: '资金方名称',
        name: '金融产品'
      }
    }
  },
  'organize.store': { // 门店管理
    basic: { // 基本信息
      type: 1,
      label: {
        name: '门店名称',
        license_number: '营业执照',
        owner_name: '负责人姓名',
        owner_contact: '负责人手机号',
        owner_id: '负责人身份证号',
        parking_space_count: '二手车展位数',
        car_sale_avg_monthly: '新车平均月销量',
        credit_line: '授信额度（万）',
        car_loan_limit: '单车授信额度（万）',
        available_limit: '剩余额度（万）',
        group_id: '所属集团',
        incar_dealer_id: '评估设备',
        address: '门店地址'
      }
    },
    bank: { // 银行卡信息
      type: 2,
      label: {
        type: '银行卡类型',
        payee_name: '收款方名称',
        card_number: '银行账号',
        card_bank: '开户行（支行）'
      }
    },
    photo: { // 照片信息
      type: 1,
      label: {
        license_files: '营业执照',
        opening_permit_files: '开户许可证',
        owner_id_files: '负责人身份证',
        marriage_certificate_files: '负责人结婚证',
        area_files: '场地照片',
        rent_contract_files: '场地租赁合同'
      }
    },
    attachment: { // 附件信息
      type: 1,
      label: {
        credit_inv_file_ids: '征信信息',
        agreement_file_ids: '合作协议',
        debt_file_ids: '资产负债',
        licensees_file_ids: '门店 / 持牌人清单'
      }
    },
    product: { // 产品信息
      type: 1,
      label: {
        dealer_id: '资金方名称',
        name: '金融产品'
      }
    }
  },
  'organize.car': { // 中小型车商管理
    basic: { // 基本信息
      type: 1,
      label: {
        name: '中小型车商名称',
        registered_capital: '注册资金',
        license_number: '营业执照',
        owner_name: '负责人姓名',
        owner_contact: '负责人手机号',
        owner_id: '负责人身份证号',
        credit_line: '授信额度（万）',
        car_loan_limit: '单车授信额度（万）',
        available_limit: '剩余额度（万）',
        parking_space_count: '二手车展位数',
        car_sale_avg_monthly: '新车平均月销量',
        address: '地址'
      }
    },
    bank: { // 银行卡信息
      type: 2, // 2为表格
      label: {
        type: '银行卡类型',
        payee_name: '收款方姓名',
        card_number: '银行卡帐号',
        card_bank: '开户行（支行）'
      }
    },
    photo: { // 照片信息
      type: 1,
      label: {
        license_files: '营业执照',
        opening_permit_files: '开户许可证',
        owner_id_files: '负责人身份证',
        mate_id_files: '负责人配偶身份证',
        marriage_certificate_files: '结婚证',
        business_proof_files: '经营场所证明',
        rent_contract_files: '场地租赁合同',
        area_files: '场地照片'
      }
    },
    attachment: { // 附件信息
      type: 1,
      label: {
        credit_inv_file_ids: '征信信息',
        agreement_file_ids: '合作协议',
        debt_file_ids: '资产负债',
        licensees_file_ids: '门店 / 持牌人清单'
      }
    },
    product: {
      type: 1,
      label: {
        name: '资金方名称',
        products: '金融产品'
      }
    }
  },
  'organize.staff': { // 资金方
    basic: { // 基本信息
      type: 1,
      label: {
        name: '资金方名称',
        // business_name: '商务总监名称',
        // business_contact: '商务总监手机号',
        address: '资金方地址'
      }
    },
    bank: { // 银行卡信息
      type: 1,
      label: {
        payee_name: '收款方名称',
        card_number: '银行账号',
        card_bank: '开户行（支行）'
      }
    },
    photo: { // 照片信息
      type: 0
    },
    attachment: { // 附件信息
      type: 0
    },
    product: {
      type: 0
    }
  },
  'organize.detail.finance': {
    basic: { // 基本信息
      type: 1,
      label: {
        name: '产品名称',
        min_limit: '最低额度（万）',
        max_limit: '最高额度（万）',
        deposit: '保证金',
        loan_cycle: '借款周期/天',
        is_advance: '是否垫资',
        repayment_type: '还款方式',
        open_time: '开启时间',
        financeProductInInterest: {
          loan_interest: '借款利率',
          overdue_interest: '逾期利率',
          advance_interest: '垫资利率'
        }
      }
    },
    bank: { // 银行卡信息
      type: 0
    },
    photo: { // 照片信息
      type: 0
    },
    attachment: { // 附件信息
      type: 0
    },
    product: {
      type: 0
    }
  },
  'organize.detail.staff': {
    basic: { // 基本信息
      type: 1,
      label: {
        name: '姓名',
        mobile: '手机号',
        id_number: '身份证',
        role_id: '角色'
      }
    },
    bank: { // 银行卡信息
      type: 0
    },
    photo: { // 照片信息
      type: 0
    },
    attachment: { // 附件信息
      type: 0
    },
    product: {
      type: 0
    }
  },
  'organize.detail.carstaff': {
    basic: { // 基本信息
      type: 1,
      label: {
        name: '姓名',
        mobile: '手机号',
        id_number: '身份证',
        role_id: '角色'
      }
    },
    bank: { // 银行卡信息
      type: 0
    },
    photo: { // 照片信息
      type: 0
    },
    attachment: { // 附件信息
      type: 0
    },
    product: {
      type: 0
    }
  },
  'organize.detail.licensee': {
    basic: { // 基本信息
      type: 1,
      label: {
        name: '姓名',
        mobile: '手机号',
        id_number: '身份证'
      }
    },
    bank: { // 银行卡信息
      type: 0
    },
    photo: { // 照片信息
      type: 1,
      label: {
        id_number_files: '身份证文件',
        contract_files: '合同文件',
        badge_files: '工牌文件',
        postcard_files: '名片文件',
        social_security_files: '社保文件'
      }
    },
    attachment: { // 附件信息
      type: 0
    },
    product: {
      type: 0
    }
  },
  'organize.detail.carlicensee': {
    basic: { // 基本信息
      type: 1,
      label: {
        name: '姓名',
        mobile: '手机号',
        id_number: '身份证'
      }
    },
    bank: { // 银行卡信息
      type: 0
    },
    photo: { // 照片信息
      type: 1,
      label: {
        id_number_files: '身份证文件',
        contract_files: '合同文件',
        badge_files: '工牌文件',
        postcard_files: '名片文件',
        social_security_files: '社保文件'
      }
    },
    attachment: { // 附件信息
      type: 0
    },
    product: {
      type: 0
    }
  },
  'order.list': {
    basic: {
      type: 1,
      label: {
        sn: '订单号',
        create_name: '提报人姓名',
        create_contact: '提报人手机号',
        status_name: '订单状态',
        create_time: '创建时间'
      }
    },
    car: {
      type: 1,
      label: {
        type_name: '品牌车型',
        total_price: '评估金额（万）',
        address: '所在城市',
        dealer_name: '所属中小型车商／门店',
        vcode: '车架号',
        mileage: '行驶里程（公里）',
        color: '车身颜色',
        assess_price_time: '评估时间',
        boarding_year: '上牌日期',
        used_nature: '使用性质',
        licensee_id: '持牌人'
      }
    },
    loan: {
      type: 1,
      label: {
        loan_money: '本金（元）',
        loan_interest: '贷款利息（元）',
        overdue_interest: '逾期利息（元）',
        advance_interest: '垫资利息（元）',
        loan_time: '借款时间',
        expire_time: '到期时间',
        repayment_time: '还款时间',
        repayment_total: '当前总还款金额（元）',
        product_id: '贷款产品'
      }
    },
    photo: {
      type: 1,
      label: {
        property_right_files: '产权证',
        list_files: '交接清单',
        driving_license_files: '行驶证'
      }
    }
  },
  'CA': {
    basic: {
      type: 1,
      label: {
        platform_id: '客户来源唯一标识',
        create_time: '请求时间',
        business_name: '企业名称',
        customer_id: '客户编号',
        contact: '联系电话',
        account: '邮箱',
        refusal_reason: '审核描述'
      }
    }
  }
}
