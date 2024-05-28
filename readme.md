# ModLauncher

A simple system for launching mod states on startup.

---

## Usage

[Download the latest version (v2.0.1) here.](https://github.com/cyn0x8/ModLauncher/releases)

For players, just drag/drop the `ModLauncher.zip` into the `mods` folder. The launcher will automatically detect mods that bind to it and display them in the launcher state. If none are detected, it'll just start the game normally.

For developers, create a module in your mod that binds to the launcher. Here is an example:

```haxe
// in mods/MyMod/scripts/modules/MyMod_Binding.hxc

import flixel.group.FlxTypedSpriteGroup;

import funkin.graphics.FunkinSprite;
import funkin.modding.module.Module;
import funkin.modding.module.ModuleHandler;

class MyMod_Binding extends Module {
	private var logo:FunkinSprite;
	private var bg_group:FlxTypedSpriteGroup;
	
	public function new() {
		super("MyMod_Binding");
	}
	
	public function onCreate(event:ScriptEvent):Void {
		active = false;
		
		logo = new FunkinSprite().loadTexture("MyMod/logo");
		
		bg_group = new FlxTypedSpriteGroup();
		
		var launcher:Module;
		if ((launcher = ModuleHandler.getModule("ModLauncher_Binding")) != null) {
			launcher.scriptCall("bind", [{
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
}
```

The bind structure (`data`) is as follows:

```haxe
typedef Bind = {
	// required fields to pass into the `bind` function:
	
	name:String, // name of your mod, `Save.instance.modOptions.get("ModLauncher").selected_mod` will be set to this after on_init
	target:String, // target `ScriptedMusicBeatState` class name to open after `on_init`
	
	logo:FunkinSprite, // the logo sprite
	bg_group:FlxTypedSpriteGroup, // the sprite group added to your mod bg camera
	
	// launcher callbacks:
	
	on_setup:Null<(Dynamic)->Void>, // called when your mod is first bound (camera exists starting here)
	
	on_update:Null<(Dynamic, Float)->Void>, // called every frame while in the launcher
	
	on_focus:Null<(Dynamic)->Void>, // when the user focuses on your mod
	on_unfocus:Null<(Dynamic)->Void>, // when the user changes selection to another mod
	
	on_select:Null<(Dynamic)->Void>, // when the user selects your mod
	on_init:Null<(Dynamic)->Void>, // code to run right before the target state opens, useful for conditionally setting stuff if your mod is selected
	
	// internally set up by the launcher (available in `data` passed to callbacks):
	
	cam:Null<FunkinCamera>, // the bg camera `bg_group` is added to
	logo_scale:Float // the base scale of the logo (automatically resized to half screen height)
}
```

---

## Compatibility

While Modlauncher_Binding isn't compatible with BootStrapBinds, if [ModBootstrap](https://gamebanana.com/mods/516273) is detected, ModLauncher will show up on the ModBootstrap menu.

If you want your mod to be compatible with both, use `ModuleHandler` to check for `BootStrapBinds` first, and then `ModLauncher_Binding`, to bind conditionally to either. I don't recommend adding this mod as a dependency for this reason, unless you plan to use this launcher exclusively.

```haxe
var launcher:Module;
if ((launcher = ModuleHandler.getModule("BootStrapBinds")) != null) {
	// bind to ModBootstrap
} else if ((launcher = ModuleHandler.getModule("ModLauncher_Binding")) != null) {
	// bind to ModLauncher
} else {
	// fail scenario
}
```

---

## Screenshots

![image](https://images.gamebanana.com/img/ss/tools/6646a3746ae01.jpg)

![image](https://images.gamebanana.com/img/ss/tools/6646a37d575ef.jpg)
