<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  components: { NavbarComponent, FooterComponent }
}
</script>
<template>
  <div>
    <NavbarComponent />
    <slot />
    <FooterComponent />
  </div>
</template>
