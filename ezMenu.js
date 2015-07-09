$.fn.ezMenu = function(data){
	//only allow clicks on active elements
	$(document).unbind("click").bind("click",function(e){
		element = $(e.target)
		if(!element.hasClass("disabled")){
			$(".contextmenu").hide()
		}
	})
	
	//disable default action
	$(this).bind("contextmenu",function(event){
		event.preventDefault()
		$(".contextmenu").css({
			top: event.pageY,
			left: event.pageX,
		}).show()
		
		$(".contextmenu").html("").append(addMenu(data.menu))
		
		return false;
	})
	
	var $menu = $("<ul></ul>")

	function addMenu(menu){
		var $menu = $("<ul></ul>")
		
		$menu.addClass("menu")
		
		$.each(menu,function(i){
			var item = menu[i]
			var $item = $("<li></li>")
			
			if(item.onClick){
				$item.attr("onClick",item.onClick)
			}
			
			if(item.menu){
				$item.append("<span class='triangle'></span>")
				$item.append(addMenu(item.menu))
			}
			if(item.text){
				$item.addClass("item")
				$item.append(item.text)
				if(item.disabled){
					$item.addClass("disabled")
				}
			}else if(item.seperate){
				$item.addClass("seperate")
			}
			$menu.append($item)
		})
		return $menu
	}
	return $(this)
}