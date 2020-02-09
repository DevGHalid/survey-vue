<template>
  <Master>
    <portal v-if="formSelectedForDeletion !== null" to="modal-portal">
      <FormListConfirmRemoving
        :formName="formSelectedForDeletion.name"
        @onConfirmRemovingFormItem="handleConfirmRemovingFormItem"
        @onClose="handleResetFormSelectedForDeleting"
      />
    </portal>

    <div class="container">
      <div class="card">
        <div class="card-header justify-content-between">
          <h4 class="card-title">Списак формы</h4>
          <div class="form-btn-action">
            <button
              class="btn btn-sm btn-outline-cyan d-flex align-items-center"
              :disabled="isAddingForm"
              @click="isAddingForm = true"
            >
              <FontAwesomeIcon icon="plus" class="mr-2" />Добавить Форму
            </button>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-light table-hover">
            <thead>
              <tr>
                <th class="w-6">
                  <label class="custom-control custom-checkbox p-0 m-0">
                    <input
                      class="custom-control-input custom-control custom-checkbox"
                      type="checkbox"
                    />
                  </label>
                </th>
                <th scope="col">Создатель</th>
                <th scope="col">Названия</th>
                <th scope="col">Количества листов</th>
                <th scope="col">Дата</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="form in allForms" :key="form.id">
                <th></th>
                <td>
                  <div class="nav-link p-0 leading-none">
                    <span class="avatar"></span>
                    <span class="ml-2 d-none d-lg-block">
                      <span class="text-default">{{ form.username }}</span>
                    </span>
                  </div>
                </td>
                <td>{{ form.name }}</td>
                <td>{{ form.countSheets }}</td>
                <td>{{ form.created }}</td>
                <td>
                  <div class="d-flex justify-content-end">
                    <div class="form-action form-action-edit mr-3">
                      <button
                        class="btn btn-sm btn-outline-primary btn-pill d-flex align-items-center"
                        @click="handleRedirectToEditFormItem(form.id)"
                      >
                        <FontAwesomeIcon icon="pencil-alt" class="mr-2" />Редактировать
                      </button>
                    </div>
                    <div class="form-action form-action-remove">
                      <button
                        class="btn btn-sm btn-outline-danger btn-pill d-flex align-items-center"
                        @click="handleRemoveFormItem(form)"
                      >
                        <FontAwesomeIcon icon="trash-alt" class="mr-2" />Удалить
                      </button>
                    </div>
                  </div>
                </td>
              </tr>

              <FormListAdd
                v-if="isAddingForm"
                :username="username"
                @onAddForm="handleAddFormItem"
                @onClose="isAddingForm = false"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
import FormListAdd from "./FormListAdd";
import FormListConfirmRemoving from "./FormListConfirmRemoving";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    FormListAdd,
    FormListConfirmRemoving
  },

  data: () => ({
    isAddingForm: false,
    formSelectedForDeletion: null
  }),

  computed: {
    ...mapGetters(["username", "allForms"])
  },

  methods: {
    ...mapActions(["loadAllForms", "saveForm", "removeForm"]),

    handleAddFormItem(formName) {
      this.saveForm(formName);
      this.isAddingForm = false;
    },

    handleRemoveFormItem(formItem) {
      this.formSelectedForDeletion = formItem;
    },

    handleResetFormSelectedForDeleting() {
      this.formSelectedForDeletion = null;
    },

    handleConfirmRemovingFormItem(isConfirmed) {
      if (isConfirmed) {
        this.removeForm(this.formSelectedForDeletion.id);
        this.handleResetFormSelectedForDeleting();
      }
    },

    handleRedirectToEditFormItem(formId) {
      this.$router.push({
        name: "forms.edit",
        params: { formId }
      });
    }
  },

  mounted() {
    this.loadAllForms();
  }
};
</script>
