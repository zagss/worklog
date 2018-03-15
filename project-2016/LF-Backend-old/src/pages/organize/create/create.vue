<template>
    <div class='box'>
        <div class='detail-page'>
            <div class='fadeInRight'>
                <v-infobasic title='基本信息' v-if='labelData.basic.type'>
                  <el-form :label-position="labelPosition" label-width="110px" :model="formData.basicData" class='bodybottom'>
                  <div :class="{'create-page-input': true, 'address':key=='address'}" v-for='(item, key) in labelData.basic.label' :key='key' v-if="key !== 'available_limit' && key !== 'financeProductInInterest'">
                    <el-form-item :label="item">
                      <el-cascader v-if='key=="address"' placeholder="省/市/县(区)" :options="addressoptions" filterable v-model="formData.selectedOptions" @change="handleCityChange"></el-cascader>
                      <el-select v-model="formData.incar_dealer_id" filterable placeholder="请选择评估设备" v-if="key === 'incar_dealer_id'" @change="handleIncar">
                        <el-option :label="item.name" :value="item.id" v-for='item in incarData' :key='item.id'></el-option>
                      </el-select>
                      <el-select v-model="formData.group_id" filterable placeholder="请选择所属集团" v-else-if="key === 'group_id'">
                        <el-option :label="item.name" :value="item.id" v-for='item in groupData' :key='item.id'></el-option>
                      </el-select>
                      <el-select v-model="formData.role_id" placeholder="请选择角色" v-else-if="key === 'role_id'">
                        <el-option :label="item.name" :value="item.id" v-for='item in roleData' :key='item.id'></el-option>
                      </el-select>
                      <el-select v-model="formData.business_name" placeholder="请选择商务总监" v-else-if="key === 'business_name'" @change="handleZJChange">
                        <el-option :label="item.name" :value="item" v-for='item in bussinessData' :key='item.id'></el-option>
                      </el-select>
                      <template v-else-if='key === "is_advance"'>
                        <el-radio-group v-model="formData.is_advance" @change="handleIsAdvanceChange">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                      </template>
                      <el-select v-model="formData.repayment_type" placeholder="请选择还款方式" v-else-if="key === 'repayment_type'" @change="handleRepayChange">
                        <el-option label="一次性还款" :value="1"></el-option>
                        <el-option label="先息后本" :value="2"></el-option>
                      </el-select>
                      <el-date-picker v-else-if='key === "open_time"' v-model="formData.open_time" type="date" placeholder="选择日期" @change='openTimeChange' :picker-options="optimePickerOptions"></el-date-picker>
                      <el-input v-else-if='key === "business_contact"' v-model="formData.business_contact"></el-input>
                      <el-input v-else v-model="formData.basicData[key]"></el-input>
                    </el-form-item>
                  </div>
                  <div class='address create-page-input' v-show='labelData.basic.label.financeProductInInterest'>
                    <el-form-item label='借款利率'>
                      <el-cascader :options="financeProductOptions" v-model="formData.selectedLoanOptions" @change="handleChange"></el-cascader>
                      <el-input v-model="formData.basicData.loan_interest"></el-input>
                    </el-form-item>
                  </div>
                  <div class='address create-page-input' v-show='labelData.basic.label.financeProductInInterest'>
                    <el-form-item label='逾期利率'>
                      <el-cascader :options="financeProductOptions" v-model="formData.selectedOverdueOptions" @change="handleChange"></el-cascader>
                      <el-input v-model="formData.basicData.overdue_interest"></el-input>
                    </el-form-item>
                  </div>
                  <div class='address create-page-input' v-show='labelData.basic.label.financeProductInInterest'>
                    <el-form-item label='垫资利率'>
                      <el-cascader :options="financeProductOptions" v-model="formData.selectedAdvanceOptions" @change="handleChange" :disabled="ifDisabled"></el-cascader>
                      <el-input v-model="formData.basicData.advance_interest" :disabled="ifDisabled"></el-input>
                    </el-form-item>
                  </div>
                  </el-form>
                </v-infobasic>
                <v-infobasic title='银行卡信息' v-if='labelData.bank.type === 1'>
                    <el-form :label-position="labelPosition" label-width="110px" :model="formData.bankData" class='bodybottom'>
                      <div class='create-page-input' v-for='(item, key) in labelData.bank.label' :key='key'>
                        <el-form-item :label="item">
                          <el-input v-model="formData.bankData[key]"></el-input>
                        </el-form-item>
                      </div>
                    </el-form>
                </v-infobasic>
                <v-infobasic title='银行卡信息' v-else-if='labelData.bank.type === 2'>
                    <span class='modify' slot='modify' @click='cretateNewBankDialog'>新建</span>
                    <el-dialog title="新建银行卡信息" v-model="newBbankdialog">
                      <el-form :model="bankform" :inline="true" class="demo-form-inline">
                        <el-form-item :label="val" v-for='(val, key) in labelData.bank.label' :key='key' label-width="120px">
                          <el-input v-model="bankform[key]" v-if="key !== 'type'"></el-input>
                          <el-select v-model="bankform.type" placeholder="请选择类型" v-else >
                            <el-option label="对公帐号" value="1"></el-option>
                            <el-option label="个人帐号" value="2"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="newBbankdialog = false">取 消</el-button>
                        <el-button type="danger" @click="handleBankTableClick">确 定</el-button>
                      </span>
                    </el-dialog>
                    <el-dialog title="新建银行卡信息" v-model="bankdialog">
                      <el-form :model="bankform2" :inline="true" class="demo-form-inline">
                        <el-form-item :label="val" v-for='(val, key) in labelData.bank.label' :key='key' label-width="120px">
                          <el-input v-model="bankform2[key]" v-if="key !== 'type'"></el-input>
                          <el-select v-model="bankform2.type" placeholder="请选择类型" v-else >
                            <el-option label="对公帐号" value="1"></el-option>
                            <el-option label="个人帐号" value="2"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="bankdialog = false">取 消</el-button>
                        <el-button type="danger" @click="bankdialog = false">确 定</el-button>
                      </span>
                    </el-dialog>
                    <el-table :data='formData.bankTableData' class='bodybottom'>
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop='type' label='银行卡类型'>
                          <template scope='scope'>
                                {{scope.row.type | newTypeName}}
                          </template>
                        </el-table-column>
                        <el-table-column v-if='key!=="type"' v-for='(val, key) in labelData.bank.label' :key='key' :prop='key' :label='val'>
                        </el-table-column>
                        <el-table-column label='操作' :width='180'>
                            <template scope='scope'>
                                <a class='operate' @click='modifyBankTableData(scope)'>修改</a>
                                <a class='operate' @click='deleteBankTableData(scope.$index)'>删除</a>
                            </template>
                        </el-table-column>
                    </el-table>
                </v-infobasic>
                <v-infobasic title='照片信息' v-if='labelData.photo.type'>
                    <v-infoitem title='营业执照' v-if='labelData.photo.label.license_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleLicenseRemove"
                          :headers='formData.headers'
                          :on-success="handleLicenseScucess"
                          :file-list="imgFileList.license_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='开户许可证' v-if='labelData.photo.label.opening_permit_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleOpenPermitRemove"
                          :headers='formData.headers'
                          :on-success="handleOpenPermitScucess"
                          :file-list="imgFileList.opening_permit_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='负责人身份证' v-if='labelData.photo.label.owner_id_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleOwnerIdRemove"
                          :headers='formData.headers'
                          :on-success="handleOwnerIdScucess"
                          :file-list="imgFileList.owner_id_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='负责人配偶身份证' v-if='labelData.photo.label.mate_id_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleMateRemove"
                          :headers='formData.headers'
                          :on-success="handleMateScucess"
                          :file-list="imgFileList.mate_id_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='负责人结婚证' v-if='labelData.photo.label.marriage_certificate_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleMarriageRemove"
                          :headers='formData.headers'
                          :on-success="handleMarriageScucess"
                          :file-list="imgFileList.marriage_certificate_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='场地照片' v-if='labelData.photo.label.area_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleAreaRemove"
                          :headers='formData.headers'
                          :on-success="handleAreaScucess"
                          :file-list="imgFileList.area_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='场地租赁合同' v-if='labelData.photo.label.rent_contract_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleRentRemove"
                          :headers='formData.headers'
                          :on-success="handleRentScucess"
                          :file-list="imgFileList.rent_contract_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='营业场所证明' v-if='labelData.photo.label.business_proof_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleLicenseAreaRemove"
                          :headers='formData.headers'
                          :on-success="handleLicenseAreaScucess"
                          :file-list="imgFileList.business_proof_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='持牌人身份证' v-if='labelData.photo.label.id_number_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleLicenseeRemove"
                          :headers='formData.headers'
                          :on-success="handleLicenseeScucess"
                          :file-list="imgFileList.id_number_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='合同' v-if='labelData.photo.label.contract_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleContractRemove"
                          :headers='formData.headers'
                          :on-success="handleContractScucess"
                          :file-list="imgFileList.contract_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='工牌' v-if='labelData.photo.label.badge_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleBadgeRemove"
                          :headers='formData.headers'
                          :on-success="handleBadgeScucess"
                          :file-list="imgFileList.badge_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='名片' v-if='labelData.photo.label.postcard_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handlePostcardRemove"
                          :headers='formData.headers'
                          :on-success="handlePostcardScucess"
                          :file-list="imgFileList.postcard_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                    <v-infoitem title='社保' v-if='labelData.photo.label.social_security_files'>
                        <el-upload :action='hostName' list-type="picture-card"
                          :before-upload="beforeUpload"
                          :on-preview="imgPreview"
                          :on-remove="handleSocialRemove"
                          :headers='formData.headers'
                          :on-success="handleSocialScucess"
                          :file-list="imgFileList.social_security_files"
                          >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogImg" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </v-infoitem>
                </v-infobasic>
                <v-infobasic title='附件信息' modify='上传附件' v-if='labelData.attachment.type'>
                  <span class='modify' slot='modify' @click='dialogAdjunct=true'>上传附件</span>
                  <el-dialog title="提示" v-model="dialogAdjunct" size="tiny">
                 
                      <el-upload :action='hostName' 
                           :on-success='adjunctSuccess' :headers='formData.headers'
                           :file-list="fileAttachMentList"
                           >
                        <el-select ref='attachments' v-model="attachmentVal" placeholder="请选择">
                          <el-option v-for="(val, key) in labelData.attachment.label" :key='key' :label="val" :value="key">
                          </el-option>
                        </el-select>
                        <el-button slot='trigger' type="danger" class='adjunctBtn'>选取文件</el-button>
                      </el-upload>
                 
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogAdjunct = false">取 消</el-button>
                      <el-button type="danger"  @click="submitUpload">确 定</el-button>
                    </span>
                  </el-dialog>
                  <el-table :data='formData.attachmentData' :fit='true'>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop='type_name' label='附件类型'></el-table-column>
                    <el-table-column prop='name' label='附件名称'></el-table-column>
                    <el-table-column prop='type' label='格式'></el-table-column>
                    <el-table-column label='操作'>
                      <template scope="scope">
                        <el-button type="text" size="small" @click='removeAttachMentData(scope)'>删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </v-infobasic>
                <v-infobasic title='产品信息' v-if='labelData.product.type'>
                  <span class='modify' slot='modify' @click='createFinanceProduct'>添加产品</span>
                  <el-dialog title="新建产品" v-model="dialogProduct">
                      <el-form v-model="formData.productData" :inline="true">
                        <el-form-item label="资金方名称" label-width="120px">
                          <el-select ref='select' v-model="formData.productData.dealer.id" placeholder="请选择类型" @change='handleFinanceChange'>
                            <el-option :label="item.name" :value="item.id" v-for='item in productData.name' :key='item'>
                                <span style="float: left">{{ item.name }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="金融产品" label-width="120px">
                          <el-select ref='selectProduct' v-model="formData.productData.id" placeholder="请选择类型" @change='handleFincenChange'>
                            <el-option :label="item.name" :value="item.id" v-for='item in productData.products' :key='item'>
                                <span style="float: left">{{ item.name }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogProduct = false">取 消</el-button>
                        <el-button type="danger" @click="handleFinanceClick">确 定</el-button>
                      </span>
                    </el-dialog>
                    <el-dialog title="修改产品" v-model="dialogProductModify">
                      <el-form v-model="formData.productData" :inline="true">
                        <el-form-item label="资金方名称" label-width="120px">
                          <el-select ref='select' v-model="formData.productData.dealer.id" placeholder="请选择类型" @change='handleFinanceChange'>
                            <el-option :label="item.name" :value="item.id" v-for='item in productData.name' :key='item'>
                                <span style="float: left">{{ item.name }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="金融产品" label-width="120px">
                          <el-select ref='selectProduct' v-model="formData.productData.id" placeholder="请选择类型" @change='handleFincenChange'>
                            <el-option :label="item.name" :value="item.id" v-for='item in productData.products' :key='item'>
                                <span style="float: left">{{ item.name }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogProductModify = false">取 消</el-button>
                        <el-button type="danger" @click="dialogProductModifyClick">确 定</el-button>
                      </span>
                    </el-dialog>
                    <el-table :data='formData.financeProductsTableData' class='bodybottom'>
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop='dealer.name' label='资金方名称'></el-table-column>
                        <el-table-column prop='name' label='金融产品'></el-table-column>
                        <el-table-column label='操作' :width='180'>
                            <template scope='scope'>
                                <a class='operate' @click='modifyFinanceData(scope)'>修改</a>
                                <a class='operate' @click='deleteFinanceData(scope.$index)'>删除</a>
                            </template>
                        </el-table-column>
                    </el-table>
                </v-infobasic>
            </div>
        </div>
        <div class='saveBtn'>
          <el-button @click='handleConsoleClick'>取消</el-button>
          <el-button  type="danger" @click='modifySub' :loading="isSubmitLoding">保存</el-button>
        </div>
    </div>
</template>

<script>
  import config from '../../../config/config'
  import allData from '../../../config/onetoone'
  import { getProducts, putProductsDetail, getProductsDetail, postProducts, getLicenseesDetail, putLicenseesDetail, getDealerDetail, putDealerList, postDealerList, getIncarList, getDealerList, getUserList, getStoreList, postLicensees } from '../../../service/fetch'
  // import { regionData } from 'element-china-area-data' // 城市级联
  import { newArray, newCityArray } from '../../../config/chageCityOptions'
  import { staffRole, financeInterest } from '../../../config/role'
  export default {
    data () {
      return {
        hostName: `${config.host}/files`,
        labelData: '',
        dialogImageUrl: '',
        isSubmitLoding: false, // 保存按钮是否禁用
        dialogImg: false,
        dialogAdjunct: false,
        bankdialog: false, // 修改银行卡
        newBbankdialog: false, // 新建银行卡
        dialogProduct: false, // 添加产品
        dialogProductModify: false, // 修改产品
        attachmentVal: '',
        ifDisabled: false, // 是否禁用借款息值
        incarData: [], // 因车数据,
        groupData: [], // 集团数据
        productData: {
          name: [], // 资金方名称
          products: [] // 产品名称
        },
        fileAttachMentList: [],
        imgFileList: {
          license_files: [], // 营业执照
          opening_permit_files: [], // 开会许可证
          owner_id_files: [], // 负责人身份证
          mate_id_files: [], // 负责人配偶身份证
          marriage_certificate_files: [], // 负责人结婚证
          area_files: [], // 场地照片
          rent_contract_files: [], // 场地租赁合同
          business_proof_files: [], // 经营场所证明
          id_number_files: [], // 持牌人身份证
          contract_files: [], // 合同
          badge_files: [], // 工牌
          postcard_files: [], // 名片
          social_security_files: [] // 社保
        },
        roleData: staffRole,
        bussinessData: [],
        addressoptions: newArray, // 城市三级联动静态库
        financeProductOptions: financeInterest,
        activeName: '',
        labelPosition: 'left',
        bankform: { // organize.detail.attachment
          type: ''
        },
        bankform2: {},
        optimePickerOptions: { // 开启时间
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        formData: {
          basicData: {},
          bankData: {},
          bankTableData: [],
          selectedOptions: [], // 城市级联绑定
          headers: { 'X-Access-Token': sessionStorage.getItem('access_token') },
          pictureName: '',
          incar_dealer_id: '', // 因车id
          group_id: '', // 所属集团
          role_id: '', // 角色
          business_name: '', // 资金方名称
          productData: {
            name: '',
            id: '',
            products: '',
            dealer: {
              id: '',
              name: ''
            }
          },
          attachmentData: [], // 附件数据
          attach: {},
          business_contact: '', // zong jian mobile
          is_advance: 1, // shi fou dian zi
          min_quota: '',
          product_ids: [],
          financeProductsTableData: [], // 金融产品表格
          selectedLoanOptions: [],
          selectedOverdueOptions: [],
          selectedAdvanceOptions: [],
          open_time: '', // 开启时间
          repayment_type: '', // 还款方式
          attachmentIdsList: {
            agreement_file_ids: [],
            credit_inv_file_ids: [],
            debt_file_ids: [],
            licensees_file_ids: []
          }
        }
      }
    },
    filters: {
      newTypeName (val) {
        return val === '1' ? '对公账号' : '个人账号'
      }
    },
    methods: {
      handleRepayChange (val) {
        console.log(val)
      },
      handleIncar (val) {
        console.log(val)
        this.formData.basicData.incar_dealer_id = val
        console.log(this.formData.basicData)
      },
      openTimeChange (val) {
        var date = val
        this.formData.basicData.open_time = Date.parse(new Date(date)) / 1000
        console.log(this.formData.basicData.open_time)
        console.log(this.formData.bankData)
      },
      handleFincenChange (val) {
        console.log(val)
        console.log(this.$refs.selectProduct.selectedLabel)
        this.formData.productData.name = this.$refs.selectProduct.selectedLabel
      },
      handleIsAdvanceChange (val) { // 是否垫资
        console.log(val)
        console.log(this.formData.basicData)
        if (val === 0) {
          delete this.formData.basicData.advance_interest
          this.formData.selectedAdvanceOptions = []
          this.ifDisabled = true
        } else {
          this.ifDisabled = false
        }
      },
      handleFinanceClick () {
        if (this.formData.productData.id !== '') {
          if (this.formData.product_ids.indexOf(this.formData.productData.id) === -1) {
            this.formData.product_ids = [] // 先清空数组
            this.formData.financeProductsTableData.push(this.formData.productData) // push 进已有产品数组
            this.formData.financeProductsTableData.forEach(item => {
              this.formData.product_ids.push(item.id)
            })
            this.dialogProduct = false
          } else {
            this.$message({type: 'error', message: '该金融产品已经选过'})
          }
        } else {
          this.$message({type: 'warning', message: '请选择金融产品'})
        }
      },
      createFinanceProduct () {
        this.formData.productData = {
          name: '',
          id: '',
          products: '',
          dealer: {
            id: '',
            name: ''
          }
        }
        this.dialogProduct = true
      },
      modifyFinanceData (scope) {
        this.formData.productData = scope.row
        this.dialogProductModify = true
      },
      dialogProductModifyClick () {
        if (this.formData.productData.name !== '') {
          this.formData.product_ids = [] // 先清空数组
          this.formData.financeProductsTableData.forEach(item => {
            this.formData.product_ids.push(item.id)
          })
          this.dialogProductModify = false
        } else {
          this.$message({type: 'warning', message: '请选择金融产品'})
        }
      },
      deleteFinanceData (index) {
        this.formData.financeProductsTableData.splice(index, 1)
        this.formData.product_ids.splice(index, 1)
      },
      cretateNewBankDialog () {
        this.bankform = {
          card_bank: '',
          card_number: '',
          payee_name: '',
          type: ''
        }
        this.newBbankdialog = true
      },
      imgPreview (file) {
        console.log(file)
        this.dialogImg = true
        this.dialogImageUrl = file.url
      },
      imgRemove (file, fileList) {
        console.log(file)
        console.log(fileList)
      },
      handleZJChange (val) {
        this.formData.business_contact = val.mobile
      },
      handleFinanceChange (val) {
        console.log(val)
        console.log(this.$refs.select.selectedLabel)
        this.formData.productData.dealer.name = this.$refs.select.selectedLabel // 资金方名称
        this.formData.productData.products = ''
        let res = getProducts(val)
        const that = this
        res.then(res => {
          that.productData.products = res.data.data.list
        })
      },
      submitUpload () {
        if (JSON.stringify(this.formData.attach) === '{}') {
          this.dialogAdjunct = true
        } else {
          this.formData.attachmentIdsList = {
            agreement_file_ids: [],
            credit_inv_file_ids: [],
            debt_file_ids: [],
            licensees_file_ids: []
          }
          this.formData.attachmentData.push(this.formData.attach)
          this.formData.attachmentData.forEach(item => {
            this.formData.attachmentIdsList[item.typename].push(item.id.toString())
          })
          for (let i in this.formData.attachmentIdsList) {
            this.formData.attachmentIdsList[i] = this.formData.attachmentIdsList[i].toString()
          }
          Object.assign(this.formData.basicData, this.formData.attachmentIdsList)
          console.log(this.formData.attachmentIdsList)
          this.formData.attach = {} // qing kong shu ju
          this.attachmentVal = '' // qing kong shu ju
          this.fileAttachMentList = [] // qing kong shu ju
          this.dialogAdjunct = false
        }
      },
      adjunctSuccess (res, file, fileList) {
        console.log(fileList)
        if (res.code === 0) {
          this.$message.success('上传成功')
          let a = {}
          let url = fileList[0].name.split('.')
          a.typename = this.attachmentVal
          a.type = fileList[0].raw.type
          a.name = fileList[0].name
          a.proname = url[0]
          a.type_name = this.$refs.attachments.selectedLabel
          a.urls = fileList[0].response.data.urls
          a.form = url[1]
          a.id = fileList[0].response.data.id
          this.formData.attach = a
          console.log(this.formData.attach)
        } else {
          this.$message({ type: 'error', message: res.message })
        }
      },
      removeAttachMentData (scope) { // shan chu AttachmentList
        this.formData.attachmentIdsList = {
          agreement_file_ids: [],
          credit_inv_file_ids: [],
          debt_file_ids: [],
          licensees_file_ids: []
        }
        this.formData.attachmentData.splice(scope.$index, 1)
        this.formData.attachmentData.forEach(item => {
          this.formData.attachmentIdsList[item.typename].push(item.id.toString())
        })
        for (let i in this.formData.attachmentIdsList) {
          this.formData.attachmentIdsList[i] = this.formData.attachmentIdsList[i].toString()
        }
        Object.assign(this.formData.basicData, this.formData.attachmentIdsList)
        console.log(this.formData.attachmentIdsList)
        console.log(this.formData.attachmentData)
      },
      handleConsoleClick () {
        this.$confirm('取消创建, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.history.go(-1)
          this.$message({
            type: 'success',
            message: '已取消!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      financeModify () { // 更新金融产品
        const that = this
        this.formData.basicData.loan_interest_type = this.formData.selectedLoanOptions[0]
        this.formData.basicData.overdue_interest_type = this.formData.selectedOverdueOptions[0]
        this.formData.basicData.advance_interest_type = this.formData.selectedAdvanceOptions[0]
        if (this.formData.selectedLoanOptions[0] === '3') this.formData.basicData.loan_interest_days_year_id = this.formData.selectedLoanOptions[1]
        if (this.formData.selectedOverdueOptions[0] === '3') this.formData.basicData.overdue_interest_days_year_id = this.formData.selectedOverdueOptions[1]
        if (this.formData.selectedAdvanceOptions[0] === '3') this.formData.basicData.advance_interest_days_year_id = this.formData.selectedAdvanceOptions[1]
        if (this.formData.is_advance === 0) {
          this.formData.basicData.advance_interest_type = 0
          this.formData.basicData.advance_interest = 0
        }
        let totalData = Object.assign({}, this.formData.basicData, {
          is_advance: this.formData.is_advance,
          type: this.formData.is_advance,
          repayment_type: this.formData.repayment_type,
          min_limit: (this.formData.basicData.min_limit * 10000 + ''),
          max_limit: (this.formData.basicData.max_limit * 10000 + '')
        })
        console.log(totalData)
        let res = putProductsDetail(totalData, this.$route.query.pid)
        res.then(res => {
          if (res.data.code === 0) {
            that.$message({ type: 'success', message: res.data.message })
            that.backToOldPage()
          } else {
            that.$message({ type: 'error', message: res.data.message })
            this.isSubmitLoding = false
          }
        })
      },
      backToOldPage () {
        this.isSubmitLoding = false
        window.history.go(-1)
      },
      modifySub () {
        this.isSubmitLoding = true
        const that = this
        let JudgeMent // 判断银行卡
        if (this.$route.query.from === 'organize.car') {
          JudgeMent = false // 表格
        } else if (this.$route.query.from === 'organize.detail.attachment' || this.$route.query.from === 'organize.store') {
          JudgeMent = false
        } else {
          JudgeMent = true
        }
        if (this.$route.query.modify) {
          if (this.$route.query.from === 'organize.detail.licensee' || this.$route.query.from === 'organize.detail.carlicensee') {
            let res = putLicenseesDetail(this.formData.basicData, this.$route.query.pid, this.$route.query.modify) // 经销商修改
            res.then(res => {
              if (res.data.code === 0) {
                that.$message({ type: 'success', message: res.data.message })
                that.backToOldPage()
              } else {
                that.$message({ type: 'error', message: res.data.message })
                this.isSubmitLoding = false
              }
            })
          } else if (this.$route.query.from === 'organize.detail.finance') {
            this.financeModify()
          } else {
            delete this.formData.basicData.license_files // 删除照片列表只传id
            delete this.formData.basicData.opening_permit_files
            delete this.formData.basicData.owner_id_files
            delete this.formData.basicData.area_files
            delete this.formData.basicData.business_proof_files
            let bankCards = JudgeMent ? [this.formData.bankData] : this.formData.bankTableData // 判断是表格还是其他
            let totalData = Object.assign({}, this.formData.basicData, {
              cards: bankCards, // 银行卡
              product_ids: this.formData.product_ids, // 金融产品
              credit_line: (this.formData.basicData.credit_line * 10000 + '') || '', // 换算单位 授信额度（万）
              car_loan_limit: (this.formData.basicData.car_loan_limit * 10000 + '') || '', // 单车授信额度（万）
              registered_capital: (this.formData.basicData.registered_capital * 10000 + '') || '' // 注册资金（万）
            })
            console.log(totalData)
            let res = putDealerList(totalData, this.$route.query.pid) // 经销商修改
            res.then(res => {
              console.log(res)
              if (res.data.code === 0) {
                that.$message({ type: 'success', message: res.data.message })
                that.backToOldPage()
              } else {
                that.$message({ type: 'error', message: res.data.message })
                this.isSubmitLoding = false
              }
            })
          }
        } else if (this.$route.query.from === 'organize.dealer') {
          let totalData = Object.assign({}, this.formData.basicData, {
            type: 1,
            cards: [this.formData.bankData],
            credit_line: (this.formData.basicData.credit_line * 10000 + '') || '', // 换算单位 授信额度（万）
            registered_capital: (this.formData.basicData.registered_capital * 10000 + '') || '' // 注册资金（万）
          }) // 合并data
          console.log(totalData)
          let res = postDealerList(totalData)
          res.then(res => {
            if (res.data.code === 0) {
              that.$message({ type: 'success', message: res.data.message })
              that.backToOldPage()
            } else {
              that.$message({ type: 'error', message: res.data.message })
              this.isSubmitLoding = false
            }
          })
        } else if (this.$route.query.from === 'organize.detail.attachment') {
          let totalData = Object.assign({}, this.formData.basicData, {cards: this.formData.bankTableData, product_ids: this.formData.product_ids}, {type: 3, group_id: this.$route.query.pid, incar_dealer_id: this.formData.incar_dealer_id}, {
            credit_line: (this.formData.basicData.credit_line * 10000 + '') || '', // 换算单位 授信额度（万）
            car_loan_limit: (this.formData.basicData.car_loan_limit * 10000 + '') || '' // 单车授信额度（万）
          }) // 合并data
          console.log(totalData)
          let res = postDealerList(totalData)
          res.then(res => {
            console.log(res)
            if (res.data.code === 0) {
              that.$message({ type: 'success', message: res.data.message })
              that.backToOldPage()
            } else {
              that.$message({ type: 'error', message: res.data.message })
              this.isSubmitLoding = false
            }
          })
        } else if (this.$route.query.from === 'organize.store') {
          let totalData = Object.assign({}, this.formData.basicData, {cards: this.formData.bankTableData, product_ids: this.formData.product_ids}, {type: 3, group_id: this.formData.group_id, incar_dealer_id: this.formData.incar_dealer_id}, {
            credit_line: (this.formData.basicData.credit_line * 10000 + '') || '', // 换算单位 授信额度（万）
            car_loan_limit: (this.formData.basicData.car_loan_limit * 10000 + '') || '' // 单车授信额度（万）
          }) // 合并data
          console.log(totalData)
          let res = postDealerList(totalData)
          res.then(res => {
            console.log(res)
            if (res.data.code === 0) {
              that.$message({ type: 'success', message: res.data.message })
              that.backToOldPage()
            } else {
              that.$message({ type: 'error', message: res.data.message })
              this.isSubmitLoding = false
            }
          })
        } else if (this.$route.query.from === 'organize.staff') { // 资金方创建
          let totalData = Object.assign({}, this.formData.basicData, {type: 4, cards: [this.formData.bankData]})
          console.log(totalData)
          let res = postDealerList(totalData)
          res.then(res => {
            console.log(res)
            if (res.data.code === 0) {
              that.$message({ type: 'success', message: res.data.message })
              that.backToOldPage()
            } else {
              that.$message({ type: 'error', message: res.data.message })
              this.isSubmitLoding = false
            }
          })
        } else if (this.$route.query.from === 'organize.detail.licensee' || this.$route.query.from === 'organize.detail.carlicensee') { // 持牌人创建
          let totalData = Object.assign({}, this.formData.basicData, {role_id: this.formData.role_id})
          console.log(totalData)
          let res = postLicensees(totalData, this.$route.query.pid)
          res.then(res => {
            console.log(res)
            if (res.data.code === 0) {
              that.$message({ type: 'success', message: res.data.message })
              that.backToOldPage()
            } else {
              that.$message({ type: 'error', message: res.data.message })
              this.isSubmitLoding = false
            }
          })
        } else if (this.$route.query.from === 'organize.car') { // 创建中小型车商
          let totalData = Object.assign({}, this.formData.basicData, {type: 2, cards: this.formData.bankTableData}, {
            credit_line: (this.formData.basicData.credit_line * 10000 + '') || '', // 换算单位 授信额度（万）
            car_loan_limit: (this.formData.basicData.car_loan_limit * 10000 + '') || '' // 单车授信额度（万）
          })
          console.log(totalData)
          let res = postDealerList(totalData)
          res.then(res => {
            console.log(res)
            if (res.data.code === 0) {
              that.$message({ type: 'success', message: res.data.message })
              that.backToOldPage()
            } else {
              that.$message({ type: 'error', message: res.data.message })
              this.isSubmitLoding = false
            }
          })
        } else if (this.$route.query.from === 'organize.detail.finance') { // 创建金融产品
          this.formData.basicData.loan_interest_type = this.formData.selectedLoanOptions[0]
          this.formData.basicData.overdue_interest_type = this.formData.selectedOverdueOptions[0]
          this.formData.basicData.advance_interest_type = this.formData.selectedAdvanceOptions[0]
          if (this.formData.selectedLoanOptions[0] === '3') this.formData.basicData.loan_interest_days_year_id = this.formData.selectedLoanOptions[1]
          if (this.formData.selectedOverdueOptions[0] === '3') this.formData.basicData.overdue_interest_days_year_id = this.formData.selectedOverdueOptions[1]
          if (this.formData.selectedAdvanceOptions[0] === '3') this.formData.basicData.advance_interest_days_year_id = this.formData.selectedAdvanceOptions[1]
          if (this.formData.is_advance === 0) {
            delete this.formData.basicData.advance_interest_type
          }
          let totalData = Object.assign({}, this.formData.basicData, {
            dealer_id: this.$route.query.pid,
            is_advance: this.formData.is_advance,
            type: this.formData.is_advance,
            repayment_type: this.formData.repayment_type,
            min_limit: (this.formData.basicData.min_limit * 10000 + ''),
            max_limit: (this.formData.basicData.max_limit * 10000 + '')
          })
          console.log(totalData)
          let res = postProducts(totalData)
          res.then(res => {
            if (res.data.code === 0) {
              that.$message({ type: 'success', message: res.data.message })
              that.backToOldPage()
            } else {
              that.$message({ type: 'error', message: res.data.message })
              this.isSubmitLoding = false
            }
          })
        }
      },
      handleCityChange (value) { // 选择城市，取出数组中最后一位存入formData.basicData，用于提交。
        console.log(value)
        console.log(this.formData.basicData)
        console.log(this.formData.bankData)
        this.formData.basicData.city_id = value[value.length - 1]
      },
      handleChange (value) {
        console.log(value)
      },
      handleBankTableClick () { // 添加bankTable
        this.formData.bankTableData.push(this.bankform)
        console.log(this.formData.bankTableData)
        this.newBbankdialog = false
      },
      deleteBankTableData (index) { // 删除banktabledata
        this.formData.bankTableData.splice(index, 1)
      },
      modifyBankTableData (res) {
        this.bankdialog = true
        this.bankform2 = res.row
        console.log(res)
      },
      uploadPic (res, fileList, title) {
        if (res.code === 0 && res.message === '操作成功') {
          var piclist = []
          for (var i = 0; i < fileList.length; i++) {
            var pic = fileList[i].response.data.id
            piclist.push(pic)
          }
          this.formData.basicData[title] = piclist.toString()
        } else {
          this.$message.error('上传图片失败！')
        }
      },
      removePic (fileList, title) {
        var piclist = []
        for (var i = 0; i < fileList.length; i++) {
          var pic = fileList[i].response.data.id
          piclist.push(pic)
        }
        this.formData.basicData[title] = piclist.toString()
      },
      handleLicenseScucess (res, file, fileList) { // 营业执照上传
        console.log(fileList)
        this.uploadPic(res, fileList, 'license_file_ids')
      },
      handleLicenseRemove (file, fileList) { // 删除营业执照
        console.log(fileList)
        this.removePic(fileList, 'license_file_ids')
        console.log(this.formData.basicData)
      },
      handleOpenPermitScucess (res, file, fileList) { // 开户许可
        this.uploadPic(res, fileList, 'opening_permit_file_ids')
      },
      handleOpenPermitRemove (file, fileList) { // 删除开户许可
        console.log(fileList)
        this.removePic(fileList, 'opening_permit_file_ids')
        console.log(this.formData.basicData)
      },
      handleOwnerIdScucess (res, file, fileList) { // 负责人身份证
        this.uploadPic(res, fileList, 'owner_id_file_ids')
      },
      handleOwnerIdRemove (file, fileList) { // 删除负责人身份证
        console.log(fileList)
        this.removePic(fileList, 'owner_id_file_ids')
        console.log(this.formData.basicData)
      },
      handleMateScucess (res, file, fileList) { // 负责人配偶身份证
        this.uploadPic(res, fileList, 'mate_id_file_ids')
      },
      handleMateRemove (file, fileList) { // 删除负责人配偶身份证
        this.removePic(fileList, 'mate_id_file_ids')
      },
      handleMarriageScucess (res, file, fileList) { // 负责人结婚身份证
        this.uploadPic(res, fileList, 'marriage_certificate_file_ids')
      },
      handleMarriageRemove (file, fileList) { // 删除负责人结婚身份证
        this.removePic(fileList, 'marriage_certificate_file_ids')
      },
      handleAreaScucess (res, file, fileList) { // 场地照片
        this.uploadPic(res, fileList, 'area_file_ids')
      },
      handleAreaRemove (file, fileList) { // 删除场地照片
        console.log(fileList)
        this.removePic(fileList, 'area_file_ids')
        console.log(this.formData.basicData)
      },
      handleRentScucess (res, file, fileList) { // 场地租赁合同
        this.uploadPic(res, fileList, 'rent_contract_file_ids')
      },
      handleRentRemove (file, fileList) { // 删除场地租赁合同
        this.removePic(fileList, 'rent_contract_file_ids')
      },
      handleLicenseAreaScucess (res, file, fileList) { // 营业场所证明
        this.uploadPic(res, fileList, 'business_proof_file_ids')
      },
      handleLicenseAreaRemove (file, fileList) { // 删除营业场所证明
        console.log(fileList)
        this.removePic(fileList, 'business_proof_file_ids')
        console.log(this.formData.basicData)
      },
      handleLicenseeScucess (res, file, fileList) { // 持牌人身份证
        this.uploadPic(res, fileList, 'id_number_file_ids')
      },
      handleLicenseeRemove (file, fileList) { // 删除持牌人身份证
        this.removePic(fileList, 'id_number_file_ids')
      },
      handleContractScucess (res, file, fileList) { // 合同
        this.uploadPic(res, fileList, 'contract_file_ids')
      },
      handleContractRemove (file, fileList) { // 删除合同
        this.removePic(fileList, 'contract_file_ids')
      },
      handleBadgeScucess (res, file, fileList) { // 工牌
        this.uploadPic(res, fileList, 'badge_file_ids')
      },
      handleBadgeRemove (file, fileList) { // 删除工牌
        this.removePic(fileList, 'badge_file_ids')
      },
      handlePostcardScucess (res, file, fileList) { // 名片
        this.uploadPic(res, fileList, 'postcard_file_ids')
      },
      handlePostcardRemove (file, fileList) { // 删除名片
        this.removePic(fileList, 'postcard_file_ids')
      },
      handleSocialScucess (res, file, fileList) { // 社保
        this.uploadPic(res, fileList, 'social_security_file_ids')
      },
      handleSocialRemove (file, fileList) { // 删除社保
        this.removePic(fileList, 'social_security_file_ids')
      },
      beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 20

        if (!isJPG) {
          this.$message.error('只能上传图片!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 20MB!')
        }
        return isJPG && isLt2M
      },
      fetchStoreSomeData () { // 门店 车商需要的借口
        const that = this
        let res = getIncarList() // 获得银车
        res.then(res => {
          console.log(res)
          that.incarData = res.data.data.list
        })
        let res2 = getDealerList() // 获得经销商
        res2.then(res => {
          console.log(res)
          that.groupData = res.data.data.list
        })
        let res3 = getStoreList(4) // 获得资金方
        res3.then(res => {
          console.log(res)
          that.productData.name = res.data.data.list
        })
      },
      changeImgListObject (res) { // 接口img对象不符合要求，进行修改！！！
        const that = this
        for (let i in that.imgFileList) { // 修改照片对象
          let piclist = []
          for (let j in res.data.data[i]) {
            let pic = Object.assign({}, {url: res.data.data[i][j].urls.original, response: {data: res.data.data[i][j]}})
            piclist.push(pic)
          }
          that.imgFileList[i] = piclist
        }
      },
      getAttachment (res) {
        if (res.credit_inv_files) {
          res.credit_inv_files.forEach(item => {
            item.type_name = '征信信息'
            item.typename = 'credit_inv_file_ids'
          })
          this.formData.attachmentData = this.formData.attachmentData.concat(res.credit_inv_files)
        }
        if (res.agreement_files) {
          res.agreement_files.forEach(item => {
            item.type_name = '合作协议'
            item.typename = 'agreement_file_ids'
          })
          this.formData.attachmentData = this.formData.attachmentData.concat(res.agreement_files)
        }
        if (res.debt_files) {
          res.debt_files.forEach(item => {
            item.type_name = '资产负债'
            item.typename = 'debt_file_ids'
          })
          this.formData.attachmentData = this.formData.attachmentData.concat(res.debt_files)
        }
        if (res.licensees_files) {
          res.licensees_files.forEach(item => {
            item.type_name = '门店／持牌人清单'
            item.typename = 'licensees_file_ids'
          })
          this.formData.attachmentData = this.formData.attachmentData.concat(res.licensees_files)
        }
        console.log(this.formData.attachmentData)
      },
      fetchBasicData (JudgeMent) {
        const that = this
        let res = getDealerDetail(this.$route.query.pid)
        res.then(res => {
          that.formData.basicData = res.data.data
          that.formData.basicData.credit_line = res.data.data.credit_line / 10000
          that.formData.basicData.car_loan_limit = res.data.data.car_loan_limit / 10000
          that.formData.basicData.available_limit = res.data.data.available_limit / 10000
          that.formData.basicData.registered_capital = res.data.data.registered_capital / 10000
          that.formData.selectedOptions = newCityArray(res.data.data.city_id) // 修改city_id
          that.formData.financeProductsTableData = res.data.data.products
          that.formData.product_ids = res.data.data.product_ids
          that.getAttachment(res.data.data)
          console.log(that.formData.basicData.city_id)
          for (let i in that.imgFileList) { // 修改照片对象
            let piclist = []
            for (let j in res.data.data[i]) {
              let pic = Object.assign({}, {url: res.data.data[i][j].urls.original, response: {data: res.data.data[i][j]}})
              piclist.push(pic)
            }
            that.imgFileList[i] = piclist
          }
          that.formData.group_id = res.data.data.group_id ? res.data.data.group_id : ''
          that.formData.incar_dealer_id = res.data.data.incar_dealer_id ? res.data.data.incar_dealer_id : ''
          if (JudgeMent) {
            that.formData.bankData = res.data.data.cards[0] || {}
          } else {
            that.formData.bankTableData = res.data.data.cards || []
          }
        })
      }
    },
    beforeMount () {
      let hostName = this.$route.query.from
      this.labelData = allData[hostName]
    },
    created () {
      const that = this
      let JudgeMent
      if (this.$route.query.from === 'organize.car') {
        JudgeMent = false
      } else if (this.$route.query.from === 'organize.detail.attachment' || this.$route.query.from === 'organize.store') {
        JudgeMent = false
      } else {
        JudgeMent = true
      }
      if (this.$route.query.modify) {
        if (this.$route.query.from === 'organize.detail.licensee' || this.$route.query.from === 'organize.detail.carlicensee') {
          let res = getLicenseesDetail(this.$route.query.pid, this.$route.query.modify) // 获取经销商详情
          res.then(res => {
            that.formData.basicData = res.data.data
            that.changeImgListObject(res)
          })
        } else if (this.$route.query.from === 'organize.staff') { // zi jin fang
          let res = getUserList(10)
          res.then(res => {
            that.bussinessData = res.data.data.list
          })
          this.fetchBasicData(JudgeMent)
        } else if (this.$route.query.from === 'organize.detail.attachment' || this.$route.query.from === 'organize.store' || this.$route.query.from === 'organize.car') {
          this.fetchStoreSomeData() // 获取因车，集团，资金方
          this.fetchBasicData(JudgeMent) // 获取基本信息及赋值
        } else if (this.$route.query.from === 'organize.detail.finance') {
          let res = getProductsDetail(this.$route.query.pid)
          res.then(res => {
            that.formData.basicData = res.data.data
            that.formData.basicData.min_limit = res.data.data.min_limit / 10000
            that.formData.basicData.max_limit = res.data.data.max_limit / 10000
            that.formData.repayment_type = res.data.data.repayment_type
            that.formData.is_advance = res.data.data.is_advance
            that.formData.open_time = new Date(res.data.data.open_time * 1000).toLocaleString('chinese', {hour12: false})
            that.formData.selectedLoanOptions = [res.data.data.loan_interest_type + '', res.data.data.loan_interest_days_year_id + '']
            that.formData.selectedOverdueOptions = [res.data.data.overdue_interest_type + '', res.data.data.overdue_interest_days_year_id + '']
            that.formData.selectedAdvanceOptions = [res.data.data.advance_interest_type + '', res.data.data.advance_interest_days_year_id + '']
          })
        } else {
          this.fetchBasicData(JudgeMent) // 获取基本信息及赋值
        }
      } else if (this.$route.query.from === 'organize.detail.attachment' || this.$route.query.from === 'organize.store' || this.$route.query.from === 'organize.car') {
        this.fetchStoreSomeData() // 获取因车，集团，资金方
      } else if (this.$route.query.from === 'organize.staff') {
        let res = getUserList(10) // 获取商务总监名称
        res.then(res => {
          that.bussinessData = res.data.data.list // 商务总监名称
        })
      }
    }
  }
</script>

<style lang='scss'>
  @import '../../../assets/style/mixin.scss';
  .adjunctBtn {
    position: absolute;
    left: 230px;
    top: 71px;
  }
  .el-select-dropdown__item.selected {
    background-color: #ff3b30;
  }
  .saveBtn {
    text-align: center;
    margin-bottom: 50px;
  }
  .operate {
    color: #ff3b30;
    cursor: pointer;
  }
  .demo-form-inline {
    .el-input, .el-select{
      width: 180px;
    }
  }
</style>
