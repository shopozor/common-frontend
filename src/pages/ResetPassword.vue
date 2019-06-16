<template>
  <div style="width: 500px; max-width: 90vw;">

    <q-list v-if="!emailSent">
      <q-item class="row justify-center">
        {{ $t('resetPassword.explain') }}
      </q-item>
      <email-with-validation
        v-model="email"
        mandatory
        :errorMessage="$t('resetPassword.invalidMail')"
        @validity-check="isValid = $event" />
      <q-item class="row justify-center">
        <shaking-btn
          id="cancel"
          :action="cancel">
          {{ $t('actions.cancel') }}
        </shaking-btn>
        <shaking-btn
          id="submit"
          :disable="!isValid"
          :action="ok">
          {{ $t('actions.ok') }}
        </shaking-btn>
      </q-item>
    </q-list>

    <q-list v-else>
      <q-item class="row justify-center">
        {{ $t('resetPassword.emailSent') }}
      </q-item>
      <q-item class="row justify-center">
        <shaking-btn
          id="goBack"
          :action="cancel">
          {{ $t('actions.goBack') }}
        </shaking-btn>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import emailWithValidation from '../components/form/EmailWithValidation'
import shakingBtn from '../components/form/ShakingBtn'

export default {
  name: 'ResetPassword',
  data () {
    return {
      email: '',
      isValid: false,
      emailSent: false
    }
  },
  methods: {
    ok () {
      this.$store.dispatch('resetPassword', { email: this.email })
        .then(() => {
          this.emailSent = true
        })
    },
    cancel () {
      this.$router.back()
    }
  },
  components: { emailWithValidation, shakingBtn }
}
</script>
