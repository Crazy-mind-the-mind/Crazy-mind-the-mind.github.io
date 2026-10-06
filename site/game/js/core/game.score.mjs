import { uiTransform } from "../utils/dataTypes.mjs"



export function gameScore(scope){
    scope.state.playerStatus.ScorePoints=0
    scope.state.playerStatus.HighScorePoints=0

    

    return function scoreUpdate(){
        scope.state.playerStatus.HighScorePoints = Math.max(scope.state.playerStatus.HighScorePoints , scope.state.playerStatus.ScorePoints)
        if (scope.state.ui){

            if (scope.state.ui.GameHUD){
                var UiScoreNodes= scope.state.ui.GameHUD

                let rootScore = UiScoreNodes.findChildByName("ScorePointsNode")
                let pointScoreNode=rootScore.findChildByName("ScorePoints")
                pointScoreNode.text = scope.state.playerStatus.ScorePoints

                let rootHighScore = UiScoreNodes.findChildByName("HighScorePointsNode")
                let pointHighScoreNode=rootHighScore.findChildByName("HighScorePoints")
                pointHighScoreNode.text = scope.state.playerStatus.HighScorePoints
            }

        }


    }
}