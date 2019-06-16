<template>
  <q-page padding class="q-pa-md flex flex-center bg-secondary">
    <div style="width: 500px; max-width: 90vw;">

      <q-list v-if="state === 'fillForm'">
        <q-item class="row justify-center">
          {{ $t('resetPassword.explain') }}
        </q-item>
        <password-with-validation
          id="password"
          v-model="password.value"
          mandatory
          :errorMessage="$t('resetPassword.invalidPassword')"
          @validity-check="password.isValid = $event" />
        <password-with-validation
          id="repeatPassword"
          v-model="repeatPassword.value"
          :repeatPassword="password.value"
          mandatory
          :errorMessage="$t('resetPassword.differentPasswords')"
          @validity-check="repeatPassword.isValid = $event" />
        <q-item class="row justify-center">
          <shaking-btn
            id="submit"
            :disable="disableSubmit"
            :action="ok">
            {{ $t('actions.ok') }}
          </shaking-btn>
        </q-item>
      </q-list>

      <q-list v-else-if="state === 'pending'">
        <q-item class="row justify-center">
          {{ $t('resetPassword.pending') }}
        </q-item>
        <q-item class="row justify-center">
          <q-spinner size="50px" />
        </q-item>
      </q-list>

      <q-list v-else-if="state === 'success'">
        <q-item class="row justify-center">
          {{ $t('resetPassword.success') }}
        </q-item>
        <q-item class="row justify-center">
          <shaking-btn
            id="connect"
            :action="login">
            {{ $t('actions.connect') }}
          </shaking-btn>
        </q-item>
      </q-list>

      <q-list v-else-if="state === 'error-link-expired'">
        <q-item class="row justify-center">
          {{ $t('resetPassword.errorLinkExpired') }}
        </q-item>
        <q-item class="row justify-center">
          <shaking-btn
            id="goBack"
            :action="back">
            {{ $t('actions.goBack') }}
          </shaking-btn>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import passwordWithValidation from '../components/form/PasswordWithValidation'
import shakingBtn from '../components/form/ShakingBtn'
import { generatePath } from '../router/Helpers'
import types from '../../types'

export default {
  name: 'ResetPassword',
  data () {
    return {
      password: {
        value: '',
        isValid: false
      },
      repeatPassword: {
        value: '',
        isValid: false
      },
      state: 'fillForm'
    }
  },
  computed: {
    disableSubmit () {
      return !this.password.isValid || !this.repeatPassword.isValid
    }
  },
  methods: {
    ok () {
      this.state = 'pending'
      this.$store.dispatch('changePassword', {
        password: this.password.value,
        encodedId: this.$route.params.id,
        oneTimeToken: this.$route.params.token
      })
        .then(response => {
          this.state = 'success'
        })
        .catch(() => {
          this.state = 'error-link-expired'
        })
    },
    login () {
      this.$router.push(generatePath({ link: types.links.LOGIN }))
    },
    back () {
      this.$router.push(generatePath({ link: types.links.FORGOT_PASSWORD }))
    }
  },
  components: { passwordWithValidation, shakingBtn }
}
</script>
