import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie';

class QuestionGraph extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      colorPalette: this.poorlyChooseARandomColorPalette(),
      questionId: this.props.questionId,
      answers: this.props.answers,
      answerCounts: this.props.answerCounts,
      userCount: this.props.userCount,
      graphData: []
    };
    // console.log("graph state")
    // console.log(this.state)
  }

  poorlyChooseARandomColorPalette() {
  	const allColorPalettes = ['nivo', 'category10', 'accent', 'dark2', 'paired', 'pastel1', 'pastel2'];
  	var index = Math.floor(Math.random() * 10000) % allColorPalettes.length;
  	const thisPalette = allColorPalettes[index];
  	return thisPalette;
  }

  generateGraphData() {
    var _this = this;
    var answersReceived = 0
    var graphData = this.props.answers.map((a) => {
      var userCountForThisAnswer = _this.props.answerCounts[a.id] || 0
      answersReceived += userCountForThisAnswer
      return ({
        "id": a.text,
        "label": a.text,
        "value": userCountForThisAnswer
      });
    });
    if (answersReceived < this.props.userCount) {
      graphData.push({
        "id": "Unanswered",
        "label": "Users without answers",
        "value": this.props.userCount - answersReceived,
        "color": "hsl(0, 84%, 58%)"
      })
    }
    
    return graphData;
  }

	render() {
		const palette = this.props.colorPalette;
    var graphData = this.generateGraphData();
    
		return (
        <ResponsivePie
        data={graphData}
        margin={{
            "top": 40,
            "right": 40,
            "bottom": 60,
            "left": 40
        }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={palette}
        colorBy="id"
        borderWidth={2}
        borderColor="inherit:darker(0.3)"
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor="inherit"
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "rgba(255, 255, 255, 0.3)",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "rgba(255, 255, 255, 0.3)",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        legends={[
            {
                "anchor": "bottom-left",
                "direction": "column",
                "translateY": 56,
                "itemWidth": 120,
                "itemHeight": 18,
                "itemTextColor": "#999",
                "symbolSize": 18,
                "symbolShape": "diamond",
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemTextColor": "#000"
                        }
                    }
                ]
            }
        ]}
    	/>
    );
	}
}

export default QuestionGraph;