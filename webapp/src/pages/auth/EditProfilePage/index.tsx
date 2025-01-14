import { zUpdateProfileInput } from '../../../../../backend/src/router/auth/updateProfile/input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ ctx }) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    me: ctx.me!,
  }),
})(({ me }) => {
  const trpcUtils = trpc.useUtils()
  const updateProfile = trpc.updateProfile.useMutation()

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: zUpdateProfileInput,
    onSubmit: async (values) => {
      const updateMe = await updateProfile.mutateAsync(values)
      trpcUtils.getMe.setData(undefined, { me: updateMe })
    },
    successMessage: 'Profile updated',
    resetOnSuccess: false,
  })
  return (
    <Segment title="Edit Profile">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik}></Input>
          <Input label="Name" name="name" formik={formik}></Input>
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update profile</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
