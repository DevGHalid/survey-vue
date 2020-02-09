<template>
  <Master>
    <div class="container">
      <div class="my-3 my-md-5">
        <div class="container">
          <div class="row">
            <div class="col col-md-3">
              <div v-if="isLoadedQuestions" class="question-nav">
                <div
                  class="question-nav-items list-group mb-0 list-group-transparent"
                  v-for="question in allTypeQuestions"
                  :key="question.id"
                >
                  <div
                    class="question-nav-item list-group-item d-flex align-items-center mb-2"
                  >
                    <span class="icon">
                      <i class="fe" :class="question.icon"></i>
                    </span>
                    {{ question.name }}
                  </div>
                </div>
                <div class="mt-6">
                  <button
                    class="btn btn-block btn-secondary"
                    @click="handleAddSheet"
                  >
                    <i class="fe fe-file-plus"></i>
                    Добавить лист
                  </button>
                </div>
              </div>
              <div v-else>...loading</div>
            </div>
            <div class="col col-md-9">
              <div v-if="isLoadedSheets" class="form-sheets-content">
                <div
                  class="card p-3"
                  v-for="(sheet, index) in allSheets"
                  :key="sheet.id"
                >
                  <div class="card">
                    <div class="card-header">
                      <div class="card-title">{{ sheet.title }}</div>
                    </div>
                    <div class="card-body">{{ sheet }}</div>
                    <div class="card-footer d-flex justify-content-between">
                      <div>
                        Страница {{ index + 1 }} из {{ countSheets }}
                      </div>
                      <div>
                        {{ sheet.created_at }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>...loading</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    computed: {
      ...mapGetters([
        "allTypeQuestions",
        "typeQuestionStatus",
        "allSheets",
        "sheetStatus",
        "countSheets"
      ]),

      isLoadedQuestions() {
        return (
          !this.typeQuestionStatus || this.typeQuestionStatus !== "loading"
        );
      },

      isLoadedSheets() {
        return !this.sheetStatus || this.sheetStatus !== "loading";
      }
    },

    methods: {
      ...mapActions([
        "loadAllTypeQuestions",
        "loadSheetsByFormId",
        "saveSheet"
      ]),

      handleAddSheet() {
        const formId = this.$route.params.formId;

        if (!formId) return;

        this.saveSheet({
          form_id: formId,
          title: `Новый лист ${this.countSheets + 1}`
        });
      }
    },

    mounted() {
      this.loadSheetsByFormId(this.$route.params.formId);
      this.loadAllTypeQuestions();
    }
  };
</script>

<style lang="scss" scoped>
  .question-nav {
    &-item {
      flex-direction: column;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      position: relative;
      margin-bottom: 1.5rem;
      width: 100%;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
</style>
