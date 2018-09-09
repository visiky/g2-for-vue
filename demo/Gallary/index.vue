<template>
  <div class='gallery'>
    <Pie />
    <Bar />
  </div>
</template>
<script>
import Pie from '../charts/pie'
import Bar from '../charts/bar'

export default {
  components: {
    Pie,
    Bar
  },
  data () {
    return {}
  }
}
</script>
<style>
.gallery {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 20px;
}
.gallery > div {
  min-width: 400px;
  width: 50%;
  border: 1px solid #bfbfbf;
  margin-bottom: 10px;
  padding: 10px;
}
.gallery .btn {
  width: 80px;
  height: 30px;
  line-height: 30px;
  background: #03A9F4;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
</style>
