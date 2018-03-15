export default {
  'dealer': { // 经销商集团
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
    bank: {
      type: 1,
      label: {
        payee_name: '收款方名称',
        card_number: '银行账号',
        card_bank: '开户行（支行）'
      }
    },
    photo: {
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
      },
      tableLabel: {
        type_name: '附件类型',
        name: '附件名称',
        type: '格式'
      }
    },
    product: {
      type: 0
    },
    nav: {
      subsidiary: '附属门店'
    }
  },
  'store': { // 门店管理
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
      },
      tableLabel: {
        type_name: '附件类型',
        name: '附件名称',
        type: '格式'
      }
    },
    product: { // 产品信息
      type: 1,
      label: {
        dealer_name: '资金方名称',
        product_name: '金融产品'
      }
    },
    nav: {
      staff: '员工管理',
      licensee: '持牌人管理',
      ca: 'CA认证'
    }
  },
  'car': { // 中小型车商管理
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
      },
      tableLabel: {
        type_name: '附件类型',
        name: '附件名称',
        type: '格式'
      }
    },
    product: {
      type: 1,
      label: {
        dealer_name: '资金方名称',
        product_name: '金融产品'
      }
    },
    nav: {
      staff: '员工管理',
      licensee: '持牌人管理',
      ca: 'CA认证'
    }
  },
  'finance': { // 资金方
    basic: { // 基本信息
      type: 1,
      label: {
        name: '资金方名称',
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
    },
    nav: {
      goods: '金融产品管理',
      staff: '员工管理'
    }
  }
}
