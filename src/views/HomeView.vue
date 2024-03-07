<template>
  <div class="home">
    <h2>Home Page</h2>
  </div>
  <LogInModal />
  <SignupComp/>
</template>

<script>
import LogInModal from '@/components/LogInModal.vue';
import SignupComp from '@/components/SignupComp.vue';



export default {
  components: {
    LogInModal,
    SignupComp
  }
}
</script>
