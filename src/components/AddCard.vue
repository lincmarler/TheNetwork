<template>
    <div class="row">
        <div class="col-6">
            <img class="add-image" :src="add.tall" alt="">
        </div>
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


<style lang="scss" scoped>
.add-image {
    // height: 250px;
    // width: 200px;
    object-fit: cover;
    object-position: center;
}
</style>