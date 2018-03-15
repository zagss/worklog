<template>
    <ul :id='id' class='frame'>
        <li v-for="item in imgData" :key="item" class='imgbox'>
            <img :src="item.url" @load='loadImg($event)'>
        </li>
    </ul>
</template>

<script>
  import Viewer from '../../static/viewer.min.js'
  export default {
    props: {
      imgData: Array,
      id: String
    },
    methods: {
      loadImg (e) {
        let imgw = e.currentTarget.width
        let imgh = e.currentTarget.height
        if (imgw > imgh) {
          e.currentTarget.style.height = '100%'
          e.currentTarget.style.marginLeft = (73 - e.currentTarget.width / 2) + 'px'
        } else {
          e.currentTarget.style.width = '100%'
          e.currentTarget.style.marginTop = (73 - e.currentTarget.height / 2) + 'px'
        }
      },
      viewer () {
        /* eslint-disable no-new */
        if (document.getElementById('license_files')) {
          new Viewer(document.getElementById('license_files'))
        }
        if (document.getElementById('business_proof_files')) {
          new Viewer(document.getElementById('business_proof_files'))
        }
        if (document.getElementById('area_files')) {
          new Viewer(document.getElementById('area_files'))
        }
        if (document.getElementById('owner_id_files')) {
          new Viewer(document.getElementById('owner_id_files'))
        }
        if (document.getElementById('opening_permit_files')) {
          new Viewer(document.getElementById('opening_permit_files'))
        }
        if (document.getElementById('rent_contract_files')) {
          new Viewer(document.getElementById('rent_contract_files'))
        }
        if (document.getElementById('marriage_certificate_files')) {
          new Viewer(document.getElementById('marriage_certificate_files'))
        }
        if (document.getElementById('mate_id_files')) {
          new Viewer(document.getElementById('mate_id_files'))
        }
        if (document.getElementById('id_number_files')) {
          new Viewer(document.getElementById('id_number_files'))
        }
        if (document.getElementById('contract_files')) {
          new Viewer(document.getElementById('contract_files'))
        }
        if (document.getElementById('badge_files')) {
          new Viewer(document.getElementById('badge_files'))
        }
        if (document.getElementById('postcard_files')) {
          new Viewer(document.getElementById('postcard_files'))
        }
        if (document.getElementById('social_security_files')) {
          new Viewer(document.getElementById('social_security_files'))
        }
        if (document.getElementById('property_right_files')) {
          new Viewer(document.getElementById('property_right_files'))
        }
        if (document.getElementById('list_files')) {
          new Viewer(document.getElementById('list_files'))
        }
        if (document.getElementById('driving_license_files')) {
          new Viewer(document.getElementById('driving_license_files'))
        }
        if (document.getElementById('advance_voucher_files')) {
          new Viewer(document.getElementById('advance_voucher_files'))
        }
        if (document.getElementById('repayment_voucher_files')) {
          new Viewer(document.getElementById('repayment_voucher_files'))
        }
      }
    },
    updated () {
      this.viewer()
    }
  }

</script>

<style lang="scss" scoped>
@import '../../static/viewer.min.css';
.frame {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    .imgbox {
        margin-right: 16px;
        margin-bottom: 16px;
        cursor: pointer;
        width: 146px;
        height: 146px;
        overflow: hidden;
    }
}
  // .imgbox {
  //   display: inline-block;
  //   margin-right: 16px;
  //   margin-bottom: 16px;
  //   width: 200px;
  //   height: 200px;
  //   box-sizing: border-box;
  //   overflow: hidden;
  //   cursor: pointer;
  // }
</style>
