<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <v-btn class="mx-2" fab dark color="indigo" @click="dialog = true">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <v-data-table no-data-text="No hay datos disponibles" :headers="headers" :items="datos" :items-per-page="5" class="elevation-1">
            <template v-slot:item.tipo_documento_selected="{ item }">
              <td>{{item.tipo_documento_selected.tipo_documento}}</td>
            </template>
            <template v-slot:item.ciudad_selected="{ item }">
              <td>{{item.ciudad_selected.ciudad}}</td>
            </template>
            <template v-slot:item.accion="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Agregar Datos
        </v-card-title>
        <v-container>
          <v-layout row wrap style="margin: 3px">
            <v-flex xs12 sm12 md12>
              <v-text-field :rules="rules" label="Primer Nombre" v-model="model.primer_nombre"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field :rules="rules" label="Segundo Nombre" v-model="model.segundo_nombr"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field :rules="rules" label="Primer Apellido" v-model="model.primer_apellido"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-select :items="items_tipo_documento" v-model="model.tipo_documento_selected" label="Seleccionar documento" return-object item-text="tipo_documento"></v-select>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs12 sm12 md7>
              <v-text-field :rules="rules" label="Documento" v-model="model.documento"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field :rules="[rules2.email]" label="Correo Electronico" v-model="model.correo"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field :rules="rules" label="Direccion de Residencia" v-model="model.direccion"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-select :items="items_ciudad_residencia" v-model="model.ciudad_selected" label="Seleccionar documento" return-object item-text="ciudad"></v-select>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field :rules="rules" label="Telefono" v-model="model.telefono"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field :rules="rules" label="Celular" v-model="model.celular"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary"  @click="addDatos">
            Agregar Datos
          </v-btn>
          <v-btn :disabled="editarvar" color="primary"  @click="editar">
            Editar Datos
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  computed: {
    datos() {
      return this.$store.state.Datos
    }
  },
  data() {
    return {
        editarvar: true,
      rules: [
        value => !!value || 'Este campo es requerido.',
        value => (value && value.length >= 3) || 'Minimo 5 caracteres',
      ],
      rules2: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Correo Invalido.'
        }
      },
      dialog: false,
      model: {
        primer_nombre: '',
        segundo_nombr: '',
        primer_apellido: '',
        tipo_documento_selected: '',
        documento: '',
        correo: '',
        direccion: '',
        ciudad_selected: '',
        telefono: '',
        celular: ''

      },
      headers: [
        { text: 'Primer nombre', value: 'primer_nombre', },
        { text: 'Segundo nombre', value: 'segundo_nombr' },
        { text: 'Primer Apellido', value: 'primer_apellido' },
        { text: 'Tipo de documento', value: 'tipo_documento_selected' },
        { text: 'Documento', value: 'documento' },
        { text: 'Correo electrónico', value: 'correo' },
        { text: 'Dirección de residencia', value: 'direccion' },
        { text: 'Ciudad de residencia', value: 'ciudad_selected' },
        { text: 'Teléfono', value: 'telefono' },
        { text: 'Celular', value: 'celular' },
        { text: 'Accion', sortable: false, value: 'accion' },
      ],
      items_tipo_documento: [
        { tipo_documento: 'Cedula de identidad', value: 1 },
        { tipo_documento: 'Cedula de Extranjeria', value: 2 },
        { tipo_documento: 'Pasaporte', value: 3 },
      ],
      items_ciudad_residencia: [
        { ciudad: 'Venezuela', value: 1 },
        { ciudad: 'colombia', value: 2 },
        { ciudad: 'Estados Unidos', value: 3 },
      ],
      value_documento_seleccionado: '',
      value_ciudad_seleccionado: '',
    }
  },
  methods: {
    editItem(item) {
      this.model = {
        primer_nombre: item.primer_nombre,
        segundo_nombr: item.segundo_nombr,
        primer_apellido: item.primer_apellido,
        tipo_documento_selected: item.tipo_documento_selected,
        documento: item.documento,
        correo: item.correo,
        direccion: item.direccion,
        ciudad_selected: item.ciudad_selected,
        telefono: item.telefono,
        celular: item.celular

      }
      this.dialog = true
      this.editarvar = false

    },
    editar(){
        var index = this.datos.findIndex(item => item.correo === this.model.correo)
        this.datos[index].primer_nombre = this.model.primer_nombre
        this.datos[index].segundo_nombr = this.model.segundo_nombr
        this.datos[index].primer_apellido = this.model.primer_apellido
        this.datos[index].tipo_documento_selected = this.model.tipo_documento_selected
        this.datos[index].documento = this.model.documento
        this.datos[index].correo = this.model.correo
        this.datos[index].direccion = this.model.direccion
        this.datos[index].ciudad_selected = this.model.ciudad_selected
        this.datos[index].telefono = this.model.telefono
        this.datos[index].celular = this.model.celular
        this.dialog = false
        this.$toastr.success('Registro Actualizado', 'Actualizado'); 
    },
    deleteItem(item) {
      var index = this.datos.findIndex(item => item.primer_nombre === item.primer_nombre)
      this.datos.splice(index, 1)
      this.$toastr.success('Registro Eliminado', 'Eliminado'); 
    },
    addDatos() {
        let existe = this.datos.find(item => item.correo === this.model.correo)
        if (existe) {
            this.$toastr.warning('Este correo ya se encuentra registrado', 'Advertencia');    
        }else {
            this.$toastr.success('Datos guardados con exto', 'Exito', 'success');
            this.$store.commit('addDatos', this.model)
            this.limpiar()
            this.dialog = false
        }
    },
    limpiar(){
        this.model =  {
        primer_nombre: '',
        segundo_nombr: '',
        primer_apellido: '',
        tipo_documento_selected: '',
        documento: '',
        correo: '',
        direccion: '',
        ciudad_selected: '',
        telefono: '',
        celular: ''

      }
    }
  }
}

</script>
