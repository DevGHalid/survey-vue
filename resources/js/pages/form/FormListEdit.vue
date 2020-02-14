<template>
  <Master>
    <div class="container">
      <div class="my-3 my-md-5">
        <div class="container">
          <div class="row">
            <div class="col col-md-3">
              <div v-if="isLoadedQuestions" class="question-nav">
                <draggable :list="allTypeQuestions" :group="dragOptions.from">
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
                </draggable>
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
                    <draggable
                      :list="sheet.sheet_answers"
                      :group="dragOptions.to"
                    >
                      <div
                        class="card-body"
                        v-for="sheetAnswer in sheet.sheet_answers"
                        :key="sheetAnswer.id"
                      >
                        <span class="icon">
                          <i class="fe" :class="sheetAnswer.icon"></i>
                        </span>
                        {{ sheetAnswer }}
                      </div>
                    </draggable>
                    <div class="card-footer d-flex justify-content-between">
                      <small
                        >Страница {{ index + 1 }} из {{ countSheets }}</small
                      >
                      <small>{{ sheet.created_at }}</small>
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
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },

  data: () => ({
    dragOptions: {
      from: {
        name: "question",
        pull: "clone",
        put: false
      },
      to: {
        name: "question"
      }
    }
  }),

  computed: {
    ...mapGetters([
      "allTypeQuestions",
      "typeQuestionStatus",
      "allSheets",
      "allSheetsAnswers",
      "sheetStatus",
      "countSheets"
    ]),

    isLoadedQuestions() {
      return !this.typeQuestionStatus || this.typeQuestionStatus !== "loading";
    },

    isLoadedSheets() {
      return !this.sheetStatus || this.sheetStatus !== "loading";
    }
  },

  methods: {
    ...mapActions(["loadAllTypeQuestions", "loadSheetsByFormId", "saveSheet"]),

    handleAddSheet() {
      this.saveSheet({
        form_id: this.$route.params.formId,
        title: `Новый лист ${this.countSheets + 1}`
      });
    }
  },

  async mounted() {
    await this.loadSheetsByFormId(this.$route.params.formId);
    await this.loadAllTypeQuestions();
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
