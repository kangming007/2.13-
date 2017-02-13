function homeController($scope,getVal){
	//var myIScroll=new IScroll("#con");
	var mainSwiper=new Swiper("#home-container",{
		onSlideChangeStart:function(swiper)
		{
			var $el=$("#title span").eq(swiper.activeIndex);
			$el.addClass("active").siblings().removeClass();
		}
	});
	var conSwiper=new Swiper("#con-container",{
		onSlideChangeStart:function(swiper)
		{		
			var $el=$("#nav li").eq(swiper.activeIndex);
			$el.addClass("active").siblings().removeClass();
		}
	});
	var dataFormat=function(data)
	{
		var tempArr=[];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++)
			{
				tempArr[i]=[];
				tempArr[i].push(data[i*2]);
				data[i*2+1] && tempArr[i].push(data[i*2+1]);
			}
			return tempArr;
	}
	getVal.success(function(data){
		$scope.obj=dataFormat(data.data)
	})
}
function guidController($scope){
		var mySwiper=new Swiper("#swiper-container");
}
angular.module("myApp")
	   .controller("homeController",homeController)
	   .controller("guidController",guidController)