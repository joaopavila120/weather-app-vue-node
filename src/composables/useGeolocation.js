import { onMounted, ref } from 'vue'

export function useGeolocation(onSuccess, onError) {
  onMounted(() => {
    if (!navigator.geolocation) {
      onError()
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => onSuccess(pos.coords),
      () => onError()
    )
  })
}
