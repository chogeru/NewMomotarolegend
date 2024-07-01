//=============================================================================
// RPG Maker MZ - Kpp_PictureBattleCommand.js
//=============================================================================
// Copyright (c) 2020-2023 カッピ
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// ウェブサイト
// https://birdwind.net/
//
// Twitter
// https://twitter.com/kappi_bw

/*:
 * @target MZ
 * @plugindesc バトルコマンドを画像化 ver 1.07
 * @author カッピ
 * @url https://birdwind.net/plugin/
 *
 * @help Kpp_PictureBattleCommand.js
 * 
 * バトル画面のコマンドウィンドウのデザインを変更します。
 * ウィンドウの項目に、枠画像が追加されます。
 * 画像はプラグインパラメータで差し替えできます。
 *
 * 枠画像は、次のフォルダに入れてください。
 * img/pictures/
 *
 * ＜スキルリストの枠画像＞
 * 戦闘中のスキルリストに表示される枠画像は、
 * プラグインパラメータで指定する以外に、データベースのメモ欄でも変更できます。
 * データベースで指定しなかったスキルのみ、
 * プラグインパラメータで指定した画像を表示します。
 *
 * データベースで指定するには、スキルのメモ欄に以下のように記述します。
 * <commandPicture:画像ファイル名>
 *
 * 例) <commandPicture:BattleCommand_Heal>
 *
 * ※拡張子(.png)は書きません
 * ※画像は img/pictures/ フォルダに入れておいてください
 *
 * @param modeHorz
 * @text コマンド横表示モード
 * @desc 縦表示のバトルコマンドを横表示に切り替える
 * @type select
 * @option OFF
 * @option ON
 * @default OFF
 * 
 * @param enableControlCharacter
 * @text 制御文字を有効にする
 * @desc バトルコマンドのテキストに制御文字を使用可能に
 * @type select
 * @option OFF
 * @option ON
 * @default OFF
 *
 * @param pictureWidth
 * @text 画像ファイルの幅
 * @desc コマンドに表示する画像ファイルの共通の横幅
 * @type number
 * @default 160
 * @min 60
 * @max 384
 *
 * @param pictureHeight
 * @text 画像ファイルの高さ
 * @desc コマンドに表示する画像ファイルの共通の縦幅
 * @type number
 * @default 80
 * @min 40
 * @max 256
 *
 * @param selectScale
 * @text 選択中の拡大率
 * @desc コマンドが選択されている時の画像の拡大率(％)
 * @type number
 * @default 100
 * @min 0
 * @max 100
 *
 * @param deselectScale
 * @text 非選択時の拡大率
 * @desc コマンドが選択されていない時の画像の拡大率(％)
 * @type number
 * @default 80
 * @min 0
 * @max 100
 *
 * @param colMaxActorCommand
 * @text 横方向に並べるコマンド数
 * @desc (横表示モードのみ) アクターコマンドの横方向の最大数
 * @type number
 * @default 4
 * @min 2
 * @max 10
 * @parent settingActorCommand
 *
 * @param fileFight
 * @text 戦うコマンドの画像
 * @desc 「戦う」コマンドに表示する画像ファイル
 * @default BattleCommand_Fight
 * @type file
 * @dir img/pictures/
 *
 * @param fileEscape
 * @text 逃げるコマンドの画像
 * @desc 「逃げる」コマンドに表示する画像ファイル
 * @default BattleCommand_Escape
 * @type file
 * @dir img/pictures/
 *
 * @param fileAttack
 * @text 攻撃コマンドの画像
 * @desc 「攻撃」コマンドに表示する画像ファイル
 * @default BattleCommand_Fight
 * @type file
 * @dir img/pictures/
 *
 * @param fileSkill
 * @text スキルコマンドの画像
 * @desc 「スキル(必殺技など)」コマンドに表示する画像ファイル
 * @default BattleCommand_Skill
 * @type file
 * @dir img/pictures/
 *
 * @param fileGuard
 * @text 防御コマンドの画像
 * @desc 「防御」コマンドに表示する画像ファイル
 * @default BattleCommand_Guard
 * @type file
 * @dir img/pictures/
 *
 * @param fileItem
 * @text アイテムコマンドの画像
 * @desc 「アイテム」コマンドに表示する画像ファイル
 * @default BattleCommand_Item
 * @type file
 * @dir img/pictures/
 *
 * @param fileItemList
 * @text アイテムリストの項目の画像
 * @desc 戦闘中のアイテムリストに表示する画像ファイル
 * @default BattleCommand_Item
 * @type file
 * @dir img/pictures/
 *
 * @param fileSkillList
 * @text スキルリストの項目の画像
 * @desc 戦闘中のスキルリストに表示する画像ファイル / データベースで指定されていれば、そちらを優先
 * @default BattleCommand_Skill
 * @type file
 * @dir img/pictures/
 *
 * @param fileEnemy
 * @text エネミー選択ウィンドウの項目の画像
 * @desc 戦闘中のエネミー選択ウィンドウに表示する画像ファイル
 * @default BattleCommand_Enemy
 * @type file
 * @dir img/pictures/
 *
 * @noteParam commandPicture
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData skills
 */

(() => {
	'use strict';

	//const pluginName = 'Kpp_PictureBattleCommand';
	const pluginName = decodeURIComponent(document.currentScript.src).match(/^.*\/js\/plugins\/(.+)\.js$/)[1];
	const parameters = PluginManager.parameters(pluginName);
	
	const paramModeHorz = parameters['modeHorz'] || 'OFF';
	const paramEnableControlCharacter = parameters['enableControlCharacter'] || 'OFF';
	const paramPictureWidth = Number(parameters['pictureWidth'] || 160);
	const paramPictureHeight = Number(parameters['pictureHeight'] || 80);
	const paramSelectScale = Number(parameters['selectScale'] || 100);
	const paramDeselectScale = Number(parameters['deselectScale'] || 80);
	const paramColMaxActorCommand = Number(parameters['colMaxActorCommand'] || 4);
	const paramFileFight = parameters['fileFight'] || '';
	const paramFileEscape = parameters['fileEscape'] || '';
	const paramFileAttack = parameters['fileAttack'] || '';
	const paramFileSkill = parameters['fileSkill'] || '';
	const paramFileGuard = parameters['fileGuard'] || '';
	const paramFileItem = parameters['fileItem'] || '';
	const paramFileItemList = parameters['fileItemList'] || '';
	const paramFileSkillList = parameters['fileSkillList'] || '';
	const paramFileEnemy = parameters['fileEnemy'] || '';
	
	const commandPictureName = {
		"attack": paramFileAttack, "skill": paramFileSkill,
		"guard": paramFileGuard, "item": paramFileItem,
		"escape": paramFileEscape, "auto": paramFileFight
	};
	
	// --------------------------------------------------------
	// Scene_Battle
	// --------------------------------------------------------
	const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;

	Scene_Battle.prototype.partyCommandWindowRect = function() {
		if (paramModeHorz == "ON") {
			const ww = 192 + 160;
			const wh = this.calcWindowHeight(2, false) + 16;
			const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
			const wy = Graphics.boxHeight - wh - this.calcWindowHeight(5, false);
			return new Rectangle(wx, wy, ww, wh);
		}
		const ww = 192;
		const wh = this.windowAreaHeight();
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = Graphics.boxHeight - wh;
		return new Rectangle(wx, wy, ww, wh);
	};
	
	Scene_Battle.prototype.actorCommandWindowRect = function() {
		if (paramModeHorz == "ON") {
			return new Rectangle(0, 0, 0, 0);
		}
		const ww = 192;
		const wh = 0;
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = 0;
		return new Rectangle(wx, wy, ww, wh);
	};
	
	Scene_Battle.prototype.createActorCommandWindow = function() {
		_Scene_Battle_createActorCommandWindow.call(this);
		
		this._actorCommandWindow.setBattleStatusWindow(this._statusWindow);

		this._tempPictureCommandWindow = new Window_TempPictureCommand(new Rectangle(0, 0, 384, 256));
	};
	
	// --------------------------------------------------------
	// For Window
	// --------------------------------------------------------
	Window_Command.prototype.drawSpriteItem = function(index, pictureName,rect) {
		// コマンド用スプライトが未生成なら、生成
		if (!this._spriteCommand[index]) {
			this._spriteCommand[index] = new Sprite();
			this.addChild(this._spriteCommand[index]);
			this._spriteCommand[index].x = rect.x + rect.width / 2 + this.itemPadding();
			this._spriteCommand[index].y = rect.y + rect.height / 2 + this.itemPadding();
			this._spriteCommand[index].anchor.x = 0.5;
			this._spriteCommand[index].anchor.y = 0.5;
			this._spriteCommand[index].scale.x = paramDeselectScale / 100;
			this._spriteCommand[index].scale.y = paramDeselectScale / 100;
		}
		this._spriteCommand[index].bitmap = new Bitmap(paramPictureWidth, paramPictureHeight);
		// コマンド画像を読み込み
		const bitmap = ImageManager.loadPicture(pictureName);
		// コマンド画像の読み込みが完了したら
		bitmap.addLoadListener(function() {
			this.changePaintOpacity(this.isCommandEnabled(index));
			
			this._spriteCommand[index].bitmap.fontSize = $gameSystem.mainFontSize();
			this._spriteCommand[index].bitmap.fontFace = $gameSystem.mainFontFace();
			// コマンド用スプライトのビットマップにコマンド画像を描画
			this._spriteCommand[index].bitmap.blt(
				bitmap, 0, 0, paramPictureWidth, paramPictureHeight, 0, 0);
			// コマンド用スプライトのビットマップにテキストを描画
			if (paramEnableControlCharacter == "ON"){
				const textSize = SceneManager._scene._tempPictureCommandWindow.textSizeEx(this.commandName(index));
				SceneManager._scene._tempPictureCommandWindow.drawTextExForSpriteItem(this.commandName(index), 0, 0, paramPictureWidth);
				this._spriteCommand[index].bitmap.blt(
					SceneManager._scene._tempPictureCommandWindow.contents, 0, 0, paramPictureWidth - 8, paramPictureHeight, 
					paramPictureWidth / 2 - textSize.width / 2, paramPictureHeight / 2 - textSize.height / 2);
			} else {
			this._spriteCommand[index].bitmap.drawText(
				this.commandName(index), 0, 0,
				paramPictureWidth - 8, paramPictureHeight, 'right');
			}
			// コマンドの有効無効に合わせて、コマンド用スプライトの不透明度変更
			this._spriteCommand[index].opacity = this.contents.paintOpacity;
			
			this._spriteCommand[index].visible = true;
			if (this._index === index) {
				this._spriteCommand[index].scale.x = paramSelectScale / 100;
				this._spriteCommand[index].scale.y = paramSelectScale / 100;
			}
		}.bind(this));
	};
	
	// --------------------------------------------------------
	// Window_PartyCommand
	// --------------------------------------------------------
	
	const _Window_PartyCommand_initialize = Window_PartyCommand.prototype.initialize;
	const _Window_PartyCommand_select = Window_PartyCommand.prototype.select;

	Window_PartyCommand.prototype.initialize = function(rect) {
		// コマンド用スプライトの配列
		this._spriteCommand = [];
		
		this.clearCommandList();
		
		_Window_PartyCommand_initialize.apply(this, arguments);
	};
	
	Window_PartyCommand.prototype.drawItem = function(index) {
		const rect = this.itemLineRect(index);
		const align = this.itemTextAlign();
		this.resetTextColor();
		
		// コマンド画像名を取得
		const pictureName = this.pictureName(index);
		// コマンド画像が指定されていれば
		if (pictureName !== "") {
			this.drawSpriteItem(index, pictureName, rect);
		} else {
			this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
		}
	};
	
	Window_PartyCommand.prototype.selectSpriteCommand = function(index) {
		if (index >= 0 && this._spriteCommand) {
			// 全項目のスプライトを、非選択時の拡大率に
			for (let i = 0; i < this.maxItems(); i++) {
				if (this._spriteCommand[i]) {
					this._spriteCommand[i].scale.x = paramDeselectScale / 100;
					this._spriteCommand[i].scale.y = paramDeselectScale / 100;
				}
			}
			// 新たに選択された項目のスプライトを、選択中の拡大率に
			if (this._spriteCommand[index]) {
				this._spriteCommand[index].scale.x = paramSelectScale / 100;
				this._spriteCommand[index].scale.y = paramSelectScale / 100;
				this._spriteCommand[index].rotation = 
					((Math.randomInt(12) - 6) * Math.PI) / 180;
			}
		}
	};
	
	Window_PartyCommand.prototype.select = function(index) {
		if (index >= 0 && this._index != index && this._spriteCommand) {
			this.selectSpriteCommand(index);
		}

		this._index = index;
		this.refreshCursor();
		this.callUpdateHelp();
	};
	
	Window_PartyCommand.prototype.activate = function() {
		this.active = true;
		
		this.selectSpriteCommand(this._index);
	};
	
	Window_PartyCommand.prototype.itemHeight = function() {
		return paramPictureHeight;
	};
	
	Window_PartyCommand.prototype.pictureName = function(index) {
		if (this._list[index].symbol == 'fight') return paramFileFight;
		if (this._list[index].symbol == 'escape') return paramFileEscape;
		
		return "";
	};
	
	Window_PartyCommand.prototype.maxCols = function() {
		return paramModeHorz == "ON" ? Math.max(2, this.maxItems()) : 1;
	};
	
	Window_PartyCommand.prototype.translucentOpacity = function() {
		return 100;
	};

	const _Window_PartyCommand_selectSpriteCommand = Window_PartyCommand.prototype.selectSpriteCommand;
	
	// --------------------------------------------------------
	// Window_ActorCommand
	// --------------------------------------------------------
	
	const _Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
	Window_ActorCommand.prototype.initialize = function(rect) {
		// コマンド用スプライトの配列
		this._spriteCommand = [];
		
		_Window_ActorCommand_initialize.apply(this, arguments);
	};
	
	Window_ActorCommand.prototype.refresh = function() {
		this.clearCommandList();
		this.makeCommandList();
		
		if (this._spriteCommand) {
			for (let i = 0; i < this._spriteCommand.length; i++) {
				this._spriteCommand[i].visible = false;
			}
		}
		
		if (paramModeHorz == "ON") {
			this.width = this.itemWidth() * this.maxCols() + $gameSystem.windowPadding() * 2;
			this.height = this.itemHeight() * this.maxRows() + $gameSystem.windowPadding() * 2;
			this.x = Graphics.boxWidth - this.width;
			this.y = 
				Graphics.boxHeight - this.height - 
				(this._windowBattleStatus ? this._windowBattleStatus.height : 0);
		} else {
			this.height = this.itemHeight() * this.maxRows() + $gameSystem.windowPadding() * 2;
			this.y = Graphics.boxHeight - this.height;
		}
		
		Window_Selectable.prototype.refresh.call(this);
	};
	
	Window_ActorCommand.prototype.drawItem = function(index) {
		const rect = this.itemLineRect(index);
		const align = this.itemTextAlign();
		this.resetTextColor();
		
		// コマンド画像名を取得
		const pictureName = this.pictureName(index);
		// コマンド画像が指定されていれば
		if (pictureName !== "") {
			this.drawSpriteItem(index, pictureName, rect, align);
		} else {
			this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
		}
	};
	
	//Window_ActorCommand.prototype.drawItem = _Window_PartyCommand_drawItem;
	
	Window_ActorCommand.prototype.select = _Window_PartyCommand_select;
	
	Window_ActorCommand.prototype.selectSpriteCommand = _Window_PartyCommand_selectSpriteCommand;
	
	Window_ActorCommand.prototype.activate = function() {
		this.active = true;
		
		this.selectSpriteCommand(this._index);
	};
	
	Window_ActorCommand.prototype.itemWidth = function() {
		return paramPictureWidth + 8;
	};
	
	Window_ActorCommand.prototype.itemHeight = function() {
		return paramPictureHeight;
	};
	
	Window_ActorCommand.prototype.maxCols = function() {
		return paramModeHorz == "ON" ? paramColMaxActorCommand : 1;
	};
	
	Window_ActorCommand.prototype.pictureName = function(index) {
		// CommandSkill.js競合対策 >>>
		if (this._list[index].symbol == 'special' && this._list[index].ext && this._list[index].ext.id > 0) {
			const skill = $dataSkills[this._list[index].ext.id];
			return (skill.meta.commandPicture ? skill.meta.commandPicture : paramFileSkillList);
		}
		// <<<
		
		//Keke_VariableActorCommand.js競合対策>>>
		if (this._list[index].symbol == 'skillOne' && this._list[index].ext > 0) {
			const skill = $dataSkills[this._list[index].ext];
			return (skill.meta.commandPicture ? skill.meta.commandPicture : paramFileSkillList);
		}
		if (this._list[index].symbol == 'itemOne' && this._list[index].ext > 0) {
			const item = $dataItems[this._list[index].ext];
			return (item.meta.commandPicture ? item.meta.commandPicture : paramFileItem);
		}
		//<<<
		
		if (commandPictureName[this._list[index].symbol] == undefined) return paramFileSkill;
		
		return commandPictureName[this._list[index].symbol];
	};
	
	Window_ActorCommand.prototype.translucentOpacity = function() {
		return 100;
	};
	
	Window_ActorCommand.prototype.setBattleStatusWindow = function(windowBattleStatus) {
		this._windowBattleStatus = windowBattleStatus;
	};
	
	// --------------------------------------------------------
	// Window_BattleItem
	// --------------------------------------------------------
	
	Window_BattleItem.prototype.drawItem = function(index) {
		const item = this.itemAt(index);
		if (item) {
			const numberWidth = this.numberWidth();
			const rect = this.itemLineRect(index);
			
			// コマンド画像を読み込み
			const bitmap = ImageManager.loadPicture(paramFileItemList);
			// コマンド画像の読み込みが完了したら
			bitmap.addLoadListener(function() {
				this.changePaintOpacity(this.isEnabled(item));
				// ウィンドウにコマンド画像を描画
				this.contents.blt(
					bitmap, 0, 0, paramPictureWidth, paramPictureHeight,
					rect.x + rect.width / 2 - bitmap.width / 2,
					rect.y + rect.height / 2 - bitmap.height / 2);
				// ウィンドウにテキストを描画
				
				this.drawItemName(item,
					rect.x + rect.width / 2 - paramPictureWidth / 2 + 8,
					rect.y - this.lineHeight() / 4,
					paramPictureWidth - 16);
				this.drawItemNumber(item,
					rect.x + rect.width / 2 - paramPictureWidth / 2 - 8,
					rect.y + this.lineHeight() / 4,
					paramPictureWidth);
				this.changePaintOpacity(1);
			}.bind(this));
		}
	};
	
	Window_BattleItem.prototype.itemHeight = function() {
		return paramPictureHeight + 8;
	};
	
	Window_BattleItem.prototype.maxCols = function() {
		return 4;
	};
	
	Window_BattleItem.prototype.translucentOpacity = function() {
		return 100;
	};
	
	// --------------------------------------------------------
	// Window_BattleSkill
	// --------------------------------------------------------
	
	Window_BattleSkill.prototype.refresh = function() {
		this.makeItemList();
		this.createContents();
		
		this._waitForFinishLoad = true;
		
		//this.drawAllItems();
	};
	
	Window_BattleSkill.prototype.update = function() {
		Window_SkillList.prototype.update.call(this);
		
		if (this._waitForFinishLoad) {
			for (let i = 0; i < this.maxItems(); i++) {
				const skill = this.itemAt(i);
				const fileName = 
					(skill.meta.commandPicture ? skill.meta.commandPicture : paramFileSkillList);
				const bitmap = ImageManager.loadPicture(fileName);
				if (bitmap.isReady()) continue;
				return;
			}
			this._waitForFinishLoad = false;
			this.drawAllItems();
		}
	};
	
	Window_BattleSkill.prototype.drawItem = function(index) {
		const skill = this.itemAt(index);
		if (skill) {
			const costWidth = this.costWidth();
			const rect = this.itemLineRect(index);
			
			// コマンド画像を読み込み
			const fileName = 
				(skill.meta.commandPicture ? skill.meta.commandPicture : paramFileSkillList);
			const bitmap = ImageManager.loadPicture(fileName);
			// ウィンドウにコマンド画像を描画
			this.changePaintOpacity(this.isEnabled(skill));
			this.contents.blt(
				bitmap, 0, 0, paramPictureWidth, paramPictureHeight,
				rect.x + rect.width / 2 - bitmap.width / 2, 0);
				//rect.y + rect.height / 2 - bitmap.height / 2);
			// ウィンドウにテキストを描画
			this.contents.fillRect(
				rect.x + rect.width / 2 - this.contents.measureTextWidth(skill.name) / 2 + 8,
				rect.y - this.lineHeight() / 4,
				this.contents.measureTextWidth(skill.name),
				this.contents.fontSize,
				"rgba(0, 0, 0, 0.5)");
			this.drawItemName(skill,
				rect.x + rect.width / 2 - paramPictureWidth / 2 + 8,
				rect.y - this.lineHeight() / 2,
				paramPictureWidth - 16);
			this.drawSkillCost(skill,
				rect.x + rect.width / 2 - paramPictureWidth / 2 - 8,
				rect.y + this.lineHeight() / 2,
				paramPictureWidth);
			this.changePaintOpacity(1);
		}
	};
	
	Window_BattleSkill.prototype.itemHeight = function() {
		return paramPictureHeight + 8;
	};
	
	Window_BattleSkill.prototype.maxCols = function() {
		return 4;
	};
	
	Window_BattleSkill.prototype.translucentOpacity = function() {
		return 100;
	};
	
	// --------------------------------------------------------
	// Window_BattleEnemy
	// --------------------------------------------------------
	
	Window_BattleEnemy.prototype.drawItem = function(index) {
		this.resetTextColor();
		const name = this._enemies[index].name();
		const rect = this.itemLineRect(index);
		
		// コマンド画像を読み込み
		const bitmap = ImageManager.loadPicture(paramFileEnemy);
		// コマンド画像の読み込みが完了したら
		bitmap.addLoadListener(function() {
			// ウィンドウにコマンド画像を描画
			this.contents.blt(
				bitmap, 0, 0, paramPictureWidth, paramPictureHeight,
				rect.x + rect.width / 2 - bitmap.width / 2,
				rect.y + rect.height / 2 - bitmap.height / 2);
			// エネミーの名前を描画
			this.drawText(name,
				rect.x + rect.width / 2 - paramPictureWidth / 2 + 8,
				rect.y, paramPictureWidth - 16);
		}.bind(this));
	};
	
	Window_BattleEnemy.prototype.itemHeight = function() {
		return paramPictureHeight + 8;
	};
	
	Window_BattleEnemy.prototype.maxCols = function() {
		return 3;
	};

	// --------------------------------------------------------
	// Window_DummyForPictureCommand
	// --------------------------------------------------------

	function Window_TempPictureCommand() {
		this.initialize(...arguments);
	}

	Window_TempPictureCommand.prototype = Object.create(Window_Base.prototype);
	Window_TempPictureCommand.prototype.constructor = Window_TempPictureCommand;

	Window_TempPictureCommand.prototype.initialize = function(rect) {
		Window_Base.prototype.initialize.call(this, rect);
	};

	Window_TempPictureCommand.prototype.drawTextExForSpriteItem = function(text, x, y, width) {
		this.contents.clear();
		this.drawTextEx(text, x, y, width);
	};

})();