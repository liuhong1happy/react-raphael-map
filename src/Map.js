const React = require('react');
const {Raphael,Paper,Set,Path,Text} = require('react-raphael');

class Shape extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: {
                x: 0+(props.data.xx || 0),
                y: 0+(props.data.yy || 0),
                text: props.data.name
            },
            path: props.data.path,
            color: {
                fill: props.data.fill,
                stroke: props.data.stroke,
                textFill: props.data.textFill,
                textStroke: props.data.textStroke,
            }
        }
    }
    handleLoad(path){
        var props = this.props;
        var box = path.getBBox();
        var center = {
            x: box.x + box.width / 2,
            y: box.y + box.height / 2
        }
        var text = this.state.text;
        text.x = center.x + (props.data.xx || 0);
        text.y = center.y + (props.data.yy || 0)
        this.setState({
            text: text
        })
    }
    render(){
        var {text,path,color} = this.state;
        return (<Set>
                            <Path d={path} load={this.handleLoad.bind(this)} attr={{fill:color.fill,stroke: color.stroke }} mouseover={this.props.mouseover} mouseout={this.props.mouseout}/>
                            <Text x={text.x} y={text.y} text={text.text} attr={{fill:color.textFill,stroke: color.textStroke }}/>
                    </Set>)
    }
}

class Map extends React.Component{
    handleMouseOver(e){
        if(!this._fill) this._fill = this.attr("fill");
        this.animate({
            fill: Raphael.getColor()
        },500)
    }
    handleMouseOut(e){
        this.animate({fill: this._fill},500)
    }
    render(){
        var map = this.props.data;
        var data = [];
        for(var key in map){
            data.push({
                key: key,
                name: map[key].name || "",
                path: map[key].path || "",
                xx: map[key].xx || 0,
                yy: map[key].yy || 0,
                fill: map[key].backColor || "#97d6f5",
                stroke: map[key].borderColor || "#fff",
                textFill: map[key].textFill || "#000",
                textStroke: map[key].textStroke,
            })
        }
        var handleMouseOver = this.handleMouseOver;
        var handleMouseOut = this.handleMouseOut;
        
        return (<Paper width={this.props.width || 1000} height={this.props.height || 1000}>
            {
                data.map(function(ele,pos){
                    return (<Shape data={ele} key={pos} mouseover={handleMouseOver} mouseout={handleMouseOut} />)
                })
            }
        </Paper>)
    }
}

module.exports = Map;