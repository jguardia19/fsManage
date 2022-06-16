<template>
  <!-- modal confirm delete-->
  <v-dialog v-model="modal" max-width="400">
    <v-card>
      <v-card-title class="error white--text">
        <v-row>
          <v-col cols="12">
            <h5>Estas seguro de eliminar este registro?</h5>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row class="mt-5">
          <v-col class="text-center">
            <h2>Name:{{ name_registro}}</h2>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" class="text-right">
          <v-btn text class="mr-2" @click="$emit('close')"
            >Cancelar</v-btn
          >
          <v-btn class="gray" @click="$emit('delete')">aceptar</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props:['modal','name_registro']
};
</script>

<style>
</style>