<template>
  <div>
    <AddUserList></AddUserList>
    <!-- 新增用户提交表单 -->
    <AddUserInput></AddUserInput>
  </div>
</template>

<script>
import AddUserInput from '@/components/user/AddUserInput'
import AddUserList from '@/components/user/AddUserList'
export default {
  components: {
    AddUserInput,
    AddUserList
  }
};
</script>