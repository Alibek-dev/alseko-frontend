<template>
    <v-card>
        <v-card-title>
            <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-col cols="12">
                    <v-text-field
                        label="Название"
                        placeholder="Введите название материальной ценности"
                        outlined
                        v-model="subject"
                        counter="50"
                        :error="$v.subject.$invalid && $v.subject.$error"
                        @input="$v.subject.$touch()"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Стоимость"
                        placeholder="Введите стоимость"
                        type="number"
                        outlined
                        v-model="price"
                        :error="$v.price.$invalid && $v.price.$error"
                        @input="$v.price.$touch()"
                    ></v-text-field>
                </v-col>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="$emit('close', {showTangibleForm: false})"
            >
                Отмена
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="submit"
            >
                Сохранить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {required, maxLength, maxValue, minValue, numeric} from 'vuelidate/lib/validators'
export default {
    name: "TangibleForm",
    props: {
        editedItem: Object,
        formTitle: Text,
        showTangibleForm: Boolean,
    },
    data: () => ({
        subject: '',
        price: '',
    }),
    validations: {
        subject: {required, maxLength: maxLength(50)},
        price: {required, numeric, minValue: minValue(1), maxValue: maxValue(10000000)}
    },
    watch: {
        showTangibleForm() {
            this.subject = this.editedItem.subject
            this.price = this.editedItem.price
            this.$v.$reset()
        },
    },
    methods: {
        submit() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                console.log('Не пройдёшь')
            } else {
                this.$emit('save', {
                        subject: this.subject,
                        price: this.price
                    }
                )
            }

        }
    }

}
</script>

<style scoped>

</style>
