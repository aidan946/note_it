export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()
  debugger
  if (!user.value) {
    return navigateTo('/')
  }
})

