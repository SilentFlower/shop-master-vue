<template>
  <div class="crop-upload">
    <div class="crop-upload-list">
      <ul class="el-upload-list el-upload-list--picture-card">
        <li
          :key="item.url"
          :tabindex="index"
          class="el-upload-list__item is-success"
          v-for="(item, index) in fileList"
        >
          <img :src="item.url" alt class="el-upload-list__item-thumbnail" />
          <a class="el-upload-list__item-name">
            <i class="el-icon-document"></i>
          </a>
          <label class="el-upload-list__item-status-label">
            <i class="el-icon-upload-success el-icon-check"></i>
          </label>
          <i class="el-icon-close"></i>
          <i class="el-icon-close-tip">按 delete 键可删除</i>
          <!---->
          <span class="el-upload-list__item-actions">
						<span @click="onEdit(index)" class="el-upload-list__item-preview">
							<i class="el-icon-edit"></i>
						</span>
						<span @click="onPreview(item)" class="el-upload-list__item-preview">
							<i class="el-icon-zoom-in"></i>
						</span>
						<span @click="onRemove(index)" class="el-upload-list__item-delete">
							<i class="el-icon-delete"></i>
						</span>
					</span>
        </li>
      </ul>
      <el-upload
        :before-upload="beforeAvatarUpload"
        ref="upload"
        class="upload-demo"
        accept="image/jpeg,image/gif,image/png,image/bmp"
        :auto-upload="false"
        :http-request="upLoadFile"
        action=""
        :data="uploadData"
        :headers="headers"
        :limit="limit"
        :on-change="onChange"
        :on-exceed="onExceed"
        :show-file-list="false"
        list-type="picture-card"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <cropper
      :visible.sync="cropperVisible"
      @on-cancel="onCropCancel"
      @on-finish="onCropFinish"
      ref="cropper"
    ></cropper>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" alt width="100%" />
    </el-dialog>
  </div>
</template>

<script>
  import Cropper from './cropper.vue';

  export default {
    props: {
      limit: {
        type: Number,
        default: 10
      },
      fileList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        headers: {
          // your headers
        },
        uploadUrl: 'upload url',
        uploadData: {},
        dialogVisible: false,
        dialogImageUrl: '',
        cropperVisible: false,
        selectedCropIndex: -1
      };
    },
    computed: {
      upload() {
        return this.$refs.upload;
      },
      cropper() {
        return this.$refs.cropper;
      }
    },
    created() {},
    methods: {
      //上传前检查格式
      beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
      },
      //自定义上传
      upLoadFile(file){
        console.log(file)
        this.formData.append('shopPic',file.file)
        console.log(file.file)
        console.log(this.formData)
      },
      // 删除
      onRemove(index) {
        const newFileList = this.fileList;
        newFileList.splice(index, 1);
        this.$emit('update:fileList', newFileList);
      },
      // 预览
      onPreview(item) {
        this.dialogImageUrl = item.url;
        this.dialogVisible = true;
      },
      // 弹出裁剪组件
      onEdit(index) {
        this.selectedCropIndex = index;
        const file = this.fileList[index];
        this.cropper.show(file);
      },
      onExceed() {
        this.$message({
          type: 'error',
          message: '超出上传数量限制,无法继续上传'
        });
      },
      // 文件状态改变时的钩子，添加文件，弹出裁剪组件
      onChange(file, fileList) {
        this.cropper.show(file);
      },
      // 监听裁剪结束，进行上传
      onCropFinish(data) {
        console.log(data)
        this.$emit("cropFinish", data);
      },
      // 取消裁剪
      onCropCancel() {
        this.reset();
      },
      doUpload(data) {
        // your custom upload
      },
      reset() {
        this.selectedCropIndex = -1;
      }
    },
    components: {
      Cropper
    }
  };
</script>

<style>
  .upload-demo .el-upload--picture-card{
    width: 128px;
    height: 128px;
  }
</style>

<style lang="css" scoped>
  .crop-upload-list {
    display: flex;
  }
</style>
