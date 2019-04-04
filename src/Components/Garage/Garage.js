import React, { Component } from 'react';
import * as d3 from 'd3';
import './Garage.css';

export default class Garage extends Component {
	constructor() {
		super();

		this.state = {
			value: 'small',
			bottomPoint: null,
			hammer: [ 50, 330, 12 ],
			saw: [ 150, 315, 30 ],
			chainsaw: [ 250, 320, 60 ],
			screws: [ 350, 320, 1.05 ],
			tapemeasure: [ 420, 335, 8 ],
            lowerBox: 0,
            space: 5
		};
	}

	componentDidMount() {
		this.drawGarage();
	}

	drawGarage = () => {
        const {value, bottomPoint, hammer, saw, chainsaw, screws, tapemeasure, lowerBox} = this.state;
       var space = 0;
		const margin = { top: 20, right: 20, bottom: 20, left: 20 };
		const width = 580 - margin.left - margin.right;
		const height = 460 - margin.top - margin.bottom;
		var svg = d3.select('body').append('svg').attr('class', 'house').attr('width', width).attr('height', height);
		svg.append('rect').attr('class', 'garage').attr('x', 20).attr('y', 20).attr('width', 500).attr('height', 380);

		svg
			.append('rect')
			.attr('class', 'squareSpace')
			.attr('x', 65)
			.attr('y', 40)
			.attr('width', 420)
			.attr('height', 270);
		d3.select('.squareSpace').call(draw);

		svg
			.append('rect')
			.attr('class', 'groundTrim')
			.attr('x', 65)
			.attr('y', 305)
			.attr('width', 420)
			.attr('height', 5);
		svg.append('rect').attr('class', 'door').attr('x', 370).attr('y', 80).attr('width', 100).attr('height', 225);

		svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 462).attr('y1', 82).attr('x2', 465).attr('y2', 83);
		svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 462).attr('y1', 82).attr('x2', 462).attr('y2', 300);
		svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 465).attr('y1', 83).attr('x2', 465).attr('y2', 293);
		svg
			.append('line')
			.attr('class', 'doorOpenEdge')
			.attr('x1', 462)
			.attr('y1', 300)
			.attr('x2', 465)
			.attr('y2', 293);
		svg.append('line').attr('id', 'doorFrame').attr('x1', 415).attr('y1', 88).attr('x2', 415).attr('y2', 265);
		svg.append('line').attr('id', 'doorFrame').attr('x1', 415).attr('y1', 88).attr('x2', 462).attr('y2', 82);
		svg.append('line').attr('id', 'doorFrame').attr('x1', 415).attr('y1', 265).attr('x2', 462).attr('y2', 300);
		svg
			.append('ellipse')
			.attr('class', 'doorHandleBase')
			.attr('cx', 420)
			.attr('cy', 188)
			.attr('rx', 2.25)
			.attr('ry', 5)
			.attr('fill', '#282828')
			.attr('stroke', '#282828');
		svg.append('circle').attr('class', 'doorHandle').attr('cx', 414).attr('cy', 188).attr('r', 3.5);
		svg.append('line').attr('class', 'topLeft').attr('x1', 20).attr('y1', 20).attr('x2', 65).attr('y2', 40);
		svg.append('line').attr('class', 'bottomLeft').attr('x1', 20).attr('y1', 400).attr('x2', 65).attr('y2', 310);
		svg.append('line').attr('class', 'bottomRight').attr('x1', 520).attr('y1', 400).attr('x2', 485).attr('y2', 310);
		svg.append('line').attr('class', 'topRight').attr('x1', 520).attr('y1', 20).attr('x2', 485).attr('y2', 40);
		svg.append('line').attr('id', 'backbackdrop').attr('x1', 370).attr('y1', 145).attr('x2', 415).attr('y2', 145);

		svg
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/1519/1519002.svg')
			.attr('id', 'fishTank')
			.attr('x', 370)
			.attr('y', 100);
		svg
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/1661/1661318.svg')
			.attr('id', 'fishTable')
			.attr('x', 370)
			.attr('y', 117);
		svg
			.append('image')
			.attr(
				'href',
				'https://i1.wp.com/teameverlast.everlast.com/wp-content/uploads/2016/07/2000px-Everlast-logo-2011.svg_.png?resize=300%2C197&ssl=1'
			)
			.attr('id', 'everlast')
			.attr('x', 95)
			.attr('y', 190);

		const tools = svg.append('g').attr('class', 'tools').datum([this.state]);
		tools
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/1538/1538118.svg')
			.attr('id', 'hammer')
			.attr('x', 50)
			.attr('y', 330)
			.data([ hammer ])
			.enter();
		tools
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/1538/1538124.svg')
			.attr('id', 'saw')
			.attr('x', 150)
			.attr('y', 315)
			.data([ saw ])
			.enter();
		tools
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/123/123935.svg')
			.attr('id', 'chainsaw')
			.attr('x', 250)
			.attr('y', 320)
			.data([ chainsaw ])
			.enter();
		tools
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/289/289690.svg')
			.attr('id', 'screws')
			.attr('x', 350)
			.attr('y', 320)
			.data([ screws ])
			.enter();
		tools
			.append('image')
			.attr('href', 'https://image.flaticon.com/icons/svg/1589/1589247.svg')
			.attr('id', 'tapemeasure')
			.attr('x', 420)
			.attr('y', 335)
			.data([ tapemeasure ])
            .enter();

		d3.selectAll('#hammer').call(d3.drag().subject({x:50,y:330}).on('start', started).on('drag', dragged).on('end', ended));
		d3.selectAll('#saw').call(d3.drag().subject({x:150,y:315}).on('start', started).on('drag', dragged).on('end', ended));
		d3.selectAll('#chainsaw').call(d3.drag().subject({x:250,y:320}).on('start', started).on('drag', dragged).on('end', ended));
		d3.selectAll('#screws').call(d3.drag().subject({x:350,y:320}).on('start', started).on('drag', dragged).on('end', ended));
		d3.selectAll('#tapemeasure').call(d3.drag().subject({x:420,y:335}).on('start', started).on('drag', dragged).on('end', ended));

		function draw(selection) {
			var xy0,
				path,
				keep = false,
				g = svg.append('g'),
				line = d3.line().x((d) => d[0]).y((d) => d[1]);

			selection
				.on('mousedown', function() {
					keep = true;
					xy0 = d3.mouse(this);
					path = d3.select('g').append('path').attr('class', 'containerMount').attr('d', line([ xy0, xy0 ]));
                })
                .on('mousemove', function() {
					if (keep) {
						var Line = line([
							xy0,
							d3.mouse(this).map(function(x) {
								return x - 1;
							})
						]);
						path.attr('d', Line);
					}
				})
				.on('mouseup', function() {
					keep = false;
				});
				

			const linkVertical = d3
				.linkVertical()
				.x(function(d) {
					return d.x;
				})
				.y(function(d) {
					return d.y;
				});
			const linksData = [ { source: { y: 35, x: 110 }, target: { y: 230, x: 110 } } ];
			const ellipses = [ { cx: 110, cy: 35, rx: 12.5, ry: 2.5 }, { cx: 110, cy: 200, rx: 37.5, ry: 70 } ];
			const svgEllipses = svg.selectAll('ellipse').data(ellipses).enter().append('ellipse');
			svgEllipses
				.attr('cx', (d, i) => {
					return d.cx;
				})
				.attr('cy', (d, i) => {
					return d.cy;
				})
				.attr('rx', (d, i) => {
					return d.rx;
				})
				.attr('ry', (d, i) => {
					return d.ry;
				});
			svg
				.selectAll('ellipses')
				.data(linksData)
				.enter()
				.append('path')
				.attr('stroke', 'black')
				.attr('d', linkVertical);
		}

		function started(d) {
			d3.select(this).classed('dragging', true);
			d3.event.on('drag', dragged).on('end', ended);
		}
		function dragged(d) {
			d3.select(this).attr('x',  d3.event.x).attr('y', d3.event.y);
		}

		function ended(d) {
			var textInContainer = 
               d3.select('#space')
                .data([d])
                .enter()
                .exit()
                .remove();

                d3.select('#space')
				.text((d) => {
					return `${parseInt(d[2]) + parseInt(space)}` + `%`;
                });
                if(parseInt(d[2]) + parseInt(space) > 100){
                    alert('Container has exceeded its limit!')
                    d3.select('#space').attr('fill', 'red');
                }
            d3.select(this).style('opacity', 0);
            space += d[2];
            d3.select(this).classed('dragging', false);  
		}
	};

	handleChange = (event) => {
        const {value, bottomPoint} = this.state;
		this.setState({ value: event.target.value, bottomPoint: !bottomPoint });
	};

	handleSubmit = (event) => {
        const {lowerBox, value} = this.state;
       var space = 0;
		event.preventDefault();
        var lPoints = [];
        
		const newLine = d3.select('.containerMount').node();
        var l = newLine.getTotalLength();
        for (var j = 0; j < l; j++) {
            lPoints.push(newLine.getPointAtLength(j));
        }
        var length = lPoints.length;
		var p = newLine.getPointAtLength([ 0 ]);
        var q = lPoints[length - 1];
		var path = d3.path();
		d3.select('#space').remove().exit();
		if (value === 'small') {
			path.moveTo(p.x, p.y);
			path.lineTo(p.x, p.y - 3 / 4 * l - 25 + lowerBox);
			path.rect(p.x - 15, p.y - 3 / 4 * l - 40 + lowerBox, 30, 15);
			path.moveTo(p.x, p.y - 3 / 4 * l - 40 + lowerBox);
			path.lineTo(p.x, q.y);
			d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
			d3
				.select('g')
				.append('text')
				.attr('id', 'space')
				.text(`${space}` + '%')
				.attr('x', p.x - 12)
				.attr('y', p.y - 3 / 4 * l - 28 + lowerBox);
            this.setState({ lowerBox: lowerBox + 30});
		} else if (value === 'medium') {
			path.moveTo(p.x, p.y);
			path.lineTo(p.x, p.y - 1 / 3 * l + lowerBox);
			path.rect(p.x - 25, p.y - 1 / 3 * l - 50 + lowerBox, 50, 50);
			path.moveTo(p.x, p.y - 1 / 3 * l - 50 + lowerBox);
			path.lineTo(p.x, q.y);
			d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
			d3
				.select('g')
				.append('text')
				.attr('id', 'space')
				.text(`${space}` + '%')
				.attr('x', p.x - 10)
				.attr('y', p.y - 1 / 3 * l - 23 + lowerBox);
			this.setState({ lowerBox: lowerBox + 30});
		} else {
			path.moveTo(p.x, p.y);
			path.lineTo(p.x, p.y - 2 / 7 * l + lowerBox);
			path.rect(p.x - 50, p.y - 2 / 7 * l - 40 + lowerBox, 100, 40);
			path.moveTo(p.x, p.y - 2 / 7 * l - 40 + lowerBox);
			path.lineTo(p.x, q.y);
			d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
			d3
				.select('g')
				.append('text')
				.attr('id', 'space')
				.text(`${space}` + '%')
				.attr('x', p.x - 8)
				.attr('y', p.y - 2 / 7 * l - 16 + lowerBox);
			this.setState({ lowerBox: lowerBox + 30});
		}
	};
	render() {
        
		return (
			<form onSubmit={this.handleSubmit}>
               <p id='problem'>How do I maximize the value of space in my garage?</p>
      <p id='instructions'>1) Create a mount by clicking from the bottom of the wall and dragging up.</p>
				<label>
					2) Choose a container to store your tool:
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="small">small</option>
						<option value="medium">medium</option>
						<option value="large">large</option>
					</select>
                    <input type="submit" value="Submit" />
				</label>
				
				<label>3) Drag tool into the bin.</label>
			</form>
		);
	}
}
