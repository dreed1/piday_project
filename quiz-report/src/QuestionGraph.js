import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie'

class QuestionGraph extends Component {
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      graphData: this.props.graphData,
      colorPalette: this.poorlyChooseARandomColorPalette()
    };
    ;
  }

  poorlyChooseARandomColorPalette() {
  	const allColorPalettes = ['nivo', 'category10', 'accent', 'dark2', 'paired', 'pastel1', 'pastel2'];
  	var index = Math.floor(Math.random() * 10000) % allColorPalettes.length;
  	const thisPalette = allColorPalettes[index];
  	console.log("this pallete: " + thisPalette)
  	console.log("from " + index)
  	return thisPalette;
  	// this.setState({colorPalette: allColorPalettes[index]});
  }

	render() {
		const palette = this.state.colorPalette;
		var graphData = this.state.graphData;
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