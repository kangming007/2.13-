function hello(){
	return {
		restrict:"EA",
		link:function(scope,ele){
			
			/*$(ele).on("click","li",function(){
				alert(1)
				var ind=$(this).index()
				$(this).addClass("active").siblings().removeClass("active")
			})*/
			
		}
	}
}
angular.module("myApp")
	   .directive("hello",hello)