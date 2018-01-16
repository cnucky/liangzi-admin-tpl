<template>
  <div>dashboard</div>
</template>
<script>
import{getCustomers} from '@/api/api'
export default {
  data(){
    return {

    }
  },
  created () {
    this.get_customers();
  },
  methods: {
    get_customers(){
      getCustomers().then(
        (resData) => {
          if(resData && resData.status == 'ok'){
            
          }
        }
      )
    }
  }
}
</script>

