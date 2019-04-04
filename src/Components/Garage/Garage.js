import React, { Component } from 'react';
import * as d3 from 'd3';
import './Garage.css';

export default class Garage extends Component {
	constructor() {
		super();

		this.state = {
            value: 'small',
            bottomPoint: null,
            hammer: [50, 330],
            saw: [150, 315],
            chainsaw: [250, 320, 6],
            screws: [350, 320],
            tapemeasure: [420, 335],
            count: 0
		};
	}

	componentDidMount() {
        this.drawGarage();
    };

    drawGarage = () => {
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
		const width = 580 - margin.left - margin.right;
		const height = 460 - margin.top - margin.bottom;
		var svg = d3.select('body').append('svg').attr('class', 'house').attr('width', width).attr('height', height);
        const drag = d3.drag().on('start', started).on('drag', dragged).on('end', ended);
		svg.append('rect').attr('class', 'garage').attr('x', 20).attr('y', 20).attr('width', 500).attr('height', 380);

		svg.append('rect').attr('class', 'squareSpace').attr('x', 65).attr('y', 40).attr('width', 420).attr('height', 270);
        d3.select('.squareSpace').call(draw);
        
		svg.append('rect').attr('class', 'groundTrim').attr('x', 65).attr('y', 305).attr('width', 420).attr('height', 5);
		svg.append('rect').attr('class', 'door').attr('x', 370).attr('y', 80).attr('width', 100).attr('height', 225);
        
        svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 462).attr('y1', 82).attr('x2', 465).attr('y2', 83);
		svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 462).attr('y1', 82).attr('x2', 462).attr('y2', 300);
		svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 465).attr('y1', 83).attr('x2', 465).attr('y2', 293);
		svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 462).attr('y1', 300).attr('x2', 465).attr('y2', 293);
		svg.append('line').attr('id', 'doorFrame').attr('x1', 415).attr('y1', 88).attr('x2', 415).attr('y2', 265);
		svg.append('line').attr('id', 'doorFrame').attr('x1', 415).attr('y1', 88).attr('x2', 462).attr('y2', 82);
        svg.append('line').attr('id', 'doorFrame').attr('x1', 415).attr('y1', 265).attr('x2', 462).attr('y2', 300);
        svg.append('ellipse').attr('class', 'doorHandleBase').attr('cx', 420).attr('cy', 188).attr('rx', 2.25).attr('ry', 5).attr('fill', '#282828').attr('stroke', '#282828');
		svg.append('circle').attr('class', 'doorHandle').attr('cx', 414).attr('cy', 188).attr('r', 3.5);
		svg.append('line').attr('class', 'topLeft').attr('x1', 20).attr('y1', 20).attr('x2', 65).attr('y2', 40);
		svg.append('line').attr('class', 'bottomLeft').attr('x1', 20).attr('y1', 400).attr('x2', 65).attr('y2', 310);
		svg.append('line').attr('class', 'bottomRight').attr('x1', 520).attr('y1', 400).attr('x2', 485).attr('y2', 310);
		svg.append('line').attr('class', 'topRight').attr('x1', 520).attr('y1', 20).attr('x2', 485).attr('y2', 40);
        svg.append('line').attr('id', 'backbackdrop').attr('x1', 370).attr('y1', 145).attr('x2', 415).attr('y2', 145);

		svg.append('image').attr('href', 'https://image.flaticon.com/icons/svg/1519/1519002.svg').attr('id', 'fishTank').attr('x', 370).attr('y', 100);
		svg.append('image').attr('href', 'https://image.flaticon.com/icons/svg/1661/1661318.svg').attr('id', 'fishTable').attr('x', 370).attr('y', 117);
		svg.append('image').attr('href', 'https://i1.wp.com/teameverlast.everlast.com/wp-content/uploads/2016/07/2000px-Everlast-logo-2011.svg_.png?resize=300%2C197&ssl=1').attr('id', 'everlast').attr('x', 95).attr('y', 190);
        
        const tools = svg.append('g').attr('class', 'tools');
        tools.append('image').attr('href', 'https://image.flaticon.com/icons/svg/1538/1538118.svg').attr('id', 'hammer').attr('x', 50).attr('y', 330).data([this.state.hammer]).enter();
        tools.append('image').attr('href', 'https://image.flaticon.com/icons/svg/1538/1538124.svg').attr('id', 'saw').attr('x', 150).attr('y', 315).data([this.state.saw]).enter();;     
        tools.append('image').attr('href', 'https://image.flaticon.com/icons/svg/123/123935.svg').attr('id', 'chainsaw').attr('x', 250).attr('y', 320).data([this.state.chainsaw]).enter();;     
        tools.append('image').attr('href', 'https://image.flaticon.com/icons/svg/289/289690.svg').attr('id', 'screws').attr('x', 350).attr('y', 320).data([this.state.screws]).enter();;   
		tools.append('image').attr('href', 'https://image.flaticon.com/icons/svg/1589/1589247.svg').attr('id', 'tapemeasure').attr('x', 420).attr('y', 335).data([this.state.tapemeasure]).enter();;
        d3.selectAll('#hammer').call(drag);
        d3.selectAll('#saw').call(drag);
        d3.selectAll('#chainsaw').call(drag);
        d3.selectAll('#screws').call(drag);
        d3.selectAll('#tapemeasure').call(drag);

		function draw(selection) {
			var xy0, path, keep = false, g = svg.append('g'), line = d3.line().x(d => d[0]).y(d => d[1]);
            
            selection
                .on('mousedown', function() {
					keep = true;
                    xy0 = d3.mouse(this);
					path = d3.select('g').append('path').attr('class', 'containerMount').attr('d', line([ xy0, xy0 ]))})
				.on('mouseup', function() {keep = false;})
				.on('mousemove', function() {
					if (keep) {var Line = line([xy0, d3.mouse(this).map(function(x) {return x - 1;})]);
						path.attr('d', Line);
                    } 
				});

			const linkVertical = d3.linkVertical().x(function(d) {return d.x;}).y(function(d) {return d.y;});
			const linksData = [ { source: { y: 35, x: 110 }, target: { y: 230, x: 110 } } ];
			const ellipses = [ { cx: 110, cy: 35, rx: 12.5, ry: 2.5 }, { cx: 110, cy: 200, rx: 37.5, ry: 70 } ];
			const svgEllipses = svg.selectAll('ellipse').data(ellipses).enter().append('ellipse');
			svgEllipses.attr('cx', (d, i) => {return d.cx;}).attr('cy', (d, i) => {return d.cy;}).attr('rx', (d, i) => {return d.rx;}).attr('ry', (d, i) => {return d.ry;});
			svg.selectAll('ellipses').data(linksData).enter().append('path').attr('stroke', 'black').attr('d', linkVertical);}

        function started(d) {
            d3.select(this).classed("dragging", true);
            d3.event.on("drag", dragged).on("end", ended);
        }
        function dragged(d) {
            d[0] = Math.max(0, Math.min(width-100, d3.event.x))
            d[1] = Math.max(0, Math.min(height-100, d3.event.y))
            d3.select(this).raise().attr("x", d[0]).attr("y", d[1]);
        }
          
        function ended(d) {
            d3.select(this).style('opacity', 0)
            d3.select(this).classed("dragging", false); 
        }
    }

	handleChange = (event) => {
		this.setState({ value: event.target.value, bottomPoint: !this.state.bottomPoint });
	};

	handleSubmit = (event) => {
        event.preventDefault();
        const newLine = d3.select('.containerMount').node();
        var l = newLine.getTotalLength();
        var p = newLine.getPointAtLength([0]);
        var q = newLine.getPointAtLength(10 * l);
        var path = d3.path();
        if (this.state.value === 'small') {
            path.moveTo(p.x,p.y);
            path.lineTo(p.x, p.y-(3/4*l) - 25 + this.state.count);
            path.rect(p.x -15, p.y-(3/4*l) - 40 + this.state.count, 30, 15);
            path.moveTo(p.x, p.y-(3/4*l) - 40 + this.state.count);
            path.lineTo(p.x, q.y);
            this.setState({count: this.state.count+30})
            d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
        } 
		else if (this.state.value === 'medium') {
            path.moveTo(p.x,p.y);
            path.lineTo(p.x, p.y-(1/3*l) + this.state.count);
            path.rect(p.x -25, p.y-(1/3*l) - 50 + this.state.count, 50, 50);
            path.moveTo(p.x, p.y-(1/3*l) - 50 + this.state.count);
            path.lineTo(p.x, q.y);
            this.setState({count: this.state.count+30})
            d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
        } 
        else {
            path.moveTo(p.x,p.y);
            path.lineTo(p.x, p.y-(2/7*l) + this.state.count);
            path.rect(p.x -50, p.y-(2/7*l) - 40 + this.state.count, 100, 40);
            path.moveTo(p.x, p.y-(2/7*l) - 40 + this.state.count);
            path.lineTo(p.x, q.y);
            this.setState({count: this.state.count+30})
            d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
		}
	};
	render() { 
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					2) Choose a container to store your tool:
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="small">small</option>
						<option value="medium">medium</option>
						<option value="large">large</option>
					</select>
				</label>
				<input type="submit" value="Submit" />
                <label>3) Drag tool into into bin.</label>
			</form>
		);
	}
}
