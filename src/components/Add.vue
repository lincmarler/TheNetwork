<template>
    <div>
        <h1>{{ add.title }}</h1>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import Pop from '../utils/Pop';
import { addsService } from '../services/AddsService';
import { Add } from '../models/Add';

export default {
    props: { add: { type: Add, required: true } },
    setup() {
        onMounted(() => {
            getAdds();
        });
        async function getAdds() {
            try {
                await addsService.getAdds()
            } catch (error) {
                Pop.error(error)
            }
        }
        return {};
    },
};
</script>


<style></style>