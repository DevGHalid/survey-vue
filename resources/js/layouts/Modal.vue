<template>
  <div class="modal modal-active d-block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="title"></slot>
          </h5>
          <span class="modal-close" @click="$emit('onClose')">
            <FontAwesomeIcon icon="times" class="mr-2" />
          </span>
        </div>
        <div class="modal-body pb-0">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.modal {
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: 10s ease all;
  
  &-active {
    opacity: 1;
    transition: 10s ease all;
  }

  &-close {
    cursor: pointer;
    transition: 0.3s opacity ease;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
