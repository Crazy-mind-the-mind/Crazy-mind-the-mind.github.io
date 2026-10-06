import { assetLoader } from "../../core/game.assetLoader.mjs";
import { transform2 ,vec2} from "../dataTypes.mjs";
import { SpellcardDefinition } from "../dataTypes/spellcards.mjs";
import { correctDrawTransform, drawTexture } from "../helper.mjs";
import { UIImage } from "./uiImage.mjs";
import { UINode } from "./uiNode.mjs";



export class UISpellcard extends UINode{
    constructor(scope,x,y,parent){
        super(scope,x,y,parent)
       
        this.texture;
        this.debugColor="#0000ff"
        this.loadImage = this.loadImage.bind(this)
        this.loadImage()

        this.spellCardTypeImg= new UIImage(scope,x,y,parent,SpellcardDefinition.SPELLCARD_TYPES_IMAGES[SpellcardDefinition.SPELLCARD_TYPES[NULL] ])
        this.spellCardImg= new UIImage(scope,x,y,parent,SpellcardDefinition.SPELLCARD_TYPES_IMAGES[SpellcardDefinition.SPELLCARD_TYPES[NULL] ])


    }

    async loadImage(){
        this.texture=await assetLoader.loadImage("SpellCardBackground","textures/spellCard.png")
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
                useCanvasTransforms:true
            }
        )
        super.render()
    }
}