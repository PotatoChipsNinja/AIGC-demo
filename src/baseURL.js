import { ref } from 'vue'

const baseURL = ref({
    model: 'http://localhost:8001',
    kb: 'http://localhost:7861'
})

export function useBaseURL() {
    return baseURL;
}
