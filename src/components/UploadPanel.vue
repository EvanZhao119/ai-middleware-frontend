<template>
  <el-form label-width="140px">
    <el-form-item label="Path">
      <el-input :model-value="path" readonly />
    </el-form-item>

    <el-form-item label="Upload Image">
      <el-upload drag :auto-upload="false" :on-change="onFileChange">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drop file here or click to upload</div>
      </el-upload>
    </el-form-item>

    <el-form-item v-if="showTopk" label="Top K">
      <el-input-number
        :model-value="topk"
        @update:model-value="emit('update:topk', $event)"
        :min="1"
        :max="10"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" class="send-btn" @click="send">
        Send Request
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  path: String,
  loading: Boolean,
  showTopk: Boolean,
  topk: Number,
});

const emit = defineEmits(["send", "update:topk"]);

const fileRef = ref(null);
const onFileChange = (file) => (fileRef.value = file.raw);
const send = () => emit("send", fileRef.value);
</script>

<style scoped>
.send-btn {
  width: 100%;
  font-size: 16px;
  padding: 10px 0;
}
</style>
