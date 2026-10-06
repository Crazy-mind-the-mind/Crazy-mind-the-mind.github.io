import { assetLoader } from "../../core/game.assetLoader.mjs";
import { transform2 ,vec2} from "../dataTypes.mjs";
import { SpellcardDefinition } from "../dataTypes/spellcards.mjs";
import { correctDrawTransform, drawTexture } from "../helper.mjs";
import { UIImage } from "./uiImage.mjs";
import { UINode } from "./uiNode.mjs";



export class UISpellcard extends UINode{
    constructor(scope,x,y,parent,targetIdx){
        super(scope,x,y,parent)
       
        this.texture;
        this.debugColor="#0000ff"
        this.loadImage = this.loadImage.bind(this)
        this.loadImage()

		this.spellCardTargetIdx=targetIdx||0;
		this.spellCardHasSpell=false;
        this.spellCardTypeImg= new UIImage(scope,x,y,this,"SpellCardBackground","textures/spellCard.png")
        this.spellCardImg= new UIImage(scope,x,y,this,"SpellCardBackground","textures/spellCard.png")

		
    }

    async loadImage(){
        this.texture=await assetLoader.loadImage("SpellCardBackground","textures/spellCard.png")
    }
    
    update(){
    	super.update()
    	
    	var player = window.game.state.entities.player
        /**@type{SpellcardDefinition} */
    	var currentSpellcard = player.currentSpellcards[ (player.currentSpellcard+this.spellCardTargetIdx)%3 ]
        this.spellCardHasSpell=currentSpellcard != null
    	
    	this.spellCardTypeImg.texture =  SpellcardDefinition.SPELLCARD_TYPES_IMAGES[SpellcardDefinition.SPELLCARD_TYPES["NULL"]]
    	this.spellCardImg.texture = SpellcardDefinition.SPELLCARD_IMAGES[ currentSpellcard.spellcardActName];
    	
    	this.spellCardTypeImg.visible =this.spellCardHasSpell
    	this.spellCardImg.visible=this.spellCardHasSpell
    }

    render(){
        this.visible=this.parentNode?this.parentNode.visible:this.visible;
        if (!this.visible) return;
        if (!this.texture) return;

        this.calculateTransform()
        var renderer = this.scope.context;
        var trueTransform=transform2.copy(this.calculatedTransform);

        
        //trueTransform.position.vecAdd(vec2.copy(trueTransform.position).vecSub(correctDrawTransform(this,"calculatedTransform").position).vecMult(-1));
        drawTexture(
            renderer,
            this.texture,
            this.calculatedTransform,
            {
                useCanvasTransforms:true,
                transparency:this.spellCardHasSpell?1.0:0.5
            }
        )

        
        super.render()
    }
}