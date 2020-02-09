<template>
  <Modal @onClose="$emit('onClose')">
    <template #title>Вы абсолютно уверены?</template>
    <template #body>
      <p>
        Это действие не может быть отменено. Это приведет к необратимому
        удалению
      </p>
      <p>
        Пожалуйста, введите
        <code class="text-danger">{{ formName }}</code> для
        подтверждения.
      </p>
      <div class="form-group mt-5">
        <input class="form-control" v-model="name" />
        <div class="mt-4">
          <button
            class="btn btn-danger btn-block"
            :disabled="!isNameEqualFormName"
            @click="$emit('onConfirmRemovingFormItem', isNameEqualFormName)"
          >Я понимаю последствия, удалите этоу форму</button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "../../layouts/Modal";

export default {
  props: {
    formName: {
      type: String
    }
  },

  components: {
    Modal
  },

  data: () => ({
    name: ""
  }),

  computed: {
    isNameEqualFormName() {
      return this.name === this.formName;
    }
  }
};
</script>

<style></style>
