# ModLauncher

a simple system for launching mod states on startup

bind your mods to the launcher!! here is an example module:

```haxe
// in mods/MyMod/scripts/modules/MyMod_ModLauncher_Binding.hxc

import flixel.FlxG;
import flixel.group.FlxTypedSpriteGroup;

import funkin.graphics.FunkinSprite;
import funkin.modding.module.Module;
import funkin.modding.module.ModuleHandler;

class MyMod_ModLauncher_Binding extends Module {
	private var logo:FunkinSprite;
	private var bg_group:FlxTypedSpriteGroup;
	
	public function new() {
		super("MyMod_ModLauncher_Binding");
	}
	
	public function onCreate(event:ScriptEvent):Void {
		this.active = false;
		
		logo = new FunkinSprite().loadTexture("MyMod/logo");
		
		bg_group = new FlxTypedSpriteGroup();
		
		ModuleHandler.getModule("ModLauncher_Binding").scriptCall("bind", [{
			name: "MyMod",
			
			target: "MyMod_TitleState",
			
			logo: logo,
			
			bg_group: bg_group,
			
			on_select: (data:Dynamic) -> {
				// do something
			},
			
			on_update: (data:Dynamic, elapsed:Float) -> {
				// do something
			}
		}]);
	}
}
```

the bind structure (`data`) is as follows:

```haxe
typedef Bind = {
	// to pass into the `bind` function
	name:String, // name of your mod, `Save.instance.modOptions.get("ModLauncher").selected_mod` will be set to this after on_init
	target:String, // target `ScriptedMusicBeatState` class name to open after `on_init`
	
	logo:FunkinSprite, // the logo sprite
	bg_group:FlxTypedSpriteGroup, // the sprite group added to your mod bg camera
	
	on_setup:Null<(Dynamic)->Void>, // called when your mod is first bound (camera exists starting here)
	
	on_update:Null<(Dynamic, Float)->Void>, // called every frame
	
	on_focus:Null<(Dynamic)->Void>, // when the user focuses on your mod
	on_unfocus:Null<(Dynamic)->Void>, // when the user changes selection to another mod
	
	on_select:Null<(Dynamic)->Void>, // when the user selects your mod
	on_init:Null<(Dynamic)->Void>, // code to run right before the target state opens
	
	// internally set up by the launcher
	cam: Null<FunkinCamera>, // the bg camera `bg_group` is added to
	logo_scale: Float // the base scale of the logo (automatically resized to half screen height)
}
```

and make sure to add ModLauncher to your dependencies...

```json
// in mods/MyMod/_polymod_meta.json

"dependencies": {
	"ModLauncher": "2.0.0"
}
```